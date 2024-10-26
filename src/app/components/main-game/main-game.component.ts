import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Component, ViewChild } from '@angular/core';
import { PlayerInputComponent } from '../player-input/player-input.component';
import { GameRulesComponent } from '../game-rules/game-rules.component';
import { CardInputComponent } from '../card-input/card-input.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PlayerResultsComponent } from '../player-results/player-results.component';

/* TODOS:
 * keine doppelten namen?
 * restart game -> invalidate -> dont reset names? -> reset current game
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
    PlayerResultsComponent,
  ],
  template: `
    <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" #tabGroup>
      <mat-tab label="Start">
        <!-- start tab -->
        <mat-card appearance="outlined">
          <mat-card-content>
            <h3 *ngIf="!gameStarted">Type in the players names.</h3>
            <h3 *ngIf="gameStarted">They game is already in progress!</h3>
          </mat-card-content>
        </mat-card>

        <button
          mat-raised-button
          type="button"
          (click)="onAddPlayerClicked()"
          [disabled]="gameStarted"
        >
          Add
        </button>
        <button
          mat-raised-button
          (click)="onGameStartClicked()"
          [disabled]="!playerFormValid || gameStarted"
        >
          Start Game
        </button>

        <button
          mat-raised-button
          (click)="onRestartClicked()"
          [disabled]="!gameStarted"
        >
          Restart game
        </button>
        <app-player-input
          #playerInput
          *ngIf="!gameStarted"
          [players]="gameService.state.players"
          (isFormValid)="playerFormValid = $event"
        >
        </app-player-input>
      </mat-tab>
      <mat-tab label="Rules" [disabled]="!gameStarted">
        <!-- rules tab -->
        <mat-card appearance="outlined">
          <mat-card-content
            ><h3>
              Game Rules for the players - distribute them, keep them secret!
            </h3></mat-card-content
          >
        </mat-card>
        <button mat-raised-button (click)="navgiateToCardsTab()">
          Okay, now type in the players cards
        </button>
        <app-game-rules
          *ngIf="gameStarted"
          [players]="gameService.state.players"
        ></app-game-rules>
      </mat-tab>
      <mat-tab label="Cards" [disabled]="!gameStarted">
        <!-- cards tab -->
        <mat-card appearance="outlined">
          <mat-card-content
            ><h3>Type in every players' cards</h3></mat-card-content
          >
        </mat-card>
        <button mat-raised-button (click)="calculateResult()">
          Calculate Results!
        </button>
        <app-card-input
          *ngIf="gameStarted"
          [players]="gameService.state.players"
          (cardsChanged)="gameService.saveGameState()"
        ></app-card-input>
      </mat-tab>
      <mat-tab label="Results" [disabled]="!getGameFinished">
        <!-- results tab -->

        <button
          mat-raised-button
          (click)="showResultDetails = !showResultDetails"
        >
          Toggle detailed view
        </button>
        <app-player-results
          [calcResults]="gameService.state.results"
          [showResultDetails]="showResultDetails"
        ></app-player-results>
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
  public showResultDetails = false;

  get gameStarted() {
    return this.gameService.isGameStarted();
  }

  get getGameFinished() {
    return this.gameService.state.results.length > 0;
  }

  onAddPlayerClicked() {
    this.playerInput!.addPlayer();
  }

  onGameStartClicked() {
    this.playerInput!.setPlayers();
    this.gameService.startGame();
    this.gameService.saveGameState();
    this.tabGroup!.selectedIndex = TAB_INDEX_RULES;
  }

  onRestartClicked() {
    this.gameService.restartGame();
  }

  navgiateToCardsTab() {
    this.tabGroup!.selectedIndex = TAB_INDEX_CARDS;
  }

  calculateResult() {
    this.gameService.calculateResult();
    this.tabGroup!.selectedIndex = TAB_INDEX_RESULT;
    this.gameService.saveGameState();
  }
}
