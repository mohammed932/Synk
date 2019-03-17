import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
import * as _ from "lodash";

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  data: any = {};
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private setting: SettingProvider,
    private api: ApiProvider
  ) {}
  Login() {
    this.isWaiting = true;
    this.api.login(this.data).subscribe(
      data => {
        console.log("response login data :", data);
        if (_.has(data, "access_token")) {
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.access_token)
          );
          localStorage.setItem("isLogin", JSON.stringify(true));
          localStorage.setItem("userData", JSON.stringify(data.user_details));
          this.navCtrl.setRoot("TabsPage");
        } else {
          this.setting.showError(data.message);
        }
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
}
