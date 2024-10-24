import { CommonModule } from '@angular/common';
import { GameService } from './../game.service';
import { Component } from '@angular/core';
import { PlayerInputComponent } from '../player-input/player-input.component';
import { GameRulesComponent } from '../game-rules/game-rules.component';

/* TODOS:
 * todos nach projekt
 * restart
 * design
 * keine doppelten namen?
 */

@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [CommonModule, PlayerInputComponent, GameRulesComponent],
  template: `
    <h2>Haggle</h2>

    <app-player-input
      *ngIf="!gameStarted"
      (startGameClicked)="onGameStartClicked($event)"
    >
    </app-player-input>

    <app-game-rules
      *ngIf="gameStarted"
      [players]="gameService.players"
    ></app-game-rules>
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
