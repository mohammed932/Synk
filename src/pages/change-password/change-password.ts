import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  App
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  data: any = {};
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private app: App,
    public navParams: NavParams,
    private setting: SettingProvider,
    private api: ApiProvider
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }
  changePassword() {
    this.isWaiting = true;
    this.api.changePassword(this.data).subscribe(
      data => {
        console.log("change password data :", data);
        this.setting.presentToast(data.message);
        this.logout();
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
        this.setting.showAlert(err.error.message);
      }
    );
  }

  logout() {
    localStorage.setItem("isLogin", JSON.stringify(false));
    localStorage.setItem("access_token", "");
    this.dismiss();
    this.app.getRootNavs()[0].push("IntroductionPage");
    // this.navCtrl.setRoot("IntroductionPage");
  }
}
