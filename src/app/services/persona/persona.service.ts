import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIO} from '../../config/config';
import {catchError, map} from 'rxjs/operators';
import {PaginacionModel} from '../../models/paginacion.model';
import {throwError} from 'rxjs';
import {PersonaModel} from '../../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  cargarPagina(urlpage: string) {
    return this.http.get(urlpage).pipe(
      map((resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  mostrarInfo(idPersona: any) {
    const url = URL_SERVICIO + '/api/persona/' + idPersona;
    return this.http.get(url).pipe(
        map( (resp: any) => resp.data as PersonaModel),
        catchError(error => throwError(error))
    );
  }

  listar() {
    const url = URL_SERVICIO + '/api/persona';
    return this.http.get(url).pipe(
      map( (resp: any) => resp.data as PaginacionModel),
      catchError(error => throwError(error))
    );
  }

  personaByNumdocumento(numdoc){
      const url = URL_SERVICIO + '/api/findPersonaByNumdocumento';
      return this.http.post(url, {'numdocumento' : numdoc}).pipe(
          map((resp: any) => resp.data),
          catchError(error => throwError(error))
      );
  }

  registrar(persona: PersonaModel) {
    const url = URL_SERVICIO + '/api/persona';
    return this.http.post(url, persona).pipe(
      map((resp: any) => resp.data as PersonaModel),
      catchError(error => throwError(error))
    );
  }

  eliminar(persona: PersonaModel) {
    const url = URL_SERVICIO + '/api/persona/' + persona.id;
    return this.http.delete(url).pipe(
      map((resp: any) => resp.data as PersonaModel),
      catchError(error => throwError(error))
    );
  }

  modificar(persona: PersonaModel){
    const url = URL_SERVICIO + '/api/persona/' + persona.id;
    return this.http.put(url, persona).pipe(
      map((resp: any) => resp.data as PersonaModel),
      catchError(error => throwError(error))
    );
  }

}
