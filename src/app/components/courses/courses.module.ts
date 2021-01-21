import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesNewComponent } from './components/courses-new/courses-new.component';

@NgModule({
  declarations: [CoursesListComponent, CoursesNewComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoursesModule { }
