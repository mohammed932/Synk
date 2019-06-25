import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-my-profile",
  templateUrl: "my-profile.html"
})
export class MyProfilePage {
  userData: any = JSON.parse(localStorage.getItem("userData"));
  defaultImg: any = "assets/imgs/1.jpg";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App
  ) {}

  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }

  Edit() {
    console.log("hey");
    this.navCtrl.push("EditProfilePage");
  }

  logout() {
    localStorage.setItem("isLogin", JSON.stringify(false));
    localStorage.setItem("access_token", "");
    this.app.getRootNavs()[0].push("IntroductionPage");
    this.navCtrl.setRoot("IntroductionPage");
  }
}
