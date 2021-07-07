import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { BackButtonEvent } from '@ionic/core';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Injectable({
  providedIn: 'root'
})
export class BackbuttonhandalService {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
 init(){
  // document.addEventListener("deviceready", function() {
  //   alert('error 1');
  //   // angular.bootstrap(document, "YourApp"); 
  //    document.addEventListener('ionBackButton', (ev: any) => {
  //  // alert('error :-)\n\n' + JSON.stringify(ev, null, 4));
  //   ev.detail.register(10, () => {
  //     let currenturl = this.router.url;
  //     if(currenturl == '/login'){
  //      this.alertShow('Do you want to exit app ?', ()=>{
  //       navigator['app'].exitApp();
  //      })
  //     }else if(currenturl == '/'){
  //       this.alertShow('Do you want to exit app ?', ()=>{
  //        navigator['app'].exitApp();
  //       })
  //      }else{
  //       this.navCtrl.pop();

  //     }
  //   });
  // });
    
  document.addEventListener('ionBackButton', (ev: any) => {
   // alert('error :-)\n\n' + JSON.stringify(ev, null, 4));
    ev.detail.register(10, async () => {
      let currenturl = this.router.url;
      if(currenturl == '/auth/log-in'){

        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work in ionic 4

        } else {
          const toast = await this.toastController.create({
            message: 'Press back again to exit App...',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          // console.log(JSON.stringify(toast));
          this.lastTimeBackPress = new Date().getTime();
        }

      //  this.alertShow('Do you want to exit app ?', ()=>{
      //   navigator['app'].exitApp();
      //  })
      }else if(currenturl == '/'){
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work in ionic 4

        } else {
          const toast = await this.toastController.create({
            message: 'Press back again to exit App...',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          // console.log(JSON.stringify(toast));
          this.lastTimeBackPress = new Date().getTime();
        }
       }else if(currenturl == '/main-home/home'){
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work in ionic 4

        } else {
          const toast = await this.toastController.create({
            message: 'Press back again to exit App...',
            duration: 2000,
            position: 'bottom'
          });
          toast.present();
          // console.log(JSON.stringify(toast));
          this.lastTimeBackPress = new Date().getTime();
        }
       }else if(currenturl == '/profilestep1'){
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // this.platform.exitApp(); // Exit from app
          navigator['app'].exitApp(); // work in ionic 4

        } else {
          const toast = await this.toastController.create({
            message: 'Press back again to exit App...',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          // console.log(JSON.stringify(toast));
          this.lastTimeBackPress = new Date().getTime();
        }
       }else{
        this.navCtrl.pop();

      }
    });
  });
  //alert('error :-)\n\n' + JSON.stringify(this.platform.backButton, null, 4));
  // this.platform.backButton.subscribeWithPriority(10, async () => {
  //     let currenturl = this.router.url;
  //     if(currenturl == '/login'){
  //      this.alertShow('Do you want to exit app ?', ()=>{
  //       navigator['app'].exitApp();
  //      })
  //     }else if(currenturl == '/'){
  //       this.alertShow('Do you want to exit app ?', ()=>{
  //        navigator['app'].exitApp();
  //       })
  //      }else{
  //       this.navCtrl.pop();

  //     }
  // });
  // this.platform.backButton.subscribeWithPriority(5, () => {
  //   console.log('Handler called to force close!');
  //   let currenturl = this.router.url;
  //   if(currenturl == '/login'){
  //    this.alertShow('Do you want to exit app ?', ()=>{
  //     navigator['app'].exitApp();
  //    })
  //   }else if(currenturl == '/'){
  //     this.alertShow('Do you want to exit app ?', ()=>{
  //      navigator['app'].exitApp();
  //     })
  //    }else{
  //     this.navCtrl.pop();

  //   }
  // });
 }

   async alertShow(mes: any , action : () => void){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to exit app ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           
          }
        }, {
          text: 'Okay',
          handler: action
        }
      ]
    });

    await alert.present();
   }
  constructor(private platform: Platform, private router : Router, public alertController: AlertController, public navCtrl: NavController, private toastController: ToastController) {
   
  }
}
