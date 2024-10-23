import { CardColors, PlayerCards } from '../models/player-cards';
import { evaluateAllRules, calculateTotalPoints2 } from './rules';

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

describe('RULES INTEGRATED', () => {
  let playerCards: PlayerCards;
  let otherPlayers: PlayerCards[];

  beforeEach(() => {
    playerCards = new PlayerCards();
    otherPlayers = [];
  });

  // test EVERYTHING
  describe('no cards', () => {
    it('should have 0 points', () => {
      // Arrange

      // Act
      const results = evaluateAllRules(playerCards, otherPlayers);
      const points = calculateTotalPoints2(results);

      // Assert
      expect(points).toBe(0);
    });
  });

  describe('orange cards', () => {
    describe('one orange and one blue (rule 1, rule 3, rule 5)', () => {
      // Arrange
      playerCards = getPlayerCards({
        orange: 1,
        blue: 1,
        white: 0,
        red: 0,
        yellow: 0,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints2(results);

        // Assert
        expect(points).toBe(4 + 2);
      });
    });
  });

  describe('white cards', () => {
    describe('one white card (rule 2)', () => {
      // Arrange
      playerCards = getPlayerCards({
        orange: 0,
        blue: 0,
        white: 1,
        red: 0,
        yellow: 0,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints2(results);

        // Assert
        expect(points).toBe(5);
      });
    });
    describe('4 white cards (rule 2, rule 4)', () => {
      // Arrange
      playerCards = getPlayerCards({
        orange: 0,
        blue: 0,
        white: 4,
        red: 0,
        yellow: 0,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints2(results);

        // Assert
        expect(points).toBe(0);
      });
    });

    describe('2 white cards and 2 yellows (rule 2, rule 13, rule 8)', () => {
      // Arrange
      playerCards = getPlayerCards({
        orange: 0,
        blue: 0,
        white: 2,
        red: 0,
        yellow: 2,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints2(results);

        // Assert
        // points:
        // - 2 white cards * 5 points = 10
        // - 2 yellow cards double the value of one white = 5
        // - 2 yellow cards * 3 points = 6
        // - most yellow cards: square number = 4
        // == 25
        expect(points).toBe(25);
      });
    });
  });

  describe('example 1', () => {
    // Arrange
    playerCards = getPlayerCards({
      orange: 4,
      blue: 3,
      white: 2,
      red: 1,
      yellow: 0,
    });
    otherPlayers = [
      getPlayerCards({ red: 3, blue: 1, white: 2, orange: 0, yellow: 0 }),
      getPlayerCards({ red: 0, blue: 5, white: 0, orange: 2, yellow: 3 }),
    ];

    // Act
    const results = evaluateAllRules(playerCards, otherPlayers);

    it('should have the right amount of total points', () => {
      // Act
      const points = calculateTotalPoints2(results);

      // Assert
      expect(points).toBe(65);
    });
  });
});
