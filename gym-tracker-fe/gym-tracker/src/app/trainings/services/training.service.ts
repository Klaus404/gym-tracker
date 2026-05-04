import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Training } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainings(): Observable<Training[]> {
    return this.apiService.getTrainings();
  }

  getTraining(trainingId: number): Observable<Training> {
    return this.apiService.getTraining(trainingId);
  }

  getTrainingsByExercise(exerciseName: string): Observable<Training[]> {
    return this.apiService.getTrainingsByExercise(exerciseName);
  }

  getTrainingsByDateRange(startDate: string, endDate: string): Observable<Training[]> {
    return this.apiService.getTrainingsByDateRange(startDate, endDate);
  }

  getExerciseNames(): Observable<string[]> {
    return this.apiService.getExerciseNames();
  }

  createTraining(training: Omit<Training, 'id' | 'createdAt' | 'updatedAt' | 'sets'>): Observable<Training> {
    return this.apiService.createTraining(training);
  }

  updateTraining(trainingId: number, training: Omit<Training, 'id' | 'createdAt' | 'updatedAt' | 'sets'>): Observable<Training> {
    return this.apiService.updateTraining(trainingId, training);
  }

  deleteTraining(trainingId: number): Observable<any> {
    return this.apiService.deleteTraining(trainingId);
  }
}
