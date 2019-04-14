import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Contacts } from "@ionic-native/contacts";
import { ContactList } from "../create-activity/mocks";

@IonicPage()
@Component({
  selector: "page-invite-friends",
  templateUrl: "invite-friends.html"
})
export class InviteFriendsPage {
  data: any = {};
  filterContacts: any[] = ContactList;
  originalContacts: any;
  isLoading: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contacts: Contacts
  ) {}

  ionViewDidEnter() {
    this.getContacts();
  }

  getContacts(): void {
    let contactList: any[] = [];
    let options: any = {
      multiple: true,
      hasPhoneNumber: true
    };
    this.contacts
      .find(["displayName", "phoneNumbers", "photos"], options)
      .then(contacts => {
        contacts.forEach(item => {
          contactList.push({
            name: item["_objectInstance"].name.formatted,
            phone: Array.isArray(item["_objectInstance"].phoneNumbers)
              ? item["_objectInstance"].phoneNumbers[0].value
              : null,
            img: Array.isArray(item["_objectInstance"].photos)
              ? item["_objectInstance"].photos[0].value
              : "assets/imgs/1.jpg"
          });
        });
        this.isLoading = false;
        console.log("contactList native is : ", contactList);
        this.filterContacts = contactList;

        // this.sendContactListToServer(contactList);
      });
  }

  Search() {
    this.filterContacts = this.originalContacts.filter(item => {
      if (item.name != null && item.phone != null) {
        return (
          item.name.toLowerCase().indexOf(this.data.search.toLowerCase()) >
            -1 ||
          item.phone.toLowerCase().indexOf(this.data.search.toLowerCase()) > -1
        );
      }
    });
  }

  openContact() {
    console.log("test");
  }

  submit() {
    this.navCtrl.setRoot("TabsPage");
  }
}
