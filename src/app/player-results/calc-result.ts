import { RuleResult } from '../game-rules/rules-types';
import { Player } from '../models/player';

export interface CalcResult {
  player: Player;
  ruleResults: RuleResult[];
  points: number;
  usedRules: string[];
}
