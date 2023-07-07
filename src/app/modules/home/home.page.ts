import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ErrorsService } from 'src/app/core/handlers/errors/errors.service';
import { ImageService } from 'src/app/core/services/image/image.service';
import { NavigationPagesEnum } from 'src/app/shared/enums/NavigationPagesEnum';
import { DressModel } from 'src/app/shared/models/DressModel';
import { OutfitDetailComponent } from '../outfit/components/outfit-detail/outfit-detail.component';
import { DressDetailComponent } from '../dresses/components/dress-detail/dress-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Input() dress!: DressModel;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private imageService: ImageService,
    private errorsService: ErrorsService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Go to "Dresses" page
   */
  goToDresses() {
    this.router.navigateByUrl(NavigationPagesEnum.DRESSES);
  }

  /**
   * Show Action Sheet
   */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleziona una foto',
      cssClass: '',
      buttons: [
        {
          text: 'Scatta una foto',
          icon: 'camera',
          handler: async () => {
            await this.selectImageFromCamera();
            return await this.goToDressDetail(this.dress, true);
          },
        },
        {
          text: 'Seleziona dalla galleria',
          icon: 'image',
          handler: async () => {
            await this.selectImageFromGallery();
            return await this.goToDressDetail(this.dress, true);
          },
        },
        {
          text: 'Chiudi',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  /**
   * Handler for select image from camera button
   */
  async selectImageFromCamera(): Promise<boolean> {
    try {
      const image = await this.imageService.getImageFromCamera();
      this.dress = {
        img: image,
      };
    } catch (err) {
      this.errorsService.handleError(err);
    }

    return true;
  }

  /**
   * Handler for select image from gallery button
   */
  async selectImageFromGallery(): Promise<boolean> {
    try {
      const image = await this.imageService.getImageFromGallery();
      this.dress = {
        img: image,
      };
    } catch (err) {
      this.errorsService.handleError(err);
    }
    return true;
  }

  /**
   * Go to "Outfit" page
   */
  goToOutfit() {
    this.router.navigateByUrl(NavigationPagesEnum.OUTFIT);
  }

  /**
   * Create new Outfit modal
   */
  async createNewOutfit() {
    const modal = await this.modalCtrl.create({
      component: OutfitDetailComponent,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
      componentProps: {
        isWritable: true,
      },
    });
    return await modal.present();
  }

  async goToDressDetail(dress: DressModel, isWritable: boolean) {
    const modal = await this.modalCtrl.create({
      component: DressDetailComponent,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
      componentProps: {
        selectedDress: dress,
        isWritable,
      },
    });
    await modal.present();
    return true;
  }
}
