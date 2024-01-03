import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CONTENT_TYPE, PERMISSIONS, ROUTERS, SKIP_INTERCEPTOR } from '../@common/core.constants';
import { CRYPTO_KEY, CRYPTO_VI } from '../api.define';
import { PERMISSION_CODE } from '../@common/app.permission.constants';
import * as _ from 'lodash';
import * as crypto from 'crypto-js';
import { Sort } from '@angular/material/sort';

export const validateAllFormFields = (formGroup: UntypedFormGroup) => {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof UntypedFormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof UntypedFormGroup) {
      validateAllFormFields(control);
    }
  });
};

export const enableFormControl = (formGroup: UntypedFormGroup, formControls: string[]) => {
  for (let i = 0; i < formControls.length; i++) {
    formGroup.get(formControls[i])!.enable();
  }
};

export const disableFormControl = (formGroup: UntypedFormGroup, formControls: string[]) => {
  for (let i = 0; i < formControls.length; i++) {
    formGroup.get(formControls[i])!.disable();
  }
};

export const setValidatorsFormControl = (
  formGroup: UntypedFormGroup,
  formControls: string[],
  validators = [Validators.required],
) => {
  for (let i = 0; i < formControls.length; i++) {
    formGroup.controls[formControls[i]].setValidators(validators);
    formGroup.controls[formControls[i]].updateValueAndValidity();
  }
};

export const clearValidatorsFormControl = (formGroup: UntypedFormGroup, formControls: string[]) => {
  for (let i = 0; i < formControls.length; i++) {
    formGroup.controls[formControls[i]].clearValidators();
    formGroup.controls[formControls[i]].updateValueAndValidity();
  }
};

export const handleError = (error: HttpErrorResponse) => {
  let errorMessage = 'Unknown error!';
  if (!error.ok) {
    if (error.error.message) {
      errorMessage = `${error.error.message}`;
    }
  } else {
    errorMessage = 'Internal Server Error';
  }
  return throwError(errorMessage);
};

export const downloadFile = (data: any, fileName: string) => {
  const a: any = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const joinObj = (array: any, attr: any) => {
  const out: any = [];

  for (let i = 0; i < array.length; i++) {
    out.push(array[i][attr]);
  }

  return out.join(', ');
};

export const generateParam = (param: any) => {
  Object.keys(param).forEach((key) => param[key] == null && delete param[key]);
  if (!param.SortByColumnName) {
    param.SortByColumnName = 'LastModified';
    param.IsOrderByDesc = true;
  }
  const paramStr: any = [];
  for (const key in param) {
    if (Object.prototype.hasOwnProperty.call(param, key)) {
      let value = param[key];
      if (value.constructor === Array) {
        value.forEach((e: any) => {
          paramStr.push(`${key}=${e}`);
        });
      } else {
        paramStr.push(`${key}=${param[key]}`);
      }
    }
  }
  return paramStr.join('&');
};

export const generateBodyPostListview = (
  paging?: any,
  groupFilters?: any,
  sort?: any,
  includes?: string[],
  expendParam?: any,
) => {
  let body: any = {
    pagination: {},
    groupFilters: [],
    sort: [],
  };
  if (paging) {
    body.pagination = {
      pageSize: paging.pageSize,
      pageNumber: paging.pageIndex,
      isPaging: paging.isPaging === undefined ? true : paging.isPaging,
    };
  }
  if (sort && JSON.stringify(sort) !== '{}') {
    if (!sort.length) {
      // If sort is an object
      body.sort.push({
        predicate: sort.active,
        reverse: sort.direction === 'desc',
      });
    } else {
      // If sort is an array
      sort.forEach((e: Sort) => {
        body.sort.push({
          predicate: e.active,
          reverse: e.direction === 'desc',
        });
      });
    }
  }
  if (groupFilters.length > 0) {
    body.groupFilters = groupFilters;
  }
  if (includes) {
    body.includes = includes;
  }
  if (typeof expendParam === 'object' && !Array.isArray(expendParam) && expendParam !== null) {
    for (const [key, value] of Object.entries(expendParam)) {
      body[key] = value;
    }
  }
  Object.keys(body).forEach(
    (key) => (body[key].length == 0 || JSON.stringify(body[key]) == '{}') && delete body[key],
  );
  if (!body.sort) {
    // TODO: default sort by LastModified
    body.sort = [
      {
        predicate: 'LastModified',
        reverse: true,
      },
    ];
  }
  return body;
};

export const generateTreeObject = (data: any, isFlatten: boolean) => {
  // If searching then not render to tree object
  if (isFlatten) return data;

  // Declare variable for convert flatten object to tree object
  let countLevel = 2,
    newlyAdded: any = [...Array(20)].map((e) => []),
    rootItems = _.filter(data, (x) => !x.itemOrigin.parentId),
    listAlone = _.difference(data, rootItems);

  // Get childrens for root item in treeview
  function getChildrens(parent: any) {
    _.forEach(parent, (x) => {
      _.forEach(data, (y) => {
        if (x.itemOrigin.id === y.itemOrigin.parentId) {
          x.childrens?.push({ ...y, levelx: countLevel });
          listAlone = _.reject(listAlone, y);
          newlyAdded[countLevel].push(y);
        }
      });
    });
  }
  getChildrens(rootItems);

  // Get childrens multiple levelx of childrens in root item in treeview
  while (listAlone.length !== 0) {
    getChildrens(newlyAdded[countLevel - 1]);
    countLevel++;
  }

  return rootItems;
};

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: ' đ' },
    { value: 1e3, symbol: ' nghìn' },
    { value: 1e6, symbol: ' triệu' },
    { value: 1e9, symbol: ' tỉ' },
    { value: 1e12, symbol: ' ngàn tỉ' },
    { value: 1e15, symbol: ' triệu tỉ' },
    { value: 1e18, symbol: ' tỉ tỉ' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (x: any) {
      return num >= x.value;
    });
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};

