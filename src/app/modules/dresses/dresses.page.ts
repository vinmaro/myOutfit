import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { DressTypeEnum } from 'src/app/shared/enums/DressTypeEnum';
import { NavigationPagesEnum } from 'src/app/shared/enums/NavigationPagesEnum';
import { StorageEnum } from 'src/app/shared/enums/StorageEnum';
import { DressModel } from 'src/app/shared/models/DressModel';
import { DressDetailComponent } from './components/dress-detail/dress-detail.component';

@Component({
  selector: 'app-dresses',
  templateUrl: './dresses.page.html',
  styleUrls: ['./dresses.page.scss'],
})
export class DressesPage implements OnInit {
  dresses: DressModel[] = [];
  dressType!: DressTypeEnum;

  dressTypes = {
    clothes: 'Vestiti',
    shoes: 'Scarpe',
    accessories: 'Accessori',
  };

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.dressType = params['dressType'] as DressTypeEnum;

      if (this.dresses)
        this.dresses = this.dresses.filter(
          (dress) => dress.dressType === this.dressType
        );
    });
  }

  ionViewDidEnter() {
    this.initializeItem();
  }

  private async initializeItem() {
    this.dresses = await this.storageService.get<DressModel>(
      StorageEnum.DRESSES
    );

    this.dresses = this.dresses.filter(
      (dress) => dress.dressType === this.dressType
    );
  }

  /**
   * Open Dress detail modal
   * @param dress Dress details object
   */
  async openDetail(dress?: DressModel) {
    const modal = await this.modalCtrl.create({
      component: DressDetailComponent,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
      componentProps: {
        selectedDress: dress,
        isWritable: dress === undefined ? true : false,
      },
    });

    modal.onDidDismiss().then(() => {
      this.initializeItem();
    }).catch((err) => console.log(err));
    return await modal.present();
  }

  /**
   * Go to Search Page
   */
  goBack() {
    this.router.navigateByUrl(NavigationPagesEnum.SEARCH);
  }
}
