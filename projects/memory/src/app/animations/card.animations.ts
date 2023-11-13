import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';

export enum CardAnimation {
	Error = 'animationError',
	Success = 'animationSuccess',
	Flip = 'animationFlip',
}

export enum CardBorderState {
	Default = 'default',
	Error = 'error',
	Success = 'success',
}

export enum CardFlipState {
	Front = 'front',
	Back = 'back',
}

export const cardFlipStateMap = {
	[CardFlipState.Front]: CardFlipState.Back,
	[CardFlipState.Back]: CardFlipState.Front,
};

export const cardErrorAnimation = trigger(CardAnimation.Error, [
	state(
		`${CardBorderState.Default}`,
		style({ backgroundColor: 'rgba(255, 255, 255)' })
	),
	state(
		`${CardBorderState.Error}`,
		style({ backgroundColor: 'rgba(255, 100, 100, 0.6)' })
	),
	transition(
		`${CardBorderState.Default} <=> ${CardBorderState.Error}`,
		animate(200)
	),
]);

export const cardSuccessAnimation = trigger(CardAnimation.Success, [
	state(
		`${CardBorderState.Default}`,
		style({ backgroundColor: 'rgba(255, 255, 255)' })
	),
	state(
		`${CardBorderState.Success}`,
		style({ backgroundColor: 'rgba(100, 255, 100, 1)' })
	),
	transition(
		`${CardBorderState.Default} <=> ${CardBorderState.Success}`,
		animate(200)
	),
]);

export const cardFlipAnimation = trigger(CardAnimation.Flip, [
	state(
		CardFlipState.Front,
		style({
			transform: 'rotateY(0)',
		})
	),
	state(
		CardFlipState.Back,
		style({
			transform: 'rotateY(180deg)',
		})
	),
	transition(
		`${CardFlipState.Front} <=> ${CardFlipState.Back}`,
		animate('200ms ease-out')
	),
]);
