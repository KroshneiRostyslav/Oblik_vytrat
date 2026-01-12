import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Витрати</a>
      <a routerLink="/search" routerLinkActive="active">Пошук</a>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      gap: 16px;
      padding: 12px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }

    .navbar a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
    }

    .navbar a.active {
      color: #ff4d4f;
    }

    .navbar a:hover {
      text-decoration: underline;
    }
  `]
})
export class NavComponent {}
