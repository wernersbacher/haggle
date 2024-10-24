import { Injectable } from '@angular/core';
import { PlayerCards } from './models/player-cards';
import { Player } from './models/player';
import Rand from 'rand-seed';
import { ORIGINAL_RULES } from './game-rules/rule-desc';
import { Rule } from './models/rule';

const MIN_RULES_PER_PLAYER = 2;

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

  private distributeRules(rules: Rule[]): void {
    const totalPlayers = this.players.length;
    const totalRules = rules.length;
    const minRulesPerPlayer = Math.min(
      Math.floor(totalRules / totalPlayers),
      MIN_RULES_PER_PLAYER
    );

    let shuffledRules = [...rules]; // Kopie der Regeln erstellen
    shuffleArray(shuffledRules); // Regeln zufällig mischen

    // every player should the minimum amount of rules
    var restarts = 0;
    var r = 0;
    for (let player of this.players) {
      for (let i = 0; i < minRulesPerPlayer; i++) {
        const rule = shuffledRules[r];
        player.rules.push(rule);

        // loop over rules, start from beginning if end is reached
        r += 1;
        if (r >= totalRules) {
          r = 0;
          restarts += 1;
        }
      }
    }

    // if some rules where not used, use them here
    if (restarts > 0) {
      // all rules were used, no need to distribute more
      return;
    }

    // loop over remaining rules and distribute them
    for (r; r < totalRules; r++) {
      let ruleToDistribute = shuffledRules[r];

      const eligiblePlayers = this.players.filter(
        (player) => !player.rules.includes(ruleToDistribute!)
      );
      if (eligiblePlayers.length > 0) {
        var rand: Rand = new Rand(this.seed + ruleToDistribute!.shortname);
        var randIndex = Math.floor(rand.next() * eligiblePlayers.length);
        let randomPlayer = eligiblePlayers[randIndex];
        randomPlayer.rules.push(ruleToDistribute!);
      }
    }
  }

  evaluatePlayer(player: Player) {
    let points = 0;
    player.rules.forEach((rule) => {
      // todo
    });
    return points;
  }
}
