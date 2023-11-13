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
import {
	Subject,
	bufferCount,
	concatMap,
	delay,
	first,
	map,
	merge,
	of,
	takeUntil,
	tap,
	timer,
} from 'rxjs';
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
	gameCompleted$ = new Subject<void>();

	destroyRef = inject(DestroyRef);
	elapsedTime = '00:00';

	ngAfterViewInit(): void {
		const cardSelectionObservables = this.componentCards.map(card =>
			card.selected.asObservable()
		);

		const gameTimer$ = merge(...cardSelectionObservables).pipe(
			first(),
			concatMap(() => {
				return timer(0, 1000);
			}),
			takeUntil(this.gameCompleted$)
		);

		gameTimer$.subscribe(seconds => {
			this.elapsedTime = this.formatTime(seconds);
		});

		merge(...cardSelectionObservables)
			.pipe(
				bufferCount(2),
				delay(100),
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
				tap(() => {
					const isGameCompleted = this.componentCards
						.toArray()
						.every(component => !component.isFaceDown);
					if (isGameCompleted) {
						this.gameCompleted$.next();
						this.gameCompleted$.complete();
					}
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		const paddedMinutes = minutes.toString().padStart(2, '0');
		const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

		return `${paddedMinutes}:${paddedSeconds}`;
	}
}
