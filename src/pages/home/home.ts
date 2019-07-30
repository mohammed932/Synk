import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  Content,
  Toggle,
  ModalController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import * as moment from "moment";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  message: string = "type your response";
  @ViewChild(Content) content: Content;
  response: string = "Response";
  name: string = "Client";
  currentPage = 0;
  limit: number = 4;
  pagesCount: number;
  events: any[] = [];
  @ViewChild("autoToggle") autoToggle: Toggle;
  userSynkedEvents: any;
  allEvents: any[] = [];
  isLoading: boolean = true;
  data: any = {
    toggle: false
  };
  userData: any = JSON.parse(localStorage.getItem("userData"));
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private setting: SettingProvider,
    private api: ApiProvider,
    private event: Events
  ) {
    this.checkEvents();
    this.getAllEvents();
    // this.getSynkedEvents();
  }
  changeStatus(event) {}
  checkEvents() {
    this.event.subscribe("eventCreated", () => {
      this.getAllEvents;
      console.log("hey again");
    });
  }

  toggleClick() {
    this.isLoading = true;
    this.currentPage = 0;
    this.autoToggle.checked = !this.autoToggle.checked;
    console.log("toggle :", this.data.toggle);
    if (this.data.toggle) {
      this.getSynkedEvents();
    } else {
      this.getAllEvents();
    }
  }

  getAllEvents() {
    this.api.getEvents(this.currentPage, this.limit).subscribe(
      data => {
        console.log("all events is:", data);
        this.events = data.events;
        this.pagesCount = data.pages;
        this.allEvents = this.events;
        this.getUserData();
      },
      err => {
        // this.isLoading = false;
        console.log("get events errors :", err);
      }
    );
  }

  getUserData() {
    this.api.userProfile().subscribe(data => {
      this.userSynkedEvents = data.synced_events;
      if (this.userSynkedEvents.length != 0) {
        this.allEvents.forEach(event => {
          if (this.userSynkedEvents.includes(event._id)) {
            event.isSynked = true;
            event.color = "#00dae3";
          } else {
            event.isSynked = false;
          }
        });
      }

      this.isLoading = false;
      console.log("userSynkedEvents : ", this.userSynkedEvents);
    });
  }

  search() {
    console.log("new data :", this.data.search);
    this.isLoading = true;
    this.currentPage = 0;
    this.api
      .searchEvents(this.data.search, this.currentPage, this.limit)
      .subscribe(
        data => {
          console.log("search events data :", data);
          this.events = data.events;
          // this.content.scrollToTop(1000);
          this.isLoading = false;
          this.allEvents = this.events;
          this.getUserData();
        },
        err => {
          this.isLoading = false;
        }
      );
  }

  async eventDetails(event) {
    this.navCtrl.push("ActivityDetailsPage", { event: event }).then(data => {
      console.log("my awesoime data : ", data);
    });
  }

  makeGoing(event) {
    event.isInviteActive = true;
    this.api.makeGoing(event).subscribe(
      data => {
        event.goings_count += 1;
        event.isSynked = true;
        event.color = "#00dae3";
        event.isInviteActive = false;
      },
      err => {
        console.log("make going error :", err);
        event.isInviteActive = false;
      }
    );
  }

  getSynkedEvents() {
    this.api.getSynkedEvents().subscribe(
      data => {
        console.log("synked events : ", data);
        this.events = data;
        this.allEvents = this.events;
        this.allEvents.forEach(event => {
          event.isSynked = true;
          event.color = "#00dae3";
        });
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  inviteFriends(event) {
    let modal = this.modalCtrl.create("InviteFriendsToEventPage", {
      event: event
    });
    modal.present();
  }

  doInfinite(scroll) {
    console.log("iam scroll now");

    this.currentPage += 1;
    if (this.currentPage <= this.pagesCount) {
      if (!this.data.search) {
        this.api.getEvents(this.currentPage, this.limit).subscribe(data => {
          this.callInfinitApi(data);
          scroll.complete();
        });
      } else {
        this.api
          .searchEvents(this.data.search, this.currentPage, this.limit)
          .subscribe(data => {
            this.callInfinitApi(data);
            scroll.complete();
          });
      }
    } else {
      scroll.complete();
    }
  }

  callInfinitApi(data) {
    this.allEvents = this.allEvents.concat(data.events);
    this.allEvents.forEach(event => {
      if (this.userSynkedEvents.includes(event._id)) {
        event.isSynked = true;
        event.color = "#00dae3";
      } else {
        event.isSynked = false;
      }
    });
  }
  createEvent() {
    let modal = this.modalCtrl.create("CreateActivityPage", { isModal: true });
    modal.onDidDismiss(data => {
      this.data.search = "";
      this.search();
    });
    modal.present();
  }

  formatTime(time) {
    return time.replace(/^0+/, "");
  }

  inviteFriendsToApp() {
    let modal = this.modalCtrl.create("InviteFriendsPage", {
      isHaveCloseBtn: true
    });
    modal.present();
  }
}
