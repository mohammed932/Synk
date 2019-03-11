import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AlertController, ToastController } from "ionic-angular";
import * as moment from "moment";
@Injectable()
export class SettingProvider {
  URL: string = "http://mokhtar.eslamnasser.com/api/";
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
}
