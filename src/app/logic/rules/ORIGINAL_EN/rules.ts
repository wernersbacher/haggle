import { findHighestNumbers } from '../../../helper/find-highest';
import { PlayerCards } from '../../../models/player-cards';
import { RuleResult } from '../../../models/rules-types';

// Define the basic values for each color
const BASIC_VALUES = {
  red: 3,
  blue: 2,
  yellow: 1,
  orange: 4,
  white: 5,
};

// Color-specific evaluation functions
const evaluateRed = (
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult => {
  let ruleNames = [];
  let value = cards.red * BASIC_VALUES.red;
  if (value > 0) {
    ruleNames.push('2red_base');
  }
  const otherCardsRed = otherCards.map((p) => p.red);
  const { highest } = findHighestNumbers(otherCardsRed);

  if (cards.red === highest || cards.red === 0) {
    // failed - other one has same amount of cards as you
    value = 0;
  } else if (cards.red > highest) {
    // first case - just highest number of red, double points
    value *= 2;
    ruleNames.push('rule12');
  }
  return {
    operation: 'add',
    value,
    event: 'points',
    ruleNames,
  };
};

const evaluateBlue = (cards: PlayerCards): RuleResult => {
  let ruleNames = [];
  let value = cards.blue * BASIC_VALUES.blue;
  if (value > 0) {
    ruleNames.push('3blue_base');
  }
  return {
    operation: 'add',
    value,
    event: 'points',
    ruleNames,
  };
};

const evaluateYellow = (
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult => {
  let ruleNames = [];
  let value = cards.yellow * BASIC_VALUES.yellow;
  if (value > 0) {
    ruleNames.push('5yellow_base');
  }
  const otherCardsYellow = otherCards.map((p) => p.yellow);
  const { highest, highestUnique } = findHighestNumbers(otherCardsYellow);

  if (cards.yellow > highest) {
    // first case - just highest number of yellow
    value += cards.yellow ** 2;
    ruleNames.push('rule8');
  } else if (cards.yellow > highestUnique && highestUnique !== highest) {
    // second case - second highest number of yellow and first numbers crash
    // when the highest number is also the higehst unique number, someone else got the points
    value += cards.yellow ** 2;
    ruleNames.push('rule8');
  }
  return { operation: 'add', value, event: 'points', ruleNames };
};

const evaluateOrange = (cards: PlayerCards): RuleResult => {
  let ruleNames = [];
  const orangeCards = Math.min(cards.blue, cards.orange);
  if (cards.orange > cards.blue) {
    ruleNames.push('rule5');
  }

  const numberOfQuadrupledCards = Math.min(
    Math.floor(cards.blue / 3),
    orangeCards
  );
  let value =
    numberOfQuadrupledCards * BASIC_VALUES.orange * 4 + // quadruple bonus cards
    (orangeCards - numberOfQuadrupledCards) * BASIC_VALUES.orange; // other one have base value

  if (numberOfQuadrupledCards > 0) {
    ruleNames.push('rule14');
  }
  if (value > 0) {
    ruleNames.push('1orange_base');
  }
  return { operation: 'add', value, event: 'points', ruleNames };
};

const evaluateWhite = (cards: PlayerCards): RuleResult => {
  let ruleNames = [];

  const numberOfDoubledCards = Math.min(
    Math.floor(cards.yellow / 2),
    cards.white
  );
  let value =
    numberOfDoubledCards * BASIC_VALUES.white * 2 + // double bonus cards
    (cards.white - numberOfDoubledCards) * BASIC_VALUES.white; // other one have base value
  if (numberOfDoubledCards > 0) {
    ruleNames.push('rule13');
  }

  if (cards.white > 3) {
    value = 0;
    ruleNames = ['rule4'];
  }
  if (value > 0) {
    ruleNames.push('4white_base');
  }
  return { operation: 'add', value, event: 'points', ruleNames };
};

const evaluateBlueCardAttack = (
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult => {
  let ruleNames = [];
  let attacks = 0;
  let defends = Math.floor(cards.red / 3);

  otherCards.forEach((player) => {
    if (player.blue >= 5) {
      attacks += 1;
    }
  });

  const attacksLeft = Math.max(0, attacks - defends);
  let totalPointsDeducted = attacksLeft * 10;

  if (attacks - defends > 0) {
    ruleNames.push('rule6_damage');
  }

  if (defends > 0 && attacks > 0) {
    ruleNames.push('rule7');
  }

  if (cards.blue >= 5) {
    ruleNames.push('rule6_attack');
  }

  return {
    operation: 'add',
    value: -totalPointsDeducted,
    event: 'points',
    ruleNames,
  };
};

const evaluateSetOfFiveColors = (cards: PlayerCards): RuleResult => {
  let ruleNames = [];
  const value =
    Math.min(cards.red, cards.blue, cards.yellow, cards.orange, cards.white) *
    10;
  if (value > 0) {
    ruleNames.push('rule10');
  }
  return { operation: 'add', value, event: 'points', ruleNames };
};

const evaluatePyramide = (cards: PlayerCards): RuleResult => {
  let ruleNames = [];
  let value = 1;
  const colors = [
    cards.red,
    cards.blue,
    cards.yellow,
    cards.orange,
    cards.white,
  ];
  colors.sort((a, b) => b - a);
  if (colors.toString() === [4, 3, 2, 1, 0].toString()) {
    value = 2;
  }
  if (value > 1) {
    ruleNames.push('rule11');
  }
  return { operation: 'multiply', value, event: 'points', ruleNames };
};

const evaluateDisqualification = (cards: PlayerCards): RuleResult => {
  if (
    cards.red >= 7 ||
    cards.blue >= 7 ||
    cards.yellow >= 7 ||
    cards.orange >= 7 ||
    cards.white >= 7
  ) {
    return {
      operation: 'add',
      value: -Infinity,
      event: 'disqualified',
      ruleNames: ['rule9'],
    };
  }
  return { operation: 'add', value: 0, event: 'points', ruleNames: [] };
};

// Main evaluation function
export function evaluateAllRules(
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult[] {
  let results: RuleResult[] = [];
  // rule 15 - has to be done at first
  // if player has more than 13 cards, remove excess at random
  const diffCards = cards.total() - 13;
  if (diffCards > 0) {
    cards.reduceRandomCards(cards.total() - 13);
    results.push({
      operation: 'add',
      value: 0,
      event: 'points',
      ruleNames: ['rule15'],
    });
  }

  return [
    ...results,
    evaluateDisqualification(cards),
    evaluateRed(cards, otherCards),
    evaluateBlue(cards),
    evaluateYellow(cards, otherCards),
    evaluateOrange(cards),
    evaluateWhite(cards),
    evaluateBlueCardAttack(cards, otherCards),
    evaluateSetOfFiveColors(cards),
    evaluatePyramide(cards),
  ];
}

export function calculateTotalPoints(results: RuleResult[]): number {
  let points = 0;
  let addOperations: RuleResult[] = [];
  let multiplyOperations: RuleResult[] = [];

  for (let ruleResult of results) {
    if (ruleResult.event === 'points') {
      if (ruleResult.operation === 'add') {
        addOperations.push(ruleResult);
      } else if (ruleResult.operation === 'multiply') {
        multiplyOperations.push(ruleResult);
      }
    } else if (ruleResult.event === 'disqualified') {
      return -Infinity;
    }
  }

  // Apply all add operations
  for (let result of addOperations) {
    points += result.value;
  }

  // Apply all multiply operations
  for (let result of multiplyOperations) {
    points *= result.value;
  }

  return points;
}
