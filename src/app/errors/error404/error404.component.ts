import { Component, OnInit } from '@angular/core';
import {APPNAME} from '../../config/config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  appname: any = APPNAME;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goUrl(url) {
    localStorage.setItem('padre','0');
    localStorage.setItem('idmenu','1');
    this.route.navigateByUrl(url);
  }

}
