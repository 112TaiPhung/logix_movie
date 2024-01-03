import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ACTION_CRUD, PAGE_STATUS } from 'src/app/@common/enums';

@Component({
  selector: 'app-control-crud',
  templateUrl: './control-crud.component.html',
  styleUrls: ['./control-crud.component.scss'],
})
export class ControlCrudComponent implements OnInit {
  @Input() linkReturn = '';
  @Input() title = '';

  @Input() pageStatus:
    | typeof PAGE_STATUS.CREATE
    | typeof PAGE_STATUS.READ
    | typeof PAGE_STATUS.UPDATE = PAGE_STATUS.CREATE;

  @Output() emitActions = new EventEmitter<
    | typeof ACTION_CRUD.DELETE
    | typeof ACTION_CRUD.UPDATE
    | typeof ACTION_CRUD.SAVE_CONTINUE
    | typeof ACTION_CRUD.SAVE
    | typeof ACTION_CRUD.REFILL
    | typeof ACTION_CRUD.CANCEL
  >();

  PAGE_STATUS = PAGE_STATUS;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  clickDelete() {
    this.emitActions.emit(ACTION_CRUD.DELETE);
  }

  clickEdit() {
    this.emitActions.emit(ACTION_CRUD.UPDATE);
  }

  clickSaveAndContinue() {
    this.emitActions.emit(ACTION_CRUD.SAVE_CONTINUE);
  }

  clickSave() {
    this.emitActions.emit(ACTION_CRUD.SAVE);
  }

  clickReFill() {
    this.emitActions.emit(ACTION_CRUD.REFILL);
  }

  clickCancel() {
    this.emitActions.emit(ACTION_CRUD.CANCEL);
  }

  onReturn() {
    this.router.navigateByUrl(`/${this.linkReturn}`);
  }
}
