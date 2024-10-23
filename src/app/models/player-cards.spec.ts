import { PlayerCards } from './player-cards';

describe('PlayerCards', () => {
  let playerCards: PlayerCards;

  beforeEach(() => {
    playerCards = new PlayerCards();
  });

  it('should not reduce cards by 0', () => {
    playerCards.red = 1;
    playerCards.yellow = 1;
    playerCards.blue = 1;
    playerCards.orange = 1;
    playerCards.white = 1;

    const initialTotal = playerCards.total();
    playerCards.reduceRandomCards(0);
    const newTotal = playerCards.total();

    expect(newTotal).toBe(initialTotal);
  });

  it('should reduce a random card by 1', () => {
    playerCards.red = 1;
    playerCards.yellow = 1;
    playerCards.blue = 1;
    playerCards.orange = 1;
    playerCards.white = 1;

    const initialTotal = playerCards.total();
    playerCards.reduceRandomCards(1);
    const newTotal = playerCards.total();

    expect(newTotal).toBe(initialTotal - 1);
  });

  it('should not reduce any card if all are zero', () => {
    playerCards.red = 0;
    playerCards.yellow = 0;
    playerCards.blue = 0;
    playerCards.orange = 0;
    playerCards.white = 0;

    const initialTotal = playerCards.total();
    playerCards.reduceRandomCards(1);
    const newTotal = playerCards.total();

    expect(newTotal).toBe(initialTotal);
  });

  it('should reduce different cards randomly', () => {
    playerCards.red = 10;
    playerCards.yellow = 10;
    playerCards.blue = 10;
    playerCards.orange = 10;
    playerCards.white = 10;

    const reductions = { red: 0, yellow: 0, blue: 0, orange: 0, white: 0 };

    for (let i = 0; i < 100; i++) {
      playerCards.reduceRandomCards(1);
      reductions.red += playerCards.red < 10 ? 1 : 0;
      reductions.yellow += playerCards.yellow < 10 ? 1 : 0;
      reductions.blue += playerCards.blue < 10 ? 1 : 0;
      reductions.orange += playerCards.orange < 10 ? 1 : 0;
      reductions.white += playerCards.white < 10 ? 1 : 0;

      // Reset values for next iteration
      playerCards.red = 10;
      playerCards.yellow = 10;
      playerCards.blue = 10;
      playerCards.orange = 10;
      playerCards.white = 10;
    }

    // Check that at least two different cards were reduced
    const reducedCards = Object.values(reductions).filter((count) => count > 0);
    expect(reducedCards.length).toBeGreaterThan(2);
  });
});
