import { Component, ViewChild, NgZone } from "@angular/core";
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
import { File } from "@ionic-native/file";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import * as _ from "lodash";

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
  base64Img: any = null;
  signUpForm1;
  signUpForm2;
  signUpForm3;
  isWaiting: boolean = false;
  constructor(
    public navCtrl: NavController,
    private api: ApiProvider,
    private actionSheetCtrl: ActionSheetController,
    public builder: FormBuilder,
    private ngzone: NgZone,
    private transfer: FileTransfer,
    private setting: SettingProvider,
    private file: File,
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
      destinationType: this.camera.DestinationType.FILE_URI,
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
        this.data.imageUri = imageData;
        this.convertFileToImg(imageData);
      },
      err => {
        // Handle error
      }
    );
  }
  convertFileToImg(imageData) {
    this.file
      .resolveLocalFilesystemUrl(imageData)
      .then((entry: any) => {
        entry.file(file1 => {
          var reader = new FileReader();
          reader.onload = (encodedFile: any) => {
            var src = encodedFile.target.result;
            this.ngzone.run(() => {
              this.base64Img = src;
              console.log("base64Img is :", this.base64Img);
            });
          };
          reader.readAsDataURL(file1);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendDataToServerUsingFileTransfer() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: "profile_image",
      fileName: `user_img.jpeg`,
      chunkedMode: false,
      httpMethod: "POST",
      mimeType: "image/jpeg",
      params: { data: JSON.stringify(this.data) }
    };

    fileTransfer
      .upload(this.data.imageUri, `${this.setting.URL}register`, options)
      .then(
        data => {
          console.log(
            "upload image profile data data :",
            JSON.stringify(data.response)
          );

          let response = JSON.parse(data.response);
          this.isWaiting = false;
          localStorage.setItem("userData", JSON.stringify(response));
          localStorage.setItem("access_token", response.token);
          localStorage.setItem("userId", response._id);
          localStorage.setItem("isLogin", JSON.stringify(true));
          this.dismiss();
          this.navCtrl.setRoot("InviteFriendsPage");
        },
        err => {
          console.log(err);
          this.isWaiting = false;
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
    this.data.mobile = `+2${this.data.mobile}`;
    if (this.data.imageUri) {
      this.sendDataToServerUsingFileTransfer();
    } else {
      this.sendDataToServerWithoutFileTransfer();
    }
  }
  sendDataToServerWithoutFileTransfer() {
    this.api.signUp(this.data).subscribe(
      data => {
        this.isWaiting = false;
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("isLogin", JSON.stringify(true));
        this.dismiss();
        this.navCtrl.setRoot("InviteFriendsPage");
      },

      err => {
        if (!_.has(err.error, "details")) {
          this.setting.showAlert(err.error.message);
        } else {
          this.setting.showAlert(err.error.details[0].message);
        }
        this.isWaiting = false;
        console.log("registration error is :", err);
      }
    );
  }
}
