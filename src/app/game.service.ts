import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { ORIGINAL_RULES } from './game-rules/rule-desc';
import { EqualRuleDistributor } from './game-rules/rule-distribution';
import { generateRandomSeed } from './helper/seed';
import { calculateTotalPoints, evaluateAllRules } from './game-rules/rules';

@Injectable({ providedIn: 'root' })
export class GameService {
  seed: string = '';
  players: Player[] = [];

  startGame(playerNames: string[], seed: string = '') {
    // Generate or get seed for rules
    if (seed === '') {
      seed = generateRandomSeed();
    }
    this.seed = seed;

    // generate player objects
    this.players = [];
    for (let name of playerNames) {
      let player = new Player(name);
      this.players.push(player);
    }

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

  results: CalcResult[] = [];

  calculateResult() {
    let results: CalcResult[] = [];
    this.players.forEach((player) => {
      const playerCards = player.cards;
      const otherPlayers = this.players
        .filter((p) => p !== player)
        .map((p) => p.cards);
      const ruleResults = evaluateAllRules(playerCards, otherPlayers);
      const points = calculateTotalPoints(ruleResults);
      results.push({ player: player, points: points });
    });
    this.results = results;
  }
}
interface CalcResult {
  player: Player;
  points: number;
}
