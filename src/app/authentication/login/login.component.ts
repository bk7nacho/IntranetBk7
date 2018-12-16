import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {UsuarioService} from '../../services/services.index';
import {Subscription} from 'rxjs';
import {APPNAME} from '../../config/config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  navigationSubscription: Subscription;
  usuario: string;
  recuerdame = false;
  appname: any = APPNAME;

  constructor(public usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario') || '';
    if (this.usuario.length > 0) {
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const user = {
      usuario: forma.value.usuario,
      password: forma.value.password,
      remember_me: forma.value.recuerdame
    };

    this.navigationSubscription = this.usuarioService.login(user)
      .subscribe((e: any) => {
        this.router.navigate(['/dashboard']);
      });
  }
}
