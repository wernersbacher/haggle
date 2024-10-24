import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService = new GameService();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
