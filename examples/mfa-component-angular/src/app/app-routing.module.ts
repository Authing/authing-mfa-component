import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MFAComponent } from './pages/mfa/mfa.component'

const routes: Routes = [{
  path: '',
  component: MFAComponent
}, {
  path: 'mfa',
  component: MFAComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
