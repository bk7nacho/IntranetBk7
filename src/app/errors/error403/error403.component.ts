import { Component, OnInit } from '@angular/core';
import {APPNAME} from '../../config/config';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css']
})
export class Error403Component implements OnInit {
  appname: any = APPNAME;

  constructor() { }

  ngOnInit() {
  }

}
