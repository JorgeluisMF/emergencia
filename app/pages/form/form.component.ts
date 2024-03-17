import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Emergencia } from 'src/app/interface/emergencia';
import { CrStorageService}  from 'src/app/services/cr-storage.service';
import { PhotoService } from 'src/app/services/photo.service';
import { IonButton,AlertController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {
   
  data : Emergencia [] = [];
  image: string = ''
  constructor(
    private _crStorageService : CrStorageService,
    private photoService : PhotoService,
    private alertController : AlertController,
    private toastController : ToastController
    ) { }

  ngOnInit() {
    this.getEmergencias();
  }

  getEmergencias(){
    this._crStorageService.getAll().then(data =>{
      this.data = data
      console.log("data",this.data)
    });
  }

  async saveEmergencia(form: NgForm){
    if(!form.value.titulo || !form.value.descripcion || !form.value.fecha){
      await this.showAlert("Todos los campos son obligatorios");
      return;
    }
    form.value.image = this.photoService.ImageUrl;
    this._crStorageService.saveIdentity(form.value).then(rs =>{
      this.presentToast("agregado correctamente!",'top')
      form.reset();
      this.image= "";
      this.getEmergencias();
    })
  }

  addPhotoToGallery(){
    this.photoService.takePicture()
      .then(rs =>{
        this.image =`data:png,base64,${this.photoService.ImageUrl}`
      });
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom'){
    const toast = await this.toastController.create({
      message: message,
      duration: 15000,
      position: position
    });

    await toast.present();
  }

  async showAlert(message: string){
    const Alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await Alert.present();
  }

  clearImage(){
    this.image = ""
  }

}
