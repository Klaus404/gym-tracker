import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseListComponent } from './exercise-list.component';
import { ExerciseService } from '../../services/exercise.service';
import { of, throwError } from 'rxjs';
import { Exercise } from '../../../models';

describe('ExerciseListComponent', () => {
  let component: ExerciseListComponent;
  let fixture: ComponentFixture<ExerciseListComponent>;
  let exerciseService: jasmine.SpyObj<ExerciseService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ExerciseService', ['getExercises', 'deleteExercise']);

    await TestBed.configureTestingModule({
      imports: [ExerciseListComponent],
      providers: [{ provide: ExerciseService, useValue: spy }]
    }).compileComponents();

    exerciseService = TestBed.inject(ExerciseService) as jasmine.SpyObj<ExerciseService>;
    fixture = TestBed.createComponent(ExerciseListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load exercises on init', () => {
    const mockExercises: Exercise[] = [
      {
        id: 1,
        exerciseName: 'Push-ups',
        numberOfReps: 10,
        weight: 0,
        mentions: 'Chest exercise',
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z'
      }
    ];
    exerciseService.getExercises.and.returnValue(of(mockExercises));

    component.ngOnInit();

    expect(exerciseService.getExercises).toHaveBeenCalled();
    expect(component.exercises).toEqual(mockExercises);
    expect(component.loading).toBe(false);
  });

  it('should handle error when loading exercises', () => {
    exerciseService.getExercises.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');

    component.ngOnInit();

    expect(exerciseService.getExercises).toHaveBeenCalled();
    expect(component.loading).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('should delete exercise when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockExercises: Exercise[] = [];
    exerciseService.deleteExercise.and.returnValue(of({}));
    exerciseService.getExercises.and.returnValue(of(mockExercises));

    component.deleteExercise('Push-ups');

    expect(exerciseService.deleteExercise).toHaveBeenCalledWith('Push-ups');
    expect(exerciseService.getExercises).toHaveBeenCalled();
  });

  it('should not delete exercise when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteExercise('Push-ups');

    expect(exerciseService.deleteExercise).not.toHaveBeenCalled();
  });
});
