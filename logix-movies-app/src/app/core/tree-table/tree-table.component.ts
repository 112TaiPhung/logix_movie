import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { TASK_ACTIONS } from 'src/app/@common/enums';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
})
export class TreeTableComponent implements OnInit {
  private transformer = (node: any, level: number) => {
    return {
      ...node,
      expandable: !!node.childrens && node.childrens.length > 0,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.childrens,
  );

  @Output() emitActions: EventEmitter<{ type: string; data: any }> = new EventEmitter();
  @Input() columns: any = [];
  @Input() set treeData(datas: any[]) {
    this.dataSource.data = datas || [];
    this.treeControl.expandAll();
  }

  dataSource = new MatTreeFlatDataSource(this.treeControl as any, this.treeFlattener);
  displayedColumns: string[] = [];
  readonly TASK_ACTIONS = TASK_ACTIONS;

  constructor() {}

  hasChild = (_: number, node: any) => node.expandable;

  ngOnInit() {
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }

  // Emit action to component
  handleAction(type: string, data?: any) {
    this.emitActions.emit({ type, data });
  }
}
