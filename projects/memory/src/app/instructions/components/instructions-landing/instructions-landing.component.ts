import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-instructions-landing',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './instructions-landing.component.html',
	styleUrl: './instructions-landing.component.scss',
})
export class InstructionsLandingComponent {}
