import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.apiService.getUserProfile().subscribe({
      next: (user) => {
        this.currentUser$.next(user);
        this.isAuthenticated$.next(true);
      },
      error: () => {
        this.currentUser$.next(null);
        this.isAuthenticated$.next(false);
      }
    });
  }

  login(): void {
    // Redirect to OAuth2 login endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/keycloak';
  }

  logout(): void {
    // Redirect to logout endpoint (backend handles logout)
    window.location.href = 'http://localhost:8080/logout';
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  refreshUser(): void {
    this.apiService.syncUser().subscribe({
      next: (response) => {
        if (response.user) {
          this.currentUser$.next(response.user);
          this.isAuthenticated$.next(true);
        }
      },
      error: () => {
        this.currentUser$.next(null);
        this.isAuthenticated$.next(false);
      }
    });
  }
}
