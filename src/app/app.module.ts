import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { ListUsersComponent } from '@src/app/components/list-users/list-users.component';
import { UsersService } from '@src/app/services/users/users.service';
import { UserDetailsComponent } from '@src/app/components/user-details/user-details.component';
import { EditUserComponent } from '@src/app/components/edit-user/edit-user.component';
import { NewUserComponent } from '@src/app/components/new-user/new-user.component';
import { TabsComponent } from '@src/app/home/components/tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ListUsersComponent,
    UserDetailsComponent,
    EditUserComponent,
    NewUserComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
