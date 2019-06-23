import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { IonAlphaScrollModule } from "ionic2-alpha-scroll";
import { IonicStorageModule } from "@ionic/storage";
import { DatePickerModule } from "datepicker-ionic2";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { OneSignal } from "@ionic-native/onesignal";
import { ApiProvider } from "../providers/api/api";
import { globalInterceptor } from "../providers/global-headers/global-headers";
import { SettingProvider } from "../providers/setting/setting";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CallNumber } from "@ionic-native/call-number";
import { Contacts } from "@ionic-native/contacts";
import { Camera } from "@ionic-native/camera";
import { ContactsProvider } from "../providers/contacts/contacts";
import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonAlphaScrollModule,
    IonicStorageModule.forRoot(),
    DatePickerModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "",
      mode: "ios",
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: globalInterceptor,
      multi: true
    },
    ApiProvider,
    Contacts,
    Camera,
    FileTransfer,
    File,
    CallNumber,
    OneSignal,
    SettingProvider,
    ContactsProvider
  ]
})
export class AppModule {}
