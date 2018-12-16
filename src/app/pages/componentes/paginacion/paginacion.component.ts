import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PaginacionModel} from '../../../models/paginacion.model';
import {Observable} from 'rxjs';
import { range } from 'rxjs';
import {filter, map, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit, OnChanges {
  @Input() paginacion: PaginacionModel = new PaginacionModel();
  @Output() pageChange: EventEmitter<string> = new EventEmitter<string>();

  range = 3;

  pages: Observable<number[]>;

  constructor() { }

  ngOnInit() {
    this.getPages();
  }

  ngOnChanges() {
    this.getPages();
  }

  selectPage(url: string) {
    if (url !== this.getUrlPage(this.paginacion.current_page)) {
      this.pageChange.emit(url);
    }
  }

  getPages() {
    this.pages = range(-this.range, this.range * 2 + 1)
      .pipe(map(offset => this.paginacion.current_page + offset))
      .pipe(filter(page => this.isValidPageNumber(page, this.paginacion.last_page)))
      .pipe(toArray());
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getUrlPage(page) {
    return this.paginacion.path + '?page=' + page;
  }

}
