import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	CardAnimation,
	CardBorderState,
	CardFlipState,
	cardErrorAnimation,
	cardFlipAnimation,
	cardFlipStateMap,
	cardSuccessAnimation,
} from '../animations/card.animations';
import { AnimationEvent } from '@angular/animations';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	animations: [cardErrorAnimation, cardSuccessAnimation, cardFlipAnimation],
})
export class CardComponent {
	@Input({ required: true }) card!: Card;
	@Output() selected = new EventEmitter<CardComponent>();

	private readonly FLIP_STATE_DELAY = 85;
	isFaceDown: boolean = true;
	cardSuccessState = CardBorderState.Default;
	cardErrorState = CardBorderState.Default;
	flipState = CardFlipState.Back;
	isFlipping = false;

	public hide() {
		this.toggleFlipState();
		setTimeout(() => {
			this.isFaceDown = true;
		}, this.FLIP_STATE_DELAY);
	}

	public reveal() {
		const isFlippable = this.isFaceDown && !this.isFlipping;
		if (isFlippable) {
			this.isFlipping = true;
			this.toggleFlipState();
			setTimeout(() => {
				this.isFaceDown = false;
				this.isFlipping = false;
				this.selected.emit(this);
			}, this.FLIP_STATE_DELAY);
		}
	}

	public animateSuccess() {
		this.cardSuccessState = CardBorderState.Success;
	}
	public animateError() {
		this.cardErrorState = CardBorderState.Error;
	}

	private toggleFlipState() {
		this.flipState = cardFlipStateMap[this.flipState];
	}

	public cardSuccessDone(animation: AnimationEvent) {
		if (animation.fromState !== 'void') {
			this.cardSuccessState = CardBorderState.Default;
		}
	}

	public cardErrorDone(animation: AnimationEvent) {
		if (animation.fromState !== 'void') {
			this.cardErrorState = CardBorderState.Default;
		}
	}
}
