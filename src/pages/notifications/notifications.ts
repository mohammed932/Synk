import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { Notifications } from "./mocks";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
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
    private setting: SettingProvider,
    private event: Events,
    private api: ApiProvider
  ) {
    this.getNotifications();
    this.checkEvents();
  }
  checkEvents() {
    this.event.subscribe("notificationReceive", () => {
      this.getNotifications();
    });
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

  getActivity(id) {
    this.api.getEvent(id).subscribe(data => {
      return data;
    });
  }

  async openNotification(notification) {
    switch (notification.type) {
      case "going":
        this.navCtrl.push("ActivityDetailsPage", {
          eventId: notification.data.event._id
        });
        break;
      case "activity_invitation":
        this.navCtrl.push("ActivityDetailsPage", {
          eventId: notification.data.event._id
        });
        break;
      case "new_activity":
        this.navCtrl.push("ActivityDetailsPage", {
          eventId: notification.data.event._id
        });
        break;
      case "activity_updated":
        this.navCtrl.push("ActivityDetailsPage", {
          eventId: notification.data.event._id
        });
        break;
      case "friend_request":
        this.navCtrl.setRoot("TabsPage", { index: 1 });
        break;

      default:
        break;
    }
    this.readNotification(notification);
  }

  readNotification(notification) {
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
