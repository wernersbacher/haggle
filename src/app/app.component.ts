import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  template: `
    <mat-drawer-container class="example-container" autosize>
      <mat-drawer #drawer class="example-sidenav" mode="side">
        <nav>
          <a
            class="button"
            routerLink="/main"
            routerLinkActive="activebutton"
            ariaCurrentWhenActive="page"
          >
            Main Page
          </a>
        </nav>
      </mat-drawer>

      <div class="example-sidenav-content">
        <mat-toolbar>
          <button
            mat-icon-button
            class="example-icon"
            aria-label="Example icon-button with menu icon"
            (click)="drawer.toggle()"
          >
            <mat-icon>menu</mat-icon>
          </button>
          <span>My App</span>
          <span class="example-spacer"></span>
          <button
            mat-icon-button
            class="example-icon favorite-icon"
            aria-label="Example icon-button with heart icon"
          >
            <mat-icon>favorite</mat-icon>
          </button>
          <button
            mat-icon-button
            class="example-icon"
            aria-label="Example icon-button with share icon"
          >
            <mat-icon>share</mat-icon>
          </button>
        </mat-toolbar>
        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </mat-drawer-container>
  `,
  styles: [
    `
      .main-content {
        padding: 5px;
        overflow: auto;
        /* how to make it so that main content only fill until the end of the page? */
      }
    `,
  ],
})
export class AppComponent {
  showMenu = false;
}
