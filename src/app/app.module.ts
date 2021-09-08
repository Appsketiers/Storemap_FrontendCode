import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HelperService } from './providers/helper.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './providers/validation.service';
import { Device } from '@ionic-native/device/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraService } from './providers/camera.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers, Storage } from '@ionic/storage';
import { AdminGuard } from './providers/admin.guard';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BackbuttonhandalService } from './providers/backbuttonhandal.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Network } from '@ionic-native/network/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({animated:false}), 
    IonicStorageModule.forRoot({
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HelperService,
    AdminGuard,
    ValidationService,
    Device,
    Camera,
    StatusBar,
    InAppBrowser,
    CameraService,
    SplashScreen,
    BackbuttonhandalService,
    NativeStorage,
    Geolocation,
    AndroidPermissions,
    LocationAccuracy,
    Diagnostic,
    Network,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
