import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
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

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
