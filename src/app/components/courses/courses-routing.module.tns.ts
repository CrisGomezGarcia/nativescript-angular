import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { CoursesAddStudentsComponent } from './components/courses-add-students/courses-add-students.component';
import { CoursesDetailsComponent } from './components/courses-details/courses-details.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesNewComponent } from './components/courses-new/courses-new.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent
  },
  {
    path: 'new',
    component: CoursesNewComponent
  },
  {
    path: 'details/:id',
    component: CoursesDetailsComponent
  },
  {
    path: 'add/:course',
    component: CoursesAddStudentsComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class CoursesRoutingModule { }
