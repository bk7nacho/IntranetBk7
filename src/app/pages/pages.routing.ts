import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: {padre: 'Página', titulo: 'Dashboard'} }
];
