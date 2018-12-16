import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {URL_SERVICIO} from '../../config/config';
import {UsuarioModel} from '../../models/usuario.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public user: UsuarioModel;

  constructor(public http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    let rpta: boolean = false;
    try {
      rpta = (this.user.token.length > 0);
    }catch (e) {
      this.router.navigate(['/auth/login']);
    }
    return rpta;
  }

  getToken(): string {
    if (this.user === null) {
      return '';
    }
    return this.user.token;
  }

  private cargarStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.user = null;
    }
  }

  private guardarStorage() {
    localStorage.setItem('user',  JSON.stringify(this.user));
    localStorage.setItem('padre', '0');
    localStorage.setItem('idmenu', '1');
  }

  logout(){
    const url = URL_SERVICIO + '/api/logout';
    return this.http.get(url).pipe(
      map((data: any) => data),
      catchError(error => throwError(error))
    );
  }

  login( usuario: any) {

    if (usuario.remember_me) {
      localStorage.setItem('usuario', usuario.usuario);
    } else {
      localStorage.removeItem('usuario');
    }

    const url = URL_SERVICIO + '/api/auth/login';

    return this.http.post(url, usuario).pipe(map((data: any) => {
      this.user = new UsuarioModel();
      this.user.id = data.usuario.id;
      this.user.username = data.usuario.usuario;
      this.user.token = data.access_token;
      this.user.roles_id = data.usuario.roles_id;
      this.guardarStorage();
      return true;
    }), catchError((error: HttpErrorResponse) => {
      swal(error.statusText, error.error.error , 'error');
      return throwError(error);
    }));
  }

  verificarUsernameExist(username: string) {
      const url = URL_SERVICIO + '/api/findUsernameExists/' + username;
      return this.http.get(url).pipe(
          map((resp: any) => resp.data),
          catchError( error => throwError(error))
          );
  }
}
