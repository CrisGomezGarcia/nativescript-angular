import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module.tns';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { HomeComponent } from './components/home.component';
import { SharedModule } from '../shared/shared.module.tns';

import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    NativeScriptCommonModule,
    NativeScriptUISideDrawerModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
