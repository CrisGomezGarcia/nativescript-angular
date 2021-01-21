import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import { CoursesRoutingModule } from './courses-routing.module.tns';
import { SharedModule } from '@src/app/shared/shared.module.tns';
import { CoursesNewComponent } from './components/courses-new/courses-new.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoursesNewComponent,
    CoursesListComponent
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
