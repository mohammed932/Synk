import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { OneSignal } from "@ionic-native/onesignal";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "SignInPage";
  // rootPage: any = "TabsPage";
  // rootPage: any = "MyFriendsPage";

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private keyboard: Keyboard,
    private splashScreen: SplashScreen
  ) {
    this.checkDefaultRoute();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if (this.platform.is("cordova")) {
        this.checkPushNotification();
      }

      this.keyboard.hideFormAccessoryBar(false);
    });
  }

  checkPushNotification() {
    let notificationOpenedCallback = function(jsonData) {
      console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
    };
    this.oneSignal.startInit(
      "22abdd4f-6ad6-4295-89e8-6213d9f02dbd",
      "757975649266"
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );
    this.oneSignal.setSubscription(true);
    // When a push notification is received handle
    // how the application will respond
    this.oneSignal.handleNotificationReceived().subscribe(msg => {
      console.log("notification msg : ", JSON.stringify(msg));
    });

    this.oneSignal.handleNotificationOpened().subscribe(msg => {});

    //  this.oneSignal.handleNotificationOpened(notificationOpenedCallback)
    this.oneSignal.endInit();
    this.oneSignal
      .getIds()
      .then(ids => {
        localStorage.setItem("device_token", ids.userId);
      })
      .catch(e => console.log(e));
  }

  checkDefaultRoute() {
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      this.rootPage = "TabsPage";
    } else {
      this.rootPage = "IntroductionPage";
    }
  }
}
