import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "IntroductionPage";

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    private splashScreen: SplashScreen
  ) {
    // this.checkDefaultRoute();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.keyboard.hideFormAccessoryBar(false);
    });
  }

  filterArray() {
    let users = [
      {
        id: 1,
        status: true
      },
      {
        id: 2,
        status: false
      },
      {
        id: 3,
        status: false
      },
      {
        id: 4,
        status: true
      }
    ];
  }

  checkDefaultRoute() {
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      this.rootPage = "HomePage";
    } else {
      this.rootPage = "IntroductionPage";
    }
  }
}
