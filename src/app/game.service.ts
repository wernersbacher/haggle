import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { ORIGINAL_RULES } from './game-rules/rule-desc';
import { EqualRuleDistributor } from './game-rules/rule-distribution';
import { generateRandomSeed } from './helper/seed';
import { calculateTotalPoints, evaluateAllRules } from './game-rules/rules';
import { CalcResult } from './player-results/calc-result';
import { GameState } from './game-state';
import { StateService } from './services/state-service';
import { PlayerCards } from './models/player-cards';

// TODO:
// wie serialisiere ich die objekte automatsciH?
//esserializer

@Injectable({ providedIn: 'root' })
export class GameService {
  public state: GameState = { seed: '', players: [], results: [] };

  constructor(private stateService: StateService) {
    const state = this.stateService.loadState();
    if (!state) {
      return;
    }
    state.players = state.players.map((playerData: any) => {
      let cards = new PlayerCards();
      cards.blue = playerData.cards.blue;
      cards.orange = playerData.cards.orange;
      cards.red = playerData.cards.red;
      cards.yellow = playerData.cards.yellow;
      cards.white = playerData.cards.white;

      return new Player(playerData.name, playerData.rules, new PlayerCards());
    });
    this.state = state;
  }

  saveGameState(): void {
    this.stateService.saveState(this.state);
  }

  restartGame() {
    this.state.players = [];
    this.state.results = [];
  }

  startGame(seed: string = '') {
    // Generate or get seed for rules
    if (seed === '') {
      seed = generateRandomSeed();
    }
    this.state.seed = seed;

    // distribute the rules to the players
    var distributor = new EqualRuleDistributor(
      this.state.players,
      ORIGINAL_RULES,
      this.state.seed
    );
    distributor.distributeRules();
    this.saveGameState();
  }

  isGameStarted() {
    return this.state.players.length > 0;
  }

  // TODO: add interface and stuff

  calculateResult() {
    let results: CalcResult[] = [];
    this.state.players.forEach((player) => {
      const playerCards = player.cards;
      const otherPlayers = this.state.players
        .filter((p) => p !== player)
        .map((p) => p.cards);
      const ruleResults = evaluateAllRules(playerCards, otherPlayers);
      const points = calculateTotalPoints(ruleResults);
      // collect used rules
      let usedRules: Set<string> = new Set();
      ruleResults.forEach((ruleResult) => {
        ruleResult.ruleNames.forEach((ruleName) => usedRules.add(ruleName));
      });

      results.push({ player: player, ruleResults, points: points, usedRules });
    });

    // sort results by points
    results.sort((a, b) => b.points - a.points);
    this.state.results = results;
  }
}
