import { Routes } from '@angular/router';
import { MainGameComponent } from './main-game/main-game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainGameComponent },
];
