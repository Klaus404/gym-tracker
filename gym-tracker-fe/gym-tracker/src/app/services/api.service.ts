import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Exercise, Training, Set, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Auth endpoints
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/user`, { withCredentials: true });
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true });
  }

  syncUser(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/sync`, { withCredentials: true });
  }

  // Exercise endpoints
  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises`, { withCredentials: true });
  }

  getPublicExercises(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/public/exercises`);
  }

  getExercise(exerciseName: string): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/exercise/${exerciseName}`, { withCredentials: true });
  }

  createExercise(exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/exercise`, exercise, { withCredentials: true });
  }

  updateExercise(exerciseName: string, exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/exercise/${exerciseName}`, exercise, { withCredentials: true });
  }

  deleteExercise(exerciseName: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/exercise/${exerciseName}`, { withCredentials: true });
  }

  // Training endpoints
  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings`, { withCredentials: true });
  }

  getTraining(trainingId: number): Observable<Training> {
    return this.http.get<Training>(`${this.apiUrl}/trainings/${trainingId}`, { withCredentials: true });
  }

  getTrainingsByExercise(exerciseName: string): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings/exercise/${exerciseName}`, { withCredentials: true });
  }

  getTrainingsByDateRange(startDate: string, endDate: string): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings/date-range`, {
      params: { startDate, endDate },
      withCredentials: true
    });
  }

  getExerciseNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/trainings/exercises`, { withCredentials: true });
  }

  createTraining(training: Omit<Training, 'id' | 'createdAt' | 'updatedAt' | 'sets'>): Observable<Training> {
    return this.http.post<Training>(`${this.apiUrl}/trainings`, training, { withCredentials: true });
  }

  updateTraining(trainingId: number, training: Omit<Training, 'id' | 'createdAt' | 'updatedAt' | 'sets'>): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/trainings/${trainingId}`, training, { withCredentials: true });
  }

  deleteTraining(trainingId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/trainings/${trainingId}`, { withCredentials: true });
  }

  // Set endpoints
  getSet(setId: number): Observable<Set> {
    return this.http.get<Set>(`${this.apiUrl}/sets/${setId}`, { withCredentials: true });
  }

  getSetsByTraining(trainingId: number): Observable<Set[]> {
    return this.http.get<Set[]>(`${this.apiUrl}/sets/training/${trainingId}`, { withCredentials: true });
  }

  createSet(trainingId: number, set: Omit<Set, 'id' | 'createdAt'>): Observable<Set> {
    return this.http.post<Set>(`${this.apiUrl}/sets/training/${trainingId}`, set, { withCredentials: true });
  }

  updateSet(setId: number, set: Omit<Set, 'id' | 'createdAt'>): Observable<Set> {
    return this.http.put<Set>(`${this.apiUrl}/sets/${setId}`, set, { withCredentials: true });
  }

  deleteSet(setId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/sets/${setId}`, { withCredentials: true });
  }
}
