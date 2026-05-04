import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingListComponent } from './training-list.component';
import { TrainingService } from '../../services/training.service';
import { of, throwError } from 'rxjs';
import { Training } from '../../../models';

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;
  let trainingService: jasmine.SpyObj<TrainingService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TrainingService', [
      'getTrainings',
      'getExerciseNames',
      'getTrainingsByExercise',
      'getTrainingsByDateRange',
      'deleteTraining'
    ]);

    await TestBed.configureTestingModule({
      imports: [TrainingListComponent],
      providers: [{ provide: TrainingService, useValue: spy }]
    }).compileComponents();

    trainingService = TestBed.inject(TrainingService) as jasmine.SpyObj<TrainingService>;
    fixture = TestBed.createComponent(TrainingListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load trainings and exercise names on init', () => {
    const mockTrainings: Training[] = [
      {
        id: 1,
        exerciseName: 'Push-ups',
        workoutDate: '2026-01-01',
        notes: 'Good session',
        sets: [],
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z'
      }
    ];
    const mockExerciseNames = ['Push-ups', 'Bench Press'];
    trainingService.getTrainings.and.returnValue(of(mockTrainings));
    trainingService.getExerciseNames.and.returnValue(of(mockExerciseNames));

    component.ngOnInit();

    expect(trainingService.getTrainings).toHaveBeenCalled();
    expect(trainingService.getExerciseNames).toHaveBeenCalled();
    expect(component.trainings).toEqual(mockTrainings);
    expect(component.exerciseNames).toEqual(mockExerciseNames);
  });

  it('should delete training when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockTrainings: Training[] = [];
    trainingService.deleteTraining.and.returnValue(of({}));
    trainingService.getTrainings.and.returnValue(of(mockTrainings));

    component.deleteTraining(1);

    expect(trainingService.deleteTraining).toHaveBeenCalledWith(1);
    expect(trainingService.getTrainings).toHaveBeenCalled();
  });

  it('should not delete training when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteTraining(1);

    expect(trainingService.deleteTraining).not.toHaveBeenCalled();
  });

  it('should get set count from training', () => {
    const training: Training = {
      id: 1,
      exerciseName: 'Push-ups',
      workoutDate: '2026-01-01',
      notes: 'Good session',
      sets: [{ id: 1, setNumber: 1, weight: 0, reps: 10, notes: '', createdAt: '' }],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    };

    const count = component.getSetCount(training);

    expect(count).toBe(1);
  });
});
