import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { TrainingService } from '../../services/training.service';
import { ExerciseService } from '../../../exercises/services/exercise.service';
import { SetService } from '../../../sets/services/set.service';
import { Training, Exercise } from '../../../models';

@Component({
  selector: 'app-training-form',
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
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule
  ],
  templateUrl: './training-form.component.html',
  styleUrl: './training-form.component.css'
})
export class TrainingFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  loading = false;
  trainingId: number | null = null;
  exercises: Exercise[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private exerciseService: ExerciseService,
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      exerciseName: ['', [Validators.required, Validators.minLength(3)]],
      workoutDate: ['', Validators.required],
      notes: [''],
      sets: this.formBuilder.array([])
    });
  }

  get setsArray(): FormArray {
    return this.form.get('sets') as FormArray;
  }

  get setIndices(): number[] {
    return Array.from({ length: this.setsArray.length }, (_, i) => i);
  }

  ngOnInit(): void {
    this.loadExercises();
    this.route.paramMap.subscribe(params => {
      this.trainingId = params.get('id') ? Number(params.get('id')) : null;
      if (this.trainingId) {
        this.isEditMode = true;
        this.loadTraining(this.trainingId);
      } else {
        this.addSet();
      }
    });
  }

  loadExercises(): void {
    this.exerciseService.getExercises().subscribe({
      next: (exercises) => {
        this.exercises = exercises;
      },
      error: (error) => {
        console.error('Error loading exercises:', error);
        this.snackBar.open('Error loading exercises', 'Close', { duration: 5000 });
      }
    });
  }

  loadTraining(trainingId: number): void {
    this.loading = true;
    this.trainingService.getTraining(trainingId).subscribe({
      next: (training: Training) => {
        this.form.patchValue({
          exerciseName: training.exerciseName,
          workoutDate: training.workoutDate,
          notes: training.notes
        });

        this.setsArray.clear();
        if (training.sets && training.sets.length > 0) {
          training.sets.forEach(set => {
            this.addSet(set);
          });
        } else {
          this.addSet();
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading training:', error);
        this.snackBar.open('Error loading training', 'Close', { duration: 5000 });
        this.loading = false;
        this.router.navigate(['/trainings']);
      }
    });
  }

  addSet(setData?: any): void {
    const setForm = this.formBuilder.group({
      setNumber: [this.setsArray.length + 1, Validators.required],
      weight: [setData?.weight || '', [Validators.required, Validators.min(0)]],
      reps: [setData?.reps || '', [Validators.required, Validators.min(1)]],
      notes: [setData?.notes || '']
    });
    this.setsArray.push(setForm);
  }

  removeSet(index: number): void {
    this.setsArray.removeAt(index);
    this.updateSetNumbers();
  }

  private updateSetNumbers(): void {
    this.setsArray.controls.forEach((control, index) => {
      control.get('setNumber')?.setValue(index + 1);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const formValue = {
      exerciseName: this.form.get('exerciseName')?.value,
      workoutDate: new Date(this.form.get('workoutDate')?.value).toISOString().split('T')[0],
      notes: this.form.get('notes')?.value
    };

    const operation = this.isEditMode && this.trainingId
      ? this.trainingService.updateTraining(this.trainingId, formValue)
      : this.trainingService.createTraining(formValue);

    operation.subscribe({
      next: (training) => {
        this.saveOrUpdateSets(training.id);
      },
      error: (error) => {
        console.error('Error saving training:', error);
        this.snackBar.open('Error saving training', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  private saveOrUpdateSets(trainingId: number): void {
    const setsData = this.setsArray.value;
    let completedSets = 0;

    if (setsData.length === 0) {
      this.completeSubmit();
      return;
    }

    setsData.forEach((setData: any, index: number) => {
      const setPayload = {
        setNumber: setData.setNumber,
        weight: setData.weight,
        reps: setData.reps,
        notes: setData.notes
      };

      this.setService.createSet(trainingId, setPayload).subscribe({
        next: () => {
          completedSets++;
          if (completedSets === setsData.length) {
            this.completeSubmit();
          }
        },
        error: (error) => {
          console.error('Error saving set:', error);
          // Continue saving other sets even if one fails
          completedSets++;
          if (completedSets === setsData.length) {
            this.completeSubmit();
          }
        }
      });
    });
  }

  private completeSubmit(): void {
    const message = this.isEditMode ? 'Training updated successfully' : 'Training created successfully';
    this.snackBar.open(message, 'Close', { duration: 5000 });
    this.router.navigate(['/trainings']);
  }

  cancel(): void {
    this.router.navigate(['/trainings']);
  }
}
