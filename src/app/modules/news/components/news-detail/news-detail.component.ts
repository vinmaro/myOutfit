import { Component, Input } from '@angular/core';
import { ArticleModel } from '../../models/ArticleModel';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent {
  @Input() article!: ArticleModel;

  constructor(private modalCtrl: ModalController) {}

  /**
   * Close modal
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

}
