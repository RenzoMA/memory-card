import { Routes } from '@angular/router';
import { LandingComponent } from './home/components/landing/landing.component';

export const routes: Routes = [
	{
		path: 'instructions',
		loadComponent: () =>
			import('./instructions/components/instructions-landing/instructions-landing.component').then(
				mod => mod.InstructionsLandingComponent
			),
	},
	{
		path: 'play',
		loadComponent: () =>
			import('./game/components/game-landing/game-landing.component').then(mod => mod.GameLandingComponent),
	},
	{ path: '', pathMatch: 'full', component: LandingComponent },
];
