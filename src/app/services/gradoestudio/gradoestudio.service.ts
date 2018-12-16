import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {URL_SERVICIO} from '../../config/config';
import {UsuarioService} from '../usuario/usuario.service';
import {PaginacionModel} from '../../models/paginacion.model';
import {GradoEstudioModel} from '../../models/gradoEstudio.model';

@Injectable({
  providedIn: 'root'
})
export class GradoestudioService {

  constructor(public http: HttpClient) { }

  listar() {
    const url = URL_SERVICIO + '/api/gradoestudio';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  listarSinPaginar() {
    const url = URL_SERVICIO + '/api/gradoestudioSinPaginar';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as GradoEstudioModel[]),
      catchError(error => throwError(error))
    );
  }

  cargarPagina(urlpage: string) {
    return this.http.get(urlpage).pipe(
      map((resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  registrar(gradoestudio: GradoEstudioModel) {
    const url = URL_SERVICIO + '/api/gradoestudio';
    return this.http.post(url, gradoestudio).pipe(
      map((resp: any) => resp.data as GradoEstudioModel),
      catchError(error => throwError(error))
    );
  }

  eliminar(gradoestudio: GradoEstudioModel) {
    const url = URL_SERVICIO + '/api/gradoestudio/' + gradoestudio.id;
    return this.http.delete(url).pipe(
      map((resp: any) => resp.data as GradoEstudioModel),
      catchError(error => throwError(error))
    );
  }

  modificar(gradoestudio: GradoEstudioModel){
    const url = URL_SERVICIO + '/api/gradoestudio/' + gradoestudio.id;
    return this.http.put(url, gradoestudio).pipe(
      map((resp: any) => resp.data as GradoEstudioModel),
      catchError(error => throwError(error))
    );
  }

}
