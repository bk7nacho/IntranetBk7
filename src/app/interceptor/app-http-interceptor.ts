import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsuarioService} from '../services/services.index';
import {Router} from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  token: string = '';
  authReq: any;

  constructor(private usuarioService: UsuarioService, public router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.usuarioService.getToken();
    if (this.token){
      this.authReq = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + this.token)
          .set('Accept', 'application/json')
      }
      );
    }else {
      this.authReq = req.clone();
    }

    return next.handle(this.authReq).pipe(
      tap(
        () => {},
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )
    );
  }

}
