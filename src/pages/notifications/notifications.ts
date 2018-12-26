import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  Notifications: any[] = [
    { noti: 'Sara hatam invited yout to synk to her activity movie night tomorrow at 5:00 pm', img: '1.jpg', time: 'Tuesday 5/10/2018 6:35 pm' },
    { noti: 'Your order has been received and the meal is being prepared', img: '2.jpg', time: 'Wednesday 5/10/2018 6:35 pm' },
    { noti: 'Thank you for receiving the meal and evaluating the restaurant', img: '3.jpg', time: 'Sunday 5/10/2018 6:35 pm' },
    { noti: 'We apologize for delaying the connection. The driver will receive you in minutes', img: '1.jpg', time: 'Saturday 5/10/2018 6:35 pm' },
    { noti: 'Your new payment method has been added succseffuly', img: '4.jpg', time: 'Friday 5/10/2018 6:35 pm' },
    { noti: 'Your order has been received and the meal is being prepared', img: '5.jpg', time: 'Tuesday 5/10/2018 6:35 pm' },
    { noti: 'Thank you for receiving the meal and evaluating the restaurant', img: '1.jpg', time: 'Tuesday 5/10/2018 6:35 pm' },
    { noti: 'We apologize for delaying the connection. The driver will receive you in minutes', img: '2.jpg', time: 'Tuesday 5/10/2018 6:35 pm' },
    { noti: 'Thank you for receiving the meal and evaluating the restaurant', img: '3.jpg', time: 'Tuesday 5/10/2018 6:35 pm' },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  Notification() {
    console.log("notification clicked");
  }
}
