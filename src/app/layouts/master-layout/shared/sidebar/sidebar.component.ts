import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {SidebarService} from '../../../../services/services.index';
import {Router} from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, AfterViewInit {
  constructor(public sidebarService: SidebarService, private route: Router, private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#main-menu').metisMenu();
    this.cargarMenuLocalStorage();
  }

  cargarMenuLocalStorage() {
    const padre = localStorage.getItem('padre');
    const idmenu = localStorage.getItem('idmenu');

    if (document.getElementById(idmenu)) {
      if (padre === '0') {
        const element = document.getElementById(idmenu);
        this.render.addClass(element, 'active');
      } else {
        const xpadre = document.getElementById(padre);
        const xelementChild: any = xpadre.children[1];

        this.render.addClass(xpadre, 'active');
        this.render.setAttribute(xelementChild, 'aria-expanded', 'true');
        this.render.addClass(xelementChild, 'in');
      }
    }
  }

  quitarClassActive() {
    const classelement = document.getElementsByClassName('bk7item');
    Array.prototype.forEach.call(classelement, child => {
      this.render.removeClass(child, 'active');
      this.render.setAttribute(child, 'aria-expanded', 'false');
      this.render.removeClass(child, 'in');
    });
  }

  LoadUrl(url, idactive, padre) {
    this.quitarClassActive();
    this.route.navigateByUrl(url);
    const element = document.getElementById(idactive);
    this.render.addClass(element, 'active');
    localStorage.setItem('padre', padre);
    localStorage.setItem('idmenu', idactive);
  }
}
