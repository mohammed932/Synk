import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  DateTime,
  Slides,
  NavParams,
  ViewController
} from "ionic-angular";
import { randomActivities } from "../create-activity/mocks";
import * as moment from "moment";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
import * as _ from "lodash";

@IonicPage()
@Component({
  selector: "page-edit-activity",
  templateUrl: "edit-activity.html"
})
export class EditActivityPage {
  randomActivities: any = randomActivities;
  @ViewChild(Slides) slides: Slides;
  slideIndex: number = 0;
  isWaiting: boolean = false;
  @ViewChild("date") datePicker: DateTime;
  @ViewChild("time") timePicker: DateTime;
  data: any = {};
  event: any = this.navParams.get("event");
  constructor(
    public navCtrl: NavController,
    private setting: SettingProvider,
    public navParams: NavParams,
    private api: ApiProvider,
    private viewCtrl: ViewController
  ) {
    this.configureComingEvent();
    console.log("event is :", this.event);
    this.changeToMilitryTime();
  }

  changeToMilitryTime() {
    let standardTime = moment(this.event.time, "hh:mm a")
      .format("HH:mm")
      .replace(/^0+/, "");
    return standardTime;
  }

  configureComingEvent() {
    this.event.time = this.changeToMilitryTime();
    // this.event.time = this.calculateTime("+2");
  }

  calculateTime(offset: any) {
    let d = new Date();
    let nd = new Date(d.getTime() + 3600000 * offset);
    return nd.toISOString();
  }

  step(index) {
    this.slideIndex = index;
    switch (index) {
      case 1:
        this.data.showArrowBack = true;
        this.datePicker.open();
        break;
      case 2:
        this.data.showArrowBack = true;
        this.timePicker.open();
        break;
      case 3:
        this.data.showArrowBack = true;
        break;
      case 4:
        console.log("hi there");
        break;
      case 5:
        this.data.showDoneBtn = true;
        this.data.showArrowBack = true;
        this.data.invite_status = 1;
        break;
    }
    this.navigateToNextSlide(index);
  }

  back(index) {
    switch (index) {
      case 1:
        this.data.showDoneBtn = false;
        this.datePicker.open();
        break;
      case 2:
        this.data.showDoneBtn = false;
        this.timePicker.open();
        break;
      case 3:
        this.data.showDoneBtn = false;
        break;
      case 4:
        this.data.showDoneBtn = false;
        break;
    }
    this.navigateToNextSlide(index);
  }

  navigateToNextSlide(num) {
    this.slides.slideTo(num);
  }

  selectActivity(activity) {
    this.event.title = activity.name;
    this.data.color = activity.color;
    this.event.color = activity.color;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  editEvent() {
    this.isWaiting = true;
    let params = {
      price: this.event.price ? Number(this.event.price) : 0,
      min: Number(this.event.min),
      max: Number(this.event.max),
      date: moment(this.event.date).format("YYYY-MM-DD"),
      color: this.event.color,
      location: this.event.location,
      title: this.event.title,
      _id: this.event._id,
      time: this.event.time
    };
    this.api.updateEvent(params).subscribe(
      data => {
        this.setting.showAlert("event updated successfully !");
        this.viewCtrl.dismiss(data);
        this.isWaiting = false;
      },
      err => {
        if (!_.has(err.error, "details")) {
          this.setting.showAlert(err.error.message);
        } else {
          this.setting.showAlert(err.error.details[0].message);
        }
        this.isWaiting = false;
        console.log("update event err :", err);
      }
    );
  }
}
