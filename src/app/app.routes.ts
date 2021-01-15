import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

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
    component: NewUserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'list',
    component: ListUsersComponent
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent
  },
  {
    path: 'edit/:user',
    component: EditUserComponent
  }
];
