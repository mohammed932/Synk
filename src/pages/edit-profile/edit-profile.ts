import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  data: any = {
    gender: "male"
  };
  isWaiting: boolean = false;
  userData: any = JSON.parse(localStorage.getItem("userData"));
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private api: ApiProvider,
    public navParams: NavParams
  ) {}

  updateUser() {
    this.isWaiting = true;
    this.api.updateUser(this.userData).subscribe(
      data => {
        console.log("update user response :", data);
        this.isWaiting = false;
        localStorage.setItem("userData", JSON.stringify(data));
      },
      err => {
        this.isWaiting = false;
        console.log("update user data error :", err);
      }
    );
  }

  changePassword() {
    let modal = this.modalCtrl.create("ChangePasswordPage");
    modal.present();
  }
}
