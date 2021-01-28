import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ErrorConnectionComponent } from './components/error-connection/error-connection.component';

@NgModule({
  declarations: [
    FloatingButtonComponent,
    TabsComponent,
    ErrorConnectionComponent
  ],
  imports: [
    NativeScriptCommonModule,
  ],
  exports: [
    FloatingButtonComponent,
    TabsComponent,
    ErrorConnectionComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
