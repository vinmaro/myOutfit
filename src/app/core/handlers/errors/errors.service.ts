import { Injectable } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  constructor(private toastService: ToastService) {}

  /**
   * Handle error
   * @param error Error object
   */
  async handleError(error: any) {
    const message =
      typeof error === 'string'
        ? error.toString()
        : 'Si è verificato un errore';
    await this.toastService.presetDangerToast(message);
  }
}
