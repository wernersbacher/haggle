import { CommonModule } from '@angular/common';
import { GameService } from './../game.service';
import { Component } from '@angular/core';
import { PlayerInputComponent } from '../player-input/player-input.component';

@Component({
  selector: 'app-main-game',
  standalone: true,
  imports: [CommonModule, PlayerInputComponent],
  template: `
    <div>
      <h2>Haggle</h2>
      <app-player-input
        *ngIf="!gameStarted"
        (startGameClicked)="onGameStartClicked($event)"
      >
      </app-player-input>
    </div>
  `,
  styleUrl: './main-game.component.css',
})
export class MainGameComponent {
  constructor(private gameService: GameService) {}

  get gameStarted() {
    return this.gameService.isGameStarted();
  }

  onGameStartClicked(playerNames: string[]) {
    this.gameService.startGame(playerNames);
  }
}
