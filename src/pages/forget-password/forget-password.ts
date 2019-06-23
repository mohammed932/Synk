import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-forget-password",
  templateUrl: "forget-password.html"
})
export class ForgetPasswordPage {
  data: any = {};
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private setting: SettingProvider
  ) {}

  send() {
    this.isWaiting = true;
    this.api.forgetPassword(this.data).subscribe(
      data => {
        this.setting.showAlert(data.message);
        this.navCtrl.pop();
        this.isWaiting = false;
      },
      err => {
        this.setting.showAlert(err.error.message);
        this.isWaiting = false;
      }
    );
  }
}
