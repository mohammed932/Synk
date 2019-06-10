import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  LoadingController
} from "ionic-angular";
import { contactList } from "./mocks";
import { ContactsProvider } from "../../providers/contacts/contacts";
import { Contacts } from "@ionic-native/contacts";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: "page-invite-friends",
  templateUrl: "invite-friends.html"
})
export class InviteFriendsPage {
  filterContacts: any;
  originalContacts: any;
  loader: any;
  isLoading: boolean = true;
  data: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private contacts: Contacts,
    private api: ApiProvider,
    private contact: ContactsProvider
  ) {
    // this.getContacts();
    if (this.platform.is("cordova")) {
      this.getContacts();
    }
  }

  // getContacts() {
  //   this.contactList = this.contact.getContacts();
  //   console.log("contactList are :", this.contactList);
  // }

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
          if (
            Array.isArray(item.phoneNumbers) &&
            item.phoneNumbers[0].value != null
          ) {
            var contact: any = {};
            contact.name = item.name.formatted;
            contact.img = "assets/imgs/user.svg";
            contact.phone = item.phoneNumbers[0].value
              .replace(/\s/g, "")
              .replace(/-/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/^0+/, "");
            contactList.push(contact);
          }
        });
        this.sendContactListToServer(contactList);
      });
  }

  sendContactListToServer(contactList) {
    this.api.getUserContacts(contactList).subscribe(
      data => {
        console.log("user contacts response : ", data);
        this.originalContacts = data;
        this.filterContacts = this.originalContacts;
        this.isLoading = false;
      },
      err => {
        console.log("contacts error is : ", err);
        this.isLoading = false;
      }
    );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  inviteFriend(contact) {
    this.presentLoading();
    let contacts: any[] = [contact];
    this.api.inviteFriend(contacts).subscribe(
      data => {
        console.log("invite friend response :", data);
        contact.isActive = true;
        this.loader.dismiss();
      },
      err => {
        console.log("invite friend error :", JSON.stringify(err));
        this.loader.dismiss();
      }
    );
  }

  Search(event) {
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

  skip() {
    this.navCtrl.setRoot("TabsPage");
  }
}
