import { Component } from "@angular/core";
import { IonicPage, NavParams, AlertController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@Component({
  templateUrl: "tabs.html"
})
@IonicPage()
export class TabsPage {
  activityCreated: any = this.navparams.get("activityCreated");
  activityColor: any = this.navparams.get("activityColor");
  tab1Root = "HomePage";
  tab2Root = "FriendsTabPage";
  tab3Root = "CreateActivityPage";
  tab4Root = "NotificationsPage";
  tab5Root = "MyProfilePage";
  count: number = 0;
  constructor(
    private navparams: NavParams,
    private api: ApiProvider,
    private alertCtrl: AlertController
  ) {
    this.countUnseenNotifications();
    console.log("activityColor:", this.activityColor);
  }

  countUnseenNotifications() {
    this.api.countUnseenNotifications().subscribe(data => {
      localStorage.setItem("notificationCount", JSON.stringify(data.Count));
      this.count = JSON.parse(localStorage.getItem("notificationCount"));
      console.log("unseen notification count : ", data);
    });
  }

  changeTab(event) {
    this.count = JSON.parse(localStorage.getItem("notificationCount"));
  }
}
