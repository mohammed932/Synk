import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})
export class CreateActivityPage {

  contacts: any
  groupedContacts = [];
  tabBarElement: any
  data: any = {
    showCreateActivtyBtn: true,
    showDoneBtn: false,
    showNextBtn: false
  }
  initDate: any
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
    this.intializeCalender()
    this.generateContacts()
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar')
  }

  intializeCalender() {
    this.initDate = moment()['_d']
    this.data.event_date = moment(this.initDate).format("YYYY-MM-DD");
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  dismiss() {
    this.navCtrl.setRoot('TabsPage')
  }

  step(index) {
    console.log('indexindexindex : ', index);

    switch (index) {
      case 1:
        this.data.showCreateActivtyBtn = false
        this.data.showDoneBtn = false
        this.data.showNextBtn = true
        break;
      case 2:
        this.data.showCreateActivtyBtn = false
        this.data.showDoneBtn = false
        this.data.showNextBtn = false
        break;
      case 3:
        this.data.showCreateActivtyBtn = false
        this.data.showDoneBtn = true
        this.data.showNextBtn = false
        break;
      default:
        break;
    }
    this.navigateToNextSlide(index)
  }

  navigateToNextSlide(num) {
    console.log('numnumnumnum : ', num);
    this.slides.slideTo(num)
    // this.slides.lockSwipes(true)
  }

  setDate(date) {
    console.log("event : ", date);
    this.initDate = date
  }

  formatDate(date) {
    return moment(date).format("YYYY/MM/DD");
  }

  generateContacts() {
    this.contacts = [
      { name: "Kate Beckett", img: "assets/imgs/1.jpg" },
      { name: "Richard Castle", img: "assets/imgs/2.jpg" },
      { name: "Alexis Castle", img: "assets/imgs/3.jpg" },
      { name: "Lanie Parish", img: "assets/imgs/4.jpg" },
      { name: "Javier Esposito'", img: "assets/imgs/1.jpg" },
      { name: "Kevin Ryan", img: "assets/imgs/1.jpg" },
      { name: "Martha Rodgers", img: "assets/imgs/5.jpg" },
      { name: "Roy Montgomery", img: "assets/imgs/1.jpg" },
      { name: "Jim Beckett", img: "assets/imgs/1.jpg" },
      { name: "Stana Katic", img: "assets/imgs/3.jpg" },
      { name: "Nathan Fillion", img: "assets/imgs/1.jpg" },
      { name: "Molly Quinn", img: "assets/imgs/2.jpg" },
      { name: "Tamala Jones", img: "assets/imgs/5.jpg" },
      { name: "Jon Huertas", img: "assets/imgs/1.jpg" },
      { name: "Seamus Dever", img: "assets/imgs/3.jpg" },
      { name: "Susan Sullivan", img: "assets/imgs/1.jpg" }
    ];

    this.groupContacts(this.contacts);
  }

  groupContacts(contacts) {

    let sortedContacts = contacts.sort();
    let currentLetter = false;
    let currentContacts = [];
    sortedContacts.forEach((value, index) => {

      if (value.name.charAt(0) != currentLetter) {

        currentLetter = value.name.charAt(0);

        let newGroup = {
          letter: currentLetter,
          contacts: []
        };

        currentContacts = newGroup.contacts;
        this.groupedContacts.push(newGroup);

      }
      currentContacts.push(value);
    });

  }
}
