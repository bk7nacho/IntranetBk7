import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label = '';
  padre = '';

  constructor(private router: Router,
              public title: Title,
              public meta: Meta)
  {
    this.getDataRoute()
      .subscribe(data => {
        this.label = data.titulo;
        this.padre = data.padre;
        this.title.setTitle(data.titulo);
        this.meta.updateTag(this.getMetaDefinition('description', this.label));
      });
  }

  private getMetaDefinition(nombre, contenido): MetaDefinition {
    const meta: MetaDefinition = { name: nombre, content: contenido};
    return meta;
  }

  getDataRoute() {
    return this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .pipe(filter((e: ActivationEnd) => e.snapshot.firstChild === null ))
      .pipe(map((e: ActivationEnd) => e.snapshot.data))
      ;
  }

  ngOnInit() {
  }

}
