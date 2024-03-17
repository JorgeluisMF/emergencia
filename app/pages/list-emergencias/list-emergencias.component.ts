import { Component, OnInit, Input} from '@angular/core';
import { Emergencia } from 'src/app/interface/emergencia';
import { AlertController } from '@ionic/angular';
import { CrStorageService } from 'src/app/services/cr-storage.service';

@Component({
  selector: 'app-list-emergencias',
  templateUrl: './list-emergencias.component.html',
  styleUrls: ['./list-emergencias.component.scss'],
  providers: [CrStorageService]
})
export class ListEmergenciasComponent  implements OnInit {

  @Input() listOfEmergencias!: Emergencia[];

  handlerMessage: string = '';
  roleMessage : string = '';
  confirm : string | undefined;

  constructor(
    private crStorageService : CrStorageService,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  convertPhotoFromBase64(base: string){
    return `data:png;base64,${base}`
  }

  clearData(){
    this.presentAlert().then(rs =>{
      if(this.confirm !== "confirm"){
        console.log("confirm", this,this.confirm);
        return;
      }
      this.crStorageService.delete().then(_data =>{
        this.listOfEmergencias = [];
      });
    });
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header:'confirmar',
      message: "seguro que deseas borrar estas emergencias",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            this.handlerMessage = 'Alert canceled'
          }
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () =>{
            this.handlerMessage = 'Alert confirmed'
          }
        }
      ]
    })
  }

}
