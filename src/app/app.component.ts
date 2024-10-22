import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from './game.service'; // Importiere den GameService
import { PlayerCards } from './models/player-cards'; // Importiere das PlayerCards-Interface
import { Rule } from './models/rule';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav>
      <a
        class="button"
        routerLink="/rules"
        routerLinkActive="activebutton"
        ariaCurrentWhenActive="page"
      >
        Rules
      </a>
      |
      <a
        class="button"
        routerLink="/player"
        routerLinkActive="activebutton"
        ariaCurrentWhenActive="page"
      >
        Players
      </a>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  playerCards: PlayerCards = { red: 0, blue: 0, green: 0, gold: 0, black: 0 }; // Initialisierte Spieler-Karten
  totalPoints: number = 0; // Gesamtpunkte
  playerRules: Rule[] | undefined; // Regeln für den Spieler

  constructor(private gameService: GameService) {
    // Der GameService wird injiziert
    this.generatePlayerRules();
  }

  // Methode zur Berechnung der Punkte eines Spielers
  calculatePoints() {
    this.totalPoints = this.gameService.evaluatePlayer(this.playerCards);
  }

  // Generiere die Regeln für den Spieler
  generatePlayerRules() {
    this.playerRules = this.gameService.generateRules(1)[0]; // Generiert Regeln für 1 Spieler
  }
}
