import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { AuthService } from './services/auth/auth.service';
import { CourseService } from './services/courses/course.service';
import { InterceptorsService } from './services/interceptors/interceptors.service';
import { StudentService } from './services/students/student.service';



@NgModule({
  declarations: [],
  imports: [
    NativeScriptCommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true
    },
    AuthService,
    CourseService,
    StudentService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule { }
