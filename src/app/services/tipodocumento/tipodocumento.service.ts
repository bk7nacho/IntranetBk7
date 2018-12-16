import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioService} from '../usuario/usuario.service';
import {catchError, map} from 'rxjs/operators';
import {PaginacionModel} from '../../models/paginacion.model';
import {URL_SERVICIO} from '../../config/config';
import {TipoDocumentoModel} from '../../models/tipoDocumento.model';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  constructor(public http: HttpClient) { }

  cargarPagina(urlpage: string) {
    return this.http.get(urlpage).pipe(
      map((resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  listarSinPaginar() {
    const url = URL_SERVICIO + '/api/tipodocumentoSinPaginar';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as TipoDocumentoModel[]),
      catchError(error => throwError(error))
    );
  }

  listar() {
    const url = URL_SERVICIO + '/api/tipodocumento';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  registrar(tipodoc: TipoDocumentoModel) {
    const url = URL_SERVICIO + '/api/tipodocumento';
    return this.http.post(url, tipodoc).pipe(
      map((resp: any) => resp.data as TipoDocumentoModel),
      catchError(error => throwError(error))
    );
  }

  eliminar(tipodoc: TipoDocumentoModel) {
    const url = URL_SERVICIO + '/api/tipodocumento/' + tipodoc.id;
    return this.http.delete(url).pipe(
      map((resp: any) => resp.data as TipoDocumentoModel),
      catchError(error => throwError(error))
    );
  }

  modificar(tipodoc: TipoDocumentoModel){
    const url = URL_SERVICIO + '/api/tipodocumento/' + tipodoc.id;
    return this.http.put(url, tipodoc).pipe(
      map((resp: any) => resp.data as TipoDocumentoModel),
      catchError(error => throwError(error))
    );
  }
}
