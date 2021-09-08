import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userDetail: any;
  imagebaseurl: any;
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
    private statusBar: StatusBar
  ) {
    this.imagebaseurl = environment.image_baseurl;
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.backbuttonhandalService.init();
      this.statusBar.backgroundColorByHexString('#9D4CDF');
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
      title: 'Past Orders',
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
      this.helper.getByKeynew('device_token', async (device_token) => {
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
                  device_token: device_token
                    ? device_token
                    : 'asdfghjk1234rtyu',
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
}
