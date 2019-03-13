import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-introduction",
  templateUrl: "introduction.html"
})
export class IntroductionPage {
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams
  ) {}

  goToSignIn() {
    this.navCtrl.push("SignInPage");
  }

  signUp() {
    let modal = this.modalCtrl.create("SignUpPage");
    modal.present();
  }
}
