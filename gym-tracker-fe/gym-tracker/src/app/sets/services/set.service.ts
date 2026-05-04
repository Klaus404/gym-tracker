import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Set } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private apiService: ApiService) { }

  getSet(setId: number): Observable<Set> {
    return this.apiService.getSet(setId);
  }

  getSetsByTraining(trainingId: number): Observable<Set[]> {
    return this.apiService.getSetsByTraining(trainingId);
  }

  createSet(trainingId: number, set: Omit<Set, 'id' | 'createdAt'>): Observable<Set> {
    return this.apiService.createSet(trainingId, set);
  }

  updateSet(setId: number, set: Omit<Set, 'id' | 'createdAt'>): Observable<Set> {
    return this.apiService.updateSet(setId, set);
  }

  deleteSet(setId: number): Observable<any> {
    return this.apiService.deleteSet(setId);
  }
}
