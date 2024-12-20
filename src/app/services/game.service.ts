import { RuleSet } from './../logic/rules/rule-sets';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { EqualRuleDistributor } from '../logic/rules/rule-distribution';
import { generateRandomSeed } from '../helper/seed';
import {
  calculateTotalPoints,
  evaluateAllRules,
} from '../logic/rules/ORIGINAL/rules';
import { CalcResult } from '../models/calc-result';
import { GameState } from '../models/game-state';
import { StateService } from './state-service';
import { PlayerCards } from '../models/player-cards';
import { RuleSetRegistry } from '../logic/rules/rule-sets';

function getDefaultState() {
  return {
    seed: '',
    ruleSetName: Array.from(RuleSetRegistry.values())[0].name,
    players: [],
    results: [],
  };
}

@Injectable({ providedIn: 'root' })
export class GameService {
  public state: GameState = getDefaultState();

  public currentRuleSet: RuleSet | undefined;

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

      return new Player(playerData.name, playerData.rules, cards);
    });
    this.state = state;

    this.currentRuleSet = RuleSetRegistry.get(this.state.ruleSetName);
  }

  saveGameState(): void {
    this.stateService.saveState(this.state);
  }

  restartGame() {
    this.state = {
      ...getDefaultState(),
      seed: this.state.seed,
      ruleSetName: this.state.ruleSetName,
    };
  }

  startGame(seed: string = '') {
    // Generate or get seed for rules
    if (seed === '') {
      seed = generateRandomSeed();
    }
    this.state.seed = seed;

    this.currentRuleSet = RuleSetRegistry.get(this.state.ruleSetName);

    // distribute the rules to the players
    var distributor = new EqualRuleDistributor(
      this.state.players,
      this.currentRuleSet!.rulesHandedOut,
      this.state.seed
    );
    distributor.distributeRules();
  }

  isGameStarted() {
    return this.state.players.length > 0;
  }

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
      let usedRules: string[] = [];
      ruleResults.forEach((ruleResult) => {
        ruleResult.ruleNames.forEach((ruleName) => {
          if (!usedRules.includes(ruleName)) {
            usedRules.push(ruleName);
          }
        });
      });

      results.push({ player: player, ruleResults, points: points, usedRules });
    });

    // sort results by points
    // sort them by amount of cards as second criteria
    results.sort((a, b) => {
      if (a.points === b.points) {
        return a.player.cards.total() - b.player.cards.total();
      }
      return b.points - a.points;
    });
    this.state.results = results;
  }

  resetResults() {
    this.state.results = [];
  }
}
