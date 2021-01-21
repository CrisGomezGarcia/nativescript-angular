import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { FloatingButtonComponent } from './components/floating-button/floating-button.component';

@NgModule({
  declarations: [
    FloatingButtonComponent
  ],
  imports: [
    NativeScriptCommonModule
  ],
  exports: [
    FloatingButtonComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
