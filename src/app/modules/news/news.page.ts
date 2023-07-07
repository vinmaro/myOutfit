import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { NewsService } from './services/news.service';
import { NewsModel } from './models/NewsModel';
import { ArticleModel } from './models/ArticleModel';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  page = 1;
  pageSize = 10;
  articles: ArticleModel[] = [];

  constructor(
    private newsService: NewsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getNews(null);
  }

  /**
   * Get news from service
   * @param event Event from Ion Infinte Scroll
   */
  getNews(event: any) {
    if (event) this.page += 1;

    this.newsService.getNews(this.page, this.pageSize).subscribe(
      (data: NewsModel) => {
        this.articles = this.articles.concat(data.articles);
        if (event) event.target.complete();
      },
      (err) => {
        if (event || this.articles.length >= 100) event.target.disabled = true;
      }
    );
  }

  /**
   * Open Article detail modal
   * @param article Article details object
   */
  async openDetail(article: ArticleModel) {
    const modal = await this.modalCtrl.create({
      component: NewsDetailComponent,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
      componentProps: {
        article,
      },
    });
    return await modal.present();
  }
}
