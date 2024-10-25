import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Player } from '../models/player';
import { MatCardModule } from '@angular/material/card';
import { CalcResult } from './calc-result';
import { RULE_RESULT_DESC_ORIGINAL } from '../game-rules/rule-desc';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-player-results',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatDividerModule],
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
    `
      .rule-unused {
        color: grey;
      }

      .rule-used {
        color: green;
      }
    `,
  ],
  template: `
    <div class="rules-card-container">
      <div *ngFor="let result of calcResults; let i = index">
        <mat-card class="rule-card">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title
                >Result {{ i + 1 }} ({{ result.player.name }})</mat-card-title
              >
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            Points: {{ result.points }}
            <div>
              Red: <span>{{ result.player.cards.red }}</span> Yellow:
              <span>{{ result.player.cards.yellow }}</span> Blue:
              <span>{{ result.player.cards.blue }}</span> Orange:
              <span>{{ result.player.cards.orange }}</span> White:
              <span>{{ result.player.cards.white }}</span>
            </div>

            <div *ngFor="let desc of rule_result_desc | keyvalue">
              <div
                [ngClass]="
                  result.usedRules.has(desc.key) ? 'rule-used' : 'rule-unused'
                "
              >
                {{ desc.value.description }}
              </div>
              <mat-divider></mat-divider>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
})

// todo: list resultelemtns if points != 0 oder rules
export class PlayerResultsComponent {
  @Input() calcResults: CalcResult[] = [];

  public usedRules: string[] = [];

  rule_result_desc = RULE_RESULT_DESC_ORIGINAL;
}
