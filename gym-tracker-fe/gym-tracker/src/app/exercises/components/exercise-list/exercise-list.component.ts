import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../../models';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];
  loading = true;
  displayedColumns: string[] = ['exerciseName', 'numberOfReps', 'weight', 'mentions', 'updatedAt', 'actions'];

  constructor(
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises(): void {
    this.loading = true;
    this.exerciseService.getExercises().subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading exercises:', error);
        this.snackBar.open('Error loading exercises', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  deleteExercise(exerciseName: string): void {
    if (confirm(`Are you sure you want to delete "${exerciseName}"?`)) {
      this.exerciseService.deleteExercise(exerciseName).subscribe({
        next: () => {
          this.snackBar.open(`Exercise "${exerciseName}" deleted successfully`, 'Close', { duration: 5000 });
          this.loadExercises();
        },
        error: (error) => {
          console.error('Error deleting exercise:', error);
          this.snackBar.open('Error deleting exercise', 'Close', { duration: 5000 });
        }
      });
    }
  }

  editExercise(exerciseName: string): void {
    // Will navigate to edit form
    console.log('Edit exercise:', exerciseName);
  }
}
