import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ErrorsService } from 'src/app/core/handlers/errors/errors.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { NavigationPagesEnum } from 'src/app/shared/enums/NavigationPagesEnum';
import { StorageEnum } from 'src/app/shared/enums/StorageEnum';
import { OutfitModel } from 'src/app/shared/models/OutfitModel';
import { OutfitDetailComponent } from './components/outfit-detail/outfit-detail.component';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.page.html',
  styleUrls: ['./outfit.page.scss'],
})
export class OutfitPage implements OnInit {
  public outfits: OutfitModel[] = [];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private errorsService: ErrorsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.initializeItems();
  }

  /**
   * Initialize items required in view
   */
  private async initializeItems() {
    try {
      this.outfits = await this.storageService.get<OutfitModel>(
        StorageEnum.OUTFIT
      );
    } catch (err) {
      this.errorsService.handleError(err);
    }
  }

  /**
   * Remove outfit from DB
   * @param outfitId Outfit ID
   */
  async removeOutfit(outfitId: string) {
    try {
      await this.storageService.remove<OutfitModel>(
        StorageEnum.OUTFIT,
        outfitId
      );
      await this.toastService.presetSuccessToast('Outfit rimosso con successo');
    } catch (err) {
      this.errorsService.handleError(err);
    }
  }

  /**
   * Open Outfit Detail
   */
  async openDetail(isWritable: boolean, outfit?: OutfitModel) {
    const modal = await this.modalCtrl.create({
      component: OutfitDetailComponent,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
      componentProps: {
        selectedOutfit: outfit,
        isWritable,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.initializeItems();
    });
    return await modal.present();
  }

  /**
   * Go to Search Page
   */
  goBack() {
    this.router.navigateByUrl(NavigationPagesEnum.SEARCH);
  }
}
