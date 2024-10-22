import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerCards } from '../models/player-cards';
import { Player } from '../models/player';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngFor="let player of players; let i = index">
      <h3>Player {{ i + 1 }}'s Rules ({{ player.name }})</h3>
      <ul>
        <li *ngFor="let rule of player.rules">{{ rule.description }}</li>
      </ul>
    </div>
  `,
})
export class GameRulesComponent {
  @Input() players: Player[] = [];
}
