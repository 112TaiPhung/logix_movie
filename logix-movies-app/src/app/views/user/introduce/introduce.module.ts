import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroduceComponent } from './introduce.component';
import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlPipe } from 'src/app/@pipe/safe-html.pipe';

const routes: Routes = [{ path: '', component: IntroduceComponent }];

@NgModule({
  declarations: [IntroduceComponent, SafeHtmlPipe],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class IntroduceModule {}
