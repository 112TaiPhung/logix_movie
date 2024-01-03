import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { STATUS_NOTIFY_TYPE } from 'src/app/@common/core.constants';
import { FileUploadService } from 'src/app/@services/file-upload.service';
import { CommonHelper } from 'src/app/utils/common.helper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('inputFileUpload') inputFileUpload: ElementRef | any;
  @Input() requiredFileType: string[] = [];

  constructor(private commonHelper: CommonHelper, private fileUploadSvc: FileUploadService) {}

  ngOnInit(): void {}

  changeFile(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = this.getFile(event.target.files[i]);
      if (file) {
        this.fileUploadSvc.selectionFileChange$.next({ file: file });
      } else {
        this.fileUploadSvc.selectionFileChange$.next({ file: null });
      }
    }
  }

  getFile(file: any) {
    if (file) {
      return this.validateFile(file);
    } else {
      return null;
    }
  }

  validateFile(file: any) {
    const name = file.name.toLowerCase();
    const extension = name.substring(name.lastIndexOf('.'));
    const maxSizeMegabyte = 5;
    const maxSizeByte = maxSizeMegabyte * 1048576;
    if (this.requiredFileType?.indexOf(extension) === -1) {
      this.commonHelper.showToast(
        'Chỉ upload file có đuôi: ' + this.requiredFileType.join(', '),
        STATUS_NOTIFY_TYPE.ERROR,
      );
    } else if (file.size > maxSizeByte) {
      this.commonHelper.showToast(
        'File phải bé hơn ' + maxSizeMegabyte + ' MB!',
        STATUS_NOTIFY_TYPE.ERROR,
      );
    } else {
      return file;
    }
  }
}
