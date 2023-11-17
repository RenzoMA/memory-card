import { AfterViewInit, Component, DestroyRef, Input, QueryList, ViewChildren, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';
import { CardComponent } from '../card/card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { duplicateAndRamdomize } from '../../utils/duplicate-randomize-cards.transform';
import { GameService } from '../../services/game.service';

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, CardComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
})
export class CardListComponent implements AfterViewInit {
	@Input({ required: true, transform: duplicateAndRamdomize }) cards: Card[] = [];

	@ViewChildren(CardComponent) componentCards!: QueryList<CardComponent>;

	gameService = inject(GameService);
	destroyRef = inject(DestroyRef);
	elapsedTime = '00:00';

	ngAfterViewInit(): void {
		this.gameService
			.initializeGame(this.componentCards.toArray())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();

		this.gameService.gameTimer$.subscribe(timer => {
			this.elapsedTime = timer;
		});
	}
}
