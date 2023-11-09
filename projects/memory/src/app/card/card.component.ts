import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';

@Component({
	selector: 'app-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
})
export class CardComponent {
	@Input({ required: true }) card!: Card;
}
