import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ErrorsRoutes} from './errors.routing';
import { Error500Component } from './error500/error500.component';
import { Error503Component } from './error503/error503.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [Error404Component, Error503Component, Error500Component, Error403Component],
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorsRoutes)
  ]
})
export class ErrorsModule {}
