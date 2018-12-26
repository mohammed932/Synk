import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-my-friends',
  templateUrl: 'my-friends.html',
})
export class MyFriendsPage {

  Friends: any[] = [
    { img: 'assets/imgs/1.jpg', name: 'Mohammed Mokhtar', isAdded: false },
    { img: 'assets/imgs/2.jpg', name: 'Sara Hatam', isAdded: true },
    { img: 'assets/imgs/3.jpg', name: 'Ahmed Magdy', isAdded: false },
    { img: 'assets/imgs/1.jpg', name: 'Mohammed Mokhtar', isAdded: true },
    { img: 'assets/imgs/2.jpg', name: 'Sara Hatam', isAdded: false },
    { img: 'assets/imgs/3.jpg', name: 'Ahmed Magdy', isAdded: true }
  ]

  data: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  friendRequests() {
    this.navCtrl.push('FriendRequestsPage')
  }

  onInput(event) {
    console.log("lol");
  }

  onCancel(event) {
    console.log("zoz");
  }

}
