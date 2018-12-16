import {Component, OnInit, ViewChild} from '@angular/core';
import {GradoestudioService} from '../../../services/services.index';
import {PaginacionModel} from '../../../models/paginacion.model';
import {NgForm} from '@angular/forms';
import swal from 'sweetalert2';
import {GradoEstudioModel} from '../../../models/gradoEstudio.model';

declare function cerrarModal(idModal);

@Component({
  selector: 'app-gradoestudios',
  templateUrl: './gradoestudios.component.html',
  styles: []
})
export class GradoestudiosComponent implements OnInit {
  @ViewChild('fnuevo') fnuevo: NgForm;
  @ViewChild('fmodificar') fmodificar: NgForm;

  paginacion: PaginacionModel = new PaginacionModel();
  gradoestudio: GradoEstudioModel;

  constructor(public gradoestudioService: GradoestudioService) {
    this.gradoestudio = new GradoEstudioModel();
  }

  ngOnInit() {
    this.cargarEntidades();
  }

  cargarEntidades() {
    this.gradoestudioService.listar().subscribe(data => {
       this.paginacion = data;
    } );
  }

  onPageChange($e) {
    this.gradoestudioService.cargarPagina($e).subscribe(data => {
      this.paginacion = data;
    });
  }

  editar(_gradoestudio: any) {
    console.log(_gradoestudio);
    this.gradoestudio.id = _gradoestudio.id;
    this.gradoestudio.nombre = _gradoestudio.nombre;
    this.gradoestudio.descripcion = _gradoestudio.descripcion;
  }

  limpiar(x: NgForm) {
    x.reset();
  }
  registrar() {
    let ge = new GradoEstudioModel();
    ge.nombre = this.fnuevo.value.nombre;
    ge.descripcion = this.fnuevo.value.descripcion;

    this.gradoestudioService.registrar(ge)
      .subscribe((data: GradoEstudioModel) => {
        this.cargarEntidades();
        this.fnuevo.reset();
        swal('Registro Exitoso',
          'El Grado de Estudio: ' + data.nombre + ' se registró correctamente',
          'success');
        cerrarModal('RegistroGradoEstudioModal');
      },
        (error: any) => {
        swal('Error al Registrar',
          'Error: ' + error.error.error,
          'warning');
        });
  }

  eliminar(gradoestudio: any) {
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
        this.gradoestudioService.eliminar(gradoestudio).subscribe(
          (data: GradoEstudioModel) => {
            this.cargarEntidades();
            swal('Eliminación Exitosa',
              'El Grado de Estudio: ' + data.nombre + ' se eliminó correctamente',
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

  actualizar() {
    let ge = new GradoEstudioModel();
    ge.id = this.fmodificar.value.id;
    ge.nombre = this.fmodificar.value.nombre;
    ge.descripcion = this.fmodificar.value.descripcion;

    this.gradoestudioService.modificar(ge)
      .subscribe((data: GradoEstudioModel) => {
          this.cargarEntidades();
          swal('Actualización Exitosa',
            'El Grado de Estudio: ' + data.nombre + ' se actualizó correctamente',
            'success');
          this.fmodificar.reset();
          cerrarModal('ModificarGradoEstudioModal');
        },
        (error: any) => {
          swal('Error al Registrar',
            'Error: ' + error.error.error,
            'warning');
        });
  }

}
