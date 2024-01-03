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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  reactiveForm!: FormGroup;
  formErrors = {
    email: '',
    password: '',
  };

  validationMessages = {
    email: {
      required: VALIDATION.MAIL_REQUIRED,
      pattern: VALIDATION.MAIL_PATTERN,
    },
    password: {
      required: VALIDATION.PASSWORD_REQUIRED,
      minlength: VALIDATION.PASSWORD_MIN,
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
        //Validators.pattern(this.validationSvc.pattern_email),
      ]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.reactiveForm.valueChanges.subscribe(() => {
      this.validationSvc.getValidate(this.reactiveForm, this.formErrors, this.validationMessages);
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
      this.authService
        .login(this.reactiveForm.value.email, this.reactiveForm.value.password)
        .subscribe(
          (res: any) => {
            if (res.succeeded) {
              this.saveDataAfterLogin(res.data);
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

  saveDataAfterLogin(info: any) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(info));
    localStorage.setItem(TOKEN_USER, info.token);
    localStorage.setItem(ROLES_USER, JSON.stringify(info.roles));
    this.localStorageService.setItem(PERMISSIONS, info.permissions).subscribe();
    this.router.navigate([PAGE_HOME]);

    // Redirect to prev url || home page
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL'];
    }
    if (this.redirectURL) {
      this.router.navigateByUrl(this.redirectURL).catch(() => this.router.navigate(['homepage']));
    } else {
      this.router.navigate([PAGE_HOME]);
    }
  }
}
