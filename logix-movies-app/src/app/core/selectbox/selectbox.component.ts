import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { FormControl, Validators } from '@angular/forms';

export interface IItemOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss'],
})
export class SelectboxComponent implements OnInit {
  @Input() title = '';
  @Input() error = '';
  @Input() options: IItemOption[] = [];
  @Input() set validators(validate: any) {
    this.selected.addValidators(validate);
  }

  @Input() set isClearFilter(value: number) {
    if (value) this.selected.setValue('');
  }

  @Output() selectboxChange = new EventEmitter();
  @Input() selected: any = new FormControl('');
  readonly Validators = Validators;

  constructor() {}

  ngOnInit(): void {}

  selectionChange() {
    this.selectboxChange.emit(this.selected.value);
  }

  clearSelectbox(matSelect: MatSelect) {
    this.selected.setValue('');
    matSelect.close();
    this.selectboxChange.emit(this.selected.value);
  }
}
