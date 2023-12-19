import { Injectable } from '@angular/core';
import {
	Observable,
	Subject,
	bufferCount,
	concatMap,
	defer,
	delay,
	first,
	map,
	merge,
	of,
	startWith,
	takeUntil,
	tap,
	timer,
} from 'rxjs';
import { CardComponent } from '../components/card/card.component';

@Injectable({
	providedIn: 'root',
})
export class GameService {
	cardComponentSelection: Observable<CardComponent>[] = [];
	cardComponents: CardComponent[] = [];

	gameCompleted$ = new Subject<boolean>();

	gameTimer$ = defer(() => {
		return merge(...this.cardComponentSelection).pipe(
			first(),
			concatMap(() => {
				return timer(0, 1000);
			}),
			map(seconds => {
				return this.formatTime(seconds);
			}),
			startWith('00:00'),
			takeUntil(this.gameCompleted$)
		);
	});

	startGame$ = defer(() => {
		return merge(...this.cardComponentSelection).pipe(
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
				const isGameCompleted = this.cardComponents.every(component => !component.isFaceDown);
				if (isGameCompleted) {
					this.gameCompleted$.next(true);
				}
			})
		);
	});

	constructor() {}

	initializeGame(componentCards: CardComponent[]) {
		this.cardComponents = componentCards;
		this.cardComponentSelection = componentCards.map(card => card.selected.asObservable());
		return this.startGame$;
	}

	restartGame() {
		this.gameCompleted$.next(false);
		this.gameTimer$ = defer(() => {
			return merge(...this.cardComponentSelection).pipe(
				first(),
				concatMap(() => {
					return timer(0, 1000);
				}),
				map(seconds => {
					return this.formatTime(seconds);
				}),
				startWith('00:00'),
				takeUntil(this.gameCompleted$)
			);
		});
	}

	formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		const paddedMinutes = minutes.toString().padStart(2, '0');
		const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

		return `${paddedMinutes}:${paddedSeconds}`;
	}
}
