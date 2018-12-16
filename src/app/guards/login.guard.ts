import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UsuarioService} from '../services/services.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usuarioService.estaLogueado()) {
      return true;
    } else {
        this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
