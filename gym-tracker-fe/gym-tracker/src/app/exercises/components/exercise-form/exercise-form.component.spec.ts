import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseFormComponent } from './exercise-form.component';
import { ExerciseService } from '../../services/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Exercise } from '../../../models';

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;
  let exerciseService: jasmine.SpyObj<ExerciseService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  beforeEach(async () => {
    const exerciseServiceSpy = jasmine.createSpyObj('ExerciseService', [
      'getExercise',
      'createExercise',
      'updateExercise'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteMock = {
      paramMap: of({ get: () => null })
    };

    await TestBed.configureTestingModule({
      imports: [ExerciseFormComponent],
      providers: [
        { provide: ExerciseService, useValue: exerciseServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    exerciseService = TestBed.inject(ExerciseService) as jasmine.SpyObj<ExerciseService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values in create mode', () => {
    fixture.detectChanges();

    expect(component.isEditMode).toBe(false);
    expect(component.form.get('exerciseName')?.value).toBe('');
    expect(component.form.get('numberOfReps')?.value).toBe('');
    expect(component.form.get('weight')?.value).toBe('');
  });

  it('should load exercise in edit mode', () => {
    const mockExercise: Exercise = {
      id: 1,
      exerciseName: 'Push-ups',
      numberOfReps: 10,
      weight: 0,
      mentions: 'Chest exercise',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    };
    activatedRoute.paramMap = of({ get: (key: string) => key === 'name' ? 'Push-ups' : null });
    exerciseService.getExercise.and.returnValue(of(mockExercise));

    fixture.detectChanges();

    expect(component.isEditMode).toBe(true);
    expect(exerciseService.getExercise).toHaveBeenCalledWith('Push-ups');
    expect(component.form.get('exerciseName')?.value).toBe('Push-ups');
  });

  it('should create exercise on form submit in create mode', () => {
    exerciseService.createExercise.and.returnValue(of({} as Exercise));

    component.form.patchValue({
      exerciseName: 'Push-ups',
      numberOfReps: 10,
      weight: 0,
      mentions: 'Chest exercise'
    });

    component.onSubmit();

    expect(exerciseService.createExercise).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/exercises']);
  });

  it('should update exercise on form submit in edit mode', () => {
    component.isEditMode = true;
    component.exerciseName = 'Push-ups';
    exerciseService.updateExercise.and.returnValue(of({} as Exercise));

    component.form.patchValue({
      exerciseName: 'Push-ups',
      numberOfReps: 10,
      weight: 0,
      mentions: 'Chest exercise'
    });

    component.onSubmit();

    expect(exerciseService.updateExercise).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/exercises']);
  });

  it('should not submit invalid form', () => {
    component.form.patchValue({
      exerciseName: '', // invalid - required
      numberOfReps: 10,
      weight: 0
    });

    component.onSubmit();

    expect(exerciseService.createExercise).not.toHaveBeenCalled();
  });

  it('should navigate to exercises on cancel', () => {
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/exercises']);
  });
});
