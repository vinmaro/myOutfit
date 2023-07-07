import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ErrorsService } from 'src/app/core/handlers/errors/errors.service';
import { ImageService } from 'src/app/core/services/image/image.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ClothesTypeEnum } from 'src/app/shared/enums/ClothesTypeEnum';
import { ColorEnum } from 'src/app/shared/enums/ColorEnum';
import { DressTypeEnum } from 'src/app/shared/enums/DressTypeEnum';
import { SeasonEnum } from 'src/app/shared/enums/SeasonEnum';
import { StorageEnum } from 'src/app/shared/enums/StorageEnum';
import { DressModel } from 'src/app/shared/models/DressModel';

@Component({
  selector: 'app-dress-detail',
  templateUrl: './dress-detail.component.html',
  styleUrls: ['./dress-detail.component.css'],
})
export class DressDetailComponent {
  @Input() selectedDress!: DressModel;
  @Input() isWritable = false;

  dressForm = this.fb.group({
    name: ['', Validators.required],
    color: new FormControl(['']),
    season: ['', Validators.required],
    dressType: ['', Validators.required],
    clothesType: [''],
    img: [''],
  });

  ColorEnum = ColorEnum;
  SeasonEnum = SeasonEnum;
  DressTypeEnum = DressTypeEnum;
  ClothesTypeEnum = ClothesTypeEnum;

  constructor(
    private actionSheetController: ActionSheetController,
    private imageService: ImageService,
    private errorsService: ErrorsService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  get colors() {
    return this.dressForm.get('color') as FormArray;
  }

  ngOnInit() {
    this.initializeItems();
  }

  private async initializeItems() {
    if (this.selectedDress) {
      this.dressForm.patchValue({
        name: this.selectedDress.name,
        color: this.selectedDress.color,
        season: this.selectedDress.season,
        dressType: this.selectedDress.dressType,
        clothesType: this.selectedDress.clothesType,
        img: this.selectedDress.img,
      });
    }

    if (this.isWritable) this.dressForm.enable();
    else this.dressForm.disable();
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
   * Handler for select image from gallery button
   */
  async selectImageFromGallery(): Promise<boolean> {
    try {
      const image = await this.imageService.getImageFromGallery();
      this.dressForm.patchValue({
        img: image,
      });
    } catch (err) {
      this.errorsService.handleError(err);
    }
    return true;
  }

  /**
   * Update or create Dress in database
   */
  async updateOrCreate() {
    const dressForm = this.dressForm.value as DressModel;
    if (this.dressForm.valid) {
      if (this.selectedDress && this.selectedDress.id) {
        this.selectedDress.img = dressForm.img;
        this.selectedDress.name = dressForm.name;
        this.selectedDress.color = this.colors.value;
        this.selectedDress.season = dressForm.season;
        this.selectedDress.dressType = dressForm.dressType;
        this.selectedDress.clothesType = dressForm.clothesType;
        this.selectedDress.img = this.selectedDress.img;

        try {
          await this.storageService.update<DressModel>(
            StorageEnum.DRESSES,
            this.selectedDress.id,
            this.selectedDress
          );
          await this.toastService.presetSuccessToast(
            'Abbigliamento modificato con successo!'
          );
        } catch (err) {
          this.errorsService.handleError(err + " PAZZO");
        }
      } else {
        const newDress = dressForm as DressModel;
        try {
          await this.storageService.insert<DressModel>(
            StorageEnum.DRESSES,
            newDress
          );
          await this.toastService.presetSuccessToast(
            'Abbigliamento creato con successo!'
          );

          const dresses = await this.storageService.get<DressModel>(
            StorageEnum.DRESSES
          );
          console.log(dresses);
        } catch (err) {
          console.log(err)
          this.errorsService.handleError(err + ", PAZZO");
        }
      }
      this.dismiss();
    } else {
      await this.toastService.presetWarningToast(
        'Attenzione: Compila tutti i campi!'
      );
    }
  }

  /**
   * Handler for select image from camera button
   */
  async selectImageFromCamera(): Promise<boolean> {
    try {
      const image = await this.imageService.getImageFromCamera();
      this.dressForm.patchValue({
        img: image,
      });
    } catch (err) {
      this.errorsService.handleError(err);
    }

    return true;
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  async toggleEdit() {
    if (this.dressForm.enabled) {
      if (this.selectedDress) {
        this.dressForm.patchValue({
          name: this.selectedDress.name,
          // color: this.selectedDress.color,
          season: this.selectedDress.season,
          dressType: this.selectedDress.dressType,
          clothesType: this.selectedDress.clothesType,
          img: this.selectedDress.img,
        });
        this.dressForm.disable();
      }
    } else this.dressForm.enable();
  }

  /**
   * Handler for change dress Type
   */
  handleChange(event: any) {
    if(event === DressTypeEnum.CLOTHES) {
      this.dressForm.get("clothesType")?.addValidators(Validators.required)
    }else {
      this.dressForm.get("clothesType")?.removeValidators(Validators.required)
    }

  }
}
