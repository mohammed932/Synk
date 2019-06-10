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
  tabBarElement: any;
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    // if (this.tabBarElement) {
    //   this.tabBarElement = document.querySelector(".tabbar.show-tabbar");
    // }
  }

  // ionViewWillEnter() {
  //   if (this.tabBarElement) {
  //     this.tabBarElement.style.display = "none";
  //   }
  // }
  // ionViewWillLeave() {
  //   if (this.tabBarElement) {
  //     this.tabBarElement.style.display = "flex";
  //   }
  // }

  goToSignIn() {
    this.navCtrl.push("SignInPage");
  }

  signUp() {
    let modal = this.modalCtrl.create("SignUpPage");
    modal.present();
  }
}
