import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(public navCtrl: NavController,
     private viewCtrl : ViewController,
     public navParams: NavParams) {
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }
}
