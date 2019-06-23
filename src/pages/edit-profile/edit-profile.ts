import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ActionSheetController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { SettingProvider } from "../../providers/setting/setting";

@IonicPage()
@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  data: any = {
    gender: "male"
  };
  base64Img: any = null;
  isWaiting: boolean = false;
  defaultImg: any = "assets/imgs/1.jpg";
  userData: any = JSON.parse(localStorage.getItem("userData"));
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private api: ApiProvider,
    public navParams: NavParams,
    private ngzone: NgZone,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private setting: SettingProvider,
    private file: File,
    private transfer: FileTransfer
  ) {}

  updateUser() {
    this.isWaiting = true;

    if (this.data.imageUri) {
      this.sendDataToServerUsingFileTransfer();
    } else {
      this.sendDataToServerWithoutFileTransfer();
    }
  }

  openActionSheet() {
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
    let userId = localStorage.getItem("userId");
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: "profile_image",
      fileName: `user_img.jpeg`,
      chunkedMode: false,
      httpMethod: "PUT",
      mimeType: "image/jpeg",
      params: { data: JSON.stringify(this.data) },
      headers: {
        Authorization: `${localStorage.getItem("access_token")}`
      }
    };

    fileTransfer
      .upload(this.data.imageUri, `${this.setting.URL}users/${userId}`, options)
      .then(
        data => {
          console.log(JSON.parse(data.response));

          console.log("upload image profile data data :", data);
          this.isWaiting = false;
          localStorage.setItem("userData", data.response);
        },
        err => {
          console.log(err);
          this.isWaiting = false;
        }
      );
  }

  sendDataToServerWithoutFileTransfer() {
    this.api.updateUser(this.userData).subscribe(
      data => {
        console.log("update user response :", data);
        this.isWaiting = false;
        localStorage.setItem("userData", JSON.stringify(data));
      },
      err => {
        this.isWaiting = false;
        console.log("update user data error :", err);
      }
    );
  }

  changePassword() {
    let modal = this.modalCtrl.create("ChangePasswordPage");
    modal.present();
  }
}
