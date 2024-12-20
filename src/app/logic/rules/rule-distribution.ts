import Rand from 'rand-seed';
import { Player } from '../../models/player';
import { GameRule } from '../../models/rule';

const MIN_RULES_PER_PLAYER = 2;

export interface RuleDistributor {
  distributeRules(): void;
}

export class EqualRuleDistributor implements RuleDistributor {
  constructor(
    private players: Player[],
    private rules: GameRule[],
    private seed: string
  ) {
    this.players = players;
    this.seed = seed;
    this.rules = rules;
  }

  distributeRules(): void {
    const rand = new Rand(this.seed);
    const usedRules = new Set<GameRule>();

    let minimumRulesAPlayerCurrentlyHas = this.getMinimumRulesPerPlayer();

    // Distribute initial rules
    this.rules.forEach((rule) => {
      minimumRulesAPlayerCurrentlyHas =
        this.distributeRuleToPlayerWithLeastRules(
          rule,
          usedRules,
          minimumRulesAPlayerCurrentlyHas
        );
    });

    // Ensure every player has at least the minimum number of rules
    while (
      minimumRulesAPlayerCurrentlyHas < MIN_RULES_PER_PLAYER ||
      usedRules.size < this.rules.length
    ) {
      const ruleToDistribute = this.getRandomRule(this.rules, rand);
      minimumRulesAPlayerCurrentlyHas =
        this.distributeRuleToPlayerWithLeastRules(
          ruleToDistribute,
          usedRules,
          minimumRulesAPlayerCurrentlyHas
        );
    }

    // Balance rules among players
    this.balanceRulesAmongPlayers(this.rules);
  }

  private getMinimumRulesPerPlayer(): number {
    return Math.min(...this.players.map((player) => player.rules.length));
  }

  private distributeRuleToPlayerWithLeastRules(
    rule: GameRule,
    usedRules: Set<GameRule>,
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

  private getRandomRule(rules: GameRule[], rand: Rand): GameRule {
    const randIndex = Math.floor(rand.next() * rules.length);
    return rules[randIndex];
  }

  private balanceRulesAmongPlayers(rules: GameRule[]): void {
    const rulesPerPlayer = this.players[0].rules.length;
    this.players.forEach((player) => {
      if (player.rules.length < rulesPerPlayer) {
        this.addMissingRulesToPlayer(player, rules);
      }
    });
  }

  private addMissingRulesToPlayer(player: Player, rules: GameRule[]): void {
    const rand = new Rand(this.seed + player.name);
    while (player.rules.length < this.players[0].rules.length) {
      const rule = this.getRandomRule(rules, rand);
      if (!player.rules.includes(rule)) {
        player.rules.push(rule);
      }
    }
  }
}
