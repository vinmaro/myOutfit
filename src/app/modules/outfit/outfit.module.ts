import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutfitPageRoutingModule } from './outfit-routing.module';

import { OutfitPage } from './outfit.page';
import { OutfitDetailComponent } from './components/outfit-detail/outfit-detail.component';
import { DressListComponent } from './components/dress-list/dress-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    IonicModule.forRoot(),
    OutfitPageRoutingModule
  ],
  declarations: [OutfitPage, OutfitDetailComponent, DressListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OutfitPageModule {}
