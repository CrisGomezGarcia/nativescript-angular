import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from '@src/app/components/courses/courses-routing.module';

import { CoursesListComponent } from '@src/app/components/courses/components/courses-list/courses-list.component';
import { CoursesNewComponent } from '@src/app/components/courses/components/courses-new/courses-new.component';
import { CoursesDetailsComponent } from '@src/app/components/courses/components/courses-details/courses-details.component';
import { CoursesAddStudentsComponent } from '@src/app/components/courses/components/courses-add-students/courses-add-students.component';

@NgModule({
  declarations: [CoursesListComponent, CoursesNewComponent, CoursesDetailsComponent, CoursesAddStudentsComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoursesModule { }
