import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingFormComponent } from './training-form.component';
import { TrainingService } from '../../services/training.service';
import { ExerciseService } from '../../../exercises/services/exercise.service';
import { SetService } from '../../../sets/services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Training, Exercise } from '../../../models';

describe('TrainingFormComponent', () => {
  let component: TrainingFormComponent;
  let fixture: ComponentFixture<TrainingFormComponent>;
  let trainingService: jasmine.SpyObj<TrainingService>;
  let exerciseService: jasmine.SpyObj<ExerciseService>;
  let setService: jasmine.SpyObj<SetService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const trainingServiceSpy = jasmine.createSpyObj('TrainingService', [
      'getTraining',
      'createTraining',
      'updateTraining'
    ]);
    const exerciseServiceSpy = jasmine.createSpyObj('ExerciseService', ['getExercises']);
    const setServiceSpy = jasmine.createSpyObj('SetService', ['createSet']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteMock = {
      paramMap: of({ get: () => null })
    };

    await TestBed.configureTestingModule({
      imports: [TrainingFormComponent],
      providers: [
        { provide: TrainingService, useValue: trainingServiceSpy },
        { provide: ExerciseService, useValue: exerciseServiceSpy },
        { provide: SetService, useValue: setServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    trainingService = TestBed.inject(TrainingService) as jasmine.SpyObj<TrainingService>;
    exerciseService = TestBed.inject(ExerciseService) as jasmine.SpyObj<ExerciseService>;
    setService = TestBed.inject(SetService) as jasmine.SpyObj<SetService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    exerciseService.getExercises.and.returnValue(of([]));
    fixture = TestBed.createComponent(TrainingFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add set to form array', () => {
    fixture.detectChanges();

    expect(component.setsArray.length).toBe(1);
  });

  it('should remove set from form array', () => {
    fixture.detectChanges();
    component.addSet();

    expect(component.setsArray.length).toBe(2);

    component.removeSet(0);

    expect(component.setsArray.length).toBe(1);
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

    fixture.detectChanges();

    expect(exerciseService.getExercises).toHaveBeenCalled();
    expect(component.exercises).toEqual(mockExercises);
  });

  it('should navigate to trainings on cancel', () => {
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/trainings']);
  });
});
