import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { DateTime } from 'ionic-angular';
import * as _ from "lodash";
import * as moment from 'moment';
import { ContactList } from './mocks';
@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})
export class CreateActivityPage {
  randomActivities: any = []
  contacts: any = ContactList
  chromeReleased = '2008-09-02';
  groupedContacts = [];
  tabBarElement: any
  slideIndex: number = 0
  data: any = {
    showDoneBtn: false,
    showArrowBack: false
  }
  initDate: any

  @ViewChild(Slides) slides: Slides;
  @ViewChild('date') datePicker: DateTime;
  @ViewChild('time') timePicker: DateTime;
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.data.Time = this.calculateTime('+2');
    this.intializeCalender()
    this.createRandomActivity()
    this.generateContacts()
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar')
  }

  createRandomActivity() {
    this.randomActivities = [
      { name: 'Yoga', color: "#38ceb6" },
      { name: 'Coffee', color: '#ff5c53' },
      { name: 'Dish Party', color: '#484647' },
      { name: 'Feluka ride', color: '#6276f9' },
      { name: 'Bar hopping', color: '#42d3d4' },
      { name: 'Tennis', color: '#4ad53c' },
      { name: 'Bowling', color: '#484647' },
      { name: 'Shopping', color: '#38ceb6' },
      { name: 'ICe skating', color: '#6276f9' },
      { name: 'Pottery', color: '#ff5c53' },
    ]
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
    this.navCtrl.setRoot('TabsPage', { activityCreated: true })
  }



  navigateToNextSlide(num) {
    this.slides.slideTo(num)
  }

  setDate(date) {
    console.log("event : ", date);
    this.initDate = date
  }

  formatDate(date) {
    return moment(date).format("YYYY/MM/DD");
  }

  generateContacts() {
    this.groupContacts(this.contacts);
  }

  groupContacts(contacts) {
    let sortedContacts = _.orderBy(contacts, ['name'], ['asc']);
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

  calculateTime(offset: any) {
    let d = new Date();
    let nd = new Date(d.getTime() + (3600000 * offset));
    return nd.toISOString();
  }

  checkContact(event, contact) {
    contact.active = event._value
  }

  step(index) {
    this.slideIndex = index
    switch (index) {
      case 1:
        this.data.showArrowBack = true
        this.datePicker.open()
        break;
      case 2:
        this.data.showArrowBack = true
        this.timePicker.open()
        break;
      case 3:
        this.data.showArrowBack = true
        break;
      case 4:
        this.data.showDoneBtn = true
        this.data.showArrowBack = true
        break;
    }
    this.navigateToNextSlide(index)
  }

  back(index) {
    switch (index) {
      case 1:
        this.data.showDoneBtn = false
        this.datePicker.open()
        break;
      case 2:
        this.data.showDoneBtn = false
        this.timePicker.open()
        break;
      case 3:
        this.data.showDoneBtn = false
        break;
    }
    this.navigateToNextSlide(index)
  }

  onInput(event) {
    console.log("eventevent :", event);
  }


}
