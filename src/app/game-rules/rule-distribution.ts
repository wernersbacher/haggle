import Rand from 'rand-seed';
import { Player } from '../models/player';
import { Rule } from '../models/rule';

const MIN_RULES_PER_PLAYER = 2;

export class RuleDistributor {
  constructor(private players: Player[], private seed: string) {
    this.players = players;
    this.seed = seed;
  }

  distributeRules(rules: Rule[], seed: string): void {
    const rand = new Rand(seed);
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
}
