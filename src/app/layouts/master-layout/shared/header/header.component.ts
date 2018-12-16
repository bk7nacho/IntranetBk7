import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../../services/services.index';
import {UsuarioModel} from '../../../../models/usuario.model';
declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
      $('.btn-toggle-fullwidth').on('click', function() {
          if(!$('body').hasClass('menu-icon')) {
              $('body').addClass('menu-icon');

              // Small menu hover add class
              $('.menu-icon .metismenu li').hover(
                  function(){ $(this).addClass('hover')},
                  function(){ $(this).removeClass('hover')}
              )

          } else {
              $('body').removeClass('menu-icon');
          }
      });
      $('.btn-toggle-offcanvas').on('click', function() {
          $('body').toggleClass('offcanvas-active');
      });

      $('#main-content').on('click', function() {
          $('body').removeClass('offcanvas-active');
      });
  }

  logout() {
    this.usuarioService.logout().subscribe(
      (data: any) => {
        this.router.navigate(['/auth/login']);
        localStorage.removeItem('user');
        localStorage.removeItem('padre');
        localStorage.removeItem('idmenu');
        this.usuarioService.user = new UsuarioModel();
      },
      error => {
        console.log(error);
      }
    );
  }

}
