import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ErrorsService } from 'src/app/core/handlers/errors/errors.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ClothesTypeEnum } from 'src/app/shared/enums/ClothesTypeEnum';
import { DressTypeEnum } from 'src/app/shared/enums/DressTypeEnum';
import { StorageEnum } from 'src/app/shared/enums/StorageEnum';
import { DressModel } from 'src/app/shared/models/DressModel';

@Component({
  selector: 'app-dress-list',
  templateUrl: './dress-list.component.html',
  styleUrls: ['./dress-list.component.scss'],
})
export class DressListComponent implements OnInit {
  public dresses: DressModel[] = [];

  public categories = [
    {
      dressType: DressTypeEnum.CLOTHES,
      clothesType: ClothesTypeEnum.TOP,
      name: 'Parte Superiore',
    },
    {
      dressType: DressTypeEnum.CLOTHES,
      clothesType: ClothesTypeEnum.BOTTOM,
      name: 'Parte Inferiore',
    },
    {
      dressType: DressTypeEnum.SHOES,
      clothesType: null,
      name: 'Scarpe',
    },
    {
      dressType: DressTypeEnum.ACCESSORIES,
      clothesType: null,
      name: 'Accessori',
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private errorsService: ErrorsService
  ) {}

  ngOnInit() {
    this.initializeItems();
  }

  /**
   * Initialize items required in view
   */
  private async initializeItems() {
    try {
      this.dresses = await this.storageService.get<DressModel>(
        StorageEnum.DRESSES
      );
    } catch (err) {
      this.errorsService.handleError(err);
    }
  }

  onSelectedItem(item: DressModel) {
    this.modalCtrl.dismiss(item);
  }

  getIsShowable(category: any, dress: DressModel) {
    if (category.dressType == dress.dressType) {
      if (category.dressType == 'clothes') {
        return dress?.clothesType == category?.clothesType;
      }
      return true;
    }
    return false;
  }

  /**
   * Close modal
   */
  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
