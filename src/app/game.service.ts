import { Injectable } from '@angular/core';
import { PlayerCards } from './models/player-cards';
import { Rule } from './models/rule';
import { Player } from './models/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  rules: Rule[] = [
    {
      description: 'Red cards are worth 5 points each',
      evaluate: (cards: PlayerCards) => cards.red * 5,
    },
    {
      description:
        'Blue cards are worth 2 points, but two blue cards are worth 6 points each',
      evaluate: (cards: PlayerCards) =>
        cards.blue >= 2 ? cards.blue * 6 : cards.blue * 2,
    },
    {
      description:
        'Green cards are worth 1 point each, but three green cards are worth 15 points total',
      evaluate: (cards: PlayerCards) =>
        cards.green >= 3 ? 15 : cards.green * 1,
    },
    {
      description:
        'Gold cards are worth 10 points, but each gold card deducts 3 points per other card',
      evaluate: (cards: PlayerCards) =>
        cards.gold * 10 -
        cards.gold * 3 * (this.countCards(cards) - cards.gold),
    },
    {
      description:
        'A set of 1 red, 1 blue, and 1 green card gives a 10 point bonus',
      evaluate: (cards: PlayerCards) =>
        Math.min(cards.red, cards.blue, cards.green) * 10,
    },
    {
      description:
        'Black cards are worth 0, unless you have at least 2, then they are worth 20 points total',
      evaluate: (cards: PlayerCards) => (cards.black >= 2 ? 20 : 0),
    },
  ];

  generatePlayer(name: string) {
    let rules = this.shuffleAndPickRules(3);
    let cards = new PlayerCards();
    let player = new Player(name, rules, cards);
    return player;
  }

  private shuffleAndPickRules(number: number) {
    // todo: depending on the number of rules and players
    let shuffled = this.rules.sort(() => 0.5 - Math.random());
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
