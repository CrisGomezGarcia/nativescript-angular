import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/components/login/login.component';
import { ListUsersComponent } from '@src/app/components/list-users/list-users.component';
import { UsersService } from '@src/app/services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from '@src/app/components/user-details/user-details.component';
import { EditUserComponent } from '@src/app/components/edit-user/edit-user.component';

import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { AuthService } from '@src/app/services/auth/auth.service';
import { NewUserComponent } from '@src/app/components/new-user/new-user.component';
import { TabsComponent } from '@src/app/home/components/tabs/tabs.component';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

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
  providers: [UsersService, AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
