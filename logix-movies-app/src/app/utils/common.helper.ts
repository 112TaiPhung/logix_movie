import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STATUS_NOTIFY_TYPE } from '../@common/core.constants';

@Injectable()
export class CommonHelper {
  blockUiIndex = 0;

  constructor(private _snackBar: MatSnackBar) {}

  getRoute(prefix: any, sufix: any) {
    return '/' + prefix + '/' + sufix;
  }

  //#region  TOAST
  showToast(message = '', type = '', duration = 3000) {
    switch (type) {
      case STATUS_NOTIFY_TYPE.SUCCESS:
        this._snackBar.open(message, '', {
          duration: duration,
          panelClass: STATUS_NOTIFY_TYPE.SUCCESS,
        });
        break;
      case STATUS_NOTIFY_TYPE.ERROR:
        this._snackBar.open(message, '', {
          duration: duration,
          panelClass: STATUS_NOTIFY_TYPE.ERROR,
        });
        break;
      case STATUS_NOTIFY_TYPE.WARNING:
        this._snackBar.open(message, '', {
          duration: duration,
          panelClass: STATUS_NOTIFY_TYPE.WARNING,
        });
        break;
      case STATUS_NOTIFY_TYPE.INFORMATION:
        this._snackBar.open(message, '', {
          duration: duration,
          panelClass: STATUS_NOTIFY_TYPE.INFORMATION,
        });
        break;
      default:
        break;
    }
  }
  //#endregion TOAST

  //#region LOADING
  blockUI() {
    if (!this.blockUiIndex) {
      let elmLoading = document.getElementById('loading-page');
      elmLoading!.style.display = 'flex';
    }
    this.blockUiIndex++;
  }

  unBlockUI() {
    if (this.blockUiIndex <= 1) {
      let elmLoading = document.getElementById('loading-page');
      elmLoading!.style.display = 'none';
      this.blockUiIndex = 0;
    } else {
      this.blockUiIndex--;
    }
  }
  //#endregion LOADING
}
