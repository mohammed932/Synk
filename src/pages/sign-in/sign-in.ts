import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  data: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  Login() {
    this.navCtrl.setRoot("TabsPage");
  }
}
