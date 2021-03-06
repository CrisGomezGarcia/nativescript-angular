import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptHttpClientModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LayoutComponent } from '@src/app/components/layout/layout.component';
import { CoreModule } from '@src/app/core/core.module.tns';
/* import { InterceptorsService } from './core/services/interceptors/interceptors.service'; */

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    HttpClientModule,
    NativeScriptHttpClientModule,
    CoreModule
  ],
  exports: [],
  providers: [
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsService,
      multi: true
    } */
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
