import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingService } from '../../services/training.service';
import { SetService } from '../../../sets/services/set.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Training, Set } from '../../../models';

describe('TrainingDetailComponent', () => {
  let component: TrainingDetailComponent;
  let fixture: ComponentFixture<TrainingDetailComponent>;
  let trainingService: jasmine.SpyObj<TrainingService>;
  let setService: jasmine.SpyObj<SetService>;

  beforeEach(async () => {
    const trainingServiceSpy = jasmine.createSpyObj('TrainingService', ['getTraining']);
    const setServiceSpy = jasmine.createSpyObj('SetService', ['getSetsByTraining', 'deleteSet']);
    const activatedRouteMock = {
      paramMap: of({ get: (key: string) => key === 'id' ? '1' : null })
    };

    await TestBed.configureTestingModule({
      imports: [TrainingDetailComponent],
      providers: [
        { provide: TrainingService, useValue: trainingServiceSpy },
        { provide: SetService, useValue: setServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    trainingService = TestBed.inject(TrainingService) as jasmine.SpyObj<TrainingService>;
    setService = TestBed.inject(SetService) as jasmine.SpyObj<SetService>;
    fixture = TestBed.createComponent(TrainingDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load training and sets on init', () => {
    const mockTraining: Training = {
      id: 1,
      exerciseName: 'Push-ups',
      workoutDate: '2026-01-01',
      notes: 'Good session',
      sets: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z'
    };
    const mockSets: Set[] = [];
    trainingService.getTraining.and.returnValue(of(mockTraining));
    setService.getSetsByTraining.and.returnValue(of(mockSets));

    fixture.detectChanges();

    expect(trainingService.getTraining).toHaveBeenCalledWith(1);
    expect(setService.getSetsByTraining).toHaveBeenCalledWith(1);
  });
});
