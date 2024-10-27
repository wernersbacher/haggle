import { GameService } from './game.service';
import { StateService } from './state-service';

describe('GameService', () => {
  let stateService: StateService;
  let service: GameService;

  beforeEach(() => {
    stateService = new StateService();
    service = new GameService(stateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
