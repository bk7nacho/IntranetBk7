import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { DashboardComponent} from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        MantenimientosModule,
        PipesModule
    ]
})
export class PagesModule { }
