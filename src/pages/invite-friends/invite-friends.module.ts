import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { InviteFriendsPage } from "./invite-friends";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [InviteFriendsPage],
  imports: [IonicPageModule.forChild(InviteFriendsPage), ComponentsModule]
})
export class InviteFriendsPageModule {}
