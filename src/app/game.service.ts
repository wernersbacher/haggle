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
  rand: Rand = new Rand();
  first_rand_numer = this.rand.next();
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
    this.rand = new Rand(this.seed);
    this.first_rand_numer = this.rand.next();
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
    // rules remaining after giving each player the minimum amount of rules
    const remainingRules = totalRules % minRulesPerPlayer;

    let shuffledRules = [...rules]; // Kopie der Regeln erstellen
    shuffleArray(shuffledRules); // Regeln zufällig mischen

    // every player should get one popped ruled
    // then afterwards the remaining rules are distributed randomly
    for (let player of this.players) {
      for (let i = 0; i < minRulesPerPlayer; i++) {
        const rule = shuffledRules.pop()!;
        player.rules.push(rule);
      }
    }

    // Schritt 2: Verteile die restlichen Regeln (jedoch ohne doppelte Zuweisung)
    for (let i = 0; i < remainingRules; i++) {
      let ruleToDistribute = shuffledRules.pop();

      // Verteile diese Regel an einen Spieler, der sie noch nicht hat
      const eligiblePlayers = this.players.filter(
        (player) => !player.rules.includes(ruleToDistribute!)
      );
      if (eligiblePlayers.length > 0) {
        let randomPlayer =
          eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
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
