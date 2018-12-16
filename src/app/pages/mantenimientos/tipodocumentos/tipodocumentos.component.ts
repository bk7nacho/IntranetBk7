import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PaginacionModel} from '../../../models/paginacion.model';
import swal from "sweetalert2";
import {TipoDocumentoModel} from '../../../models/tipoDocumento.model';
import {TipodocumentoService} from '../../../services/tipodocumento/tipodocumento.service';

declare function cerrarModal(idModal);

@Component({
  selector: 'app-tipodocumentos',
  templateUrl: './tipodocumentos.component.html',
  styles: []
})
export class TipodocumentosComponent implements OnInit {
  @ViewChild('fnuevo') fnuevo: NgForm;
  @ViewChild('fmodificar') fmodificar: NgForm;

  paginacion: PaginacionModel = new PaginacionModel();
  tipodoc: TipoDocumentoModel;

  constructor(public tipodocumentoService: TipodocumentoService) {
    this.tipodoc = new TipoDocumentoModel();
  }

  ngOnInit() {
    this.cargarEntidades();
  }

  cargarEntidades() {
    this.tipodocumentoService.listar().subscribe(data => {
      this.paginacion = data;
    } );
  }

  onPageChange($e) {
    this.tipodocumentoService.cargarPagina($e).subscribe(data => {
      this.paginacion = data;
    });
  }

  editar(_tipodoc: any) {
    this.tipodoc.id = _tipodoc.id;
    this.tipodoc.nombre = _tipodoc.nombre;
    this.tipodoc.descripcion = _tipodoc.descripcion;
  }

  limpiar(x: NgForm) {
    x.reset();
  }
  registrar() {
    let p = new TipoDocumentoModel();
    p.nombre = this.fnuevo.value.nombre;
    p.descripcion = this.fnuevo.value.descripcion;

    this.tipodocumentoService.registrar(p)
      .subscribe((data: TipoDocumentoModel) => {
          this.cargarEntidades();
          this.fnuevo.reset();
          swal('Registro Exitoso',
            'El tipo de documento: ' + data.nombre + ' se registró correctamente',
            'success');
          cerrarModal('RegistroTipoDocModal');
        },
        (error: any) => {
          swal('Error al Registrar',
            'Error: ' + error.error.error,
            'warning');
        });
  }

  eliminar(tipodoc: any) {
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
        this.tipodocumentoService.eliminar(tipodoc).subscribe(
          (data: TipoDocumentoModel) => {
            this.cargarEntidades();
            swal('Eliminación Exitosa',
              'El tipo de documento: ' + data.nombre + ' se eliminó correctamente',
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
    let p = new TipoDocumentoModel();
    p.id = this.fmodificar.value.id;
    p.nombre = this.fmodificar.value.nombre;
    p.descripcion = this.fmodificar.value.descripcion;

    this.tipodocumentoService.modificar(p)
      .subscribe((data: TipoDocumentoModel) => {
          this.cargarEntidades();
          swal('Actualización Exitosa',
            'El tipo de documento: ' + data.nombre + ' se actualizó correctamente',
            'success');
          this.fmodificar.reset();
          cerrarModal('ModificarTipoDocModal');
        },
        (error: any) => {
          swal('Error al Registrar',
            'Error: ' + error.error.error,
            'warning');
        });
  }
}
