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
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userDetail: any;
  imagebaseurl: any;
  constructor(public menuCtrl:MenuController,private helper: HelperService, private splashScreen: SplashScreen,public alertController: AlertController, private backbuttonhandalService: BackbuttonhandalService, private platform: Platform, private device: Device, private router: Router) {
    this.imagebaseurl = environment.image_baseurl;
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.backbuttonhandalService.init();
     
    })}
  public appPages = [
    {
      title: 'Home',
      url: '/main-home'

    },
    {
      title: 'Shopping Lists',
      url: '/shopping-lists'

    },


    {
      title: 'Questionnaire',
      url: '/questionnaire'

    },

    {
      title: 'Past Orders',
      url: '/past-orders'

    },
    {
      title: 'My Account',
      url: '/main-account'

    },
  ];

  ngDoCheck(){
   
  }
  onMenuOpen(){
    this.helper.getByKeynew('storeuser', res=>{
      this.userDetail = res;
    })
   
  }
  logout(){
  this.helper.getByKeynew('storetoken', res=>{
    this.helper.getByKeynew('device_token', async device_token=>{
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
            }
          }, {
            text: 'Okay',
            handler: () => {
              let body: any = {
                token:res,
                device_token: device_token ? device_token : 'asdfghjk1234rtyu',
           
                
              }
              this.helper.postMethod('logout', body, res => {
                console.log(res)
              if(res.status){
                this.helper.clearStorageNew();
                this.router.navigate(['/auth'])
              }
             
                this.helper.presentToast(res.message);
              
               // debugger
              }, err => {
                console.log(err)
            
              });
            }
          }
        ]
      });
  
      await alert.present();
    });
  
    })
   
  }
  closeMenu(){
    this.menuCtrl.close()
  }
}


