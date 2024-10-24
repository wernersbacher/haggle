import { Component, Input } from '@angular/core';
import { Player } from '../models/player';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  styles: [
    `
      .rule-card {
        width: 400px;
        margin: 10px;
      }

      .rules-card-container {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        flex-wrap: wrap;
      }
    `,
    `
      .card-input {
        width: 100px;
      }
    `,
  ],
  template: `
    <div class="rules-card-container">
      <mat-card class="rule-card" *ngFor="let player of players; let i = index">
        <mat-card-header>
          <mat-card-title-group>
            <mat-card-title
              >Player {{ i + 1 }}'s Cards ({{ player.name }})</mat-card-title
            >
          </mat-card-title-group>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field class="card-input" appearance="fill">
            <mat-label>Red</mat-label>
            <input matInput type="number" [(ngModel)]="player.cards.red" />
          </mat-form-field>

          <mat-form-field class="card-input" appearance="fill">
            <mat-label>yellow</mat-label>
            <input matInput type="number" [(ngModel)]="player.cards.yellow" />
          </mat-form-field>

          <mat-form-field class="card-input" appearance="fill">
            <mat-label>blue</mat-label>
            <input matInput type="number" [(ngModel)]="player.cards.blue" />
          </mat-form-field>

          <mat-form-field class="card-input" appearance="fill">
            <mat-label>orange</mat-label>
            <input matInput type="number" [(ngModel)]="player.cards.orange" />
          </mat-form-field>

          <mat-form-field class="card-input" appearance="fill">
            <mat-label>white</mat-label>
            <input matInput type="number" [(ngModel)]="player.cards.white" />
          </mat-form-field>

          <p>Total: {{ player.cards.total() }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ResultsComponent {
  @Input() players: Player[] = [];
}
