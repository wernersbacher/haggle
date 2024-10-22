type RuleOperation = 'add' | 'multiply';

type RuleEvent = 'disqualified' | 'bonus' | 'protection' | 'points';

type RuleResult = {
  operation: RuleOperation;
  event: RuleEvent;
  value: number;
};
