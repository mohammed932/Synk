import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsTabPage } from './friends-tab';

@NgModule({
  declarations: [
    FriendsTabPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsTabPage),
  ],
})
export class FriendsTabPageModule {}
