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
      .result-card-container {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        flex-wrap: wrap;
      }
      .result-card {
        width: 400px;
        margin: 10px;
      }
      .result-card-1 {
        background-color: gold;
      }
      .result-card-2 {
        background-color: silver;
      }
      .result-card-3 {
        background-color: peru;
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
    <div class="result-card-container">
      <div *ngFor="let result of calcResults; let i = index">
        <mat-card class="result-card result-card-{{ i + 1 }}">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title
                >Position {{ i + 1 }} ({{ result.player.name }})</mat-card-title
              >
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            Points: <b>{{ result.points }}</b>
            <div>
              Red: <span>{{ result.player.cards.red }}</span
              >, Yellow: <span>{{ result.player.cards.yellow }}</span
              >, Blue: <span>{{ result.player.cards.blue }}</span
              >, Orange: <span>{{ result.player.cards.orange }}</span
              >, White:
              <span>{{ result.player.cards.white }}</span>
            </div>
            <ng-container *ngIf="showResultDetails">
              <div *ngFor="let desc of rule_result_desc | keyvalue">
                <div
                  [ngClass]="
                    result.usedRules.includes(desc.key)
                      ? 'rule-used'
                      : 'rule-unused'
                  "
                >
                  {{ desc.value.description }}
                </div>
                <mat-divider></mat-divider>
              </div>
            </ng-container>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
})

// todo: list resultelemtns if points != 0 oder rules
export class PlayerResultsComponent {
  @Input() calcResults: CalcResult[] = [];
  @Input() showResultDetails = false;

  public usedRules: string[] = [];

  rule_result_desc = RULE_RESULT_DESC_ORIGINAL;
}
