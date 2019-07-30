import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavParams,
  AlertController,
  Tabs,
  NavController,
  App,
  Events
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@Component({
  templateUrl: "tabs.html"
})
@IonicPage()
export class TabsPage {
  tab1Root = "HomePage";
  tab2Root = "FriendsTabPage";
  tab3Root = "CreateActivityPage";
  tab4Root = "NotificationsPage";
  tab5Root = "MyProfilePage";
  @ViewChild("paymentTabs") paymentTabs: Tabs;
  count: number = 0;
  index: number = this.navParams.get("index");
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private event: Events,
    private app: App,
    private api: ApiProvider,
    private alertCtrl: AlertController
  ) {
    this.countUnseenNotifications();
    this.checkEvents();
  }

  checkEvents() {
    this.event.subscribe("notificationReceive", () => {
      this.countUnseenNotifications();
    });
  }
  ionViewWillEnter() {
    this.app
      .getRootNav()
      .getActiveChildNav()
      .select(this.index);
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
