import {Routes} from '@angular/router';
import {Error403Component, Error404Component, Error500Component, Error503Component} from './errors.index';

export const ErrorsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '403', component: Error403Component},
      { path: '404', component: Error404Component},
      { path: '500', component: Error500Component},
      { path: '503', component: Error503Component}
    ]
  }

];
