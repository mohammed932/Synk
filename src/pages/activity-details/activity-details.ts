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
  isSynkWaiting: boolean = false;
  isLoading: boolean = false;
  isWaiting: boolean = false;
  userData = JSON.parse(localStorage.getItem("userData"));
  data: any = { max_number: 1, min_number: 1 };
  event: any = {};
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

    if (this.navParams.get("event")) {
      this.event = this.navParams.get("event");
      this.data = this.event;
    } else if (this.navParams.get("eventId")) {
      this.isLoading = true;
      let id = this.navParams.get("eventId");
      this.event._id = id;
      this.getActivity(id);
    }
    this.getEventGoings();
    console.log("event is :", this.event);
  }

  makeGoing() {
    this.isSynkWaiting = true;
    this.api.makeGoing(this.event).subscribe(
      data => {
        console.log("make going response :", data);
        this.getEventGoings();
        this.event.goings_count += 1;
        this.event.isSynked = true;
        this.isSynkWaiting = false;
      },
      err => {
        console.log("make going error :", err);
        this.isSynkWaiting = false;
      }
    );
  }

  getActivity(id) {
    this.api.getEvent(id).subscribe(data => {
      let synkedEvents = this.userData.synced_events;
      this.event = data;
      if (synkedEvents.includes(id)) {
        this.event.isSynked = true;
      }
      console.log("noti event is :", this.event);
      this.isLoading = false;
    });
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
    console.log("event id :", this.event._id);

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
    this.isSynkWaiting = true;
    this.api.unSync(this.event._id).subscribe(
      data => {
        this.event.isSynked = false;
        this.event.goings_count -= 1;
        this.event.color = "";
        this.isSynkWaiting = false;
        this.getEventGoings();
        this.setting.showAlert("Now you unsync from event !");
      },
      err => {
        this.isSynkWaiting = false;
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

  getEvent(id) {
    this.isLoading = true;
    this.api.getEvent(id).subscribe(data => {
      this.event = data;
      this.data = data;
      this.isLoading = false;
    });
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
