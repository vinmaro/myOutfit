import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpCustomInterceptor } from './http/http.custom.interceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { SwiperDirective } from './directive/swiper.directive';

@NgModule({
  imports: [CommonModule, IonicModule, HttpClientModule, IonicStorageModule, SwiperDirective],
  exports: [CommonModule, IonicModule, HttpClientModule, IonicStorageModule, SwiperDirective],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
      multi: true,
    },
    Camera,
    ToastController
  ],
})
export class CoreModule { }
