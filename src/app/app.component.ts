import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, } from '@angular/router';
import { HelperService } from './providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import { environment } from './../environments/environment';
import { BackbuttonhandalService } from './providers/backbuttonhandal.service';
import { MenuController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { Storage } from "@ionic/storage";
import { Stripe } from "@ionic-native/stripe/ngx";
import { LocalNotifications, ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userDetail: any;
  imagebaseurl: any;
  clickSub: any;
  constructor(
    private network: Network,
    public menuCtrl: MenuController,
    private helper: HelperService,
    private splashScreen: SplashScreen,
    public alertController: AlertController,
    private backbuttonhandalService: BackbuttonhandalService,
    private platform: Platform,
    private device: Device,
    private router: Router,
    private nativeStorage: NativeStorage,
    private statusBar: StatusBar,
    private fcm: FCM,
    private storage: Storage,
    public stripe: Stripe,
    private route: ActivatedRoute,
    private localNotifications: LocalNotifications
  ) {
    this.imagebaseurl = environment.image_baseurl;
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.backbuttonhandalService.init();
      this.statusBar.backgroundColorByHexString('#9D4CDF');
      this.savePlatformType();
      console.log();
      if(this.platform.is("cordova")){
        this.fcmNotification();
      }
     
     // this.check_internet_connection();
     if(localStorage.getItem("User")){
      let user = JSON.parse(localStorage.getItem("User"));
      this.nativeStorage.setItem("storeuser",user);
      if(user){
        console.log(user)
        this.router.navigate(["/main-home"]);
      }else{
        this.router.navigate(["/auth"]);
       
      }
     }
     
     this.nativeStorage.getItem("storeuser").then(
       data => {
         console.log("sam",data);
         
         console.log("Hello 11" );
         console.log(data)
         this.router.navigate(["/main-home"]);
       },
       error => {
        console.log("sam error" ,error);

         console.log("Hello 2" );
         let data = JSON.parse(localStorage.getItem("storeuser"))
         if(data){
           console.log(data)
           this.router.navigate(["/main-home"]);
         }else{
           this.router.navigate(["/auth"]);
          
         }
   
       }
     );
      window.addEventListener('offline', () => {
        this.helper.presentToast('No Internet Connection');
        });


        window.addEventListener('online', () => {
          this.helper.presentToast('Internet Connected');
          });

          this.stripe.setPublishableKey(
            "pk_test_51HteFBJ1txIZUIvJ8w4pNEFkc63yU3wAFCU1w4AE2v1u6G8OyjaOS99vr4BzUtxfqJgQY1wp15kkZeTW0J8bG6nN00Ew9SJojY"
          );
    });
  }
  public appPages = [
    {
      title: 'Home',
      url: '/main-home',
    },
    {
      title: 'Shopping Lists',
      url: '/shopping-lists',
    },

    {
      title: 'Questionnaire',
      url: '/questionnaire',
    },

    {
      title: 'My Orders',
      url: '/past-orders',
    },
    {
      title: 'My Account',
      url: '/main-account',
    },
  ];
  check_internet_connection() {
    debugger;
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.helper.presentToast('No Internet Connection');
    });

    // stop disconnect watch
    disconnectSubscription.unsubscribe();

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.helper.presentToast('Internet Connected');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
          this.helper.presentToast('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    connectSubscription.unsubscribe();
  }

  ngDoCheck() {}
  onMenuOpen() {
    this.helper.getByKeynew('storeuser', (res) => {
      this.userDetail = res;
    });
  }
  logout() {
    this.helper.getByKeynew('storetoken', (res) => {
      this.storage.get("fcmtoken").then(async(device_token) => {
        
        const alert = await this.alertController.create({
          cssClass: 'logoutcss',
          header: 'Confirm!',
          message: 'Are you sure you want to log out?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              },
            },
            {
              text: 'Okay',
              handler: () => {
              
                let body: any = {
                  token: res,
                  device_token:device_token ,
                };
                this.helper.postMethod(
                  'logout',
                  body,
                  (res) => {
                    console.log(res);
                    if (res.status) {
                      this.helper.clearStorageNew();
                      this.router.navigate(['/auth']);
                    }

                    this.helper.presentToast(res.message);

                    // debugger
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              },
            },
          ],
        });

        await alert.present();
      });
    });
  }
  closeMenu() {
    this.menuCtrl.close();
  }


  fcmNotification() {
    console.log("FCM IN");
    this.fcm.requestPushPermission().then((data)=> {
      console.log("request permission", data);
      this.storage.get("fcmtoken").then((token) => {
      if (!token) {
        this.fcm
          .getToken()
          .then((token) => {
            this.storage.set("fcmtoken", token);
            //this.Config.setConf("device_id", token);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
       // this.Config.setConf("device_id", token);
      }
    });
    this.fcm.getInitialPushPayload().then((data) => {
      console.log('kill mode ---------',data);
      if (data.wasTapped) {
        this.nativeStorage.getItem("storeuser").then((user) => {
          if (user) {
            setTimeout(() => {
              if(data.action == "SAFETY_AWARENESS") {
                this.router.navigateByUrl('safety-awareness');
              } else if(data.action == "SHOPPING_LIST") {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    page: 'app_com',
                  },
                };
                this.router.navigate(['shopping-lists'], navigationExtras);
            
              } 

              else if(data.action== "COMPLETE_ORDER"){
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    id: data.id,
                  },
                };
                this.router.navigate(['past-orders1'], navigationExtras);
              }
            }, 2000);
           

            console.log("usre, data",user,data);
          } else {
            this.router.navigate(['/auth']);
          }
        });
      }
    });
    this.fcm.onNotification().subscribe((data) => {
      console.log(data);
      //alert(JSON.stringify(data))
      if (data.wasTapped) {
        this.nativeStorage.getItem("storeuser").then((user) => {
          if (user) {
            setTimeout(() => {
              if(data.action == "SAFETY_AWARENESS") {
                this.router.navigateByUrl('safety-awareness');
              } else if(data.action == "SHOPPING_LIST") {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    page: 'app_com',
                  },
                };
                this.router.navigate(['shopping-lists'], navigationExtras);
            
              } 

              else if(data.action== "COMPLETE_ORDER"){
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    id: data.id,
                  },
                };
                this.router.navigate(['past-orders1'], navigationExtras);
              }
            }, 2000);
           

            console.log("usre, data",user,data);
          } else {
            this.router.navigate(['/auth']);
          }
        });
      } else {
        setTimeout(() => {
        console.info("Received in foreground", data);
       // if (!this.platform.is("android")) {
        //  this.helper.presentToast(data.aps.alert.body);
         
        
        let listenSub = this.localNotifications.on('trigger').subscribe(data => {
          let that = this;
          console.log(data);
          if(data.data == "SAFETY_AWARENESS") {
            if (that.platform.is("android")) 
            that.helper.localNotifiationToast(data.text,'safety-awareness',data,function(status){
              if(status){
                that.router.navigateByUrl('safety-awareness');
              
            }
            });
            
          } else if(data.data == "SHOPPING_LIST") {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                page: 'app_com',
              },
            };
            
            if (that.platform.is("android")) 
            that.helper.localNotifiationToast(data.text,'shopping-lists',navigationExtras, function(status){
              if(status){
                that.router.navigate(['shopping-lists'], navigationExtras);
              }
            });
          } 
          else if(data.data== "COMPLETE_ORDER"){
            let navigationExtras: NavigationExtras = {
              queryParams: {
                id: data.id,
              },
            };
            
            if (that.platform.is("android")) 
            that.helper.localNotifiationToast(data.text,'past-orders1',navigationExtras, function(status){
              if(status){
                that.router.navigate(['past-orders1'], navigationExtras);
              }
            });
          }
        })

          this.clickSub = this.localNotifications.on('click').subscribe(data => {
            console.log(data);
            if(data.data == "SAFETY_AWARENESS") {
              this.router.navigateByUrl('safety-awareness');
            } else if(data.data == "SHOPPING_LIST") {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  page: 'app_com',
                },
              };
              this.router.navigate(['shopping-lists'], navigationExtras);
            } 
            else if(data.data== "COMPLETE_ORDER"){
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  id: data.id,
                },
              };
              this.router.navigate(['past-orders1'], navigationExtras);
            }
          });
          this.localNotifications.schedule({
            id: data.id,
            text: data.body,
            data: data.action
          })
          // this.localNotifications.schedule({
          //   id: 1,
          // text: 'Single Local Notification',
          // data: { secret: 'secret' }
          // });
          


      

        // } else {
        //   this.helper.presentToast(data.body);
        // }
        }, 2000);
      }
    });
    this.fcm.onTokenRefresh().subscribe((token) => {});
  })
  }

  savePlatformType() {
    if (this.platform.is("android")) {
      this.storage.set("Platform", "ANDROID");
      //this.Config.setConf("device_type", "ANDROID");
    } else if (this.platform.is("ios")) {
      this.storage.set("Platform", "IOS");
      //this.Config.setConf("device_type", "IOS");
    } 
  }

  sample() {
    this.helper.localNotifiationToast('test','test','test');
  }
}
