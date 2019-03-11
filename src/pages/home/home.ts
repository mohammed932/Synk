import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import * as moment from "moment";
import { Persons } from "./mocks";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  message: string = "type your response";
  response: string = "Response";
  name: string = "Client";
  Events: any;
  isLoading: boolean = true;
  Persons: any[] = Persons;
  data: any = {};

  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    private event: Events
  ) {
    this.checkEvents();
  }

  ionViewDidEnter() {
    this.getAllEvents();
  }

  checkEvents() {
    this.event.subscribe("eventCreated", () => {
      this.getAllEvents;
    });
  }

  eventDetails(event) {
    this.navCtrl.push("ActivityDetailsPage", { eventId: event.id });
  }

  onInput(event) {}

  send() {}

  getAllEvents() {
    this.api.getAllEvents().subscribe(
      data => {
        console.log("happenings data : ", data);
        if (data.stauts) {
          this.Events = data.events;
        }
        this.isLoading = false;
      },
      err => {
        console.log("event error is : ", err);
        this.isLoading = false;
      }
    );
  }

  formatTime(time) {
    return moment(time, "HH:mm").format("hh:mm A");
  }
}
