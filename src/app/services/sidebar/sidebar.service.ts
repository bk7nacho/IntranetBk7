import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  groups: any = [ {
    idgroups: 1,
    title_group: 'Main',
    menu: [
      {idmenu: 1, titulo: 'Dashboard', icono: 'icon-home', url: '/dashboard'},
      {idmenu: 2, titulo: 'Mantenimientos', icono: 'icon-home', url: '', submenu: [
          {idmenu: 2.1, titulo: 'Profesiones', url: '/mantenimiento/profesiones'},
          {idmenu: 2.2, titulo: 'Tipos de Documento', url: '/mantenimiento/tipodocumento'},
          {idmenu: 2.3, titulo: 'Grados de Estudio', url: '/mantenimiento/gradoestudio'},
          {idmenu: 2.4, titulo: 'Periodos Academicos', url: '/mantenimiento/periodoacademico'},
        ]
      },
      {idmenu: 3, titulo: 'Core Colegio', icono: 'icon-home', url: '', submenu: [
          {idmenu: 3.1, titulo: 'Alumnos', url: '/mantenimiento/alumnos'},
          {idmenu: 3.2, titulo: 'Docentes', url: '/mantenimiento/docentes'},
          {idmenu: 3.3, titulo: 'Secretarias', url: '/mantenimiento/secretarias'},
          {idmenu: 3.4, titulo: 'Administradores', url: '/mantenimiento/administradores'},
          {idmenu: 3.5, titulo: 'Personas', url: '/mantenimiento/personas'}
        ]
      }
    ]
  }
  ];

  constructor() { }
}
