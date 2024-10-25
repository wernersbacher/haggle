import { Player } from './models/player';
import { CalcResult } from './player-results/calc-result';

export interface GameState {
  seed: string;
  players: Player[];
  results: CalcResult[];
}
