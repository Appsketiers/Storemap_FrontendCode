
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  clickedImage: any;

  // options: CameraOptions = {
  //   quality: 30,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  constructor(private camera: Camera, public actionSheetController: ActionSheetController) { }
  captureImage(stype: number, callback) {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: stype,
     // allowEdit:true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let object ;
      if(stype == this.camera.PictureSourceType.CAMERA){
         object ={
          "isCamera": true,
          "imagedata": imageData
        }
        callback(object);
      }
      else{
        object ={
          "isCamera": false,
          "imagedata": imageData
        }
        callback(object);

      }
     
     
     }, (err) => {
      // Handle error
     });
  }
  captureImagePhototry(stype: number, callback) {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: stype,
     // allowEdit:true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let object ;
      if(stype == this.camera.PictureSourceType.CAMERA){
         object ={
          "isCamera": true,
          "imagedata": imageData
        }
        callback(object);
      }
      else{
        object ={
          "isCamera": false,
          "imagedata": imageData
        }
        callback(object);

      }
     
     
     }, (err) => {
      // Handle error
     });
  }
  async presentCameraActionSheet( callback) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.captureImage(this.camera.PictureSourceType.CAMERA, callback)
        }
      }, {
        text: 'Library',
        icon: 'image',
        handler: () => {
          console.log('Play clicked');
          this.captureImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM, callback)
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    //actionSheet.dismiss();
  }

  async presentCameraActionSheetPhototry( callback) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.captureImagePhototry(this.camera.PictureSourceType.CAMERA, callback)
        }
      }, {
        text: 'Library',
        icon: 'image',
        handler: () => {
          console.log('Play clicked');
          this.captureImagePhototry(this.camera.PictureSourceType.SAVEDPHOTOALBUM, callback)
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    //actionSheet.dismiss();
  }

}