import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AlertController, ToastController } from "ionic-angular";
import * as moment from "moment";
@Injectable()
export class SettingProvider {
  URL: string = "https://sync-application.herokuapp.com/";
  DEFAULT_IMG = "assets/imgs/user.svg";
  constructor(
    public http: HttpClient,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  formatDate(date) {
    return moment.unix(date).format("YYYY/MM/DD");
  }
  formatNormalDate(date) {
    return moment(date).format("MM/DD/YYYY");
  }

  formatDateWithDayName(date) {
    return moment(date).format("ddd DD MMM");
  }
  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  showError(errors) {
    let text = "";
    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        console.log(key + " -> " + errors[key]);
        text += errors[key] + "<br><br>";
      }
    }
    this.showAlert(text);
  }

  timeAmPm(time) {
    return moment(time, "hh mm").format("LT");
  }

  toLowerCase(txt) {
    return txt.toLowerCase();
  }

  async showAlert(text) {
    this.alertCtrl
      .create({
        title: "Sync",
        subTitle: text,
        buttons: ["Ok"]
      })
      .present();
  }
}
