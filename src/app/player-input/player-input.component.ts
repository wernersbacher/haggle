import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Rule } from '../models/rule';

@Component({
  selector: 'app-player-input',
  template: `
    <div>
      <h2>Set Player Count</h2>
      <input type="number" [(ngModel)]="playerCount" />
      <button (click)="startGame()">Start Game</button>
    </div>

    <app-game-rules *ngIf="rules.length > 0" [rules]="rules"></app-game-rules>
  `
})
export class PlayerInputComponent {
  playerCount: number = 0;
  rules: Rule[][] | undefined = undefined;

  constructor(private gameService: GameService) { }

  startGame() {
    this.rules = this.gameService.generateRules(this.playerCount);
  }
}
