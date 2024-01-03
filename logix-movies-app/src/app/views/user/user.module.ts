import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ROUTERS } from 'src/app/@common/core.constants';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: ROUTERS.USER.INTRODUCE,
    loadChildren: () => import('./introduce/introduce.module').then((m) => m.IntroduceModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UserModule {}
