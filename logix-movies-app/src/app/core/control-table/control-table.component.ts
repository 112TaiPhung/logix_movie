import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, skip } from 'rxjs';
import { FORMAT_DATETIME } from 'src/app/@common/core.constants';
import { TABLE_FILTER_TYPE, TASK_ACTIONS } from 'src/app/@common/enums';
import {
  IDataFilterType,
  IImportExportType,
  IItemGroupFilterType,
} from 'src/app/@interfaces/table.interface';
import * as moment from 'moment';
import { FileUploadService } from 'src/app/@services/file-upload.service';

@Component({
  selector: 'app-control-table',
  templateUrl: './control-table.component.html',
  styleUrls: ['./control-table.component.scss'],
})
export class ControlTableComponent implements OnInit, OnDestroy {
  @ViewChild('inputSearch') inputSearch!: ElementRef;
  @Input() optionsImportExport: IImportExportType = {};
  @Input() titleTable = '';
  @Input() fieldForSearchbox: string[] = [];
  @Input() dataFilter: IDataFilterType[] = [];
  @Input() buttonsPermission: string[] = [];
  @Input() titleButtonCreate = 'Tạo mới';
  @Output() emitActions: EventEmitter<{ type?: string; data?: any }> = new EventEmitter();
  @Output() emitFilterType = new EventEmitter();
  searchKey$ = new BehaviorSubject('');
  filterType: IItemGroupFilterType[] = [];
  JSON = JSON;
  TABLE_FILTER_TYPE = TABLE_FILTER_TYPE;
  TASK_ACTIONS = TASK_ACTIONS;
  isClearFilter = Math.random();
  typeImportExportSelected = '';
  isShowFilterControl = true;
  subscription: any;

  constructor(private fileUploadSvc: FileUploadService) {}

  ngOnInit(): void {
    // Calculate max height for table
    let matTable = document.getElementById('common-table');
    if (matTable) {
      let controlTable = document.getElementById('control-table');
      let obs = new ResizeObserver(() => {
        let maxHeight = window.innerHeight - matTable!.offsetTop;
        matTable!.style.maxHeight = `${maxHeight - 96}px`;
      });
      obs.observe(controlTable!);
    }

    // Subscribe input search change
    this.subscription = this.searchKey$
      .pipe(skip(1), distinctUntilChanged())
      .subscribe((value: any) => {
        this.checkKeyAlreadyExist(this.fieldForSearchbox[0]);
        this.filterType.push({
          filters: this.fillFiltersForSearchbox(value),
          logic: { value: 'or' },
        });
        this.emitFilterType.emit(this.filterType);

        // TODO: remove filter by keyword when search key null
        if (!value) {
          this.filterType.forEach((e: any, index: number) => {
            if (e.filters[0].field === this.fieldForSearchbox[0]) {
              this.filterType.splice(index, 1);
            }
          });
        }
      });

    // Subscribe input file change
    this.subscription = this.fileUploadSvc.selectionFileChange$
      .pipe(skip(1))
      .subscribe((res: { file: File | null }) => {
        if (res.file) {
          this.emitActions.emit({ type: this.typeImportExportSelected, data: res });
        }
      });
  }

  //#region Handle Search By Search Key
  fillFiltersForSearchbox(value: string) {
    let tmp: any = [];
    this.fieldForSearchbox.forEach((e: any) => {
      tmp.push({
        operator: 'contains',
        field: e,
        value: value,
      });
    });
    return tmp;
  }

  emitSearchKey() {
    this.searchKey$.next(this.inputSearch.nativeElement.value);
  }
  //#endregion

  //#region Handle Import Export
  clickEmitAction(type: string, showFileBrowser?: boolean) {
    if (showFileBrowser) {
      this.typeImportExportSelected = type;
      this.fileUploadSvc.showFileBrowser(['.xls', '.xlsx', '.xlsm']);
    } else {
      this.emitActions.emit({ type: type });
    }
  }
  //#endregion

  //#region Handle Datetime Picker
  dateRangeChange(range: { from: string; to: string }, key: string) {
    this.checkKeyAlreadyExist(key);
    if (range.from && range.to) {
      this.filterType.push({
        filters: [
          {
            operator: 'gte',
            field: key,
            value: moment(range.from).format(FORMAT_DATETIME.DATE_EN),
          },
          {
            operator: 'lte',
            field: key,
            value: moment(range.to).format(FORMAT_DATETIME.DATE_EN),
          },
        ],
        logic: { value: 'and' },
      });
    }
    this.emitFilterType.emit(this.filterType);
  }

  yearChange(year: number, key: string) {
    this.checkKeyAlreadyExist(key);
    if (year) {
      this.filterType.push({
        filters: [
          {
            operator: 'contains',
            field: key,
            value: moment(year).format(FORMAT_DATETIME.ONLY_YEAR),
          },
        ],
        logic: { value: 'or' },
      });
    }
    this.emitFilterType.emit(this.filterType);
  }

  monthChange(month: number, key: string) {
    this.checkKeyAlreadyExist(key);
    this.filterType.push({
      filters: [
        {
          operator: 'eq',
          field: key,
          value: moment(month).format(FORMAT_DATETIME.DATE_EN),
        },
      ],
      logic: { value: 'or' },
    });
    this.emitFilterType.emit(this.filterType);
  }

  monthRangeChange(range: { from: string; to: string }, key: string) {
    let from = moment(range.from).format(FORMAT_DATETIME.DATE_EN);
    let today = new Date(range.to);
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let to = moment(lastDayOfMonth).format(FORMAT_DATETIME.DATE_EN);
    this.checkKeyAlreadyExist(key);
    if (range.from && range.to) {
      this.filterType.push({
        filters: [
          {
            operator: 'gte',
            field: key,
            value: from,
          },
          {
            operator: 'lte',
            field: key,
            value: to,
          },
        ],
        logic: { value: 'and' },
      });
    }
    this.emitFilterType.emit(this.filterType);
  }
  //#endregion

  countExpendParam = 0;
  //#region Handle Selection
  selectboxChange($event: string, key: string, item: any) {
    if (!item.isExpendParam) {
      this.checkKeyAlreadyExist(key);
      if ($event) {
        this.filterType.push({
          filters: [
            {
              operator: 'eq',
              field: key,
              value: $event,
            },
          ],
          logic: { value: 'or' },
        });
      }
      this.emitFilterType.emit(this.filterType);
    } else {
      this.countExpendParam = $event === '' ? this.countExpendParam - 1 : this.countExpendParam + 1;
      this.emitFilterType.emit({ [key]: $event });
    }
  }

  checkboxChange($event: string[], key: string) {
    this.checkKeyAlreadyExist(key);
    if ($event?.length) {
      this.filterType.push({
        filters: this.getFilterFromFiltes(key, $event),
        logic: { value: 'or' },
      });
    }
    this.emitFilterType.emit(this.filterType);
  }

  getFilterFromFiltes(key: string, data: any) {
    let tmp: any = [];
    data.forEach((e: any) => {
      tmp.push({
        operator: 'eq',
        field: key,
        value: e,
      });
    });
    return tmp;
  }
  //#endregion

  //#region Reusable
  checkKeyAlreadyExist(key: string) {
    this.filterType.forEach((e, index) => {
      if (key === e.filters[0].field) {
        this.filterType.splice(index, 1);
      }
    });
  }

  clearSearch() {
    this.inputSearch.nativeElement!.value = '';
    this.filterType = [];
    this.countExpendParam = 0;
    this.isClearFilter = Math.random();
    this.emitFilterType.emit(this.filterType);
  }
  //#endregion

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
