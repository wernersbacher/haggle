import { RuleResult } from './rules-types';
import { Player } from './player';

export interface CalcResult {
  player: Player;
  ruleResults: RuleResult[];
  points: number;
  usedRules: string[];
}
