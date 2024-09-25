import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ENModule } from 'en-angular';
import { CommonModule } from '@angular/common';
import { ModuleRegistry } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { SecurityComponent } from './security/security.component';

ModuleRegistry.registerModules([RowGroupingModule, SideBarModule]);

@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ENModule,
    LoginComponent,
    SignupComponent,
    ForgotpwdComponent,
    SecurityComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
