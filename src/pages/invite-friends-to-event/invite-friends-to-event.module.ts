import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { InviteFriendsToEventPage } from "./invite-friends-to-event";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [InviteFriendsToEventPage],
  imports: [
    IonicPageModule.forChild(InviteFriendsToEventPage),
    ComponentsModule
  ]
})
export class InviteFriendsToEventPageModule {}
