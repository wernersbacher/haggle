import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Player } from '../../models/player';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  styles: [
    `
      .rules-card-container {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        flex-wrap: wrap;
      }
      .rule-card {
        width: 400px;
        margin: 10px;
      }
    `,
  ],

  template: `
    <div class="rules-card-container">
      <div *ngFor="let player of players; let i = index">
        <mat-card class="rule-card">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title
                >Player {{ i + 1 }}'s Rules ({{ player.name }})</mat-card-title
              >
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <div *ngFor="let rule of player.rules">
              {{ rule.shortname }}:
              {{ rule.description }}
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
})
export class GameRulesComponent {
  @Input() players: Player[] = [];
}
