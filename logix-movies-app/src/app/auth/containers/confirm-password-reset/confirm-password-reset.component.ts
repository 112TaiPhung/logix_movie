import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGE_LOGIN, STATUS_NOTIFY_TYPE } from '../../../@common/core.constants';
import { CommonHelper } from '../../../utils/common.helper';
import { validateAllFormFields } from '../../../utils/functions';
import { MustMatch } from '../../../utils/must-match.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss'],
})
export class ConfirmPasswordResetComponent implements OnInit {
  frmSetNewPassword: UntypedFormGroup | any;
  code = null;
  inputType = 'password';
  inputTypeConfirm = 'password';

  constructor(
    private authService: AuthService,
    private commonHelper: CommonHelper,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.commonHelper.unBlockUI();
    this.setParams();
    this.createForm();
  }

  onShowHidePassword(type: string) {
    this.inputType = type;
  }

  onShowHideConfirmPassword(type: string) {
    this.inputTypeConfirm = type;
  }

  private createForm() {
    this.frmSetNewPassword = this.fb.group(
      {
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: [MustMatch('password', 'confirmPassword')],
      },
    );
  }

  private setParams() {}

  public onSubmit() {
    if (this.frmSetNewPassword.valid) {
      const code = this.activatedRoute.snapshot.queryParams['code'];
      const email = this.activatedRoute.snapshot.queryParams['email'];

      const body = {
        email: email,
        token: code.replaceAll(' ', '+'),
        password: this.frmSetNewPassword.controls.password.value,
        confirmPassword: this.frmSetNewPassword.controls.confirmPassword.value,
      };

      this.commonHelper.blockUI();
      this.authService.confirmPasswordReset(body).subscribe(
        (res: any) => {
          if (res.data) {
            this.router.navigate([`${PAGE_LOGIN}`]);
            this.commonHelper.showToast(res.message, STATUS_NOTIFY_TYPE.SUCCESS);
          }
          this.commonHelper.unBlockUI();
        },
        (err) => {
          this.commonHelper.showToast(err, STATUS_NOTIFY_TYPE.ERROR);
          this.commonHelper.unBlockUI();
        },
      );
    } else {
      validateAllFormFields(this.frmSetNewPassword);
    }
  }
}
