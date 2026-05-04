import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';
import { User } from '../../models';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUserProfile', 'syncUser']);

    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on init', () => {
    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe'
    };
    apiService.getUserProfile.and.returnValue(of(mockUser));

    fixture.detectChanges();

    expect(apiService.getUserProfile).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
    expect(component.loading).toBe(false);
  });

  it('should sync user data', () => {
    const mockUser: User = {
      id: '1',
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe'
    };
    apiService.syncUser.and.returnValue(of({ user: mockUser }));
    apiService.getUserProfile.and.returnValue(of(mockUser));

    component.syncUser();

    expect(apiService.syncUser).toHaveBeenCalled();
  });

  it('should logout', () => {
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
