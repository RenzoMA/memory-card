import { Card } from '../models/card.model';

export function duplicateAndRamdomize(cards: Card[]) {
	return cards
		.flatMap(card => [
			{ ...card, id: card.id + '_1' },
			{ ...card, id: card.id + '_2' },
		])
		.sort(() => Math.random() - 0.5);
}
