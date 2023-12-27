import {
	AfterViewInit,
	Component,
	DestroyRef,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewChildren,
	inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';
import { CardComponent } from '../card/card.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { duplicateAndRamdomize } from '../../utils/duplicate-randomize-cards.transform';
import { GameService } from '../../services/game.service';
import { map, startWith } from 'rxjs';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, CardComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
	animations: [
		trigger('fadeSlideIn', [
			transition(':enter', [
				animate(
					'1s ease-in',
					keyframes([
						style({ opacity: 0, transform: 'translateY(-100%) scale(0.5)', offset: 0 }),
						style({ opacity: 0, transform: 'translateY(-100%) scale(1)', offset: 0.5 }),
						style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 0.8 }),
						style({ opacity: 1, transform: 'translateY(-10%) scale(1.1)', offset: 0.9 }),
						style({ opacity: 1, transform: 'translateY(0) scale(1)', offset: 1.0 }),
					])
				),
			]),
		]),
		trigger('fadeSlideOut', [
			transition(':leave', [
				animate(
					'0.5s ease-out',
					keyframes([
						style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
						style({ opacity: 0, transform: 'translateY(200%)', offset: 1.0 }),
					])
				),
			]),
		]),
	],
})
export class CardListComponent implements AfterViewInit {
	@Input({ required: true, transform: duplicateAndRamdomize }) cards: Card[] = [];
	@Output() reset = new EventEmitter<void>();

	@ViewChildren(CardComponent) componentCards!: QueryList<CardComponent>;

	gameService = inject(GameService);
	destroyRef = inject(DestroyRef);
	gameCompleted = toSignal(
		this.gameService.gameCompleted$.pipe(
			map(val => val),
			startWith(false)
		)
	);
	elapsedTime = '';

	ngAfterViewInit(): void {
		this.setUpgame();
	}

	restartGame() {
		this.gameService.restartGame();
		this.reset.emit();
		setTimeout(() => {
			this.setUpgame();
		});
	}

	setUpgame() {
		this.gameService
			.initializeGame(this.componentCards.toArray())
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();

		this.gameService.gameTimer$.subscribe(timer => {
			this.elapsedTime = timer;
		});
	}
}
