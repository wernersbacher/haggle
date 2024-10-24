import { CommonModule } from '@angular/common';
import { GameService } from './../game.service';
import { Component } from '@angular/core';
import { PlayerInputComponent } from '../player-input/player-input.component';
import { GameRulesComponent } from '../game-rules/game-rules.component';
import { ResultsComponent } from '../results/results.component';

/* TODOS:
 * todos nach projekt
 * restart
 * design
 * keine doppelten namen?
 */

@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerInputComponent,
    GameRulesComponent,
    ResultsComponent,
  ],
  template: `
    <h3>Type in the players names:</h3>
    <app-player-input
      *ngIf="!gameStarted"
      (startGameClicked)="onGameStartClicked($event)"
    >
    </app-player-input>

    <h3>Game Rules for the players:</h3>
    <app-game-rules
      *ngIf="gameStarted"
      [players]="gameService.players"
    ></app-game-rules>

    <h3>Calculate the winner:</h3>
    <app-results
      *ngIf="gameStarted"
      [players]="gameService.players"
    ></app-results>
  `,
  styleUrl: './main-game.component.css',
})
export class MainGameComponent {
  constructor(public gameService: GameService) {}

  get gameStarted() {
    return this.gameService.isGameStarted();
  }

  onGameStartClicked(playerNames: string[]) {
    this.gameService.startGame(playerNames);
  }
}
