import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../../models';

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.css'
})
export class ExerciseFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  loading = false;
  exerciseName: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      exerciseName: ['', [Validators.required, Validators.minLength(3)]],
      numberOfReps: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      mentions: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.exerciseName = params.get('name');
      if (this.exerciseName) {
        this.isEditMode = true;
        this.loadExercise(this.exerciseName);
      }
    });
  }

  loadExercise(exerciseName: string): void {
    this.loading = true;
    this.exerciseService.getExercise(exerciseName).subscribe({
      next: (exercise: Exercise) => {
        this.form.patchValue({
          exerciseName: exercise.exerciseName,
          numberOfReps: exercise.numberOfReps,
          weight: exercise.weight,
          mentions: exercise.mentions
        });
        if (this.isEditMode) {
          this.form.get('exerciseName')?.disable();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading exercise:', error);
        this.snackBar.open('Error loading exercise', 'Close', { duration: 5000 });
        this.loading = false;
        this.router.navigate(['/exercises']);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const formValue = {
      exerciseName: this.form.get('exerciseName')?.value,
      numberOfReps: this.form.get('numberOfReps')?.value,
      weight: this.form.get('weight')?.value,
      mentions: this.form.get('mentions')?.value
    };

    const operation = this.isEditMode && this.exerciseName
      ? this.exerciseService.updateExercise(this.exerciseName, formValue)
      : this.exerciseService.createExercise(formValue);

    operation.subscribe({
      next: () => {
        const message = this.isEditMode ? 'Exercise updated successfully' : 'Exercise created successfully';
        this.snackBar.open(message, 'Close', { duration: 5000 });
        this.router.navigate(['/exercises']);
      },
      error: (error) => {
        console.error('Error saving exercise:', error);
        this.snackBar.open('Error saving exercise', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/exercises']);
  }
}
