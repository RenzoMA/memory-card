import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { Card } from './models/card.model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, CardListComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	items: Card[] = [
		{ id: 'test1', picture: 'testPicture' },
		{ id: 'test2', picture: 'testPicture' },
		{ id: 'test3', picture: 'testPicture' },
		{ id: 'test4', picture: 'testPicture' },
	];
}
