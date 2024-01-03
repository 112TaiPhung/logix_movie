import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DecimalNumberDirective } from './decimal-input/decimalInput.directive';
import { DecimalHelper } from '../utils/decimal-number.helper';
import { HasPermissionDirective } from './directives/permission.directive';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { DefaultHeaderComponent } from './default-layout/default-header/default-header.component';
import { SideNavComponent } from './default-layout/side-nav/side-nav.component';
import { Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { ControlTableComponent } from './control-table/control-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { MonthRangePickerComponent } from './month-range-picker/month-range-picker.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatCommonModule } from '@angular/material/core';
import { ControlCrudComponent } from './control-crud/control-crud.component';
import { DialogDeleteConfirmComponent } from './dialog-delete-confirm/dialog-delete-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableHistoryComponent } from './table-history/table-history.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TreeTableComponent } from './tree-table/tree-table.component';
import { MatTreeModule } from '@angular/material/tree';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeaderComponent } from './user-layout/user-header/user-header.component';
import { UserFooterComponent } from './user-layout/user-footer/user-footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DialogChangePasswordComponent } from './user-layout/user-header/dialog-change-password/dialog-change-password.component';
import { DialogCreateMovieComponent } from './user-layout/user-footer/dialog-create-movie/dialog-create-movie.component';

//#region Change locale text
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = $localize`Trang đầu tiên`;
  itemsPerPageLabel = $localize`Kết quả giới hạn cho 1 trang:`;
  lastPageLabel = $localize`Trang cuối cùng`;
  nextPageLabel = 'Trang tiếp theo';
  previousPageLabel = 'Trang trước';
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Trang 1 của 1`;
    }
    let from = page * pageSize;
    let to = ++page * pageSize;
    return $localize`${from + 1} - ${to < length ? to : length} của ${length}`;
  }
}
//#endregion Change locale text

@NgModule({
  declarations: [
    DecimalNumberDirective,
    HasPermissionDirective,
    DefaultLayoutComponent,
    DefaultHeaderComponent,
    SideNavComponent,
    ControlTableComponent,
    YearPickerComponent,
    MonthPickerComponent,
    MonthRangePickerComponent,
    DateRangePickerComponent,
    SelectboxComponent,
    CheckboxComponent,
    FileUploadComponent,
    ControlCrudComponent,
    DialogDeleteConfirmComponent,
    TableHistoryComponent,
    TreeTableComponent,
    UserLayoutComponent,
    UserHeaderComponent,
    UserFooterComponent,
    PaginationComponent,
    DialogChangePasswordComponent,
    DialogCreateMovieComponent,
  ],
  exports: [
    DecimalNumberDirective,
    HasPermissionDirective,
    ControlTableComponent,
    YearPickerComponent,
    MonthPickerComponent,
    MonthRangePickerComponent,
    DateRangePickerComponent,
    SelectboxComponent,
    CheckboxComponent,
    FileUploadComponent,
    ControlCrudComponent,
    TableHistoryComponent,
    TreeTableComponent,
    PaginationComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTreeModule,
  ],
  providers: [
    DecimalPipe,
    DecimalHelper,
    { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl },
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
