import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastColorEnum } from 'src/app/shared/enums/ToastColorEnum';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastController: ToastController) {}

  /**
   * Display primary toast
   * @param message Message to display
   */
  async presetPrimaryToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: ToastColorEnum.PRIMARY,
    });
    toast.present();
  }

  /**
   * Display success toast
   * @param message Message to display
   */
  async presetSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: ToastColorEnum.SUCCESS,
    });
    toast.present();
  }

  /**
   * Display danger toast
   * @param message Message to display
   */
  async presetWarningToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: ToastColorEnum.WARNING,
    });
    toast.present();
  }

  /**
   * Display danger toast
   * @param message Message to display
   */
  async presetDangerToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: ToastColorEnum.DANGER,
    });
    toast.present();
  }
}
