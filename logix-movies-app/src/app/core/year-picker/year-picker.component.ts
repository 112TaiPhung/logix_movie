import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

export const YEAR_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_FORMATS },
  ],
})
export class YearPickerComponent implements OnInit {
  @Input() set isClearFilter(value: number) {
    if (value) this.year.setValue(null);
  }

  @Output() yearChange = new EventEmitter();
  @Input() year: any = new FormControl<Date | null>(null);
  readonly Validators = Validators;

  constructor() {}

  ngOnInit(): void {
    this.year.valueChanges.subscribe((res: any) => {
      if (res) this.yearChange.emit(res._d);
    });
  }

  yearSelected($event: Date, yearPicker: MatDatepicker<ElementRef>) {
    this.year.setValue($event);
    yearPicker.close();
  }

  clearYear() {
    this.year.setValue(null);
    this.yearChange.emit(null);
  }
}
