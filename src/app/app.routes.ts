import { Routes } from '@angular/router';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { PlayerInputComponent } from './player-input/player-input.component';

export const routes: Routes = [
  { path: '', redirectTo: '/rules', pathMatch: 'full' },
  { path: 'rules', component: GameRulesComponent },
  { path: 'player', component: PlayerInputComponent },
];
