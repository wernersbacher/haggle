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
    const rand = new Rand(this.seed);
    const MINIMUM_RULES_PER_PLAYER = 2;
    const usedRules = new Set<Rule>();

    let minimumRulesAPlayerCurrentlyHas = this.getMinimumRulesPerPlayer();

    // Distribute initial rules
    rules.forEach((rule) => {
      minimumRulesAPlayerCurrentlyHas =
        this.distributeRuleToPlayerWithLeastRules(
          rule,
          usedRules,
          minimumRulesAPlayerCurrentlyHas
        );
    });

    // Ensure every player has at least the minimum number of rules
    while (
      minimumRulesAPlayerCurrentlyHas < MINIMUM_RULES_PER_PLAYER ||
      usedRules.size < rules.length
    ) {
      const ruleToDistribute = this.getRandomRule(rules, rand);
      minimumRulesAPlayerCurrentlyHas =
        this.distributeRuleToPlayerWithLeastRules(
          ruleToDistribute,
          usedRules,
          minimumRulesAPlayerCurrentlyHas
        );
    }

    // Balance rules among players
    this.balanceRulesAmongPlayers(rules);
  }

  private getMinimumRulesPerPlayer(): number {
    return Math.min(...this.players.map((player) => player.rules.length));
  }

  private distributeRuleToPlayerWithLeastRules(
    rule: Rule,
    usedRules: Set<Rule>,
    minimumRulesAPlayerCurrentlyHas: number
  ): number {
    const eligiblePlayers = this.players.filter(
      (player) =>
        player.rules.length === minimumRulesAPlayerCurrentlyHas &&
        !player.rules.includes(rule)
    );
    if (eligiblePlayers.length > 0) {
      eligiblePlayers[0].rules.push(rule);
      usedRules.add(rule);
    }
    return this.getMinimumRulesPerPlayer();
  }

  private getRandomRule(rules: Rule[], rand: Rand): Rule {
    const randIndex = Math.floor(rand.next() * rules.length);
    return rules[randIndex];
  }

  private balanceRulesAmongPlayers(rules: Rule[]): void {
    const rulesPerPlayer = this.players[0].rules.length;
    this.players.forEach((player) => {
      if (player.rules.length < rulesPerPlayer) {
        this.addMissingRulesToPlayer(player, rules);
      }
    });
  }

  private addMissingRulesToPlayer(player: Player, rules: Rule[]): void {
    const rand = new Rand(this.seed + player.name);
    while (player.rules.length < this.players[0].rules.length) {
      const rule = this.getRandomRule(rules, rand);
      if (!player.rules.includes(rule)) {
        player.rules.push(rule);
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
