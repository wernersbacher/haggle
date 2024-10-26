import { Player } from './player';
import { CalcResult } from './calc-result';

export interface GameState {
  seed: string;
  ruleSetName: string;
  players: Player[];
  results: CalcResult[];
}
