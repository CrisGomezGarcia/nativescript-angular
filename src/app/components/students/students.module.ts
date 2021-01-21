import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StudentsModule { }
