import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Rule } from '../models/rule';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameRulesComponent } from '../game-rules/game-rules.component';

/*
TODO:
  * generieren mit seed -> selbe regeln ziehen
*/

@Component({
  selector: 'app-player-input',
  standalone: true,
  imports: [CommonModule, FormsModule, GameRulesComponent],
  template: `
    <div>
      <h2>Set Player Count</h2>
      <input min="3" type="number" [(ngModel)]="playerCount" />
      <button (click)="startGame()">Start Game</button>
    </div>

    <div>
      <h2>Game Rules for Player</h2>
      <ul>
        <li *ngFor="let rule of rules">{{ rule.description }}</li>
      </ul>
    </div>
  `,
})
export class PlayerInputComponent {
  playerCount: number = 0;
  rules: Rule[][] | undefined = undefined;

  constructor(private gameService: GameService) {}

  startGame() {
    this.rules = this.gameService.generateRules(this.playerCount);
  }
}
