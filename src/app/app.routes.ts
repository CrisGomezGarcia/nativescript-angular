import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/components/login.component';

import { GuardUserGuard } from './guards/guard-user.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        path: 'students',
        loadChildren: () => import('./components/students/students.module.tns').then(m => m.StudentsModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module.tns').then(m => m.LoginModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./components/courses/courses.module.tns').then(m => m.CoursesModule)
      }
    ]
  }
];
