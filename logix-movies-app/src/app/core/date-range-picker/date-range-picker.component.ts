import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Input() title = '';
  @Input() error = '';
  @Input() set isClearFilter(value: number) {
    if (value) {
      this.dateRange.patchValue({
        fromDate: null,
        toDate: null,
      });
    }
  }

  @Input() dateRange: any = new FormGroup({
    fromDate: new FormControl<Date | null>(null),
    toDate: new FormControl<Date | null>(null),
  });

  @Input() set validators(validate: any) {
    this.dateRange.controls.fromDate.addValidators(validate);
    this.dateRange.controls.toDate.addValidators(validate);
  }

  @Output() dateRangeChange = new EventEmitter();
  @ViewChild('dateRangePicker') dateRangePicker: any;

  constructor() {}

  ngOnInit(): void {}

  changeDateRangePicker() {
    if (this.dateRange.valid && this.dateRange.value.fromDate && this.dateRange.value.toDate) {
      this.dateRangeChange.emit({
        from: this.dateRange.value.fromDate,
        to: this.dateRange.value.toDate,
      });
    }
  }

  clearDateRange() {
    this.dateRange.patchValue({
      fromDate: null,
      toDate: null,
    });
    this.dateRangeChange.emit({
      from: this.dateRange.value.fromDate,
      to: this.dateRange.value.toDate,
    });
  }
}
