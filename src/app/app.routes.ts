import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { CoursesAssignComponent } from './components/courses-assign/courses-assign.component';
import { LoginComponent } from './components/login/login.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { StudentsEditComponent } from './components/students-edit/students-edit.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsNewComponent } from './components/students-new/students-new.component';

import { GuardUserGuard } from './guards/guard-user.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [GuardUserGuard],
    component: HomeComponent,
  },
  {
    path: 'new',
    component: StudentsNewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'list',
    component: StudentsListComponent
  },
  {
    path: 'details/:matricule',
    component: StudentsDetailsComponent
  },
  {
    path: 'edit/:student',
    component: StudentsEditComponent
  },
  {
    path: 'courses-assign',
    component: CoursesAssignComponent
  }
];
