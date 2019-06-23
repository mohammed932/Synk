import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FriendRequestsPage } from "./friend-requests";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [FriendRequestsPage],
  imports: [IonicPageModule.forChild(FriendRequestsPage), ComponentsModule]
})
export class FriendRequestsPageModule {}
