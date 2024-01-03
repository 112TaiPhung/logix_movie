import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidationSvc } from 'src/app/@services/validation.service';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss'],
})
export class DialogChangePasswordComponent implements OnInit {
  reactiveForm!: FormGroup;
  formErrors = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  validationMessages = {
    currentPassword: {
      required: 'Bắt buộc nhập mật khẩu mới',
      minlength: 'Tối thiểu 6 ký tự',
      maxlength: 'Tối đa 20 ký tự',
    },
    password: {
      required: 'Bắt buộc nhập mật khẩu mới',
      minlength: 'Tối thiểu 6 ký tự',
      maxlength: 'Tối đa 20 ký tự',
    },
    confirmPassword: {
      required: 'Bắt buộc nhập mật khẩu mới',
      isMatching: 'Không trùng với mật khẩu mới',
    },
  };

  constructor(private validationSvc: ValidationSvc, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      currentPassword: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      ],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: [null, [Validators.required, this.validationSvc.matchPassword]],
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

  onConfirm() {
    if (this.reactiveForm.invalid) {
      this.formErrors = this.validationSvc.checkErorrNotDiry(
        this.reactiveForm,
        this.formErrors,
        this.validationMessages,
      );
    } else {
    }
  }
}
