import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TasksPage } from "./tasks";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [TasksPage],
  imports: [IonicPageModule.forChild(TasksPage), ComponentsModule]
})
export class TasksPageModule {}
