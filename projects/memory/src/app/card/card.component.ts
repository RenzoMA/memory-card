import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
	animations: [
		trigger('borderErrorAnimation', [
			state(
				'normal',
				style({
					border: '2px solid transparent',
				})
			),
			state(
				'error',
				style({
					border: '2px solid red',
				})
			),
			transition('normal <=> error', animate('300ms')),
		]),
		trigger('borderSuccessAnimation', [
			state(
				'normal',
				style({
					border: '2px solid transparent',
				})
			),
			state(
				'success',
				style({
					border: '2px solid green',
				})
			),
			transition('normal <=> success', animate('500ms')),
		]),
	],
})
export class CardComponent {
	@Input({ required: true }) card!: Card;
	@Output() selected = new EventEmitter<CardComponent>();

	isFaceDown: boolean = true;
	borderState = 'normal';

	public hide() {
		this.isFaceDown = true;
	}

	public reveal() {
		if (this.isFaceDown) {
			this.isFaceDown = false;
			this.selected.emit(this);
		}
	}

	public animateSuccess() {
		this.borderState = 'success';
		setTimeout(() => (this.borderState = 'normal'), 500);
	}
	public animateError() {
		this.borderState = 'error';
		setTimeout(() => (this.borderState = 'normal'), 500);
	}
}
