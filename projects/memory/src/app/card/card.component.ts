import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [CommonModule, FontAwesomeModule],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
})
export class CardComponent {
	@Input({ required: true }) card!: Card;
	@Output() selected = new EventEmitter<CardComponent>();

	isFaceDown: boolean = true;

	public hide() {
		this.isFaceDown = true;
	}
	public reveal() {
		this.isFaceDown = false;
		this.selected.emit(this);
	}
}
