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
import { SetService } from '../../services/set.service';
import { Set } from '../../../models';

@Component({
  selector: 'app-set-detail',
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
  templateUrl: './set-detail.component.html',
  styleUrl: './set-detail.component.css'
})
export class SetDetailComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  loading = false;
  setId: number | null = null;
  trainingId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private setService: SetService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      setNumber: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      reps: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.setId = params.get('setId') ? Number(params.get('setId')) : null;
      this.trainingId = params.get('trainingId') ? Number(params.get('trainingId')) : null;
      
      if (this.setId) {
        this.isEditMode = true;
        this.loadSet(this.setId);
      }
    });
  }

  loadSet(setId: number): void {
    this.loading = true;
    this.setService.getSet(setId).subscribe({
      next: (set: Set) => {
        this.form.patchValue({
          setNumber: set.setNumber,
          weight: set.weight,
          reps: set.reps,
          notes: set.notes
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading set:', error);
        this.snackBar.open('Error loading set', 'Close', { duration: 5000 });
        this.loading = false;
        this.goBack();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const formValue = {
      setNumber: this.form.get('setNumber')?.value,
      weight: this.form.get('weight')?.value,
      reps: this.form.get('reps')?.value,
      notes: this.form.get('notes')?.value
    };

    if (this.isEditMode && this.setId) {
      this.setService.updateSet(this.setId, formValue).subscribe({
        next: () => {
          this.snackBar.open('Set updated successfully', 'Close', { duration: 5000 });
          this.goBack();
        },
        error: (error) => {
          console.error('Error updating set:', error);
          this.snackBar.open('Error updating set', 'Close', { duration: 5000 });
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    if (this.trainingId) {
      this.router.navigate(['/trainings', this.trainingId]);
    } else {
      this.router.navigate(['/trainings']);
    }
  }
}
