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

      expect(result.value).toBe(0);
    });
  });

  describe('rule8 most yellow', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule8')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0); // no cards -> no points
    });

    it('should give the bonus to the player with the most yellow cards', () => {
      playerCards.yellow = 5;

      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 3, blue: 0, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 2, blue: 0, orange: 0, white: 0 })
      );

      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.event).toBe('bonus');
      expect(result.value).toBe(25); // 5 yellow cards, bonus is 5^2 = 25
    });

    it('should NOT give the bonus to the player when same amount', () => {
      playerCards.yellow = 5;

      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 5, blue: 0, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 4, blue: 0, orange: 0, white: 0 })
      );

      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });

    it('should give the bonus to the player when others max is same', () => {
      playerCards.yellow = 3;

      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 5, blue: 0, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 5, blue: 0, orange: 0, white: 0 })
      );

      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.event).toBe('bonus');
      expect(result.value).toBe(9);
    });

    it('should NOT give the bonus to the player when others is higher', () => {
      playerCards.yellow = 3;

      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 5, blue: 0, orange: 0, white: 0 })
      );
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });
  });

  describe('rule9 disqualify when 7 cards of one color', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule9')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');

      expect(result.value).toBe(0); // no cards -> no points
    });

    it('should disqualify player when 7 cards of one color', () => {
      playerCards.red = 7;

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.event).toBe('disqualified');
      expect(result.value).toBe(-Infinity);
    });
  });

  describe('rule10 disqualify when 7 cards of one color', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule10')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');

      expect(result.value).toBe(0); // no cards -> no points
    });

    it('should get points for sets of five colors', () => {
      playerCards = getPlayerCards({
        red: 1,
        blue: 2,
        yellow: 3,
        orange: 1,
        white: 4,
      });

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.value).toBe(10);
    });
  });

  describe('rule11 double for pyramide', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule11')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });

    it('should double pyramids worth', () => {
      playerCards = getPlayerCards({
        red: 4,
        blue: 2,
        yellow: 3,
        orange: 1,
        white: 0,
      });

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      const pyramideValue =
        playerCards.red * 3 +
        playerCards.blue * 2 +
        playerCards.yellow +
        playerCards.orange * 4 +
        playerCards.white * 5;
      expect(result.operation).toBe('add');
      expect(result.value).toBe(pyramideValue);
    });
    it('should not multiply by 2 for unperfect pyramide', () => {
      playerCards = getPlayerCards({
        red: 4,
        blue: 2,
        yellow: 3,
        orange: 1,
        white: 1,
      });

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });
  });

  describe('rule12 unique most red doubles', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule12')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });

    it('should give the bonus to the player with the most red cards', () => {
      playerCards.red = 5;

      otherPlayers.push(
        getPlayerCards({ red: 3, yellow: 0, blue: 0, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 0, orange: 0, white: 0 })
      );

      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.value).toBe(15);
    });

    it('should NOT give the bonus to the player when same amount', () => {
      playerCards.red = 5;

      otherPlayers.push(
        getPlayerCards({ red: 5, yellow: 0, blue: 0, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 0, orange: 0, white: 0 })
      );

      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });

    it('should NOT give the bonus to the player when others is higher', () => {
      playerCards.red = 2;

      otherPlayers.push(
        getPlayerCards({ red: 4, yellow: 0, blue: 0, orange: 0, white: 0 })
      );
      otherPlayers.push(
        getPlayerCards({ red: 0, yellow: 0, blue: 0, orange: 0, white: 0 })
      );

      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);
      expect(result.operation).toBe('add');
      expect(result.value).toBe(0);
    });
  });

  describe('rule13 2 yellows double every white', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule13')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');

      expect(result.value).toBe(0); // no cards -> no points
    });
    [
      { yellow: 0, white: 2, points: 0 },
      { yellow: 1, white: 2, points: 0 },
      { yellow: 2, white: 2, points: 5 },
      { yellow: 5, white: 4, points: 10 },
      { yellow: 5, white: 1, points: 5 },
    ].forEach((args) => {
      it(`should double every white, ${args.yellow} yellow and ${args.white} whites`, () => {
        // Arrange
        playerCards = getPlayerCards({
          yellow: args.yellow,
          white: args.white,
          red: 0,
          blue: 0,
          orange: 0,
        });

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');

        expect(result.value).toBe(args.points);
      });
    });
  });

  describe('rule14 2 blues 4x oranges', () => {
    beforeEach(() => {
      rule = RULES.find((r) => r.shortname === 'rule14')!;
      playerCards = new PlayerCards();
      otherPlayers = [];
    });
    it('empty cards should have no points', () => {
      // Arrange

      // Act
      const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

      // Assert
      expect(result.operation).toBe('add');

      expect(result.value).toBe(0); // no cards -> no points
    });
    [
      { blue: 0, orange: 2, points: 0 },
      { blue: 1, orange: 2, points: 0 },
      { blue: 3, orange: 2, points: 12 },
      { blue: 7, orange: 5, points: 24 },
      { blue: 7, orange: 1, points: 12 },
    ].forEach((args) => {
      it(`should double every orange, ${args.blue} blue and ${args.orange} oranges`, () => {
        // Arrange
        playerCards = getPlayerCards({
          blue: args.blue,
          orange: args.orange,
          red: 0,
          yellow: 0,
          white: 0,
        });

        // Act
        const result: RuleResult = rule.evaluate(playerCards, otherPlayers);

        // Assert
        expect(result.operation).toBe('add');

        expect(result.value).toBe(args.points);
      });
    });
  });
});
