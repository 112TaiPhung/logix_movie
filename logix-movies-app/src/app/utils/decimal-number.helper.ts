import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FORMAT_NUMBER } from '../@common/core.constants';

@Injectable()
export class DecimalHelper {
  constructor(private _decimalPipe: DecimalPipe) {}
  format(num: any, format?: any) {
    return this._decimalPipe.transform(num, format || FORMAT_NUMBER);
  }

  formatThoundsand(num: any, format?: any) {
    return num >= 1000 ? this.format(Math.floor(num / 1000)) + 'K' : this.format(num, format);
  }
}
