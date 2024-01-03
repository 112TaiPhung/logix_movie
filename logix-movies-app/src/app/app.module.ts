import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import 3rd party components
import { PermissionGuard } from './@services/permission.guard';
import { TokenInterceptor } from './@interceptors/token.interceptor';

import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonHelper } from './utils/common.helper';
import { AuthService } from './auth/services/auth.service';
import { AuthenticationGuard } from './@services/authentication.guard';
import { CoreModule } from './core/core.module';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule,
    MatSnackBarModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'end',
        verticalPosition: 'top',
      },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    AuthenticationGuard,
    AuthService,
    PermissionGuard,
    CommonHelper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
