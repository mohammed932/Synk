import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'MyFriendsPage';  
  tab3Root = 'CreateActivityPage';  
  tab4Root = 'NotificationsPage';
  tab5Root = 'MyProfilePage';
  constructor() {

  }

  changeTab(event){
     console.log('tab event : ',event.id);
     if(event.id == 't0-2'){
       console.log("yes");
     }
  }
}
