import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrainingService } from '../../services/training.service';
import { SetService } from '../../../sets/services/set.service';
import { Training, Set } from '../../../models';

@Component({
  selector: 'app-training-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.css'
})
export class TrainingDetailComponent implements OnInit {
  training: Training | null = null;
  sets: Set[] = [];
  loading = true;
  displayedColumns: string[] = ['setNumber', 'weight', 'reps', 'notes', 'actions'];
  trainingId: number | null = null;

  constructor(
    private trainingService: TrainingService,
    private setService: SetService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.trainingId = params.get('id') ? Number(params.get('id')) : null;
      if (this.trainingId) {
        this.loadTraining(this.trainingId);
        this.loadSets(this.trainingId);
      }
    });
  }

  loadTraining(trainingId: number): void {
    this.trainingService.getTraining(trainingId).subscribe({
      next: (training) => {
        this.training = training;
      },
      error: (error) => {
        console.error('Error loading training:', error);
        this.snackBar.open('Error loading training', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  loadSets(trainingId: number): void {
    this.setService.getSetsByTraining(trainingId).subscribe({
      next: (sets) => {
        this.sets = sets;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading sets:', error);
        this.snackBar.open('Error loading sets', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  deleteSet(setId: number): void {
    if (confirm('Are you sure you want to delete this set?')) {
      this.setService.deleteSet(setId).subscribe({
        next: () => {
          this.snackBar.open('Set deleted successfully', 'Close', { duration: 5000 });
          this.sets = this.sets.filter(s => s.id !== setId);
        },
        error: (error) => {
          console.error('Error deleting set:', error);
          this.snackBar.open('Error deleting set', 'Close', { duration: 5000 });
        }
      });
    }
  }
}
