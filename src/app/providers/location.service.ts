import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HelperService } from './helper.service';
import {Router} from '@angular/router';
import { LoadingController } from '@ionic/angular';
declare var cordova;
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationCoords: any;
  timetest: any;
  constructor(    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private helper: HelperService,
    private router: Router,
    public loadingController: LoadingController) {
      this.locationCoords = {
        latitude: "",
        longitude: "",
        accuracy: "",
        timestamp: ""
      }
      this.timetest = Date.now();
     }



  //Check if application having GPS access permission  
  checkGPSPermission(data) {
    debugger
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS(data);
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission(data);
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission(data) {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
             // this.askToTurnOnGPS(data);
             this.helper.Alert('go to settings','');
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS(data) {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates(data)
      },
      error => data(error)
    );
  }

  // Methos to get device accurate coordinates using device GPS
 async getLocationCoordinates(data) {
  const loading = await this.loadingController.create({
    cssClass: 'my-api-call-loading',
    message: '',
    // duration: 2000
  });
  await loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loading.dismiss();
      data(resp)
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
}
