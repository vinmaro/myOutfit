import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsService } from './services/news.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPage, NewsDetailComponent],
  providers: [NewsService],
})
export class NewsPageModule {}
