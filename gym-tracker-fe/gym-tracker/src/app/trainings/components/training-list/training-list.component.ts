import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../../models';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.css'
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  loading = true;
  filterForm: FormGroup;
  displayedColumns: string[] = ['exerciseName', 'workoutDate', 'notes', 'sets', 'updatedAt', 'actions'];
  exerciseNames: string[] = [];

  constructor(
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      exerciseName: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadTrainings();
    this.loadExerciseNames();
  }

  loadTrainings(): void {
    this.loading = true;
    this.trainingService.getTrainings().subscribe({
      next: (trainings) => {
        this.trainings = trainings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trainings:', error);
        this.snackBar.open('Error loading trainings', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  loadExerciseNames(): void {
    this.trainingService.getExerciseNames().subscribe({
      next: (names) => {
        this.exerciseNames = names;
      },
      error: (error) => {
        console.error('Error loading exercise names:', error);
      }
    });
  }

  applyFilters(): void {
    const exerciseName = this.filterForm.get('exerciseName')?.value;
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;

    this.loading = true;

    if (exerciseName && !startDate && !endDate) {
      this.trainingService.getTrainingsByExercise(exerciseName).subscribe({
        next: (trainings) => {
          this.trainings = trainings;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error filtering trainings:', error);
          this.snackBar.open('Error filtering trainings', 'Close', { duration: 5000 });
          this.loading = false;
        }
      });
    } else if (startDate && endDate && !exerciseName) {
      const start = new Date(startDate).toISOString().split('T')[0];
      const end = new Date(endDate).toISOString().split('T')[0];
      this.trainingService.getTrainingsByDateRange(start, end).subscribe({
        next: (trainings) => {
          this.trainings = trainings;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error filtering trainings:', error);
          this.snackBar.open('Error filtering trainings', 'Close', { duration: 5000 });
          this.loading = false;
        }
      });
    } else if (!exerciseName && !startDate && !endDate) {
      this.loadTrainings();
    } else {
      this.snackBar.open('Please filter by exercise OR date range, not both', 'Close', { duration: 5000 });
      this.loading = false;
    }
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.loadTrainings();
  }

  deleteTraining(trainingId: number): void {
    if (confirm('Are you sure you want to delete this training?')) {
      this.trainingService.deleteTraining(trainingId).subscribe({
        next: () => {
          this.snackBar.open('Training deleted successfully', 'Close', { duration: 5000 });
          this.loadTrainings();
        },
        error: (error) => {
          console.error('Error deleting training:', error);
          this.snackBar.open('Error deleting training', 'Close', { duration: 5000 });
        }
      });
    }
  }

  getSetCount(training: Training): number {
    return training.sets ? training.sets.length : 0;
  }
}
