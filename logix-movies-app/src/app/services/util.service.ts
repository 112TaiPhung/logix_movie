import { Injectable } from '@angular/core';
import { CommonHelper } from '../utils/common.helper';
import { STATUS_NOTIFY_TYPE } from '../@common/core.constants';
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public imageOrVideoFileTypes = ['image/jpeg', 'image/png'];

  constructor(private commonHelper: CommonHelper) {}

  validateFile(file: File): boolean {
    return this.imageOrVideoFileTypes.includes(file.type);
  }

  handleCallApiError(err: any) {
    this.commonHelper.unBlockUI();
    this.commonHelper.showToast(
      err.error ? err.error.message : err.message,
      STATUS_NOTIFY_TYPE.ERROR,
    );
  }
}
