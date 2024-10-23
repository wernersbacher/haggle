import { findHighestNumbers } from '../helper/find-highest';
import { PlayerCards } from '../models/player-cards';
import { RuleResult } from './rules-types';

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
  let value = cards.red * BASIC_VALUES.red;

  const otherCardsRed = otherCards.map((p) => p.red);
  const { highest, highestUnique } = findHighestNumbers(otherCardsRed);

  if (cards.red === highest || cards.red === 0) {
    // failed - other one has same amount of cards as you
    value = 0;
  } else if (cards.red > highest) {
    // first case - just highest number of red, double points
    value *= 2;
    // desc: rule 12 applied
  }
  return { operation: 'add', value, event: 'points' };
};

const evaluateBlue = (cards: PlayerCards): RuleResult => {
  let value = cards.blue * BASIC_VALUES.blue;
  return { operation: 'add', value, event: 'points' };
};

const evaluateYellow = (
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult => {
  let value = cards.yellow * BASIC_VALUES.yellow;

  const otherCardsYellow = otherCards.map((p) => p.yellow);
  const { highest, highestUnique } = findHighestNumbers(otherCardsYellow);

  if (cards.yellow > highest) {
    // first case - just highest number of yellow
    value += cards.yellow ** 2;
    // desc: rule 8 applied
  } else if (cards.yellow > highestUnique && highestUnique !== highest) {
    // second case - second highest number of yellow and first numbers crash
    // when the highest number is also the higehst unique number, someone else got the points
    value += cards.yellow ** 2;
    // desc: rule 8 applied
  }
  return { operation: 'add', value, event: 'points' };
};

const evaluateOrange = (cards: PlayerCards): RuleResult => {
  // desc: rule 5 applied
  const orangeCards = Math.min(cards.blue, cards.orange);

  // desc: rule 14 applied
  const numberOfQuadrupledCards = Math.min(
    Math.floor(cards.blue / 3),
    orangeCards
  );
  let value =
    numberOfQuadrupledCards * BASIC_VALUES.orange * 4 + // quadruple bonus cards
    (orangeCards - numberOfQuadrupledCards) * BASIC_VALUES.orange; // other one have base value

  return { operation: 'add', value, event: 'points' };
};

const evaluateWhite = (cards: PlayerCards): RuleResult => {
  // desc: rule 14 applied
  const numberOfDoubledCards = Math.min(
    Math.floor(cards.yellow / 2),
    cards.white
  );
  let value =
    numberOfDoubledCards * BASIC_VALUES.white * 2 + // double bonus cards
    (cards.white - numberOfDoubledCards) * BASIC_VALUES.white; // other one have base value

  // desc: rule 4 applied
  if (cards.white > 3) {
    value = 0;
  }
  return { operation: 'add', value, event: 'points' };
};

// Special evaluation functions

// Todo: others have 10 blues

const evaluateBlueCardAttack = (
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult => {
  let attacks = 0;
  let defends = Math.floor(cards.red / 3);

  otherCards.forEach((player) => {
    if (player.blue >= 5) {
      attacks += 1;
    }
  });

  // desc: rule 6 and rule 7 applied
  const attacksLeft = Math.max(0, attacks - defends);
  let totalPointsDeducted = attacksLeft * 10;

  return { operation: 'add', value: totalPointsDeducted, event: 'points' };
};

const evaluateSetOfFiveColors = (cards: PlayerCards): RuleResult => {
  const value =
    Math.min(cards.red, cards.blue, cards.yellow, cards.orange, cards.white) *
    10;
  // desc: rule 10 applied
  return { operation: 'add', value, event: 'points' };
};

const evaluatePyramide = (cards: PlayerCards): RuleResult => {
  // desc: rule 11 applied
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
  return { operation: 'multiply', value, event: 'points' };
};

const evaluateDisqualification = (cards: PlayerCards): RuleResult => {
  if (
    cards.red >= 7 ||
    cards.blue >= 7 ||
    cards.yellow >= 7 ||
    cards.orange >= 7 ||
    cards.white >= 7
  ) {
    return { operation: 'add', value: -Infinity, event: 'disqualified' };
  }
  return { operation: 'add', value: 0, event: 'points' };
};

// Main evaluation function
export function evaluateAllRules(
  cards: PlayerCards,
  otherCards: PlayerCards[]
): RuleResult[] {
  // rule 15 - has to be done at first
  // if player has more than 13 cards, remove excess at random
  cards.reduceRandomCards(cards.total() - 13);

  return [
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

export function calculateTotalPoints2(results: RuleResult[]): number {
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
