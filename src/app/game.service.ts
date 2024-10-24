import { Injectable } from '@angular/core';
import { PlayerCards } from './models/player-cards';
import { Player } from './models/player';
import { ORIGINAL_RULES } from './game-rules/rule-desc';
import { Rule } from './models/rule';
import { RuleDistributor } from './game-rules/rule-distribution';

@Injectable({ providedIn: 'root' })
export class GameService {
  seed: string = '';
  players: Player[] = [];

  startGame(playerNames: string[], seed: string = '') {
    // Generate or get seed for rules
    if (seed === '') {
      seed = this.generateRandomSeed();
    }
    this.setSeed(seed);

    // generate player objects
    this.players = [];
    for (let name of playerNames) {
      let player = this.generatePlayer(name);
      this.players.push(player);
    }

    this.distributeRules(ORIGINAL_RULES);
  }

  setSeed(seed: string) {
    this.seed = seed;
  }

  isGameStarted() {
    return this.players.length > 0;
  }

  generateRandomSeed() {
    return Math.random().toString(36).substring(2, 15);
  }

  generatePlayer(name: string) {
    let cards = new PlayerCards();
    let player = new Player(name, [], cards);
    return player;
  }

  distributeRules(rules: Rule[]): void {
    var distributor = new RuleDistributor(this.players, this.seed);
    distributor.distributeRules(rules);
  }

  evaluatePlayer(player: Player) {
    let points = 0;
    player.rules.forEach((rule) => {
      // todo
    });
    return points;
  }
}
