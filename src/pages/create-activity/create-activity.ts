import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  AlertController,
  Events
} from "ionic-angular";
import { Slides } from "ionic-angular";
import { DateTime } from "ionic-angular";
import * as _ from "lodash";
import * as moment from "moment";
import { ContactList, randomActivities } from "./mocks";
import { ApiProvider } from "../../providers/api/api";
@IonicPage()
@Component({
  selector: "page-create-activity",
  templateUrl: "create-activity.html"
})
export class CreateActivityPage {
  randomActivities: any[] = randomActivities;
  contacts: any = ContactList;
  groupedContacts = [];
  isWaiting: boolean = false;
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
    private api: ApiProvider,
    private alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.data.event_time = this.calculateTime("+2");
    this.intializeCalender();
    this.generateContacts();
    this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
  }

  intializeCalender() {
    this.initDate = moment()["_d"];
    this.data.event_date = moment(this.initDate).format("YYYY-MM-DD");
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = "none";
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = "flex";
  }

  dismiss() {
    this.navCtrl.setRoot("TabsPage", { activityCreated: true });
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

  generateContacts() {
    this.groupContacts(this.contacts);
  }

  groupContacts(contacts) {
    let sortedContacts = _.orderBy(contacts, ["name"], ["asc"]);
    let currentLetter = false;
    let currentContacts = [];
    sortedContacts.forEach((value, index) => {
      if (value.name.charAt(0) != currentLetter) {
        currentLetter = value.name.charAt(0);
        let newGroup = {
          letter: currentLetter,
          contacts: []
        };
        currentContacts = newGroup.contacts;
        this.groupedContacts.push(newGroup);
      }
      currentContacts.push(value);
    });
  }

  calculateTime(offset: any) {
    let d = new Date();
    let nd = new Date(d.getTime() + 3600000 * offset);
    return nd.toISOString();
  }

  checkContact(event, contact) {
    contact.active = event._value;
    this.data.friends_id.push(contact.id);
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
    }
    this.navigateToNextSlide(index);
  }

  onInput(event) {
    console.log("eventevent :", event);
  }

  Done() {
    // this.data.friends_id.join();
    // console.log("final data is : ", this.data);
    this.data.place = "place1";
    this.data.description = "description1";
    this.data.min_number = 2;
    this.data.max_number = 40;
    this.isWaiting = true;
    this.api.createEvent(this.data).subscribe(
      data => {
        console.log("return data is : ", data);
        if (data.status) {
          this.event.publish("eventCreated");
          this.dismiss();
        }
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
  allSynkCommunity() {
    this.data.invite_status = 0;
    this.Done();
    if (!this.isWaiting) {
      this.dismiss();
    }
  }
}
