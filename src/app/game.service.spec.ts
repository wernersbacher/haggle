import { GameService } from './game.service';
import { Player } from './models/player';
import { Rule } from './models/rule';
import { PlayerCards } from './models/player-cards';

describe('GameService', () => {
  let service: GameService;

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(9); // 9 Regeln

      distributeRules(players, rules);

      // Jeder Spieler sollte gleich viele Regeln haben
      expect(players[0].rules.length).toBe(3);
      expect(players[1].rules.length).toBe(3);
      expect(players[2].rules.length).toBe(3);
    });

    it('should handle rule distribution when number of rules is not divisible by number of players', () => {
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(8); // 8 Regeln

      distributeRules(players, rules);

      // Da 8 Regeln nicht gleichmäßig auf 3 Spieler verteilt werden können, bekommen manche 2, manche 3 Regeln
      const ruleCounts = players.map((player) => player.rules.length);
      expect(ruleCounts).toContain(2); // Mindestens ein Spieler hat 2 Regeln
      expect(ruleCounts).toContain(3); // Mindestens ein Spieler hat 3 Regeln
    });

    it('should not assign the same rule to a player more than once', () => {
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(6); // 6 Regeln

      distributeRules(players, rules);

      // Sicherstellen, dass keine doppelten Regeln bei einem Spieler vorhanden sind
      players.forEach((player) => {
        const ruleNames = player.rules.map((rule) => rule.shortname);
        const uniqueRuleNames = new Set(ruleNames);
        expect(ruleNames.length).toBe(uniqueRuleNames.size); // Keine doppelten Regeln
      });
    });

    it('should distribute all rules to players', () => {
      const players = generateMockPlayers(['Alice', 'Bob', 'Charlie']);
      const rules = generateMockRules(9); // 9 Regeln

      distributeRules(players, rules);

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
