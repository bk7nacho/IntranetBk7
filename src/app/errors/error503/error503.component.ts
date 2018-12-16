import { Component, OnInit } from '@angular/core';
import {APPNAME} from '../../config/config';

@Component({
  selector: 'app-error503',
  templateUrl: './error503.component.html',
  styleUrls: ['./error503.component.css']
})
export class Error503Component implements OnInit {
  appname: any = APPNAME;
  constructor() { }

  ngOnInit() {
  }

}
