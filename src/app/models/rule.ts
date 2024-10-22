import { PlayerCards } from './player-cards';

export interface Rule {
  shortname: string;
  description: string;
  evaluate(cards: PlayerCards, otherCards: PlayerCards[]): RuleResult;
}
