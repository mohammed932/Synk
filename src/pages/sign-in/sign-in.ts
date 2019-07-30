import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
import { FormBuilder, Validators } from "@angular/forms";
import * as _ from "lodash";

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  data: any = {};
  loginForm;
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    private setting: SettingProvider,
    private api: ApiProvider
  ) {
    this.loginForm = this.builder.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: ["", Validators.compose([Validators.required])]
    });
  }
  Login() {
    this.isWaiting = true;
    this.api.signIn(this.data).subscribe(
      data => {
        console.log("login data :", data);
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("isLogin", JSON.stringify(true));
        this.navCtrl.setRoot("InviteFriendsPage");
        this.setDeviceToken();
        this.isWaiting = false;
      },
      err => {
        if (!_.has(err.error, "details")) {
          this.setting.showAlert(err.error.message);
        } else {
          this.setting.showAlert(err.error.details[0].message);
        }
        console.log("login error is :", err);
        this.isWaiting = false;
      }
    );
  }

  setDeviceToken() {
    let params = {
      one_signal_token: localStorage.getItem("device_token")
        ? localStorage.getItem("device_token")
        : ""
    };
    console.log("one signal token :", JSON.stringify(params));

    this.api.setDeviceToken(params).subscribe(data => {
      console.log("set one signal token response is :", data);
    });
  }

  openForgetPassword() {
    this.navCtrl.push("ForgetPasswordPage");
  }
}
