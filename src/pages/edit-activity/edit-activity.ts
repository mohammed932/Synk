import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {
  data: any = {
    minPersons : 2,
    maxPersons : 7
  }
  Persons: Array<any> = new Array(10);
  Synks: any[] = [
    { img: 'assets/imgs/1.jpg' },
    { img: 'assets/imgs/2.jpg' },
    { img: 'assets/imgs/3.jpg' },
    { img: 'assets/imgs/4.jpg' },
    { img: 'assets/imgs/5.jpg' },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}
