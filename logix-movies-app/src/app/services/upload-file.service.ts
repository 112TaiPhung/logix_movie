import { Injectable } from '@angular/core';

@Injectable()
export class UploadFileService {
  constructor() {}

  getBase64Wrap(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(
          reader.result?.slice(
            reader.result.toString().indexOf('64,') + 3,
            reader.result.toString().length,
          ),
        );
      reader.onerror = (error) => reject(error);
    });
  }

  getBase64Default(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
