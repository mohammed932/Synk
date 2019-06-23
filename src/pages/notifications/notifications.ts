import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Notifications } from "./mocks";
import { ApiProvider } from "../../providers/api/api";
@IonicPage()
@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html"
})
export class NotificationsPage {
  notifications: any[] = Notifications;
  currentPage: number = 0;
  limit: number = 7;
  isLoading: boolean = true;
  pagesCount: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
    this.getNotifications();
  }

  ionViewWillEnter() {
    localStorage.setItem("notificationCount", JSON.stringify(0));
  }
  getNotifications() {
    this.api.getUserNotifications(this.currentPage, this.limit).subscribe(
      data => {
        console.log("notifications are :", data);
        this.notifications = data.notifications;
        this.pagesCount = data.pages;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
        console.log("user notifications err:", err);
      }
    );
  }

  updateNotification(notification) {
    let params = {
      notificationId: notification._id,
      is_clicked: true
    };
    notification.is_clicked = true;
    this.api.updateNotification(params).subscribe(
      data => {},
      err => {
        console.log("update notification err :", err);
      }
    );
  }

  doInfinite(scroll) {
    this.currentPage += 1;
    if (this.currentPage <= this.pagesCount) {
      this.api
        .getUserNotifications(this.currentPage, this.limit)
        .subscribe(data => {
          this.notifications = this.notifications.concat(data.notifications);
          scroll.complete();
        });
    } else {
      scroll.complete();
    }
  }
}
