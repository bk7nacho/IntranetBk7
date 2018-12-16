import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MantenimientosRoutes} from './mantenimientos.routing';
import {GradoestudiosComponent} from './gradoestudios/gradoestudios.component';
import {ProfesionesComponent} from './profesiones/profesiones.component';
import {TipodocumentosComponent} from './tipodocumentos/tipodocumentos.component';
import {PeriodoacademicosComponent} from './periodoacademicos/periodoacademicos.component';
import {PaginacionComponent} from '../componentes/paginacion/paginacion.component';
import { PersonasComponent } from './personas/personas.component';
import { AddPersonaComponent } from './personas/add-persona/add-persona.component';
import { EditPersonaComponent } from './personas/edit-persona/edit-persona.component';
import { DocentesComponent } from './docentes/docentes.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { SecretariasComponent } from './secretarias/secretarias.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AddAdminComponent } from './administradores/add-admin/add-admin.component';
import { EditAdminComponent } from './administradores/edit-admin/edit-admin.component';
import {InputTrimModule} from "ng2-trim-directive";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    GradoestudiosComponent,
    ProfesionesComponent,
    TipodocumentosComponent,
    PeriodoacademicosComponent,
    PaginacionComponent,
    PersonasComponent,
    AddPersonaComponent,
    EditPersonaComponent,
    DocentesComponent,
    AlumnosComponent,
    SecretariasComponent,
    AdministradoresComponent,
    AddAdminComponent,
    EditAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MantenimientosRoutes),
    FormsModule,
    InputTrimModule,
      PipesModule
  ]
})
export class MantenimientosModule { }
