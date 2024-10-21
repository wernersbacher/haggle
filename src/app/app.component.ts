import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from './game.service';  // Importiere den GameService
import { PlayerCards } from './models/player-cards'; // Importiere das PlayerCards-Interface
import { Rule } from './models/rule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h1>Haggle Game</h1>
      <h2>Player's Cards</h2>

      <!-- Beispiel-Eingabe der Kartenwerte -->
      <label>Red Cards: <input type="number" [(ngModel)]="playerCards.red" /></label>
      <label>Blue Cards: <input type="number" [(ngModel)]="playerCards.blue" /></label>
      <label>Green Cards: <input type="number" [(ngModel)]="playerCards.green" /></label>
      <label>Gold Cards: <input type="number" [(ngModel)]="playerCards.gold" /></label>
      <label>Black Cards: <input type="number" [(ngModel)]="playerCards.black" /></label>

      <button (click)="calculatePoints()">Calculate Points</button>

      <h3>Total Points: {{ totalPoints }}</h3>
    </div>

    <div>
      <h2>Game Rules for Player</h2>
      <ul>
        <li *ngFor="let rule of playerRules">{{ rule.description }}</li>
      </ul>
    </div>
  `
})
export class AppComponent {
  playerCards: PlayerCards = { red: 0, blue: 0, green: 0, gold: 0, black: 0 }; // Initialisierte Spieler-Karten
  totalPoints: number = 0;  // Gesamtpunkte
  playerRules: Rule[] | undefined;  // Regeln für den Spieler

  constructor(private gameService: GameService) {  // Der GameService wird injiziert
    this.generatePlayerRules();
  }

  // Methode zur Berechnung der Punkte eines Spielers
  calculatePoints() {
    this.totalPoints = this.gameService.evaluatePlayer(this.playerCards);
  }

  // Generiere die Regeln für den Spieler
  generatePlayerRules() {
    this.playerRules = this.gameService.generateRules(1)[0];  // Generiert Regeln für 1 Spieler
  }
}
