import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SuggestionFriendsPage } from "./suggestion-friends";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [SuggestionFriendsPage],
  imports: [IonicPageModule.forChild(SuggestionFriendsPage), ComponentsModule]
})
export class SuggestionFriendsPageModule {}
