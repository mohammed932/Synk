import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  AlertController
} from "ionic-angular";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-my-profile",
  templateUrl: "my-profile.html"
})
export class MyProfilePage {
  userData: any = JSON.parse(localStorage.getItem("userData"));
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private setting: SettingProvider,
    private app: App
  ) {}

  ionViewWillEnter() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }

  Edit() {
    console.log("hey");
    this.navCtrl.push("EditProfilePage");
  }

  confirmLogout() {
    let alert = this.alertCtrl.create({
      title: "Confirm Logout",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Confirm",
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }

  logout() {
    localStorage.setItem("isLogin", JSON.stringify(false));
    localStorage.setItem("access_token", "");
    this.app.getRootNavs()[0].push("IntroductionPage");
    this.navCtrl.setRoot("IntroductionPage");
  }
}
