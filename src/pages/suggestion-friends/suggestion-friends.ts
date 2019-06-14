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
  isLoading: boolean = true;
  originalFriends: any;
  copyFriends: any;
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
        this.originalFriends = data;
        this.copyFriends = this.originalFriends;
        this.isLoading = false;
        console.log("suggestion friends data :", data);
      },
      err => {
        this.isLoading = false;
        console.log("suggestion friends err :", err);
      }
    );
  }

  search(event) {
    this.copyFriends = this.originalFriends.filter(item => {
      if (item.name != null) {
        return (
          item.name.toLowerCase().indexOf(this.data.search.toLowerCase()) > -1
        );
      }
    });
  }
}
