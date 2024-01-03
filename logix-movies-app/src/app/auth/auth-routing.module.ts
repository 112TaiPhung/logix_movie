import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmPasswordResetComponent } from './containers/confirm-password-reset/confirm-password-reset.component';
import { EmailActionComponent } from './containers/email-action/email-action.component';
import { ForgetPasswordComponent } from './containers/forget-password/forget-password.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/registercomponent';

const routes: Routes = [
  {
    path: 'login',
    children: [{ path: '', component: LoginComponent }],
    title: 'Login',
  },
  {
    path: 'register',
    children: [{ path: '', component: RegisterComponent }],
    title: 'Register',
  },
  {
    path: 'forgot-password',
    children: [{ path: '', component: ForgetPasswordComponent }],
    title: 'Forgot password',
  },
  {
    path: 'email/action',
    children: [{ path: '', component: EmailActionComponent }],
  },
  {
    path: 'reset-password',
    component: ConfirmPasswordResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
