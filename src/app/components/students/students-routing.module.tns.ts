import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { StudentsEditComponent } from './components/students-edit/students-edit.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsNewComponent } from './components/students-new/students-new.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent
  },
  {
    path: 'new',
    component: StudentsNewComponent
  },
  {
    path: 'details/:matricule',
    component: StudentsDetailsComponent
  },
  {
    path: 'edit/:student',
    component: StudentsEditComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class StudentsRoutingModule { }
