import { Injectable } from '@angular/core';
import { GameState } from '../game-state';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private storageKey = 'appState';

  saveState(state: GameState): void {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(this.storageKey, serializedState);
      console.log('Saved game state to local storage.');
    } catch (error) {
      console.error('Fehler beim Speichern des Zustands:', error);
    }
  }

  loadState(): GameState | null {
    try {
      const serializedState = localStorage.getItem(this.storageKey);
      if (!serializedState) {
        return null;
      }
      const parsed = JSON.parse(serializedState) as GameState;
      console.log('Read game state from local storage.');
      return parsed;
    } catch (error) {
      console.error('Fehler beim Laden des Zustands:', error);
      return null;
    }
  }

  clearState(): void {
    localStorage.removeItem(this.storageKey);
  }
}
