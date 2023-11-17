import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
	selector: 'app-game-landing',
	standalone: true,
	imports: [CommonModule, CardListComponent],
	templateUrl: './game-landing.component.html',
	styleUrl: './game-landing.component.scss',
})
export class GameLandingComponent {
	items: Card[] = [
		{ id: 'heart', icon: 'heart' },
		{ id: 'ghost', icon: 'ghost' },
		{ id: 'gamepad', icon: 'gamepad' },
		{ id: 'diamond', icon: 'diamond' },
		{ id: 'dragon', icon: 'dragon' },
		{ id: 'scroll', icon: 'scroll' },
		{ id: 'puzzle-piece', icon: 'puzzle-piece' },
		{ id: 'dice', icon: 'dice' },
		{ id: 'ring', icon: 'ring' },
		{ id: 'headset', icon: 'headset' },
		{ id: 'wand-sparkles', icon: 'wand-sparkles' },
		{ id: 'vr-cardboard', icon: 'vr-cardboard' },
	];
}