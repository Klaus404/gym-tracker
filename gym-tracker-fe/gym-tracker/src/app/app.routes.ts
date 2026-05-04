import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ExerciseListComponent } from './exercises/components/exercise-list/exercise-list.component';
import { ExerciseFormComponent } from './exercises/components/exercise-form/exercise-form.component';
import { TrainingListComponent } from './trainings/components/training-list/training-list.component';
import { TrainingFormComponent } from './trainings/components/training-form/training-form.component';
import { TrainingDetailComponent } from './trainings/components/training-detail/training-detail.component';
import { SetDetailComponent } from './sets/components/set-detail/set-detail.component';
import { ProfileComponent } from './profile/components/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'exercises',
        component: ExerciseListComponent
      },
      {
        path: 'exercises/new',
        component: ExerciseFormComponent
      },
      {
        path: 'exercises/:name/edit',
        component: ExerciseFormComponent
      },
      {
        path: 'trainings',
        component: TrainingListComponent
      },
      {
        path: 'trainings/new',
        component: TrainingFormComponent
      },
      {
        path: 'trainings/:id',
        component: TrainingDetailComponent
      },
      {
        path: 'trainings/:id/edit',
        component: TrainingFormComponent
      },
       {
        path: 'sets/:setId/edit',
        component: SetDetailComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];
