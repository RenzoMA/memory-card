import { Card } from '../models/card.model';

export function duplicateAndRamdomize(cards: Card[]) {
	return cards
		.flatMap(card => {
			const color = generatePastelColor();
			return [
				{ ...card, id: card.id + '_1', color },
				{ ...card, id: card.id + '_2', color },
			];
		})
		.sort(() => Math.random() - 0.5);
}

function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePastelColor(): string {
	// Adjusting the range to make pastel colors 10% darker
	// Using the range 115 to 255 for each color component
	let r = getRandomInt(20, 120);
	let g = getRandomInt(20, 80);
	let b = getRandomInt(20, 120);

	// Convert to hexadecimal format
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
		.toString(16)
		.padStart(2, '0')}`;
}
