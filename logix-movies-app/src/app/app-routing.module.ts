import { Injectable, NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
  ExtraOptions,
  TitleStrategy,
  RouterStateSnapshot,
} from '@angular/router';
import { ROUTERS } from './@common/core.constants';
import { AuthenticationGuard } from './@services/authentication.guard';
import { DefaultLayoutComponent } from './core/default-layout/default-layout.component';
import { UserLayoutComponent } from './core/user-layout/user-layout.component';

import { P500Component } from './views/error/500.component';
import { PageNotFoundComponent } from './views/error/page-not-found/page-not-found.component';
import { PageNotPermissionComponent } from './views/error/page-not-permission/page-not-permission.component';

export const routes: Routes = [
  {
    path: '404',
    component: PageNotFoundComponent,
    data: { title: 'Page 404' },
  },
  {
    path: '500',
    component: P500Component,
    data: { title: 'Page 500' },
  },
  {
    path: '403',
    component: PageNotPermissionComponent,
    data: { title: 'Page 403' },
  },
  {
    path: ROUTERS.AUTHENTICATION,
    canActivate: [AuthenticationGuard],
    data: { title: 'Authentication Page' },
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./views/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `Movie Hub - ${title}`;
    } else {
      document.title = 'Movie Hub';
    }
  }
}

const config: ExtraOptions = {
  // useHash: true,
  onSameUrlNavigation: 'reload',
  preloadingStrategy: PreloadAllModules,
  useHash: true,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
