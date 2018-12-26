import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  data : any = {
    gender : 'f'
  }
  constructor(public navCtrl: NavController,
     private modalCtrl : ModalController,
     public navParams: NavParams) {
  }

  changePassword(){
       let modal = this.modalCtrl.create('ChangePasswordPage')
       modal.present()
  }

}
