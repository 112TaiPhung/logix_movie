import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableHistoryComponent implements OnInit {
  @Input() dataSource: any[] = [];

  _columns: any = [];
  @Input() set columns(data: any) {
    this._columns = data;
    this.displayedColumns = data.map((c: any) => c.columnDef);
  }

  get columns() {
    return this._columns;
  }

  displayedColumns: string[] = [];
  expandedElement!: any | null;
  @Input() defineExpendElement:
    | { title: string; curr: string; prev: string; isCurrency?: boolean }[]
    | any = [];

  constructor() {}

  ngOnInit(): void {}
}
