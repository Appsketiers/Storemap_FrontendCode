import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HelperService } from './helper.service';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

declare var cordova;
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationCoords: any;
  timetest: any;
  constructor(
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private helper: HelperService,
    private router: Router,
    public loadingController: LoadingController,
    private platform: Platform,
    private diagnostic: Diagnostic
  ) {
    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: '',
    };
    this.timetest = Date.now();
  }

  //Check if application having GPS access permission
  checkGPSPermission(data) {
    debugger;
    let that = this;
    cordova.plugins.diagnostic.isLocationEnabled(
      function (enabled) {
        if (enabled === false) {
          console.log(enabled);
        }
        that.askToTurnOnGPS(data);
      },

      function (error) {
        alert('The following error occurred: ' + error);
      }
    );

  }

  requestGPSPermission(data) {
    let that = this;
    cordova.plugins.diagnostic.isLocationAuthorized(
      function (authorized) {
        console.log(
          'Location is ' + (authorized ? 'authorized' : 'unauthorized')
        );
        if (authorized) {
          that.checkGPSPermission(data);
        } else {
          cordova.plugins.diagnostic.requestLocationAuthorization(
            function (status) {
              if (
                status == cordova.plugins.diagnostic.permissionStatus.GRANTED
              ) {
                that.checkGPSPermission(data);
              } else {
                if (status == 'DENIED_ALWAYS') {
                  console.warn('Permission denied to use location');
                  that.helper.confirm(
                    'Go to Settings Allow Store Map to access this device location',
                    function (status) {
                      if (status) {
                        cordova.plugins.diagnostic.switchToSettings(
                          function () {
                            let subscriber = that.platform.resume.subscribe(
                              (e) => {
                                that.requestGPSPermission(data);
                                subscriber.unsubscribe();
                              }
                            );
                          },
                          function (error) {
                            console.error(
                              'The following error occurred: ' + error
                            );
                          }
                        );
                      } else {
                        that.router.navigate(['/grocery-list']);
                      }
                    }
                  );
                } else {
                  that.requestGPSPermission(data);
                }
              }
            },
            function (error) {
              console.error(error);
            }
          );
        }
      },
      function (error) {
        console.error('The following error occurred: ' + error);
      }
    );
  }

  askToTurnOnGPS(data) {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates(data);
        },
        (error) => data(error)
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
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        loading.dismiss();
        data(resp);
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;
      })
      .catch((error) => {
        alert('Error getting location' + error);
      });
  }
}
