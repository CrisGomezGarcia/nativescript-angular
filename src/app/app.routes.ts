import { Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';

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
        loadChildren: () => import('./home/home.module.tns').then(m => m.HomeModule)
      },
      {
        path: 'students',
        canActivate: [GuardUserGuard],
        loadChildren: () => import('./components/students/students.module.tns').then(m => m.StudentsModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module.tns').then(m => m.LoginModule)
      },
      {
        path: 'courses',
        canActivate: [GuardUserGuard],
        loadChildren: () => import('./components/courses/courses.module.tns').then(m => m.CoursesModule)
      }
    ]
  }
];
