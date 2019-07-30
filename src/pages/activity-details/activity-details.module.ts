import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ActivityDetailsPage } from "./activity-details";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ActivityDetailsPage],
  imports: [IonicPageModule.forChild(ActivityDetailsPage), ComponentsModule]
})
export class ActivityDetailsPageModule {}
