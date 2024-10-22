import { PlayerCards } from './player-cards';
import { Rule } from './rule';

export class Player {
  name: string;
  rules: Rule[];
  cards: PlayerCards;

  constructor(name: string, rules: Rule[], cards: PlayerCards) {
    this.name = name;
    this.rules = rules;
    this.cards = cards;
  }

  totalCards = () => {
    return (
      this.cards.red +
      this.cards.blue +
      this.cards.green +
      this.cards.gold +
      this.cards.black
    );
  };
}
