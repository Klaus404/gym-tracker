import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Exercise } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private apiService: ApiService) { }

  getExercises(): Observable<Exercise[]> {
    return this.apiService.getExercises();
  }

  getPublicExercises(): Observable<string[]> {
    return this.apiService.getPublicExercises();
  }

  getExercise(exerciseName: string): Observable<Exercise> {
    return this.apiService.getExercise(exerciseName);
  }

  createExercise(exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>): Observable<Exercise> {
    return this.apiService.createExercise(exercise);
  }

  updateExercise(exerciseName: string, exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>): Observable<Exercise> {
    return this.apiService.updateExercise(exerciseName, exercise);
  }

  deleteExercise(exerciseName: string): Observable<any> {
    return this.apiService.deleteExercise(exerciseName);
  }
}
