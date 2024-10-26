import { Player } from './player';
import { CalcResult } from './calc-result';

export interface GameState {
  seed: string;
  players: Player[];
  results: CalcResult[];
}
