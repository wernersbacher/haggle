import { Injectable } from '@angular/core';
import { PlayerCards } from './models/player-cards';
import { Player } from './models/player';
import Rand from 'rand-seed';
import { ORIGINAL_RULES } from './game-rules/rule-desc';
import { Rule } from './models/rule';
import { shuffleArray } from './helper/shuffle-array';

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

  distributeRules(rules: Rule[]): void {
    // todo: make code easier to understand
    var rand: Rand = new Rand(this.seed);

    let MINIMUM_RULES_PER_PLAYER = 2;

    let minimumRulesAPlayerCurrentlyHas = Math.min(
      ...this.players.map((p) => p.rules.length)
    );

    let usedRules = new Set();

    // give rules to the players
    for (let ruleToDistribute of rules) {
      // player with least rules will get it
      const eligiblePlayers = this.players.filter(
        (player) =>
          player.rules.length == minimumRulesAPlayerCurrentlyHas &&
          !player.rules.includes(ruleToDistribute)
      );
      // if a player with least rule number has the rule already, we failed
      if (eligiblePlayers.length > 0) {
        eligiblePlayers[0].rules.push(ruleToDistribute!);
        usedRules.add(ruleToDistribute);
      }
      minimumRulesAPlayerCurrentlyHas = Math.min(
        ...this.players.map((p) => p.rules.length)
      );
    }

    // give players rule until every player has the min amount of rules.
    while (
      minimumRulesAPlayerCurrentlyHas < MINIMUM_RULES_PER_PLAYER ||
      usedRules.size < rules.length
    ) {
      var randIndex: number = Math.floor(rand.next() * rules.length);
      let ruleToDistribute = rules[randIndex];

      // player with least rules will get it
      const eligiblePlayers = this.players.filter(
        (player) =>
          player.rules.length == minimumRulesAPlayerCurrentlyHas &&
          !player.rules.includes(ruleToDistribute)
      );
      // if a player with least rule number has the rule already, we failed
      if (eligiblePlayers.length > 0) {
        eligiblePlayers[0].rules.push(ruleToDistribute!);
        usedRules.add(ruleToDistribute);
      }
      minimumRulesAPlayerCurrentlyHas = Math.min(
        ...this.players.map((p) => p.rules.length)
      );
    }

    // make sure that every player has the same amount of rules

    // the first player always has the most rules
    var rulesPerPlayer = this.players[0].rules.length;

    for (let player of this.players) {
      if (player.rules.length === rulesPerPlayer) {
        continue; // player has enough rules, skip.
      }

      // add random rule the player doesnt have yet
      var rand: Rand = new Rand(this.seed + player.name);
      var randIndex = Math.floor(rand.next() * rules.length);
      while (player.rules.includes(rules[randIndex])) {
        randIndex = Math.floor(rand.next() * rules.length);
      }
      var rule = rules[randIndex];
      player.rules.push(rule);
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
