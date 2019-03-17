import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: "page-tasks",
  templateUrl: "tasks.html"
})
export class TasksPage {
  event: any = this.navParams.get("event");
  isWaiting: boolean = false;
  userData: any = JSON.parse(localStorage.getItem("userData"));
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {
    console.log("task page event : ", this.event);
  }

  createTask() {
    this.isWaiting = true;
    let params: any = {
      user_id: this.userData.id,
      event_id: this.event.id
    };
    console.log("task params is : ", params);
    this.api.createTask(params).subscribe(
      data => {
        console.log("task response is : ", data);
        this.isWaiting = false;
      },
      err => {
        this.isWaiting = false;
      }
    );
  }
}
