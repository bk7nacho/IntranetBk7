import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIO} from '../../config/config';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {PaisModel} from '../../models/pais.model';
import {DepartamentoModel} from '../../models/departamento.model';
import {ProvinciaModel} from '../../models/provincia.model';
import {DistritoModel} from '../../models/distrito.model';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http: HttpClient) { }

  listarPaises() {
    const url = URL_SERVICIO + '/api/paises'
    return this.http.get(url).pipe(
      map((resp: any) => resp.data as PaisModel[]),
      catchError(error => throwError(error))
    );
  }

  listarDepartamentos() {
    const url = URL_SERVICIO + '/api/departamentos';
    return this.http.get(url).pipe(
      map((resp: any) => resp.data as DepartamentoModel[]),
      catchError(error => throwError(error))
    );
  }

  listarProvincias(departamento_id) {
    const url = URL_SERVICIO + '/api/departamentos/' + departamento_id + '/provincias';
    return this.http.get(url).pipe(
      map((resp: any) => resp.data as ProvinciaModel[]),
      catchError(error => throwError(error))
    );
  }

  listarDistritos(provincia_id) {
    const url = URL_SERVICIO + '/api/provincias/' + provincia_id + '/distritos';
    return this.http.get(url).pipe(
      map((resp: any) => resp.data as DistritoModel[]),
      catchError(error => throwError(error))
    );
  }

}
