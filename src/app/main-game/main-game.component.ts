import { CommonModule } from '@angular/common';
import { GameService } from './../game.service';
import { Component, ViewChild } from '@angular/core';
import { PlayerInputComponent } from '../player-input/player-input.component';
import { GameRulesComponent } from '../game-rules/game-rules.component';
import { CardInputComponent } from '../card-input/card-input.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

/* TODOS:
 * todos nach projekt
 * restart
 * design
 * keine doppelten namen?
 */

const TAB_INDEX_START = 0;
const TAB_INDEX_RULES = 1;
const TAB_INDEX_CARDS = 2;
const TAB_INDEX_RESULT = 3;
@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerInputComponent,
    GameRulesComponent,
    CardInputComponent,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
  ],
  template: `
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" #tabGroup>
      <mat-tab label="Start" [disabled]="gameStarted">
        <mat-card appearance="outlined">
          <mat-card-content
            ><h3>Type in the players names.</h3></mat-card-content
          >
        </mat-card>

        <button mat-raised-button type="button" (click)="onAddPlayerClicked()">
          Add
        </button>
        <button
          mat-raised-button
          (click)="onGameStartClicked()"
          [disabled]="!playerFormValid"
        >
          Start Game
        </button>
        <app-player-input
          #playerInput
          *ngIf="!gameStarted"
          [players]="gameService.players"
          (isFormValid)="playerFormValid = $event"
        >
        </app-player-input>
      </mat-tab>
      <mat-tab label="Rules" [disabled]="!gameStarted">
        <mat-card appearance="outlined">
          <mat-card-content
            ><h3>
              Game Rules for the players - distribute them, keep them secret!
            </h3></mat-card-content
          >
        </mat-card>
        <app-game-rules
          *ngIf="gameStarted"
          [players]="gameService.players"
        ></app-game-rules>
      </mat-tab>
      <mat-tab label="Cards" [disabled]="!gameStarted">
        <mat-card appearance="outlined">
          <mat-card-content
            ><h3>Type in every players' cards</h3></mat-card-content
          >
        </mat-card>
        <button mat-raised-button (click)="calculateResult()">
          Calculate Results
        </button>
        <app-card-input
          *ngIf="gameStarted"
          [players]="gameService.players"
        ></app-card-input>
      </mat-tab>
      <mat-tab label="Result" [disabled]="!getGameFinished">
        <div *ngIf="gameService.results">
          <h3>Results:</h3>
          <div *ngFor="let result of gameService.results">
            <p>{{ result.player.name }}: {{ result.points }}</p>
          </div>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './main-game.component.css',
})
export class MainGameComponent {
  constructor(public gameService: GameService) {}

  @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup | undefined;
  @ViewChild('playerInput', { static: false }) playerInput:
    | PlayerInputComponent
    | undefined;

  public playerFormValid = false;

  get gameStarted() {
    return this.gameService.isGameStarted();
  }

  get getGameFinished() {
    return this.gameService.results.length > 0;
  }

  onAddPlayerClicked() {
    this.playerInput!.addPlayer();
  }

  onGameStartClicked() {
    this.playerInput!.setPlayers();
    this.gameService.startGame();
    this.tabGroup!.selectedIndex = TAB_INDEX_RULES;
  }

  calculateResult() {
    this.gameService.calculateResult();
    this.tabGroup!.selectedIndex = TAB_INDEX_RESULT;
  }
}
