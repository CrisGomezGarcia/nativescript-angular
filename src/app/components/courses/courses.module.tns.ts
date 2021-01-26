import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import { CoursesRoutingModule } from '@src/app/components/courses/courses-routing.module.tns';
import { SharedModule } from '@src/app/shared/shared.module.tns';
import { CoursesNewComponent } from '@src/app/components/courses/components/courses-new/courses-new.component';
import { CoursesListComponent } from '@src/app/components/courses/components/courses-list/courses-list.component';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesDetailsComponent } from '@src/app/components/courses/components/courses-details/courses-details.component';
import { CoursesAddStudentsComponent } from '@src/app/components/courses/components/courses-add-students/courses-add-students.component';

@NgModule({
  declarations: [
    CoursesNewComponent,
    CoursesListComponent,
    CoursesDetailsComponent,
    CoursesAddStudentsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoursesModule { }
