import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

export const MONTH_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MONTH_FORMATS },
  ],
})
export class MonthPickerComponent implements OnInit {
  @Input() title = '';
  @Input() error = '';
  @Input() set isClearFilter(value: number) {
    if (value) this.month.setValue(null);
  }

  @Output() monthChange = new EventEmitter();
  @Input() month: any = new FormControl<Date | null>(null);
  readonly Validators = Validators;

  constructor() {}

  ngOnInit(): void {
    this.month.valueChanges.subscribe((res: any) => {
      if (res) this.monthChange.emit(res._d);
    });
  }

  monthSelected($event: Date, monthPicker: MatDatepicker<ElementRef>) {
    this.month.setValue($event);
    monthPicker.close();
  }

  clearMonth() {
    this.month.setValue(null);
    this.monthChange.emit(null);
  }
}
