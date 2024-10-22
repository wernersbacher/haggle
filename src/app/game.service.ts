import { Injectable } from '@angular/core';
import { PlayerCards } from './models/player-cards';
import { Player } from './models/player';
import { RULES } from './game-rules/rules';
import Rand from 'rand-seed';

@Injectable({ providedIn: 'root' })
export class GameService {
  seed: string = '';
  players: Player[] = [];

  startGame(playerNames: string[], seed: string = '') {
    // Generate or get seed for rules
    if (seed === '') {
      seed = this.generateRandomSeed();
    }
    this.seed = seed;

    // generate player objects
    this.players = [];
    for (let name of playerNames) {
      let player = this.generatePlayer(name);
      this.players.push(player);
    }
  }

  isGameStarted() {
    return this.players.length > 0;
  }

  generateRandomSeed() {
    return Math.random().toString(36).substring(2, 15);
  }

  generatePlayer(name: string) {
    let rules = this.shuffleAndPickRules(3);
    let cards = new PlayerCards();
    let player = new Player(name, rules, cards);
    return player;
  }

  private shuffleAndPickRules(number: number) {
    const rand = new Rand(this.seed);
    const first_number = rand.next();
    let shuffled = RULES.sort(() => 0.5 - first_number);
    return shuffled.slice(0, number);
  }

  evaluatePlayer(player: Player) {
    let points = 0;
    player.rules.forEach((rule) => {
      points += rule.evaluate(player.cards);
    });
    return points;
  }
}
