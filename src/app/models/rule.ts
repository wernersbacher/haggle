import { PlayerCards } from './player-cards';

export interface Rule {
  description: string;
  evaluate(cards: PlayerCards): number;
}
