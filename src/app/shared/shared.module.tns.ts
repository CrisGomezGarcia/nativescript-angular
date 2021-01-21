import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    FloatingButtonComponent,
    TabsComponent
  ],
  imports: [
    NativeScriptCommonModule,
  ],
  exports: [
    FloatingButtonComponent,
    TabsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
