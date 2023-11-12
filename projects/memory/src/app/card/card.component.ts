import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	CardBorderState,
	CardFlipState,
	cardErrorAnimation,
	cardFlipAnimation,
	cardFlipStateMap,
	cardSuccessAnimation,
} from '../animations/card.animations';

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

	private readonly FLIP_STATE_DELAY = 150;
	isFaceDown: boolean = true;
	cardBorderState = CardBorderState.Default;
	flipState = CardFlipState.Back;

	public hide() {
		this.toggleFlipState();
		setTimeout(() => {
			this.isFaceDown = true;
		}, this.FLIP_STATE_DELAY);
	}

	public reveal() {
		if (this.isFaceDown) {
			this.toggleFlipState();
			setTimeout(() => {
				this.isFaceDown = false;
				this.selected.emit(this);
			}, this.FLIP_STATE_DELAY);
		}
	}

	public animateSuccess() {
		this.animateBorderState(CardBorderState.Success);
	}
	public animateError() {
		this.animateBorderState(CardBorderState.Error);
	}

	public animateBorderState(newState: CardBorderState) {
		this.cardBorderState = newState;
		setTimeout(() => (this.cardBorderState = CardBorderState.Default), 400);
	}

	private toggleFlipState() {
		this.flipState = cardFlipStateMap[this.flipState];
	}
}
