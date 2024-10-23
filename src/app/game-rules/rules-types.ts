type RuleOperation = 'add' | 'multiply';

type RuleEvent = 'disqualified' | 'points';

export interface RuleResult {
  operation: RuleOperation;
  event: RuleEvent;
  value: number;
  // todo: add string description
}
