import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../services/api.service';
import { Training } from '../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Welcome to Gym Tracker</h1>
      <p class="subtitle">Track your workouts and reach your fitness goals</p>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>fitness_center</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Total Exercises</h3>
              <p class="stat-number">{{ totalExercises }}</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>calendar_today</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Total Trainings</h3>
              <p class="stat-number">{{ totalTrainings }}</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>repeat</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Total Sets</h3>
              <p class="stat-number">{{ totalSets }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="recent-card">
        <mat-card-header>
          <mat-card-title>Recent Trainings</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading" class="loading">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Loading trainings...</p>
          </div>

          <div *ngIf="!loading && recentTrainings.length === 0" class="empty-state">
            <mat-icon>assignment_turned_in</mat-icon>
            <p>No trainings yet. Start by creating your first workout!</p>
            <button mat-raised-button color="primary" routerLink="/trainings">
              <mat-icon>add</mat-icon>
              Create Training
            </button>
          </div>

          <div *ngIf="!loading && recentTrainings.length > 0" class="training-list">
            <div *ngFor="let training of recentTrainings" class="training-item">
              <div class="training-header">
                <h4>{{ training.exerciseName }}</h4>
                <span class="training-date">{{ formatDate(training.workoutDate) }}</span>
              </div>
              <div class="training-details">
                <mat-chip-set>
                  <mat-chip>{{ training.sets.length }} sets</mat-chip>
                </mat-chip-set>
                <p *ngIf="training.notes" class="training-notes">{{ training.notes }}</p>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="action-buttons">
        <button mat-raised-button color="primary" routerLink="/trainings">
          <mat-icon>add</mat-icon>
          New Training
        </button>
        <button mat-raised-button routerLink="/exercises">
          <mat-icon>fitness_center</mat-icon>
          Manage Exercises
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;

      h1 {
        font-size: 2rem;
        color: #1976d2;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 2rem;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      }

      mat-card-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
      }

      .stat-icon {
        font-size: 3rem;

        mat-icon {
          font-size: 3rem;
          width: 3rem;
          height: 3rem;
        }
      }

      .stat-info {
        h3 {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .stat-number {
          margin: 0.5rem 0 0 0;
          font-size: 2rem;
          font-weight: bold;
        }
      }
    }

    .recent-card {
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      mat-card-header {
        margin-bottom: 1.5rem;
      }

      mat-card-title {
        margin: 0;
        color: #1976d2;
        font-size: 1.3rem;
      }
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;

      p {
        margin-top: 1rem;
        color: #666;
      }
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #999;

      mat-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        color: #ccc;
      }

      p {
        font-size: 1rem;
        margin: 1rem 0;
      }

      button {
        margin-top: 1rem;
      }
    }

    .training-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .training-item {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      background: #fafafa;
      transition: all 0.3s;

      &:hover {
        background: #f0f0f0;
        border-color: #1976d2;
      }

      .training-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;

        h4 {
          margin: 0;
          color: #333;
        }

        .training-date {
          color: #999;
          font-size: 0.875rem;
        }
      }

      .training-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .training-notes {
        margin: 0;
        color: #666;
        font-size: 0.875rem;
        font-style: italic;
      }
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;

      button {
        flex: 1;

        mat-icon {
          margin-right: 0.5rem;
        }
      }

      @media (max-width: 600px) {
        flex-direction: column;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .dashboard-container h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalExercises = 0;
  totalTrainings = 0;
  totalSets = 0;
  recentTrainings: Training[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;

    // Load trainings
    this.apiService.getTrainings().subscribe({
      next: (trainings) => {
        this.recentTrainings = trainings.slice(0, 5);
        this.totalTrainings = trainings.length;
        this.totalSets = trainings.reduce((sum, t) => sum + (t.sets?.length || 0), 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    // Load exercises
    this.apiService.getExercises().subscribe({
      next: (exercises) => {
        this.totalExercises = exercises.length;
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
