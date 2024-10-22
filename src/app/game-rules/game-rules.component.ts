import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerCards } from '../models/player-cards';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngFor="let playerRules of rules; let i = index">
      <h3>Player {{ i + 1 }}'s Rules</h3>
      <ul>
        <li *ngFor="let rule of playerRules">{{ rule.description }}</li>
      </ul>
    </div>
  `,
})
export class GameRulesComponent {
  @Input() rules: any[] = [];
  totalPoints: number = 0;

  constructor(private gameService: GameService) {}
}
