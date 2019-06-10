import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { tasks } from "./mocks";
import { FormBuilder, Validators } from "@angular/forms";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-tasks",
  templateUrl: "tasks.html"
})
export class TasksPage {
  event: any = this.navParams.get("event");
  tasks: any;
  taskForm;
  loading: boolean = true;
  isWaiting: boolean = false;
  data: any = {};
  userData: any = JSON.parse(localStorage.getItem("userData"));
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    private api: ApiProvider,
    private setting: SettingProvider
  ) {
    console.log("task page event : ", this.event);
    this.taskForm = this.builder.group({
      taskName: ["", Validators.required]
    });
    this.getEventTasks();
  }

  getEventTasks() {
    this.api.getEventTasks(this.event._id).subscribe(
      data => {
        console.log("event tasks are :", data);
        this.tasks = data.tasks;
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  createTask() {
    let params = {
      eventId: this.event._id,
      title: this.data.name
    };
    this.isWaiting = true;
    this.api.createTask(params).subscribe(
      data => {
        console.log("create task response is:", data);
        this.data.name = "";
        this.isWaiting = false;
        this.getEventTasks();
        this.setting.presentToast(data.message);
      },
      err => {
        this.isWaiting = false;
        console.log("create task error :", err);
      }
    );
    console.log("params", params);
  }

  assignTask(task) {
    task.active = true;
    task.eventId = this.event._id;
    this.api.chooseTask(task).subscribe(
      data => {
        console.log("choose task data :", task);
        task.taker = data.taker;
        task.active = false;
      },
      err => {
        task.active = false;
        console.log("choose task err :"), err;
      }
    );
  }

  // createTask() {
  //   let task = {
  //     name: this.data.name,
  //     img: "assets/imgs/1.jpg",
  //     assignTo: "Kimo efat"
  //   };
  //   if (this.data.name) {
  //     this.tasks.push(task);
  //     this.data.name = "";
  //   }
  // }
}
