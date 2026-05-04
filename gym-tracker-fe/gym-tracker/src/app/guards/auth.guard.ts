import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isAuthenticated = false;
  authService.isAuthenticated().subscribe(auth => {
    isAuthenticated = auth;
  });

  if (isAuthenticated) {
    return true;
  } else {
    authService.login();
    return false;
  }
};
