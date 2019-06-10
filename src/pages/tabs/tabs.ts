import { Component } from "@angular/core";
import { IonicPage, NavParams, AlertController } from "ionic-angular";

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
  constructor(
    private navparams: NavParams,
    private alertCtrl: AlertController
  ) {
    console.log("activityColor:", this.activityColor);
  }

  // ionViewWillEnter() {
  //   if (this.activityCreated) {
  //     let alert = this.alertCtrl.create({
  //       title: 'NOTICE',
  //       message: 'Wohoo,You have created football activity. Set and edit further details on activity page.',
  //       buttons: [
  //         {
  //           text: 'Got it!',
  //           handler: () => {
  //             console.log('Got it clicked');
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   }
  // }

  changeTab(event) {
    console.log("tab event : ", event.id);
    if (event.id == "t0-2") {
      console.log("yes");
    }
  }
}
