import { Component, Input, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { SettingProvider } from "../../providers/setting/setting";
import { ApiProvider } from "../../providers/api/api";

@Component({
  selector: "happening",
  templateUrl: "happening.html"
})
export class HappeningComponent {
  isSynked: boolean = false;
  flag: boolean = false;
  @Input() event;
  @Input() userSynkedEvents;
  constructor(
    private navCtrl: NavController,
    private setting: SettingProvider,
    private api: ApiProvider
  ) {}

  inviteFriends() {
    console.log("invite friends");
  }

  toggle() {
    this.isSynked = !this.isSynked;
    if (this.isSynked) {
      console.log("invite ur friends");
    }
  }
}
