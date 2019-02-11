import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Notifications } from './mocks';
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  Notifications: any[] = Notifications
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  Notification() {
    console.log("notification clicked");
  }
}
