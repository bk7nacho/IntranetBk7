import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {MasterLayoutComponent} from './layouts/master-layout/master-layout.component';
import {LoginGuard} from './guards/login.guard';
import {ErrorLayoutComponent} from './layouts/error-layout/error-layout.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: '', runGuardsAndResolvers: 'always', component: AuthLayoutComponent, children: [
      {path: 'auth', loadChildren: './authentication/authentication.module#AuthenticationModule'}
    ]},
  { path: '', canActivate: [ LoginGuard ], component: MasterLayoutComponent, children: [
      { path: '', loadChildren: './pages/pages.module#PagesModule'}
    ]},
  { path: '', canActivate: [ LoginGuard ], component: MasterLayoutComponent, children: [
      { path: 'mantenimiento', loadChildren: './pages/mantenimientos/mantenimientos.module#MantenimientosModule'}
    ]},
  { path: '', component: ErrorLayoutComponent, children: [
      { path: 'error', loadChildren: './errors/errors.module#ErrorsModule'}
    ]},
  { path: '**', redirectTo: '/error/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
