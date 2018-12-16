import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaModel} from "../../../../models/persona.model";
import {PaisModel} from "../../../../models/pais.model";
import {DepartamentoModel} from "../../../../models/departamento.model";
import {ProvinciaModel} from "../../../../models/provincia.model";
import {DistritoModel} from "../../../../models/distrito.model";
import {TipoDocumentoModel} from "../../../../models/tipoDocumento.model";
import {GradoEstudioModel} from "../../../../models/gradoEstudio.model";
import {ProfesionModel} from "../../../../models/profesion.model";
import {UbigeoService} from "../../../../services/ubigeo/ubigeo.service";
import {TipodocumentoService} from "../../../../services/tipodocumento/tipodocumento.service";
import {GradoestudioService} from "../../../../services/gradoestudio/gradoestudio.service";
import {ProfesionService} from "../../../../services/profesion/profesion.service";
import {PersonaService} from "../../../../services/persona/persona.service";
import swal from "sweetalert2";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styles: []
})
export class EditPersonaComponent implements OnInit {
    persona: PersonaModel;

    paises: PaisModel[] = [];
    departamentos: DepartamentoModel[] = [];
    provincias: ProvinciaModel[] = [];
    distritos: DistritoModel[] = [];
    tipodocumentos: TipoDocumentoModel[] = [];
    gradoestudios: GradoEstudioModel[] = [];
    profesiones: ProfesionModel[] = [];

    idPersona : number = 0;

    constructor(private ubigeoService: UbigeoService,
              private tipodocService: TipodocumentoService,
              private gradoestudioService: GradoestudioService,
              private profesionService: ProfesionService,
              private personaService: PersonaService,
              private activatedRoute: ActivatedRoute,
                private route: Router) {
        this.persona = new PersonaModel();
    }

    ngOnInit() {
        this.idPersona = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.cargarPersona(this.idPersona);
        this.cargarPaises();
        this.cargarDepartamentos();
        this.cargarTipoDocumentos();
        this.cargarGradoEstudios();
        this.cargarProfesiones();
    }

    cargarPersona(id: number) {
        this.personaService.mostrarInfo(id).subscribe( data => {
                this.persona = data;
                this.cargarProvincias(this.persona.departamentos_id);
                this.cargarDistritos(this.persona.provincias_id);
            },
            (error: any) => {
                swal('Error Inesperado', error.error.error, 'warning');
                if(error.error.code === 404){
                    this.route.navigateByUrl('/error/404');
                }
            }
        );
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

    actualizarPersona() {
        this.personaService.modificar(this.persona).subscribe(
            (data: PersonaModel) => {
                swal('Actualización Exitosa','La persona: ' + data.nombres + ' ' + data.paterno + ' se actualizó correctamente','success');
            },
            (error: any) => {
                swal('Error al actualizar','Error: ' + error.error.error,'warning');
            }
        );
    }

}
