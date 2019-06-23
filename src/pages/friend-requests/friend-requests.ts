import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-friend-requests",
  templateUrl: "friend-requests.html"
})
export class FriendRequestsPage {
  requests: any;
  isLoading: boolean = true;
  constructor(
    public navCtrl: NavController,
    private setting: SettingProvider,
    public navParams: NavParams,
    private event: Events,
    private api: ApiProvider
  ) {
    this.getFriendRequests();
  }

  acceptRequest(request, index) {
    request.isActive = true;
    this.api.acceptRequest(request._id).subscribe(
      data => {
        console.log("accept request response :", data);
        this.event.publish("acceptRequest");
        this.setting.presentToast(data.message);
        this.requests.splice(index, 1);
        request.isActive = false;
      },
      err => {
        request.isActive = false;
        console.log("accept request err :", err);
      }
    );
  }

  getFriendRequests() {
    this.api.getFriendRequests().subscribe(
      data => {
        this.requests = data.friendrequests;
        this.isLoading = false;
        console.log("requests :", data);
      },
      err => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
}