export const convertArrayToObject = (array: any, key: any) => {
  const initialValue = {};
  return array.reduce((obj: any, item: any) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const getRoutingCurrent = (url: any) => {
  if (url.includes(ROUTERS.AUTHENTICATION)) {
    return ROUTERS.AUTHENTICATION;
  }
  return null;
};

export const numberWithCommas = (x: any) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join(',');
};

export const getHttpHeaders = (authorizationToken: string | any) => {
  return new HttpHeaders({
    'X-Skip-Interceptor': `${SKIP_INTERCEPTOR}`,
    Authorization: `Bearer ${authorizationToken}`,
    ContentType: CONTENT_TYPE.FORM_DATA,
  });
};

export const checkPermission = (...permission: any) => {
  const permissions = JSON.parse(localStorage.getItem(PERMISSIONS) || '');
  const match = _.intersectionWith(permissions, permission, _.isEqual);
  return match.length > 0 || _.includes(permissions, PERMISSION_CODE.SYSTEM.FULL_CONTROL);
};

export const encodePwd = (text: any) => {
  const key = crypto.enc.Base64.parse(CRYPTO_KEY);
  const iv = crypto.enc.Base64.parse(CRYPTO_VI);
  let cipherData = crypto.AES.encrypt(text, key, { iv: iv });
  return cipherData.toString();
};

export class CommonUtil {
  public static TimeRange() {
    let NowDay = new Date();
    // Lấy ngày đầu tiên của tuần là chủ nhật
    var day = NowDay.getDay(),
      diff = NowDay.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    let thisweek = new Date(NowDay.setDate(diff));
    //Lấy ngày đầu tiên của tháng
    let thismonth = new Date(NowDay.getFullYear(), NowDay.getMonth(), 1);
    //Lấy ngày cách đây 3 tuần
    let this3week: any = NowDay.getTime() - 86400000 * 21;
    let day3week = new Date(this3week).getDay();
    let diffthis3week = new Date(this3week).getDate() - day3week + (day3week == 0 ? -6 : 1);
    this3week = new Date(new Date(this3week).setDate(diffthis3week));
    //Lấy ngày cách đây 3 thang
    let this3mont: any = new Date().setMonth(NowDay.getMonth() - 3);
    this3mont = new Date(new Date(this3mont).getFullYear(), new Date(this3mont).getMonth(), 1);
    // lay ngay tuan sau
    let affterWeek: any = NowDay.getTime() + 86400000 * 7;
    var afday = new Date(affterWeek).getDay(),
      afdiff = new Date(affterWeek).getDate() - afday + (afday == 0 ? -6 : 1);
    affterWeek = new Date(new Date(affterWeek).setDate(afdiff));

    let datajson = [
      {
        id: 1,
        name: 'Hôm nay',
        value: 'today',
        TimeStart: new Date(),
        TimeEnd: new Date(),
      },
      {
        id: 5,
        name: '3 ngày trước',
        value: '3days',
        TimeStart: new Date(new Date().setDate(new Date().getDate() - 3)),
        TimeEnd: new Date(),
      },
      {
        id: 2,
        name: 'Tuần này',
        value: 'week',
        TimeStart: new Date(thisweek),
        TimeEnd: new Date(new Date(thisweek).getTime() + 86400000 * 6),
      },
      {
        id: 3,
        name: 'Tháng này',
        value: 'thisMoth',
        TimeStart: new Date(thismonth),
        TimeEnd: new Date(
          new Date(thismonth).getTime() +
            86400000 *
              (this.getDaysInMonth(
                new Date(thismonth).getMonth() + 1,
                new Date(thismonth).getFullYear(),
              ) -
                1),
        ),
      },
      {
        id: 4,
        name: 'Chọn khoảng thời gian',
        value: 'custom',
        TimeStart: '',
        TimeEnd: '',
      },
    ];
    return datajson;
  }

  public static getDaysInMonth(month: any, year: any) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
  }

  public static formatFilter(filterJson: any) {
    let filter: any = {};
    for (let item in filterJson) {
      if (filterJson[item] || filterJson[item] == false) filter[item] = filterJson[item];
    }
    return filter;
  }

  public static convertAgencies(agencies: any) {
    let rs = agencies.filter((x: any) => x.parentId == null || x.agencyParent == null);
    rs.filter((x: any) => (x.agencyLv = 1));
    let compare = agencies.filter((x: any) => x.parentId != null && x.agencyParent != null);
    let length = compare.length;
    while (length > 0) {
      let temp = compare[0];
      for (let i = 0; i < rs.length; i++) {
        if (rs[i].id == temp.parentId) {
          this.inserIndex(i, { ...temp, agencyLv: rs[i].agencyLv + 1 }, rs);
          this.deleteIndex(0, compare);
          break;
        } else {
          if (i == rs.length - 1 && compare && compare.length > 0) {
            rs.push({ ...compare[0], agencyLv: 1 });
            this.deleteIndex(0, compare);
          }
        }
      }
      length = compare.length;
    }
    return rs;
  }

  private static inserIndex(index: any, item: any, data: any) {
    data.splice(index + 1, 0, item);
  }

  private static deleteIndex(index: any, data: any) {
    data.splice(index, 1);
  }
}
