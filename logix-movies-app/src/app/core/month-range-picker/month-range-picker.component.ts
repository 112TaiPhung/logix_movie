import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDateRangePicker, MatEndDate } from '@angular/material/datepicker';

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
  selector: 'app-month-range-picker',
  templateUrl: './month-range-picker.component.html',
  styleUrls: ['./month-range-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MONTH_FORMATS },
  ],
})
export class MonthRangePickerComponent implements OnInit {
  @Input() title = '';
  @Input() set isClearFilter(value: number) {
    if (value) {
      this.reactiveForm.patchValue({
        start: null,
        end: null,
      });
    }
  }

  @Output() monthRangeChange = new EventEmitter();
  reactiveForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  isFocusStartDate = false;

  constructor() {}

  ngOnInit(): void {}

  dateChange(
    $event: any,
    matEndDate: HTMLInputElement,
    monthRangePicker: MatDateRangePicker<ElementRef>,
  ) {
    if (this.isFocusStartDate) {
      this.reactiveForm.patchValue({ start: $event._d });
      monthRangePicker.close();
      setTimeout(() => {
        matEndDate.focus();
      }, 1);
    } else {
      this.reactiveForm.patchValue({ end: $event._d });
      monthRangePicker.close();
    }
    if (this.reactiveForm.valid && this.reactiveForm.value.start && this.reactiveForm.value.end) {
      this.monthRangeChange.emit({
        from: this.reactiveForm.value.start,
        to: this.reactiveForm.value.end,
      });
    }
  }

  focusInput(value: boolean, monthRangePicker: MatDateRangePicker<ElementRef>) {
    this.isFocusStartDate = value;
    monthRangePicker.open();
  }

  clearMonthRange() {
    this.reactiveForm.patchValue({
      start: null,
      end: null,
    });
    this.monthRangeChange.emit({
      from: this.reactiveForm.value.start,
      to: this.reactiveForm.value.end,
    });
  }
}
