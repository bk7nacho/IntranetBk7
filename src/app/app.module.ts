import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { MasterLayoutModule } from './layouts/master-layout/master-layout.module';
import { ErrorLayoutComponent } from './layouts/error-layout/error-layout.component';
import {AppHttpInterceptor} from './interceptor/app-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MasterLayoutComponent,
    ErrorLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MasterLayoutModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
