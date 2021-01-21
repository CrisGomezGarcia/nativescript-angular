import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module.tns';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    NativeScriptCommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
