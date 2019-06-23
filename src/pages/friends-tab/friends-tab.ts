import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-friends-tab",
  templateUrl: "friends-tab.html"
})
export class FriendsTabPage {
  tab1Root = "MyFriendsPage";
  tab2Root = "SuggestionFriendsPage";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
