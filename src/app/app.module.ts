import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { TabsComponent } from '@src/app/home/components/tabs/tabs.component';
import { StudentsListComponent } from '@src/app/components/students-list/students-list.component';
import { StudentsEditComponent } from '@src/app/components/students-edit/students-edit.component';
import { StudentsDetailsComponent } from '@src/app/components/students-details/students-details.component';
import { StudentsNewComponent } from '@src/app/components/students-new/students-new.component';
import { StudentService } from '@src/app/services/students/student.service';
import { CoursesAssignComponent } from '@src/app/components/courses-assign/courses-assign.component';

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
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
