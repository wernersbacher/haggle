import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerCards } from '../models/player-cards';

@Component({
  selector: 'app-game-rules',
  template: `
    <div *ngFor="let playerRules of rules; let i = index">
      <h3>Player {{i + 1}}'s Rules</h3>
      <ul>
        <li *ngFor="let rule of playerRules">{{ rule.description }}</li>
      </ul>
    </div>

    <div>
      <h2>Player's Cards</h2>
      <label>Red: <input type="number" [(ngModel)]="cards.red" /></label>
      <label>Blue: <input type="number" [(ngModel)]="cards.blue" /></label>
      <label>Green: <input type="number" [(ngModel)]="cards.green" /></label>
      <label>Gold: <input type="number" [(ngModel)]="cards.gold" /></label>
      <label>Black: <input type="number" [(ngModel)]="cards.black" /></label>
      <button (click)="calculatePoints()">Calculate Points</button>

      <h3>Total Points: {{ totalPoints }}</h3>
    </div>
  `
})
export class GameRulesComponent {
  @Input() rules: any[] = [];
  cards = { red: 0, blue: 0, green: 0, gold: 0, black: 0 } as PlayerCards;
  totalPoints: number = 0;

  constructor(private gameService: GameService) { }

  calculatePoints() {
    this.totalPoints = this.gameService.evaluatePlayer(this.cards);
  }
}
