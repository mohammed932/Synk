import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { Persons } from "./mocks";
import { ApiProvider } from "../../providers/api/api";
import * as moment from "moment";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-activity-details",
  templateUrl: "activity-details.html"
})
export class ActivityDetailsPage {
  Persons: any[] = Persons;
  goings: any;
  tabBarElement: any;
  isWaiting: boolean = false;
  userData = JSON.parse(localStorage.getItem("userData"));
  data: any = { max_number: 1, min_number: 1 };
  event: any = this.navParams.get("event");
  constructor(
    public navCtrl: NavController,
    private setting: SettingProvider,
    private modalCtrl: ModalController,
    private callNumber: CallNumber,
    private api: ApiProvider,
    public navParams: NavParams
  ) {
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    console.log("user Data : ", this.userData);
    console.log("event is :", this.event);
    this.getEventGoings();
    if (this.event) {
      this.data = this.event;
    }
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = "none";
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = "flex";
  }

  inviteFriends() {
    let modal = this.modalCtrl.create("InviteFriendsToEventPage", {
      event: this.event
    });
    modal.present();
  }

  getEventGoings() {
    this.api.eventGoings(this.event._id).subscribe(data => {
      console.log("goings are :", data);
      this.goings = data;
    });
  }

  goToTask() {
    this.navCtrl.push("TasksPage", { event: this.event });
  }

  editActivity() {
    let modal = this.modalCtrl.create("EditActivityPage", {
      event: this.event
    });
    modal.onDidDismiss(data => {
      console.log("return edit data modal :", data);
      this.event = data;
    });
    modal.present();
  }

  unSync() {
    this.api.unSync(this.event._id).subscribe(
      data => {
        this.event.isSynked = false;
        this.setting.showAlert("Now you unsync from event !");
      },
      err => {
        console.log("unsync err :", err);
      }
    );
  }
  formatTime(time) {
    if (time) {
      return time.replace(/^0+/, "");
    } else {
      return "";
    }
  }

  openUserProfile(id) {
    this.navCtrl.push("UserProfilePage", { userId: id });
  }
  call() {
    this.callNumber
      .callNumber(this.event.user.mobile, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }
}
