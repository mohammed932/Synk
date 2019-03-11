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
  event: any;
  eventId: any = this.navParams.get("eventId");
  constructor(
    public navCtrl: NavController,
    private setting: SettingProvider,
    private api: ApiProvider,
    public navParams: NavParams
  ) {
    this.showEventById();
  }

  goToTask() {
    this.navCtrl.push("TasksPage");
  }

  showEventById() {
    this.api.showEventById(this.eventId).subscribe(data => {
      console.log("event data : ", data);
      this.event = data.event;
    });
  }

  editActivity() {
    this.navCtrl.push("EditActivityPage");
  }
  formatTime(time) {
    return moment(time, "HH:mm").format("hh:mm A");
  }
}
