import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StudentsRoutingModule } from './students-routing.module.tns';
import { SharedModule } from '@src/app/shared/shared.module.tns';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentsNewComponent } from './components/students-new/students-new.component';
import { StudentsEditComponent } from './components/students-edit/students-edit.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';


@NgModule({
  declarations: [
    StudentsNewComponent,
    StudentsEditComponent,
    StudentsDetailsComponent,
    StudentsListComponent
  ],
  imports: [
    NativeScriptCommonModule,
    StudentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StudentsModule { }
