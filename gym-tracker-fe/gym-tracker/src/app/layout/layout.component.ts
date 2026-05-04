import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../services/auth.service';
import { User } from '../models';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="header">
      <button mat-icon-button (click)="toggleSidebar()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="spacer"></span>
      <h1 class="title">💪 Gym Tracker</h1>
      <span class="spacer"></span>
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav class="sidenav" mode="side" [opened]="true" fixedInViewport>
        <mat-nav-list>
          <mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </mat-list-item>
          <mat-list-item routerLink="/exercises" routerLinkActive="active">
            <mat-icon matListItemIcon>fitness_center</mat-icon>
            <span matListItemTitle>Exercises</span>
          </mat-list-item>
          <mat-list-item routerLink="/trainings" routerLinkActive="active">
            <mat-icon matListItemIcon>calendar_today</mat-icon>
            <span matListItemTitle>Trainings</span>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
        <footer class="footer">
          <p>&copy; 2026 Gym Tracker. Your fitness journey starts here.</p>
        </footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .header {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
    }

    .title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .sidenav-container {
      height: calc(100vh - 64px);
    }

    .sidenav {
      width: 250px;
      background: linear-gradient(180deg, #f5f5f5 0%, #eeeeee 100%);
    }

    mat-nav-list {
      padding-top: 0;
    }

    mat-list-item {
      height: auto;
      padding: 12px 0;

      &.active {
        color: #1976d2;
        background-color: rgba(25, 118, 210, 0.05);
        border-left: 4px solid #1976d2;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }

    .content {
      padding: 24px;
      min-height: calc(100vh - 64px - 100px);
    }

    .footer {
      background: linear-gradient(180deg, #f5f5f5 0%, #eeeeee 100%);
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 0.875rem;
      border-top: 1px solid #ddd;

      p {
        margin: 0;
      }
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }

      .title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  currentUser: User | null = null;
  sidenav: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidebar(): void {
    // Will be implemented with @ViewChild when needed
  }

  logout(): void {
    this.authService.logout();
  }
}
