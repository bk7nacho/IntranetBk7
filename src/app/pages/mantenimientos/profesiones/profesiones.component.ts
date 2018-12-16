import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginacionModel} from '../../../models/paginacion.model';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';
import {ProfesionModel} from '../../../models/profesion.model';
import {ProfesionService} from '../../../services/profesion/profesion.service';

declare function cerrarModal(idModal);

@Component({
  selector: 'app-profesiones',
  templateUrl: './profesiones.component.html',
  styles: []
})
export class ProfesionesComponent implements OnInit {
  @ViewChild('fnuevo') fnuevo: NgForm;
  @ViewChild('fmodificar') fmodificar: NgForm;

  paginacion: PaginacionModel = new PaginacionModel();
  profesion: ProfesionModel;

  constructor(public profesionService: ProfesionService) {
    this.profesion = new ProfesionModel();
  }

  ngOnInit() {
    this.cargarEntidades();
  }

  cargarEntidades() {
    this.profesionService.listar().subscribe(
      data => { this.paginacion = data; },
      error => swal('Error Inesperado', 'Se ha producido un error inesperado, por favor comunicarse con el administrador', 'warning')
    );
  }

  onPageChange($e) {
    this.profesionService.cargarPagina($e).subscribe(data => {
      this.paginacion = data;
    });
  }

  editar(_profesion: any) {
    this.profesion.id = _profesion.id;
    this.profesion.nombre = _profesion.nombre;
    this.profesion.descripcion = _profesion.descripcion;
  }

  limpiar(x: NgForm) {
    x.reset();
  }
  registrar() {
    let p = new ProfesionModel();
    p.nombre = this.fnuevo.value.nombre;
    p.descripcion = this.fnuevo.value.descripcion;

    this.profesionService.registrar(p)
      .subscribe((data: ProfesionModel) => {
          this.cargarEntidades();
          this.fnuevo.reset();
          swal('Registro Exitoso',
            'La profesión: ' + data.nombre + ' se registró correctamente',
            'success');
          cerrarModal('RegistroProfesionModal');
        },
        (error: any) => {
          swal('Error al Registrar',
            'Error: ' + error.error.error,
            'warning');
        });
  }

  eliminar(profesion: any) {
    swal({
      title: 'Estas seguro que desea eliminar?',
      text: 'Posterior a esto no será posible revertir la eliminación!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, gracias!',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.profesionService.eliminar(profesion).subscribe(
          (data: ProfesionModel) => {
            this.cargarEntidades();
            swal('Eliminación Exitosa',
              'La profesión: ' + data.nombre + ' se eliminó correctamente',
              'success');
          },
          (error: any) => {
            swal('Error al Registrar',
              'Error: ' + error.error.error,
              'warning');
          }
        );
      }
    })
  }

  actualizar() {
    let p = new ProfesionModel();
    p.id = this.fmodificar.value.id;
    p.nombre = this.fmodificar.value.nombre;
    p.descripcion = this.fmodificar.value.descripcion;

    this.profesionService.modificar(p)
      .subscribe((data: ProfesionModel) => {
          this.cargarEntidades();
          swal('Actualización Exitosa',
            'La profesión: ' + data.nombre + ' se actualizó correctamente',
            'success');
          this.fmodificar.reset();
          cerrarModal('ModificarProfesionModal');
        },
        (error: any) => {
          swal('Error al Registrar',
            'Error: ' + error.error.error,
            'warning');
        });
  }

}
