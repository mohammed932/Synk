import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-activity-details',
  templateUrl: 'activity-details.html',
})
export class ActivityDetailsPage {
  Persons: any[] = [
    { img: 'assets/imgs/1.jpg' },
    { img: 'assets/imgs/2.jpg' },
    { img: 'assets/imgs/3.jpg' },
    { img: 'assets/imgs/4.jpg' },
    { img: 'assets/imgs/5.jpg' },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToTask(){
    this.navCtrl.push('TasksPage')
  }


}
