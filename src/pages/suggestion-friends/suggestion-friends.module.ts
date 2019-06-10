import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestionFriendsPage } from './suggestion-friends';

@NgModule({
  declarations: [
    SuggestionFriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestionFriendsPage),
  ],
})
export class SuggestionFriendsPageModule {}
