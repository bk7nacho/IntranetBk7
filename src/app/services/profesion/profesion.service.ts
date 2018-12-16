import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioService} from '../usuario/usuario.service';
import {URL_SERVICIO} from '../../config/config';
import {catchError, map} from 'rxjs/operators';
import {PaginacionModel} from '../../models/paginacion.model';
import {ProfesionModel} from '../../models/profesion.model';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {

  constructor(public http: HttpClient) { }

  cargarPagina(urlpage: string) {
    return this.http.get(urlpage).pipe(
      map((resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  listar() {
    const url = URL_SERVICIO + '/api/profesion';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  listarSinPaginar() {
    const url = URL_SERVICIO + '/api/profesionSinPaginar';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as ProfesionModel[]),
      catchError(error => throwError(error))
    );
  }

  registrar(profesion: ProfesionModel) {
    const url = URL_SERVICIO + '/api/profesion';
    return this.http.post(url, profesion).pipe(
      map((resp: any) => resp.data as ProfesionModel),
      catchError(error => throwError(error))
    );
  }

  eliminar(profesion: ProfesionModel) {
    const url = URL_SERVICIO + '/api/profesion/' + profesion.id;
    return this.http.delete(url).pipe(
      map((resp: any) => resp.data as ProfesionModel),
      catchError(error => throwError(error))
    );
  }

  modificar(profesion: ProfesionModel){
    const url = URL_SERVICIO + '/api/profesion/' + profesion.id;
    return this.http.put(url, profesion).pipe(
      map((resp: any) => resp.data as ProfesionModel),
      catchError(error => throwError(error))
    );
  }
}
