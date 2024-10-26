import { Player } from '../../../models/player';
import { PlayerCards } from '../../../models/player-cards';
import { Rule } from '../../../models/rule';
import { EqualRuleDistributor, RuleDistributor } from './rule-distribution';

describe('GameService', () => {
  let distributor: RuleDistributor;

  // Mock-Setup für die its
  function generateMockPlayers(playerNames: string[]): Player[] {
    return playerNames.map((name) => new Player(name, [], new PlayerCards()));
  }

  function generateMockRules(count: number): Rule[] {
    let rules: Rule[] = [];
    for (let i = 1; i <= count; i++) {
      rules.push({ shortname: `R${i}`, description: `Rule ${i}` });
    }
    return rules;
  }

  describe('distributeRules', () => {
    it('should distribute the correct number of rules to players', () => {
      // Arrange
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(9);
      distributor = new EqualRuleDistributor(players, rules, 'seed');

      // Act
      distributor.distributeRules();

      // Assert
      expect(players[0].rules.length).toBe(3);
      expect(players[1].rules.length).toBe(3);
      expect(players[2].rules.length).toBe(3);
    });

    it('should give any player minimum amount of rules', () => {
      // Arrange
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(3);
      distributor = new EqualRuleDistributor(players, rules, 'seed');

      // Act
      distributor.distributeRules();

      // Assert
      expect(players[0].rules.length).toBe(2);
      expect(players[1].rules.length).toBe(2);
      expect(players[2].rules.length).toBe(2);
    });

    it('should handle rule distribution when number of rules is not divisible by number of players', () => {
      // Arrange
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(8);
      distributor = new EqualRuleDistributor(players, rules, 'seed');

      // Act
      distributor.distributeRules();

      // Assert
      expect(players[0].rules.length).toBe(3);
      expect(players[1].rules.length).toBe(3);
      expect(players[2].rules.length).toBe(3);
    });

    it('should not assign the same rule to a player more than once', () => {
      // Arrange
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(6);
      distributor = new EqualRuleDistributor(players, rules, 'seed');

      // Act
      distributor.distributeRules();

      // Assert
      // Sicherstellen, dass keine doppelten Regeln bei einem Spieler vorhanden sind
      players.forEach((player) => {
        const ruleNames = player.rules.map((rule) => rule.shortname);
        const uniqueRuleNames = new Set(ruleNames);
        expect(ruleNames.length).toBe(uniqueRuleNames.size); // Keine doppelten Regeln
      });
    });

    it('should distribute all rules to players', () => {
      // Arrange
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(9);
      distributor = new EqualRuleDistributor(players, rules, 'seed');

      // Act
      distributor.distributeRules();

      // Assert
      // Sicherstellen, dass alle Regeln verteilt wurden
      const allPlayerRules = players.flatMap((player) => player.rules);
      const ruleNames = allPlayerRules.map((rule) => rule.shortname);
      expect(ruleNames.length).toBe(9); // Alle 9 Regeln sollten verteilt sein

      // Sicherstellen, dass jede Regel nur einmal insgesamt vorkommt
      const uniqueRuleNames = new Set(ruleNames);
      expect(ruleNames.length).toBe(uniqueRuleNames.size); // Keine doppelten Regeln insgesamt
    });
  });
});
