import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
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
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class CoursesRoutingModule { }