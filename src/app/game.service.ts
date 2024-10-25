import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { ORIGINAL_RULES } from './game-rules/rule-desc';
import { EqualRuleDistributor } from './game-rules/rule-distribution';
import { generateRandomSeed } from './helper/seed';
import { calculateTotalPoints, evaluateAllRules } from './game-rules/rules';
import { CalcResult } from './player-results/calc-result';

@Injectable({ providedIn: 'root' })
export class GameService {
  seed: string = '';
  players: Player[] = [];
  results: CalcResult[] = [];

  restartGame() {
    this.players = [];
    this.results = [];
  }

  startGame(seed: string = '') {
    // Generate or get seed for rules
    if (seed === '') {
      seed = generateRandomSeed();
    }
    this.seed = seed;

    // distribute the rules to the players
    var distributor = new EqualRuleDistributor(
      this.players,
      ORIGINAL_RULES,
      this.seed
    );
    distributor.distributeRules();
  }

  isGameStarted() {
    return this.players.length > 0;
  }

  // TODO: add interface and stuff

  calculateResult() {
    let results: CalcResult[] = [];
    this.players.forEach((player) => {
      const playerCards = player.cards;
      const otherPlayers = this.players
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
    this.results = results;
  }
}
