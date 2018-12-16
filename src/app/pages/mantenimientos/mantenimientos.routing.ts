import {Routes} from '@angular/router';
import {GradoestudiosComponent} from './gradoestudios/gradoestudios.component';
import {PeriodoacademicosComponent} from './periodoacademicos/periodoacademicos.component';
import {TipodocumentosComponent} from './tipodocumentos/tipodocumentos.component';
import {ProfesionesComponent} from './profesiones/profesiones.component';
import {PersonasComponent} from './personas/personas.component';
import {AddPersonaComponent} from './personas/add-persona/add-persona.component';
import {EditPersonaComponent} from './personas/edit-persona/edit-persona.component';
import {AlumnosComponent} from "./alumnos/alumnos.component";
import {DocentesComponent} from "./docentes/docentes.component";
import {SecretariasComponent} from "./secretarias/secretarias.component";
import {AdministradoresComponent} from "./administradores/administradores.component";
import {AddAdminComponent} from "./administradores/add-admin/add-admin.component";
import {EditAdminComponent} from "./administradores/edit-admin/edit-admin.component";

export const MantenimientosRoutes: Routes = [
  { path: 'gradoestudio', component: GradoestudiosComponent, data: {padre: 'Mantenimientos', titulo: 'Grado de Estudio'}},
  { path: 'periodoacademico', component: PeriodoacademicosComponent, data: {padre: 'Mantenimientos', titulo: 'Periodo Académico'}},
  { path: 'tipodocumento', component: TipodocumentosComponent, data: {padre: 'Mantenimientos', titulo: 'Tipos de Documento'}},
  { path: 'profesiones', component: ProfesionesComponent, data: {padre: 'Mantenimientos', titulo: 'Profesiones'}},
  { path: 'personas', component: PersonasComponent, data: {padre: 'Mantenimientos', titulo: 'Personas'}},
  { path: 'addpersona', component: AddPersonaComponent, data: {padre: 'Mantenimientos', titulo: 'Registrar Persona'}},
  { path: 'editpersona/:id', component: EditPersonaComponent, data: {padre: 'Mantenimientos', titulo: 'Editar Persona'}},
    { path: 'alumnos', component: AlumnosComponent, data: {padre: 'Mantenimientos', titulo: 'Alumnos'}},
    { path: 'docentes', component: DocentesComponent, data: {padre: 'Mantenimientos', titulo: 'Docentes'}},
    { path: 'secretarias', component: SecretariasComponent, data: {padre: 'Mantenimientos', titulo: 'Secretarias'}},
    { path: 'administradores', component: AdministradoresComponent, data: {padre: 'Mantenimientos', titulo: 'Administradores'}},
    { path: 'addadmin', component: AddAdminComponent, data: {padre: 'Mantenimientos', titulo: 'Registrar Administrador'}},
    { path: 'editadmin/:id', component: EditAdminComponent, data: {padre: 'Mantenimientos', titulo: 'Editar Administrador'}},
];
