import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  userId: any = this.navParams.get("userId");
  isLoading: boolean = true;
  userData: any;
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private setting: SettingProvider,
    private api: ApiProvider
  ) {
    this.getUserProfile();
  }

  getUserProfile() {
    this.api.userSpecificProfile(this.userId).subscribe(data => {
      console.log("user data : ", data);
      this.userData = data;
      this.isLoading = false;
    });
  }

  addFriend() {
    this.isWaiting = true;
    this.api.friendRequest(this.userData._id).subscribe(
      data => {
        console.log("friend request data :", data);
        this.isWaiting = false;
        this.setting.showAlert("Friend request has been sent !");
        this.userData.has_friend_request = true;
      },
      err => {
        console.log("friend request err:", err);
        this.isWaiting = false;
      }
    );
  }
}
