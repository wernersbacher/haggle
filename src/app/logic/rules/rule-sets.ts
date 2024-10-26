import { Dictionary } from '../../helper/dictionary';
import { PlayerCards } from '../../models/player-cards';
import { GameRule } from '../../models/rule';
import { RuleResult } from '../../models/rules-types';

export interface RuleSet {
  evaluateAllRules(cards: PlayerCards, otherCards: PlayerCards[]): RuleResult[];
  calculateTotalPoints(ruleResults: RuleResult[]): number;
  rulesUsedExplanation: Dictionary<{ description: string }>;
  rulesHandedOut: GameRule[];
}

// TODO: add the current rule set
// make sure that the explanation rules are not accessed from outside
