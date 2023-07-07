import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DressesPage } from './dresses.page';

const routes: Routes = [
  {
    path: '',
    component: DressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DressesPageRoutingModule {}
