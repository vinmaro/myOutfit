import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DressesPageRoutingModule } from './dresses-routing.module';
import { DressesPage } from './dresses.page';
import { DressDetailComponent } from './components/dress-detail/dress-detail.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DressesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DressesPage, DressDetailComponent]
})
export class DressesPageModule {}
