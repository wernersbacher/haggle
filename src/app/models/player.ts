import { PlayerCards } from './player-cards';
import { GameRule } from './rule';

export class Player {
  name: string;
  rules: GameRule[];
  cards: PlayerCards;

  constructor(
    name: string,
    rules: GameRule[] = [],
    cards: PlayerCards = new PlayerCards()
  ) {
    this.name = name;
    this.rules = rules;
    this.cards = cards;
  }
  reset() {
    this.rules = [];
    this.cards = new PlayerCards();
  }
}
