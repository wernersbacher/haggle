import { findHighestNumbers } from '../helper/find-highest';
import { CardColors, PlayerCards } from '../models/player-cards';
import { Rule } from './../models/rule';
import { RuleResult } from './rules-types';

// calculated from ruleset
const BASIC_VALUES: CardColors = {
  red: 3,
  blue: 2,
  yellow: 1,
  orange: 4,
  white: 5,
};

export const RULES: Rule[] = [
  {
    shortname: 'rule1',
    description: 'Orange-Karten haben einen Basiswert von 4',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const value = cards.orange * BASIC_VALUES.orange;
      return { operation: 'add', value, event: 'points' };
    },
  },
  {
    shortname: 'rule2',
    description:
      'Weiße Karten haben die höchste Wertigkeit und sind gleichwertig mit einer roten und einer blauen Karte',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const value = cards.white * BASIC_VALUES.white;
      return { operation: 'add', value, event: 'points' };
    },
  },
  {
    shortname: 'rule3',
    description:
      'Blaue Karten haben doppelt so viel Wert wie gelbe und halb so viel wie orange',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const value = cards.blue * BASIC_VALUES.blue;
      return { operation: 'add', value, event: 'points' };
    },
  },
  {
    shortname: 'rule4',
    description:
      'Wenn mehr als 3 weiße Karten, verlieren alle weißen Karten ihren Wert',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      if (cards.white > 3) {
        const value = -cards.white * BASIC_VALUES.white;
        return { operation: 'add', value, event: 'points' };
      }
      return { operation: 'add', value: 0, event: 'points' };
    },
  },
  {
    shortname: 'rule5',
    description:
      'Ein Spieler kann nur so viele Orange-Karten zählen, wie er blaue hat',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      if (cards.orange > cards.blue) {
        const value = -(cards.orange - cards.blue) * BASIC_VALUES.orange;
        return { operation: 'add', value, event: 'points' };
      }
      return { operation: 'add', value: 0, event: 'points' };
    },
  },
  {
    shortname: 'rule6_rule7',
    description:
      'Wenn ein Spieler 5 oder mehr blaue Karten hat, werden anderen Spielern 10 Punkte abgezogen, außer er hat min. 3 rote Karten',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      let totalPointsDeducted = 0;
      if (cards.red < 3) {
        otherCards.forEach((player) => {
          if (player.blue >= 5) {
            totalPointsDeducted -= 10;
          }
        });
      }

      // Return the result with the total points deducted
      return { operation: 'add', value: totalPointsDeducted, event: 'points' };
    },
  },
  {
    shortname: 'rule8',
    description:
      'Der Spieler mit den meisten gelben Karten bekommt Bonuspunkte, außer jemand andere hat allein mehr gelbe Karten',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const otherCardsYellow = otherCards.map((p) => p.yellow);

      const { highest, highestUnique } = findHighestNumbers(otherCardsYellow);

      if (cards.yellow === highest || cards.yellow === 0) {
        // failed - other one has same amount of cards as you
        return { operation: 'add', value: 0, event: 'points' };
      }
      if (cards.yellow > highest) {
        // first case - just highest number of yellow
        const value = cards.yellow ** 2;
        return { operation: 'add', value, event: 'bonus' };
      } else if (cards.yellow > highestUnique && highestUnique !== highest) {
        // second case - second highest number of yellow and first numbers crash
        // when the highest number is also the higehst unique number, someone else got the bonus
        const value = cards.yellow ** 2;
        return { operation: 'add', value, event: 'bonus' };
      }
      return { operation: 'add', value: 0, event: 'points' };
    },
  },
  {
    shortname: 'rule9',
    description:
      'Wenn ein Spieler 7 oder mehr Karten derselben Farbe hat, wird er disqualifiziert',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
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
    },
  },
  {
    shortname: 'rule10',
    description: 'Jedes Set von 5 verschiedenen Farben gibt 10 Punkte',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const value =
        Math.min(
          cards.red,
          cards.blue,
          cards.yellow,
          cards.orange,
          cards.white
        ) * 10;
      return { operation: 'add', value, event: 'points' };
    },
  },
  {
    shortname: 'rule11',
    description: '"Pyramide" (4-3-2-1 Karten) verdoppelt den Wert',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const colors = [
        cards.red,
        cards.blue,
        cards.yellow,
        cards.orange,
        cards.white,
      ];
      colors.sort((a, b) => b - a);
      if (colors.toString() === [4, 3, 2, 1, 0].toString()) {
        return { operation: 'multiply', value: 2, event: 'points' };
      }
      return { operation: 'multiply', value: 1, event: 'points' };
    },
  },
  {
    shortname: 'rule12',
    description:
      'Der Spieler mit den meisten roten Karten verdoppelt ihren Wert',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const otherCardsRed = otherCards.map((p) => p.red);

      const { highest, highestUnique } = findHighestNumbers(otherCardsRed);

      if (cards.red === highest || cards.red === 0) {
        // failed - other one has same amount of cards as you
        return { operation: 'multiply', value: 1, event: 'bonus' };
      }
      if (cards.red > highest) {
        // first case - just highest number of red
        return { operation: 'multiply', value: 2, event: 'bonus' };
      }
      return { operation: 'multiply', value: 1, event: 'bonus' };
    },
  },
  {
    shortname: 'rule13',
    description: 'Jeweils zwei gelbe Karten verdoppeln eine weiße Karte',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      if (cards.yellow >= 2) {
        const value = Math.floor(cards.yellow / 2) * BASIC_VALUES.white;
        return { operation: 'add', value, event: 'points' };
      }
      return { operation: 'add', value: 0, event: 'points' };
    },
  },
  {
    shortname: 'rule14',
    description:
      'Jeweils 3 blaue Karten vervierfachen den Wert einer orangefarbenen Karte',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      if (cards.blue >= 3) {
        const value = Math.floor(cards.blue / 3) * BASIC_VALUES.orange * 4;
        return { operation: 'add', value, event: 'points' };
      }
      return { operation: 'add', value: 0, event: 'points' };
    },
  },
  {
    shortname: 'rule15',
    description: 'Es dürfen nicht mehr als 13 Karten gewertet werden',
    evaluate: (cards: PlayerCards, otherCards: PlayerCards[]): RuleResult => {
      const totalCards =
        cards.red + cards.blue + cards.yellow + cards.orange + cards.white;
      if (totalCards > 13) {
        // TODO: Remove card randomly
        return { operation: 'add', value: -(totalCards - 13), event: 'points' };
      }
      return { operation: 'add', value: 0, event: 'points' };
    },
  },
];

function calculateTotalPoints(
  player: PlayerCards,
  otherPlayers: PlayerCards[]
): number {
  let points = 0;

  // todo: make sure otherplayers has no the own player inside

  // loopen durch alle Regeln und methoden anwenden

  for (let rule of RULES) {
    let result: RuleResult = rule.evaluate(player, otherPlayers);

    if (result.event === 'points') {
      if (result.operation === 'add') {
        points += result.value;
      } else if (result.operation === 'multiply') {
        points *= result.value;
      }
    } else if (result.event === 'bonus') {
      points += result.value;
    } else if (result.event === 'disqualified') {
      return -Infinity;
    }
  }

  return points;
}
