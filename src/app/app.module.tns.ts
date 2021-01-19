import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { AuthService } from '@src/app/services/auth/auth.service';
import { TabsComponent } from '@src/app/home/components/tabs/tabs.component';
import { StudentsListComponent } from '@src/app/components/students-list/students-list.component';
import { StudentsEditComponent } from '@src/app/components/students-edit/students-edit.component';
import { StudentsDetailsComponent } from '@src/app/components/students-details/students-details.component';
import { StudentsNewComponent } from '@src/app/components/students-new/students-new.component';
import { StudentService } from '@src/app/services/students/student.service';
import { CoursesAssignComponent } from '@src/app/components/courses-assign/courses-assign.component';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TabsComponent,
    StudentsListComponent,
    StudentsEditComponent,
    StudentsDetailsComponent,
    StudentsNewComponent,
    CoursesAssignComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    HttpClientModule,
    NativeScriptHttpClientModule,
    ReactiveFormsModule,
    NativeScriptUISideDrawerModule
  ],
  exports: [
    TabsComponent
  ],
  providers: [StudentService, AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
