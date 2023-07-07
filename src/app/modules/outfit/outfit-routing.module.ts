import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutfitPage } from './outfit.page';

const routes: Routes = [
  {
    path: '',
    component: OutfitPage
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutfitPageRoutingModule {}
