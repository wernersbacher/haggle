import { RuleSet } from '../rule-sets';
import { RULE_RESULT_EXPLANATION_DE, RULE_HANDEDOUT_DE } from './rule-desc-de';
import { RULE_HANDEDOUT_EN, RULE_RESULT_EXPLANATION_EN } from './rule-desc-en';
import { calculateTotalPoints, evaluateAllRules } from './rules';

export const RULESET_ORIGINAL_EN: RuleSet = {
  name: 'ORIGINAL_EN',
  title: 'Original (EN)',
  description: 'The original rules in English',
  language: 'en',
  evaluateAllRules: evaluateAllRules,
  calculateTotalPoints: calculateTotalPoints,
  rulesUsedExplanation: RULE_RESULT_EXPLANATION_EN,
  rulesHandedOut: RULE_HANDEDOUT_EN,
};

export const RULESET_ORIGINAL_DE: RuleSet = {
  name: 'ORIGINAL_DE',
  title: 'Original (DE)',
  description: 'The original rules in German',
  language: 'de',
  evaluateAllRules: evaluateAllRules,
  calculateTotalPoints: calculateTotalPoints,
  rulesUsedExplanation: RULE_RESULT_EXPLANATION_DE,
  rulesHandedOut: RULE_HANDEDOUT_DE,
};
