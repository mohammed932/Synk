import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import {DateTime } from 'ionic-angular';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-create-activity',
  templateUrl: 'create-activity.html',
})
export class CreateActivityPage {
  randomActivities: any = []
  contacts: any
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
  @ViewChild('date') datePicker:DateTime;
  @ViewChild('time') timePicker:DateTime;
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
