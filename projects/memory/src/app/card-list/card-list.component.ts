import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models/card.model';
import { CardComponent } from '../card/card.component';

@Component({
	selector: 'app-card-list',
	standalone: true,
	imports: [CommonModule, CardComponent],
	templateUrl: './card-list.component.html',
	styleUrl: './card-list.component.scss',
})
export class CardListComponent {
	@Input({ required: true }) cards: Card[] = [];
}
