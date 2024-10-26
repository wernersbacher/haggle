import { Dictionary } from '../../helper/dictionary';
import { PlayerCards } from '../../models/player-cards';
import { GameRule } from '../../models/rule';
import { RuleResult } from '../../models/rules-types';
import {
  RULESET_ORIGINAL_DE,
  RULESET_ORIGINAL_EN,
} from './ORIGINAL_EN/manifest';

export interface RuleSet {
  name: string;
  title: string;
  description: string;
  language: string;
  evaluateAllRules(cards: PlayerCards, otherCards: PlayerCards[]): RuleResult[];
  calculateTotalPoints(ruleResults: RuleResult[]): number;
  rulesUsedExplanation: Dictionary<{ description: string }>;
  rulesHandedOut: GameRule[];
}

export const RuleSetRegistry: Map<string, RuleSet> = new Map([
  [RULESET_ORIGINAL_EN.name, RULESET_ORIGINAL_EN],
  [RULESET_ORIGINAL_DE.name, RULESET_ORIGINAL_DE],
]);
