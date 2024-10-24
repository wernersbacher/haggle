import { CardColors, PlayerCards } from '../models/player-cards';
import {
  evaluateAllRules,
  calculateTotalPoints2 as calculateTotalPoints,
} from './rules';

function getPlayerCardsFull(cards: CardColors): PlayerCards {
  // setup function to run before each test
  let playerCards = new PlayerCards();
  playerCards.red = cards.red;
  playerCards.yellow = cards.yellow;
  playerCards.blue = cards.blue;
  playerCards.orange = cards.orange;
  playerCards.white = cards.white;
  return playerCards;
}

function getPlayerCards({
  red = 0,
  yellow = 0,
  blue = 0,
  orange = 0,
  white = 0,
}): PlayerCards {
  let playerCards = new PlayerCards();
  playerCards.red = red;
  playerCards.yellow = yellow;
  playerCards.blue = blue;
  playerCards.orange = orange;
  playerCards.white = white;
  return playerCards;
}

describe('RULES INTEGRATED', () => {
  let playerCards: PlayerCards;
  let otherPlayers: PlayerCards[];

  beforeEach(() => {
    playerCards = new PlayerCards();
    otherPlayers = [];
  });

  // todo: remove useless sub it element

  describe('no cards', () => {
    it('should have 0 points', () => {
      // Arrange

      // Act
      const results = evaluateAllRules(playerCards, otherPlayers);
      const points = calculateTotalPoints(results);

      // Assert
      expect(points).toBe(0);
    });
  });

  describe('orange cards', () => {
    describe('1 orange and 1 blue (rule 1, rule 3, rule 5)', () => {
      // Arrange
      playerCards = getPlayerCardsFull({
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
        const points = calculateTotalPoints(results);

        // Assert
        expect(points).toBe(4 + 2);
      });
    });

    describe('2 orange cards and 6 blues (rule 14)', () => {
      // Arrange
      playerCards = getPlayerCardsFull({
        orange: 2,
        blue: 6,
        white: 0,
        red: 0,
        yellow: 0,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 2 orange cards * 4 points = 8 (not capped by blues)
        // -- 6 blue cards * 2 points = 12
        // -- 2x 3-blue-cards -> 2 orange cards with x3 extra = 24
        // ==> 44

        expect(points).toBe(44);
      });
    });
  });

  describe('white cards', () => {
    describe('one white card (rule 2)', () => {
      // Arrange
      playerCards = getPlayerCardsFull({
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
        const points = calculateTotalPoints(results);

        // Assert
        expect(points).toBe(5);
      });
    });
    describe('4 white cards (rule 2, rule 4)', () => {
      // Arrange
      playerCards = getPlayerCardsFull({
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
        const points = calculateTotalPoints(results);

        // Assert
        expect(points).toBe(0);
      });
    });
    describe('2 white cards and 2 yellows (rule 2, rule 13, rule 8)', () => {
      // Arrange
      playerCards = getPlayerCardsFull({
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
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // - 2 white cards * 5 points = 10
        // - 2 yellow cards double the value of one white = 5
        // - 2 yellow cards * 1 points = 2
        // - most yellow cards: square number = 4
        // == 21
        expect(points).toBe(21);
      });
    });
  });

  describe('red cards', () => {
    describe('3 red cards as max cards (rule 12)', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 3,
      });
      otherPlayers = [getPlayerCards({ red: 2 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 3 red cards * 3 points = 9
        // -- max red cards, x2 = +9
        // --> 18
        expect(points).toBe(18);
      });
    });
    describe('4 red cards as NON max cards (rule 12)', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 3,
      });
      otherPlayers = [getPlayerCards({ red: 4 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 3 red cards * 3 points = 9
        // --> 18
        expect(points).toBe(9);
      });
    });
  });

  describe('yellow cards', () => {
    describe('2 yellow cards, not max yellow winner', () => {
      // Arrange
      playerCards = getPlayerCards({
        yellow: 3,
      });
      otherPlayers = [getPlayerCards({ yellow: 4 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 3 yellow cards * 1 points = 3
        expect(points).toBe(3);
      });
    });
    describe('3 yellow cards, max winner (rule 12)', () => {
      // Arrange
      playerCards = getPlayerCards({
        yellow: 3,
      });
      otherPlayers = [getPlayerCards({ yellow: 2 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 3 yellow cards * 1 points = 3
        // --- max winner, 3^2 = +9
        // --> 12
        expect(points).toBe(12);
      });
    });
    describe('3 yellow cards, equal max (rule 12)', () => {
      // Arrange
      playerCards = getPlayerCards({
        yellow: 3,
      });
      otherPlayers = [getPlayerCards({ yellow: 3 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 3 yellow cards * 1 points = 3
        // --- max equal, no points
        // --> 3
        expect(points).toBe(3);
      });
    });
    describe('3 yellow cards, 2nd max winner(rule 12)', () => {
      // Arrange
      playerCards = getPlayerCards({
        yellow: 2,
      });
      otherPlayers = [
        getPlayerCards({ yellow: 3 }),
        getPlayerCards({ yellow: 3 }),
      ];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 2 yellow cards * 1 points = 2
        // --- max winner, 2^2 = +4
        // --> 6
        expect(points).toBe(6);
      });
    });

    // todo: special functions like attack and defend
  });

  describe('blue cards', () => {
    describe('3 blue cards', () => {
      // Arrange
      playerCards = getPlayerCards({
        blue: 3,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 3 blue cards * 2 points = 6
        expect(points).toBe(6);
      });
    });
    describe('other one have 5 blues, no own red', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 0,
      });
      otherPlayers = [getPlayerCards({ blue: 5 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- attack from other player with 5 blues = -10
        expect(points).toBe(-10);
      });
    });
    describe('other one have 5 blues blues, no own red', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 0,
      });
      otherPlayers = [getPlayerCards({ blue: 6 }), getPlayerCards({ blue: 7 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- attack from other player with 5 blues x2 = -20
        expect(points).toBe(-20);
      });
    });
    describe('other one have 5 blues, 3 reds', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 3,
      });
      otherPlayers = [getPlayerCards({ blue: 5 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- attack defended
        // -- 3 red * 3 pt = 9
        // -- max reds, x2 = 9
        // --> 15
        expect(points).toBe(18);
      });
    });
    describe('other one have 5 blues, 3 reds', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 3,
      });
      otherPlayers = [getPlayerCards({ blue: 5 }), getPlayerCards({ blue: 6 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- attack defended once = -10
        // -- 3 red * 3 pt = 9
        // -- max reds, x2 = 9
        // --> 15
        expect(points).toBe(8);
      });
    });
  });

  describe('pyramide', () => {
    describe('first example', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 4,
        blue: 3,
        white: 2,
        orange: 1,
      });
      otherPlayers = [];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 4 red cards * 3 pts = 12
        // -- most red cards, x2 = 12
        // -- 3 blue cards * 2 pts = 6
        // -- 2 white cards * 5 pts = 10
        // -- 1 orange card * 4 pts = 4
        // -- 3 blue quadruple one red = 12
        // -- pyramide bonus EVERYTHINT x2
        // 56*2 = 112
        expect(points).toBe(112);
      });
    });
  });

  describe('set of five', () => {
    describe('first example', () => {
      // Arrange
      playerCards = getPlayerCards({
        red: 4,
        blue: 3,
        white: 2,
        orange: 1,
        yellow: 1,
      });
      otherPlayers = [getPlayerCards({ yellow: 4 })];

      const results = evaluateAllRules(playerCards, otherPlayers);
      it('should get right amount of total points', () => {
        // Act
        const points = calculateTotalPoints(results);

        // Assert
        // points:
        // -- 4 red cards * 3 pts = 12
        // -- most red cards, x2 = 12
        // -- 3 blue cards * 2 pts = 6
        // -- 2 white cards * 5 pts = 10
        // -- 1 orange card * 4 pts = 4
        // -- 3 blue quadruple one orange = 12
        // -- 1 yellow card * 1 pt = 1
        // -- set of 5 colors one = 10
        // --> 67
        expect(points).toBe(67);
      });
    });
  });
});

// todo: dont calculate other people cards if disqualified
