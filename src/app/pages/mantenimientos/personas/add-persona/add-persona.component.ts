import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';
import {TipodocumentoService} from '../../../../services/tipodocumento/tipodocumento.service';
import {GradoestudioService} from '../../../../services/gradoestudio/gradoestudio.service';
import {ProfesionService} from '../../../../services/profesion/profesion.service';
import {PersonaService} from '../../../../services/persona/persona.service';
import {UbigeoService} from '../../../../services/ubigeo/ubigeo.service';
import {PersonaModel} from '../../../../models/persona.model';
import {TipoDocumentoModel} from '../../../../models/tipoDocumento.model';
import {GradoEstudioModel} from '../../../../models/gradoEstudio.model';
import {ProfesionModel} from '../../../../models/profesion.model';
import {DepartamentoModel} from '../../../../models/departamento.model';
import {ProvinciaModel} from '../../../../models/provincia.model';
import {DistritoModel} from '../../../../models/distrito.model';
import {PaisModel} from '../../../../models/pais.model';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit {
  persona: PersonaModel;

  paises: PaisModel[] = [];
  departamentos: DepartamentoModel[] = [];
  provincias: ProvinciaModel[] = [];
  distritos: DistritoModel[] = [];
  tipodocumentos: TipoDocumentoModel[] = [];
  gradoestudios: GradoEstudioModel[] = [];
  profesiones: ProfesionModel[] = [];

  constructor(
    private ubigeoService: UbigeoService,
    private tipodocService: TipodocumentoService,
    private gradoestudioService: GradoestudioService,
    private profesionService: ProfesionService,
    private personaService: PersonaService
  ) {
    this.persona = new PersonaModel();
  }

  ngOnInit() {
    this.cargarPaises();
    this.cargarDepartamentos();
    this.cargarTipoDocumentos();
    this.cargarGradoEstudios();
    this.cargarProfesiones();
  }

  cargarGradoEstudios() {
    this.gradoestudioService.listarSinPaginar().subscribe(data => this.gradoestudios = data,
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  cargarProfesiones() {
    this.profesionService.listarSinPaginar().subscribe(data => this.profesiones = data,
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  cargarTipoDocumentos() {
    this.tipodocService.listarSinPaginar().subscribe(data => this.tipodocumentos = data,
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  cargarPaises() {
    this.ubigeoService.listarPaises().subscribe(data => this.paises = data,
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
      );
  }

  cargarDepartamentos() {
    this.ubigeoService.listarDepartamentos().subscribe(
      data => {
        this.departamentos = data;
      },
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  cargarProvincias(departamento_id) {
    this.ubigeoService.listarProvincias(departamento_id).subscribe(
      data => this.provincias = data,
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  cargarDistritos(provincia_id) {
    this.ubigeoService.listarDistritos(provincia_id).subscribe(
      data => this.distritos = data,
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  onChangeDepartamento(id) {
    if (id != '0') {
      this.cargarProvincias(id);
      this.distritos = [];
    } else {
      this.provincias = [];
      this.distritos = [];
    }

  }

  onChangeProvincia(id) {
    if (id != '0') {
      this.cargarDistritos(id);
    } else {
      this.distritos = [];
    }
  }

  registrarPersona(fper: NgForm) {
    this.persona = fper.value as PersonaModel;
    this.personaService.registrar(this.persona).subscribe(
      (data: PersonaModel) => {
        swal('Registro Exitoso','La persona: ' + data.nombres + ' ' + data.paterno + ' se registró correctamente','success');
        fper.resetForm();
    },
      (error: any) => {
        swal('Error al Registrar','Error: ' + error.error.error,'warning');
      });
  }
}
