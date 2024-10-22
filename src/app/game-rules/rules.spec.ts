import { RULES } from './rules';
import { CardColors, PlayerCards } from '../models/player-cards';
import { Player } from '../models/player';
import { RuleResult } from './rules-types';
import { Rule } from '../models/rule';

function getPlayerCards(cards: CardColors): PlayerCards {
  // setup function to run before each test
  let playerCards = new PlayerCards();
  playerCards.red = cards.red;
  playerCards.yellow = cards.yellow;
  playerCards.blue = cards.blue;
  playerCards.orange = cards.orange;
  playerCards.white = cards.white;
  return playerCards;
}

describe('RULES', () => {
  let rule: Rule;
  let playerCards: PlayerCards;
  let otherPlayers: PlayerCards[];

  describe('rule1 orange cards worth', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule1')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0); // no cards -> no points
    });

    describe('orange cards', () => {
      it('should have correct points', () => {
        // Arrange
        playerCards.orange = 2;

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');
        expect(result.event).toBe('points');
        expect(result.value).toBe(8);
      });
    });
  });

  describe('rule2 white cards worth', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule2')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0); // no cards -> no points
    });

    describe('white cards', () => {
      it('should have correct points', () => {
        // Arrange
        playerCards.white = 3;

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');
        expect(result.event).toBe('points');
        expect(result.value).toBe(15);
      });
    });
  });

  describe('rule3 blue cards worth', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule3')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0); // no cards -> no points
    });

    describe('blue cards', () => {
      it('should have correct points', () => {
        // Arrange
        playerCards.blue = 4;

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');
        expect(result.event).toBe('points');
        expect(result.value).toBe(8);
      });
    });
  });

  describe('rule4 >3 white cards', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule4')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0); // no cards -> no points
    });
    [0, 1, 2, 3].forEach((white) => {
      it(white + ' cards should not affect points', () => {
        // Arrange
        playerCards.white = white;

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');
        expect(result.event).toBe('points');
        expect(result.value).toBe(0);
      });
    });
    it('4 white cards should substract their values', () => {
      // Arrange
      playerCards.white = 4;

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(-20);
    });
  });

  describe('rule5 orange <= blue', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule5')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0); // no cards -> no points
    });
    [
      { orange: 0, blue: 2 },
      { orange: 1, blue: 2 },
      { orange: 2, blue: 2 },
    ].forEach((args) => {
      it(`should not substract orange if less than blues ${args.orange} <= ${args.blue}`, () => {
        // Arrange
        playerCards.orange = args.orange;
        playerCards.blue = args.blue;

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');
        expect(result.event).toBe('points');
        expect(result.value).toBe(0);
      });
    });

    it('should substract orange points if more than blues exist', () => {
      // Arrange
      playerCards.orange = 4;
      playerCards.blue = 3;

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(-4);
    });
  });

  describe('rule6 and rule7, other player has 5 blue cards', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule6_rule7')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0); // no cards -> no points
    });

    it('losing ten points if other player has 5 blue cards', () => {
      // Arrange
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 5, orange: 0, white: 0 })
      );

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(-10);
    });

    it('losing 30 points if 3 other player have 5 blue cards', () => {
      // Arrange
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 5, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 8, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 3, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 6, orange: 0, white: 0 })
      );

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(-30);
    });

    it('losing no points when having 3 red cards and other player has 5 blue cards', () => {
      // Arrange
      playerCards.red = 3;
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 5, orange: 0, white: 0 })
      );

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0);
    });

    it('losing no points when having 3 red cards and several other players have 5 blue cards', () => {
      // Arrange
      playerCards.red = 4;
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 5, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 8, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 3, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 6, orange: 0, white: 0 })
      );

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(0);
    });
  });

  xit('should evaluate rule13 correctly', () => {
    const rule = RULES.find((r) => r.shortname === 'rule13');
    if (rule) {
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(2); // 4 yellow cards -> 2 pairs -> 2 * (1 white * 2) = 2
    }
  });

  xit('should evaluate rule14 correctly', () => {
    const rule = RULES.find((r) => r.shortname === 'rule14');
    if (rule) {
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(4); // 3 blue cards -> 1 pair -> 1 * (1 orange * 4) = 4
    }
  });

  xit('should evaluate rule15 correctly', () => {
    const rule = RULES.find((r) => r.shortname === 'rule15');
    if (rule) {
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.event).toBe('points');
      expect(result.value).toBe(-1); // total cards = 11, no penalty
    }
  });
});
