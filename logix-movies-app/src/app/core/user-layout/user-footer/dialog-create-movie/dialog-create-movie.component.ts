import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/@services/file-upload.service';
import { ValidationSvc } from 'src/app/@services/validation.service';
import { skip } from 'rxjs';
import { FILE_TYPE_UPLOAD, PAGE_HOME, STATUS_NOTIFY_TYPE } from 'src/app/@common/core.constants';
import { CommonHelper } from 'src/app/utils/common.helper';
import { ConfigService } from 'src/app/views/user/homepage/services/prduct.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-create-movie',
  templateUrl: './dialog-create-movie.component.html',
  styleUrls: ['./dialog-create-movie.component.scss'],
})
export class DialogCreateMovieComponent implements OnInit {
  reactiveForm!: FormGroup;
  formErrors = {
    name: '',
  };

  isVideo = true;
  validationMessages = {
    name: {
      required: 'Bắt buộc nhập mật khẩu mới',
    },
  };

  subscription: any;
  attachment: any = null;
  attachmenMovie: any = null;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateMovieComponent>,
    private validationSvc: ValidationSvc,
    private fb: FormBuilder,
    private fileUploadSvc: FileUploadService,
    private commonHelper: CommonHelper,
    private configService: ConfigService,
    private utilSvc: UtilService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.fileUploadSvc.selectionFileChange$
      .pipe(skip(1))
      .subscribe((res: { file: File | null }) => {
        if (res.file) {
          if (this.isVideo) {
            this.attachmenMovie = res.file;
          } else this.attachment = res.file;
        }
      });
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.reactiveForm.valueChanges.subscribe(() => {
      this.validationSvc.getValidate(this.reactiveForm, this.formErrors, this.validationMessages);
    });
  }

  onConfirm() {
    if (this.reactiveForm.invalid) {
      this.formErrors = this.validationSvc.checkErorrNotDiry(
        this.reactiveForm,
        this.formErrors,
        this.validationMessages,
      );
    } else {
      const formValue = this.reactiveForm.value;
      this.configService
        .createMovie(formValue.name, this.attachment, this.attachmenMovie)
        .subscribe(
          (result: any) => {
            if (result.data.id) {
              this.dialogRef.close(this.reactiveForm.value.name);
            }
          },
          (err) => {
            this.utilSvc.handleCallApiError(err);
          },
        );
    }
  }

  onShowFileBrowser(isVideo: boolean) {
    this.isVideo = isVideo;
    if (isVideo) this.fileUploadSvc.showFileBrowser(['.mp4']);
    else this.fileUploadSvc.showFileBrowser(['.svgz', '.jpg', '.jpeg', '.svg', '.webp', '.png']);
  }

  uploadImage(file: File) {
    this.attachmenMovie = file;
  }
}
