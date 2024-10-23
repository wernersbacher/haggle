type RuleOperation = 'add';

type RuleEvent = 'disqualified' | 'points';

export interface RuleResult {
  operation: RuleOperation;
  event: RuleEvent;
  value: number;
}
