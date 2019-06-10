import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ActionSheetController
} from "ionic-angular";
import { Slides } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { SettingProvider } from "../../providers/setting/setting";
import { FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "./must_match";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  @ViewChild(Slides) slides: Slides;
  data: any = {
    gender: "male"
  };
  signUpForm1;
  signUpForm2;
  signUpForm3;
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    private actionSheetCtrl: ActionSheetController,
    public builder: FormBuilder,
    private setting: SettingProvider,
    private viewCtrl: ViewController,
    private camera: Camera,
    public navParams: NavParams
  ) {
    this.buildFormValidation();
  }

  buildFormValidation() {
    this.signUpForm1 = this.builder.group({
      name: ["", Validators.compose([Validators.required])],
      email: ["", Validators.compose([Validators.email])]
    });

    this.signUpForm2 = this.builder.group(
      {
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(4)])
        ],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

    this.signUpForm3 = this.builder.group({
      phone: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });
  }

  navigateToNextSlide(num) {
    this.slides.slideTo(num);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Choose gallery",
      buttons: [
        {
          text: "Camera",
          role: "Camera",
          handler: () => {
            this.uploadImage(0);
          }
        },
        {
          text: "Gallery",
          handler: () => {
            this.uploadImage(1);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }

  uploadImage(type) {
    const options: CameraOptions = {
      quality: 80,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:
        type == 0
          ? this.camera.PictureSourceType.CAMERA
          : this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 400,
      targetHeight: 400
    };

    this.camera.getPicture(options).then(
      imageData => {
        console.log("imageData : ", imageData);
        this.data.imageUri = "data:image/jpeg;base64," + imageData;
      },
      err => {
        // Handle error
      }
    );
  }

  next(index) {
    this.navigateToNextSlide(index);
  }

  back(index) {
    this.navigateToNextSlide(index);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  Done() {
    this.isWaiting = true;
    this.api.signUp(this.data).subscribe(
      data => {
        this.isWaiting = false;
        localStorage.setItem("userId", data.id);
        localStorage.setItem("isLogin", JSON.stringify(false));
        this.navCtrl.setRoot("SignInPage");
      },
      err => {
        this.setting.showAlert(err.error.message);
        this.isWaiting = false;
        console.log("registration error is :", err);
      }
    );
    console.log("sign up data : ", this.data);
  }
}
