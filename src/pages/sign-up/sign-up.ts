import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Slides } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  @ViewChild(Slides) slides: Slides;
  data: any = {};
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    private setting: SettingProvider,
    private viewCtrl: ViewController,
    public navParams: NavParams
  ) {}

  navigateToNextSlide(num) {
    this.slides.slideTo(num);
  }

  next(index) {
    this.navigateToNextSlide(index);
  }

  back(index) {
    this.navigateToNextSlide(index);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  Done() {
    this.isWaiting = true;
    console.log("sign up data : ", this.data);
    this.api.registration(this.data).subscribe(
      data => {
        console.log("response register data is : ", data);
        if (data.status) {
          this.navCtrl.setRoot("SignInPage");
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
