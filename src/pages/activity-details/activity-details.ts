import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
  isWaiting: boolean = false;
  userData = JSON.parse(localStorage.getItem("userData"));
  data: any = { max_number: 1, min_number: 1 };
  event: any = this.navParams.get("event");
  constructor(
    public navCtrl: NavController,
    private setting: SettingProvider,
    private api: ApiProvider,
    public navParams: NavParams
  ) {
    console.log("user Data : ", this.userData);

    if (this.event) {
      this.data = this.event;
    }
  }

  goToTask() {
    this.navCtrl.push("TasksPage", { event: this.event });
  }

  editActivity() {
    this.navCtrl.push("EditActivityPage");
  }
  formatTime(time) {
    return moment(time, "HH:mm").format("hh:mm A");
  }

  editEvent() {
    this.isWaiting = true;
    this.api.updateEvent(this.data).subscribe(
      data => {
        console.log("data updated : ", data);
        if (data.status) {
          this.setting.presentToast(data.message);
        }
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
}
