import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = true;
  syncing = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.apiService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.snackBar.open('Error loading user profile', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  syncUser(): void {
    this.syncing = true;
    this.apiService.syncUser().subscribe({
      next: () => {
        this.snackBar.open('User data synced successfully', 'Close', { duration: 5000 });
        this.loadUserProfile();
        this.syncing = false;
      },
      error: (error) => {
        console.error('Error syncing user data:', error);
        this.snackBar.open('Error syncing user data', 'Close', { duration: 5000 });
        this.syncing = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
