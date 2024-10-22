type RuleOperation = 'add' | 'multiply';

type RuleEvent = 'disqualified' | 'bonus' | 'protection' | 'points';

export interface RuleResult {
  operation: RuleOperation;
  event: RuleEvent;
  value: number;
}
