import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { Card } from './models/card.model';
import {
	FaIconLibrary,
	FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, CardListComponent, FontAwesomeModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	iconLibrary = inject(FaIconLibrary);
	items: Card[] = [
		{ id: 'heart', icon: 'heart' },
		{ id: 'ghost', icon: 'ghost' },
		{ id: 'dragon', icon: 'dragon' },
		{ id: 'headset', icon: 'headset' },
		{ id: 'chess', icon: 'chess' },
		{ id: 'gamepad', icon: 'gamepad' },
		{ id: 'diamond', icon: 'diamond' },
		{ id: 'dice', icon: 'dice' },
		{ id: 'book-skull', icon: 'book-skull' },
	];

	constructor() {
		this.iconLibrary.addIconPacks(fas);
	}
}
