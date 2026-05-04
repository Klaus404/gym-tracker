import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetDetailComponent } from './set-detail.component';
import { SetService } from '../../services/set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Set } from '../../../models';

describe('SetDetailComponent', () => {
  let component: SetDetailComponent;
  let fixture: ComponentFixture<SetDetailComponent>;
  let setService: jasmine.SpyObj<SetService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const setServiceSpy = jasmine.createSpyObj('SetService', ['getSet', 'updateSet']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteMock = {
      paramMap: of({
        get: (key: string) => key === 'setId' ? '1' : key === 'trainingId' ? '1' : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [SetDetailComponent],
      providers: [
        { provide: SetService, useValue: setServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    setService = TestBed.inject(SetService) as jasmine.SpyObj<SetService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(SetDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back on goBack', () => {
    component.trainingId = 1;
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/trainings', 1]);
  });
});
