import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ErrorsService } from 'src/app/core/handlers/errors/errors.service';
import { ImageService } from 'src/app/core/services/image/image.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { StorageEnum } from 'src/app/shared/enums/StorageEnum';
import { DressModel } from 'src/app/shared/models/DressModel';
import { OutfitModel } from 'src/app/shared/models/OutfitModel';
import { DressListComponent } from '../dress-list/dress-list.component';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { A11y, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

@Component({
  selector: 'app-outfit-detail',
  templateUrl: './outfit-detail.component.html',
  styleUrls: ['./outfit-detail.component.scss'],
})
export class OutfitDetailComponent implements OnInit {
  @Input() isWritable = false;
  @Input() selectedOutfit!: OutfitModel;

  public selectedDresses: DressModel[] = [];
  outfitForm = this.fb.group({
    name: ['', Validators.required],
    img: [''],
    dressIds: this.fb.array([]),
  });

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private storageService: StorageService,
    private errorsService: ErrorsService,
    private toastService: ToastService,
    private imageService: ImageService,
    private actionSheetController: ActionSheetController
  ) {}

  get dressIds() {
    return this.outfitForm.get('dressIds') as FormArray;
  }

  ngOnInit() {
    this.initializeItem();
  }

  /**
   * Initialize items required in view
   */
  private async initializeItem() {
    if (this.selectedOutfit) {
      this.outfitForm.patchValue({
        name: this.selectedOutfit.name,
        img: this.selectedOutfit.img,
      });
      try {
        for (const dressId of this.selectedOutfit.dressIds ?? []) {
          const dress = await this.storageService.getById<DressModel>(
            StorageEnum.DRESSES,
            dressId
          );
          if (dress) {
            this.dressIds.push(this.fb.control(dress.id));
            this.selectedDresses.push(dress);
          }
        }
      } catch (err) {
        this.errorsService.handleError(err);
      }
    }

    if (this.isWritable) this.outfitForm.enable();
    else this.outfitForm.disable();
  }

  /**
   * Update or create outfit in database
   */
  async updateOrCreate() {
    const outfitForm = this.outfitForm.value as OutfitModel;
    if (this.selectedOutfit && this.selectedOutfit.id) {
      this.selectedOutfit.img = outfitForm.img;
      this.selectedOutfit.name = outfitForm.name;
      this.selectedOutfit.dressIds = outfitForm.dressIds;
      try {
        // await this.storageService.remove<OutfitModel>(
        //   StorageEnum.OUTFIT,
        //   this.selectedOutfit.id
        // );
        // const newOutfit = outfitForm as OutfitModel;
        // await this.storageService.insert<OutfitModel>(
        //   StorageEnum.OUTFIT,
        //   newOutfit
        // );
        await this.storageService.update<OutfitModel>(
          StorageEnum.OUTFIT,
          this.selectedOutfit.id,
          this.selectedOutfit
        );
        await this.toastService.presetSuccessToast(
          'Outfit modificato con successo!'
        );
      } catch (err) {
        this.errorsService.handleError(err);
      }
      this.initializeItem();
    } else {
      const newOutfit = outfitForm as OutfitModel;
      try {
        await this.storageService.insert<OutfitModel>(
          StorageEnum.OUTFIT,
          newOutfit
        );
        await this.toastService.presetSuccessToast(
          'Outfit creato con successo!'
        );
      } catch (err) {
        this.errorsService.handleError(err);
      }
    }
    this.dismiss();
  }

  /**
   * Remove element from Form
   * @param dressId Dress ID
   */
  async removeElement(dressId: string) {
    const dressIndex = this.selectedDresses.findIndex(
      (selectedDress) => selectedDress.id === dressId
    );
    if (dressIndex >= 0) {
      this.selectedDresses.splice(dressIndex, 1);
      this.dressIds.clear();
      for (const singleDress of this.selectedDresses) {
        this.dressIds.push(this.fb.control(singleDress.id));
      }
    }
  }

  /**
   * Remove outfit from list
   *
   */
  async removeOutfit() {
    try {
      await this.storageService.remove<OutfitModel>(
        StorageEnum.OUTFIT,
        this.selectedOutfit.id ?? ''
      );
      this.dismiss();
    } catch (err) {
      this.errorsService.handleError(err);
    }
  }

  /**
   * Open dress detail
   */
  async openDetail() {
    const modal = await this.modalCtrl.create({
      component: DressListComponent,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
    });

    modal.onWillDismiss().then((data) => {
      const element = data.data as DressModel;
      if (
        element.id &&
        this.selectedDresses.findIndex(
          (selectedDress) => selectedDress.id === element.id
        ) === -1
      ) {
        this.selectedDresses = [...this.selectedDresses, element];
        this.dressIds.push(this.fb.control(element.id));

        console.log(this.selectedDresses);
      }
    });

    return await modal.present();
  }

  /**
   * Toggle edit function
   */
  async toggleEdit() {
    if (this.outfitForm.enabled) {
      this.outfitForm.disable();
      if (this.selectedOutfit) {
        this.outfitForm.patchValue({
          name: this.selectedOutfit.name,
          img: this.selectedOutfit.img,
        });
        this.dressIds.clear();
        try {
          this.selectedDresses = [];
          for (const dressId of this.selectedOutfit.dressIds ?? []) {
            const dress = await this.storageService.getById<DressModel>(
              StorageEnum.DRESSES,
              dressId
            );

            if (dress) {
              this.selectedDresses.push(dress);
              this.dressIds.push(this.fb.control(dress.id));
            }
          }
        } catch (err) {
          this.errorsService.handleError(err);
        }
      }
      this.outfitForm.disable();
    } else this.outfitForm.enable();
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
            return await this.selectImageFromCamera();
          },
        },
        {
          text: 'Seleziona dalla galleria',
          icon: 'image',
          handler: async () => {
            return await this.selectImageFromGallery();
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
      this.outfitForm.patchValue({
        img: image,
      });
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
      this.outfitForm.patchValue({
        img: image,
      });
    } catch (err) {
      this.errorsService.handleError(err);
    }
    return true;
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
