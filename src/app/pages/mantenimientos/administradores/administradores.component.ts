import { Component, OnInit } from '@angular/core';
import {PaginacionModel} from "../../../models/paginacion.model";
import {Router} from "@angular/router";
import {AdministradorService} from "../../../services/administrador/administrador.service";

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

    paginacion: PaginacionModel = new PaginacionModel();

    constructor(private route: Router, private administradorService: AdministradorService) { }

    ngOnInit() {
        this.cargarEntidades();
    }

    cargarEntidades() {
        this.administradorService.listar().subscribe(data => {
            this.paginacion = data;
        } );
    }

    onPageChange($e) {
        this.administradorService.cargarPagina($e).subscribe(data => {
            this.paginacion = data;
        });
    }

    addAdministrador() {
        this.route.navigateByUrl('/mantenimiento/addadmin');
    }

}
