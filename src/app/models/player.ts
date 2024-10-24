import { PlayerCards } from './player-cards';
import { Rule } from './rule';

export class Player {
  name: string;
  rules: Rule[];
  cards: PlayerCards;

  constructor(
    name: string,
    rules: Rule[] = [],
    cards: PlayerCards = new PlayerCards()
  ) {
    this.name = name;
    this.rules = rules;
    this.cards = cards;
  }
}
