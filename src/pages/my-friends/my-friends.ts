import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: "page-my-friends",
  templateUrl: "my-friends.html"
})
export class MyFriendsPage {
  friends: any;
  newFriends: any;
  isLoading: boolean = true;
  data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
    this.getMyFriends();
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
        this.newFriends = this.friends;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  search(event) {
    this.newFriends = this.friends.filter(item => {
      if (item.name != null) {
        return (
          item.name.toLowerCase().indexOf(this.data.search.toLowerCase()) > -1
        );
      }
    });
  }

  onCancel(event) {
    console.log("zoz");
  }
}
