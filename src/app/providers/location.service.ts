import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  options: GeolocationOptions;
  currentPos: Geoposition;
  constructor(private geolocation: Geolocation) { }

  getUserPosition() {
    return new Promise((resolve, reject) => {
    this.options = {
      maximumAge: 3000,
      enableHighAccuracy: true
    };
   
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
    this.currentPos = pos;
    const location = {
       lat: pos.coords.latitude,
       lng: pos.coords.longitude,
       time: new Date(),
     };
    console.log('loc', location);
    resolve(pos);
   }, (err: PositionError) => {
     console.log("error : " + err.message);
     reject(err.message);
    });
   });
  }
}
