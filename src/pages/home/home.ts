import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Persons: any[] = [
    { img: 'assets/imgs/1.jpg' },
    { img: 'assets/imgs/2.jpg' },
    { img: 'assets/imgs/3.jpg' },
    { img: 'assets/imgs/4.jpg' },
    { img: 'assets/imgs/5.jpg' },
  ]
  data: any = {}
  Events: any[] = [
    { isSynked: false, isInvited: false },
    { isSynked: true, isInvited: false },
    { isSynked: false, isInvited: true },
    { isSynked: true, isInvited: false },
  ]
  constructor(public navCtrl: NavController) {

  }

  eventDetails(event) {
    this.navCtrl.push('ActivityDetailsPage')
  }

  onInput(event) {
    console.log("eventeventevent :", event);
  }
}
