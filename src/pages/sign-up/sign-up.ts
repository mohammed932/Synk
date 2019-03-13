import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { Slides } from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  @ViewChild(Slides) slides: Slides;
  data: any = {};
  constructor(
    public navCtrl: NavController,
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
    console.log("sign up data : ", this.data);
    this.navCtrl.setRoot("SignInPage");
  }
}
