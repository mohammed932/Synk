import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-my-friends",
  templateUrl: "my-friends.html"
})
export class MyFriendsPage {
  friends: any;
  isLoading: boolean = true;
  data: any = {};
  count: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private event: Events,
    private setting: SettingProvider,
    private api: ApiProvider
  ) {
    this.getMyFriends();
    this.getFriendRequestCount();
    this.checkEvents();
  }

  checkEvents() {
    this.event.subscribe("acceptRequest", () => {
      this.getMyFriends();
      this.getFriendRequestCount();
    });
  }

  getFriendRequestCount() {
    this.api.getFriendRequests().subscribe(data => {
      this.count = data.friendrequests.length;
      console.log("requests :", data);
    });
  }

  friendRequests() {
    this.navCtrl.push("FriendRequestsPage");
  }

  onInput(event) {
    console.log("lol");
  }

  getMyFriends() {
    this.api.userProfile().subscribe(
      data => {
        console.log("my data :", data);
        this.friends = data.friends;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  search() {
    this.isLoading = true;
    if (this.data.search) {
      this.api.searchFriends(this.data.search).subscribe(
        data => {
          this.friends = data;
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
          console.log("search friends err :", err);
        }
      );
    } else {
      this.getMyFriends();
    }
  }

  openUserProfile(id) {
    this.navCtrl.push("UserProfilePage", { userId: id });
  }

  onCancel(event) {
    console.log("zoz");
  }
}
