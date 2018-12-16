import {Component, Renderer2} from '@angular/core';
import {THEME} from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theme: any = THEME;
  constructor( private renderer: Renderer2) {
    this.renderer.addClass(document.body, this.theme);
  }
}
