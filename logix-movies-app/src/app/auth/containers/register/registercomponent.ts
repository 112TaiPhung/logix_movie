import { Component, OnInit } from '@angular/core';
import { CommonHelper } from '../../../utils/common.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';
import { ValidationSvc } from 'src/app/@services/validation.service';
import { VALIDATION } from 'src/app/@common/enums';
import { encodePwd } from 'src/app/utils/functions';
import {
  CURRENT_USER,
  PAGE_HOME,
  PERMISSIONS,
  ROLES_USER,
  STATUS_NOTIFY_TYPE,
  TOKEN_USER,
} from 'src/app/@common/core.constants';
import { IItemGroupFilterType } from 'src/app/@interfaces/table.interface';
import { ConfigService } from 'src/app/views/user/homepage/services/prduct.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  reactiveForm!: FormGroup;
  formErrors = {
    email: '',
    confirmPassword: '',
    password: '',
    username: '',
  };

  validationMessages = {
    email: {
      required: VALIDATION.MAIL_REQUIRED,
      pattern: VALIDATION.MAIL_PATTERN,
    },
    username: {
      required: VALIDATION.USERNAME_REQUIRED,
    },
    password: {
      required: VALIDATION.PASSWORD_REQUIRED,
      minlength: VALIDATION.PASSWORD_MIN,
    },
    confirmPassword: {
      required: VALIDATION.PASSWORD_REQUIRED,
      minlength: VALIDATION.PASSWORD_MIN,
      isMatching: 'Không trùng với mật khẩu',
    },
  };

  hidePassword = true;
  redirectURL = '';

  constructor(
    private validationSvc: ValidationSvc,
    private authService: AuthService,
    private configSvc: ConfigService,
    private commonHelper: CommonHelper,
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.validationSvc.pattern_email),
      ]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.reactiveForm.valueChanges.subscribe(() => {
      this.validationSvc.getValidate(this.reactiveForm, this.formErrors, this.validationMessages);
    });

    this.reactiveForm.controls['password'].valueChanges.subscribe((value: string) => {
      if (value) {
        this.reactiveForm.controls['confirmPassword'].setValidators([
          Validators.required,
          this.validationSvc.matchPassword,
        ]);
        this.reactiveForm.controls['confirmPassword'].updateValueAndValidity();
      }
    });
  }

  onSubmit() {
    if (this.reactiveForm.invalid) {
      this.formErrors = this.validationSvc.checkErorrNotDiry(
        this.reactiveForm,
        this.formErrors,
        this.validationMessages,
      );
    } else {
      this.commonHelper.blockUI();
      const formValue = this.reactiveForm.value;
      let body = {
        email: formValue.email,
        userName: formValue.username,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
      };
      this.authService.registerAccount(body).subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.router.navigate(['/authentication/login']);
            // this.commonHelper.showToast(res.message, STATUS_NOTIFY_TYPE.SUCCESS);
          } else {
            this.commonHelper.showToast(res.message, STATUS_NOTIFY_TYPE.ERROR);
          }
          this.commonHelper.unBlockUI();
        },
        (err) => {
          this.commonHelper.showToast(err.message, STATUS_NOTIFY_TYPE.ERROR);
          this.commonHelper.unBlockUI();
        },
      );
    }
  }
}
