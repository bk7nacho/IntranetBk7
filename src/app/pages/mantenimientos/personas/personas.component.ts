import { Component, OnInit } from '@angular/core';
import {PaginacionModel} from '../../../models/paginacion.model';
import {PersonaService} from '../../../services/services.index';
import swal from "sweetalert2";
import {GradoEstudioModel} from '../../../models/gradoEstudio.model';
import {PersonaModel} from '../../../models/persona.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: []
})
export class PersonasComponent implements OnInit {

  paginacion: PaginacionModel = new PaginacionModel();

  constructor(private personaService: PersonaService, private route: Router) { }

  ngOnInit() {
    this.cargarEntidades();
  }

  addPersona(){
    this.route.navigateByUrl('/mantenimiento/addpersona');
  }

  cargarEntidades() {
    this.personaService.listar().subscribe(data => {
      this.paginacion = data;
    } );
  }

  onPageChange($e) {
    this.personaService.cargarPagina($e).subscribe(data => {
      this.paginacion = data;
    });
  }

  editar(idpersona: any) {
    this.route.navigate(['/mantenimiento/editpersona', idpersona])
  }

  eliminar(persona: any) {
    swal({
      title: 'Estas seguro que desea eliminar?',
      text: "Posterior a esto no será posible revertir la eliminación!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, gracias!',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.personaService.eliminar(persona).subscribe(
          (data: PersonaModel) => {
            this.cargarEntidades();
            swal('Eliminación Exitosa',
              'La persona: ' + data.nombres + ' ' + data.paterno + ' se eliminó correctamente',
              'success');
          },
          (error: any) => {
            swal('Error al Registrar',
              'Error: ' + error.error.error,
              'warning');
          }
        );
      }
    });
  }
}
