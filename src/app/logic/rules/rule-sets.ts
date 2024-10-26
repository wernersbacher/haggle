import { Dictionary } from '../../helper/dictionary';
import { PlayerCards } from '../../models/player-cards';
import { RuleResult } from '../../models/rules-types';

export interface RuleSet {
  evaluateAllRules(cards: PlayerCards, otherCards: PlayerCards[]): RuleResult[];
  calculateTotalPoints(ruleResults: RuleResult[]): number;
  rulesUsedExplanation: Dictionary<{ description: string }>;
}
