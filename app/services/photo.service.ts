import { Injectable } from '@angular/core';
import { Camera,CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public ImageUrl : any;
  constructor() { }

  public async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this.ImageUrl = image.base64String;
  }
}
