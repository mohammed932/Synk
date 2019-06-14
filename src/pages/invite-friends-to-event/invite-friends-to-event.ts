import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-invite-friends-to-event",
  templateUrl: "invite-friends-to-event.html"
})
export class InviteFriendsToEventPage {
  friends: any;
  allFriends: any[] = [];
  isWaiting: boolean = false;
  isLoading: boolean = true;
  inviteFriends: any[] = [];
  event: any = this.navParams.get("event");
  data: any = {};
  constructor(
    public navCtrl: NavController,
    private setting: SettingProvider,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private api: ApiProvider
  ) {
    this.getUserData();
  }

  getUserData() {
    this.api.userProfile().subscribe(
      data => {
        this.friends = data.friends;
        this.isLoading = false;
        this.allFriends = this.friends;
        console.log("user data : ", data);
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  checkContact(event, friend) {
    friend.active = event._value;
    if (friend.active) {
      this.inviteFriends.push(friend._id);
    } else {
      for (let i = 0; i < this.inviteFriends.length; i++) {
        if (this.inviteFriends[i] == friend._id) {
          this.inviteFriends.splice(i, 1);
        }
      }
    }
    console.log("inviteFriends :", this.inviteFriends);
  }

  Search(event) {
    this.allFriends = this.friends.filter(item => {
      if (item.name != null) {
        return (
          item.name.toLowerCase().indexOf(this.data.search.toLowerCase()) > -1
        );
      }
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  inviteFriendsForEvent() {
    this.isWaiting = true;
    let params = {
      eventId: this.event._id,
      invites: this.inviteFriends
    };
    console.log("params :", params);

    this.api.inviteFriendsForEvent(params).subscribe(
      data => {
        console.log("invite friends response : ", data);
        this.setting.showAlert(data.message).then(() => {
          this.dismiss();
        });
        this.isWaiting = false;
      },
      err => {
        this.setting.showAlert(err.error.message);
        this.isWaiting = false;
      }
    );
  }
}
