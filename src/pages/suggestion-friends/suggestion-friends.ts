import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: "page-suggestion-friends",
  templateUrl: "suggestion-friends.html"
})
export class SuggestionFriendsPage {
  data: any = {};
  Friends: any[] = [
    { img: "assets/imgs/1.jpg", name: "ahmed ali", isAdded: false },
    { img: "assets/imgs/2.jpg", name: "Mona abdalla", isAdded: true },
    { img: "assets/imgs/3.jpg", name: "Ahmed omar", isAdded: false },
    { img: "assets/imgs/1.jpg", name: "fady khaled", isAdded: true },
    { img: "assets/imgs/2.jpg", name: "Sara Hatam", isAdded: false },
    { img: "assets/imgs/3.jpg", name: "Ahmed Magdy", isAdded: true }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
    this.getSuggestionFriends();
  }

  onInput(event) {}

  getSuggestionFriends() {
    this.api.suggestionFriends().subscribe(
      data => {
        console.log("suggestion friends data :", data);
      },
      err => {
        console.log("suggestion friends err :", err);
      }
    );
  }
}
