import {
	AfterViewInit,
	Component,
	DestroyRef,
	Input,
	QueryList,
	ViewChildren,
	inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { CardComponent } from '../card/card.component';
import { bufferCount, concatMap, delay, map, merge, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { duplicateAndRamdomize } from '../utils/duplicate-randomize-cards.transform';

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, CardComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
})
export class CardListComponent implements AfterViewInit {
	@Input({ required: true, transform: duplicateAndRamdomize }) cards: Card[] =
		[];

	@ViewChildren(CardComponent) componentCards!: QueryList<CardComponent>;

	destroyRef = inject(DestroyRef);

	ngAfterViewInit(): void {
		const cardSelectionObservables = this.componentCards.map(card =>
			card.selected.asObservable()
		);

		merge(...cardSelectionObservables)
			.pipe(
				bufferCount(2),
				delay(200),
				concatMap(([firstComponent, secondComponent]) => {
					const { card: firstCard } = firstComponent;
					const { card: secondCard } = secondComponent;
					if (firstCard.icon !== secondCard.icon) {
						return of([firstComponent, secondComponent]).pipe(
							tap(([firstComponent, secondComponent]) => {
								firstComponent.animateError();
								secondComponent.animateError();
							}),
							delay(500),
							tap(([firstComponent, secondComponent]) => {
								firstComponent.hide();
								secondComponent.hide();
							})
						);
					} else {
						return of([firstComponent, secondComponent]).pipe(
							tap(([firstComponent, secondComponent]) => {
								firstComponent.animateSuccess();
								secondComponent.animateSuccess();
							})
						);
					}
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}
}
