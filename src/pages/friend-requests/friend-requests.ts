import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-friend-requests',
  templateUrl: 'friend-requests.html',
})
export class FriendRequestsPage {
  Requests: any[] = [
    { img: 'assets/imgs/1.jpg', name: 'Mohammed Mokhtar' },
    { img: 'assets/imgs/2.jpg', name: 'Sara Hatam' },
    { img: 'assets/imgs/3.jpg', name: 'Ahmed Magdy' }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendRequestsPage');
  }

}
