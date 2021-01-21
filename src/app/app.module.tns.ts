import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptHttpClientModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { TabsComponent } from '@src/app/home/components/tabs/tabs.component';
import { LayoutComponent } from '@src/app/components/layout/layout.component';
import { CoreModule } from './core/core.module.tns';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    LayoutComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    HttpClientModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
    CoreModule
  ],
  exports: [
    TabsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
