import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Player } from '../../models/player';
import { RuleSet } from '../../logic/rules/rule-sets';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatListModule],
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
      <div *ngFor="let player of players">
        <mat-card class="rule-card">
          <mat-card-header>
            <mat-card-title-group>
              <mat-card-title>{{ player.name }} Rules</mat-card-title>
            </mat-card-title-group>
          </mat-card-header>
          <mat-card-content>
            <div *ngFor="let rule of player.rules">
              {{ rule.shortname }}
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>

    <mat-card>
      <mat-card-header>
        <mat-card-title
          >Complete ruleset - {{ completeRuleList?.title }}</mat-card-title
        >
      </mat-card-header>
      <mat-card-content>
        <mat-list role="list">
          <mat-list-item
            role="listitem"
            *ngFor="let rule of completeRuleList?.rulesHandedOut"
          >
            <div matListItemLine>{{ rule.description }}</div>
            <div matListItemTitle>{{ rule.shortname }}</div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
})
export class GameRulesComponent {
  @Input() players: Player[] = [];
  @Input() completeRuleList: RuleSet | undefined;
}
