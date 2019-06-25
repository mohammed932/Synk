import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-suggestion-friends",
  templateUrl: "suggestion-friends.html"
})
export class SuggestionFriendsPage {
  data: any = {};
  isLoading: boolean = true;
  friends: any;
  copyFriends: any;
  constructor(
    public navCtrl: NavController,
    private event: Events,
    private setting: SettingProvider,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
    this.getSuggestionFriends();
    this.checkEvents();
  }

  checkEvents() {
    this.event.subscribe("acceptRequest", () => {
      this.getSuggestionFriends();
    });
  }

  onInput(event) {}

  getSuggestionFriends() {
    this.api.suggestionFriends().subscribe(
      data => {
        this.friends = data;
        this.isLoading = false;
        console.log("suggestion friends data :", data);
      },
      err => {
        this.isLoading = false;
        console.log("suggestion friends err :", err);
      }
    );
  }

  openUserProfile(id) {
    this.navCtrl.push("UserProfilePage", { userId: id });
  }

  search() {
    this.isLoading = true;
    if (this.data.search) {
      this.api.searchFriends(this.data.search).subscribe(
        data => {
          this.friends = data;
          console.log("ff:", this.friends);

          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
          console.log("search friends err :", err);
        }
      );
    } else {
      this.getSuggestionFriends();
    }
  }

  addFriend(friend) {
    friend.isActive = true;
    this.api.friendRequest(friend._id).subscribe(
      data => {
        console.log("friend request data :", data);
        friend.isActive = false;
        friend.has_friend_request_sent = true;
      },
      err => {
        console.log("friend request err:", err);
        friend.isActive = false;
      }
    );
    console.log("friend :", friend);
  }
}
