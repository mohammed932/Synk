import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  App,
  DateTime,
  AlertController,
  Slides,
  Events
} from "ionic-angular";
import * as _ from "lodash";
import * as moment from "moment";
import { ContactList, randomActivities } from "./mocks";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
@IonicPage()
@Component({
  selector: "page-create-activity",
  templateUrl: "create-activity.html"
})
export class CreateActivityPage {
  randomActivities: any = randomActivities;
  // friends: any = ContactList;
  // newFriends: any = ContactList;
  isModal: boolean = this.navParams.get("isModal");
  friends: any[] = [];
  newFriends: any[] = [];
  groupedContacts = [];
  eventId: string;
  inviteFriends: any = ([] = []);
  isWaitingStepOne: boolean = false;
  isWaiting: boolean = false;
  isSlideReachEnd: boolean = false;
  tabBarElement: any;
  slideIndex: number = 0;
  data: any = {
    showDoneBtn: false,
    showArrowBack: false,
    friends_id: [],
    invite_status: 0,
    event_date: moment(new Date()).format("YYYY-MM-DD")
  };
  initDate: any;
  @ViewChild(Slides) slides: Slides;
  @ViewChild("date") datePicker: DateTime;
  @ViewChild("time") timePicker: DateTime;
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private event: Events,
    private app: App,
    private setting: SettingProvider,
    private api: ApiProvider,
    private alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.data.event_time = this.calculateTime("+2");
    this.getUserFriends();
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = "none";
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = "flex";
  }

  dismiss() {
    if (!this.isModal) {
      this.navCtrl.popToRoot();
      this.navCtrl.setRoot("TabsPage");
      // this.app.getRootNavs()[0].push("TabsPage");
    } else {
      this.viewCtrl.dismiss();
    }
  }

  navigateToNextSlide(num) {
    this.slides.slideTo(num);
  }

  setDate(date) {
    console.log("event : ", date);
    this.initDate = date;
  }

  formatDate(date) {
    return moment(date).format("YYYY/MM/DD");
  }

  calculateTime(offset: any) {
    let d = new Date();
    let nd = new Date(d.getTime() + 3600000 * offset);
    return nd.toISOString();
  }

  checkContact(event, contact) {
    contact.active = event._value;
    this.inviteFriends.push(contact._id);
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
        console.log("data is :", this.data);
        this.data.time = moment(this.data.event_time).format("hh:mm A");
        // this.createEvent(index);
        break;
      case 5:
        this.data.showDoneBtn = true;
        this.data.showArrowBack = true;
        this.data.invite_status = 1;
        break;
    }
    this.navigateToNextSlide(index);
  }

  getUserFriends() {
    this.api.userProfile().subscribe(
      data => {
        this.friends = data.friends;
        this.newFriends = this.friends;
        console.log("user profile data :", data);
      },
      err => {
        console.log("err :", err);
      }
    );
  }

  createEvent(index) {
    this.isWaitingStepOne = true;
    this.data.price = Number(this.data.price);
    this.data.max = Number(this.data.max);
    this.data.min = Number(this.data.min);
    this.api.createEvent(this.data).subscribe(
      data => {
        console.log("create event response :", data);
        this.eventId = data._id;
        this.isWaitingStepOne = false;
        this.data.showArrowBack = true;
        this.navigateToNextSlide(index);
      },
      err => {
        console.log("create event error is :", err);
        this.isWaitingStepOne = false;
      }
    );
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

  onInput(event) {
    console.log("eventevent :", event);
  }

  Done(isAllCommunity) {
    this.isWaiting = true;
    if (isAllCommunity == "all") {
      this.data.is_public = true;
    } else {
      this.data.is_public = false;
    }
    this.data.eventId = this.eventId;
    this.data.invites = this.inviteFriends;
    this.data.price = Number(this.data.price);
    this.data.max = Number(this.data.max);
    this.data.min = Number(this.data.min);
    console.log("create data :", this.data);

    this.api.createEvent(this.data).subscribe(
      data => {
        console.log("create event response :", data);
        this.setting.presentToast(data.message);
        this.isWaiting = false;
        this.dismiss();
      },
      err => {
        console.log("create event error is :", err);
        this.isWaiting = false;
      }
    );
  }

  selectActivity(activity) {
    console.log("activity is:", activity);
    this.data.title = activity.name;
    this.data.activityColor = activity.color;
  }
  reachEnd() {
    console.log("end reached");
    this.isSlideReachEnd = true;
  }
  prevEnd() {
    console.log("prevEnd");
    this.isSlideReachEnd = false;
  }

  Search(event) {
    this.newFriends = this.friends.filter(item => {
      if (item.name != null && item.phone != null) {
        return (
          item.name.toLowerCase().indexOf(this.data.search.toLowerCase()) >
            -1 ||
          item.phone.toLowerCase().indexOf(this.data.search.toLowerCase()) > -1
        );
      }
    });
  }
}
