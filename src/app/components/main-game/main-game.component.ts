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
import { MatSelectModule } from '@angular/material/select';
import { RuleSetRegistry } from '../../logic/rules/rule-sets';

/* TODOS:
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
    MatSelectModule,
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
        <div>
          <button
            mat-raised-button
            type="button"
            color="secondary"
            (click)="onRemovePlayerClicked()"
            [disabled]="gameStarted"
          >
            Remove
          </button>
          <button
            mat-raised-button
            type="button"
            color="secondary"
            (click)="onAddPlayerClicked()"
            [disabled]="gameStarted"
          >
            Add
          </button>
          <button
            mat-raised-button
            *ngIf="!gameStarted"
            color="primary"
            (click)="onGameStartClicked()"
            [disabled]="!playerFormValid"
          >
            Start Game
          </button>

          <button
            mat-raised-button
            *ngIf="gameStarted"
            color="primary"
            (click)="onRestartClicked()"
            [disabled]="!gameStarted"
          >
            Restart game
          </button>
        </div>

        <mat-form-field *ngIf="!gameStarted">
          <mat-label>Ruleset</mat-label>
          <mat-select
            [value]="gameService.state.ruleSetName"
            (selectionChange)="gameService.state.ruleSetName = $event.value"
          >
            @for (ruleSet of ruleSets; track ruleSet) {
            <mat-option [value]="ruleSet.name">{{ ruleSet.title }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <app-player-input
          #playerInput
          [style.display]="!gameStarted ? '' : 'none'"
          [players]="gameService.state.players"
          [defaultNames]="defaultNames"
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
        <button
          mat-raised-button
          color="primary"
          (click)="navgiateToCardsTab()"
        >
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
        <button mat-raised-button color="primary" (click)="calculateResult()">
          Calculate Results!
        </button>
        <app-card-input
          *ngIf="gameStarted"
          [players]="gameService.state.players"
          (cardsChanged)="onCardsChanged()"
        ></app-card-input>
      </mat-tab>
      <mat-tab label="Results" [disabled]="!getGameFinished">
        <!-- results tab -->

        <mat-card appearance="outlined">
          <mat-card-content
            ><h3>
              Game has finished - toggle details if you like to get more infos!
            </h3></mat-card-content
          >
        </mat-card>
        <button
          mat-raised-button
          color="primary"
          (click)="showResultDetails = !showResultDetails"
        >
          Toggle detailed view
        </button>
        <app-player-results
          [calcResults]="gameService.state.results"
          [showResultDetails]="showResultDetails"
          [rule_set_explanations]="
            gameService.currentRuleSet?.rulesUsedExplanation
          "
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

  public defaultNames = ['Frank', 'Sabine', 'Johann', 'Michelle'];

  public ruleSets = Array.from(RuleSetRegistry.values()).map(
    (ruleSet) => ruleSet
  );

  get gameStarted() {
    return this.gameService.isGameStarted();
  }

  get getGameFinished() {
    return this.gameService.state.results.length > 0;
  }

  onAddPlayerClicked() {
    this.playerInput!.addPlayer();
  }

  onRemovePlayerClicked() {
    this.playerInput!.removePlayer();
  }

  onGameStartClicked() {
    this.playerInput!.setPlayers();
    this.gameService.startGame();
    this.gameService.saveGameState();
    this.tabGroup!.selectedIndex = TAB_INDEX_RULES;
  }

  onRestartClicked() {
    let preset = this.defaultNames;
    if (this.gameService.state.players.length > 0) {
      preset = this.gameService.state.players.map((p) => p.name);
    }
    this.gameService.restartGame();
    this.playerInput!.preloadLoadPlayers(preset);
  }

  navgiateToCardsTab() {
    this.tabGroup!.selectedIndex = TAB_INDEX_CARDS;
  }

  onCardsChanged() {
    this.gameService.resetResults();
    this.gameService.saveGameState();
  }

  calculateResult() {
    this.gameService.calculateResult();
    this.tabGroup!.selectedIndex = TAB_INDEX_RESULT;
    this.gameService.saveGameState();
  }
}
