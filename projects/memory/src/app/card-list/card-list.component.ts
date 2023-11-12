import {
	AfterViewInit,
	Component,
	Input,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { CardComponent } from '../card/card.component';
import {
	bufferCount,
	delay,
	merge,
	tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

	ngAfterViewInit(): void {
		const cardSelectionObservables = this.componentCards.map(card =>
			card.selected.asObservable()
		);

		merge(...cardSelectionObservables)
			.pipe(
				bufferCount(2),
				delay(800),
				tap(([firstComponent, secondComponent]) => {
					const { card: firstCard } = firstComponent;
					const { card: secondCard } = secondComponent;
					if (firstCard.icon !== secondCard.icon) {
						firstComponent.hide();
						secondComponent.hide();
					}
				}),
				takeUntilDestroyed()
			)
			.subscribe();
	}
}

function duplicateAndRamdomize(cards: Card[]) {
	return cards
		.flatMap(card => [
			{ ...card, id: card.id + '_1' },
			{ ...card, id: card.id + '_2' },
		])
		.sort(() => Math.random() - 0.5);
}
