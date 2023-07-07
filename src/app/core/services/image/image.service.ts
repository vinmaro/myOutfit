import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    correctOrientation: false,
    saveToPhotoAlbum: false,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  private galleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true,
  };

  constructor(private camera: Camera) {}

  /**
   * Get image from Gallery
   * @returns Base64 images
   */
  public async getImageFromGallery(): Promise<string> {
    // try {
    //   const results = await this.imagePicker.getPictures(this.imageOptions);
    //   const results = await this.imagePicker.getPictures(this.imageOptions);
    //   if (results && results.length > 0)
    //     return await this.cropImage(results[0]);
    //   else throw Error;
    // } catch (err) {
    //   throw err;
    // }
    // return new Promise(() => '').then(() => '').catch();
    try {
      const result = await this.camera
        .getPicture(this.galleryOptions)
        .then((imgData) => {
          console.log('image data =>  ', imgData);
          const base64Img = 'data:image/jpeg;base64,' + imgData;
          const userImg = base64Img;
          return userImg;
        });
      return result;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get an image from camera
   * @returns Base64 image
   */
  public async getImageFromCamera(): Promise<string> {
    try {
      const plainImage = await this.camera
        .getPicture(this.cameraOptions)
        .then((imageData: any) => {
          return 'data:image/jpeg;base64,' + imageData;
        });
      return plainImage;
    } catch (err) {
      throw err;
    }
  }
}
