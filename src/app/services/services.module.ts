import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {GradoestudioService, UsuarioService} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService, GradoestudioService
  ]
})
export class ServicesModule { }
