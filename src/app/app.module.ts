import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/components/home.component';
import { LoginComponent } from '@src/app/components/login/components/login.component';
import { StudentService } from '@src/app/core/services/students/student.service';
import { FloatingButtonComponent } from '@src/app/shared/components/floating-button/floating-button.component';
import { LayoutComponent } from '@src/app/components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FloatingButtonComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
