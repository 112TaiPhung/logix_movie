import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [CommonModule, MatButtonModule, MatSliderModule, MatProgressSpinnerModule],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
