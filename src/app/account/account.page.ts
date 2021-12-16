import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from './../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  notification_count;
  userDetail: any;
  imagebaseurl: any;
  two_factor: any;
  notify:any;
  device_type;
  device_token;
  constructor(private helper: HelperService, private device: Device,
    private router: Router, private iab: InAppBrowser,private storage: Storage,) {

      this.storage.get("Platform").then((data) => {
        this.device_type = data;
        console.log('Device Type -------', this.device_type);
        });


  }

  ngOnInit() {
    // this.imagebaseurl = environment.image_baseurl;
    // this. getDetail();
  }
  ionViewWillEnter(){
    this.imagebaseurl = environment.image_baseurl;
    this.storage.get("fcmtoken").then((data) => {
      this.device_token = data;
      console.log('Device FCM Token -------', this.device_token);
      this. getDetail();
      });

  }
  changePassword(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "email": this.userDetail.email
      }
    };
    this.router.navigate(["/main-account/change-password"],  navigationExtras);
  }
  editProfile(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "user": JSON.stringify(this.userDetail)
      }
    };
    this.router.navigate(["/main-account/edit-profile"],  navigationExtras);
  }

  changeCheckBox(event){

  //  if(!event.detail.checked)
    this.twofactor();
      }
  twofactor(){
    this.helper.getByKeynew('storetoken', res=>{
      let body: any = {
        // name: "",
        token:res,
          email: this.userDetail.email,

          // device_type: 'ANDROID',
          // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',


        }
        this.helper.postMethod('two-factor', body, async res => {
          console.log(res)
          //alert("test "+JSON.stringify(res));
          if(res.status)
          {

            let otp = res.data
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                        "email": this.userDetail.email,
                        "otp":otp,
                        "isSkip": false,
                        "isLogin": false,
                        "two_factor":this.userDetail.two_factor,
                        page:"accounts"

                    }
                  };

                  this.router.navigate(["/main-account/two-factor"],  navigationExtras);

          }
        //  this.router.navigate(['/auth/otp-verification'])


          this.helper.presentToast(res.message);
         // debugger
        }, err => {
          console.log(err)
          this.helper.presentToast(err.message);
         // alert("error1 " +JSON.stringify(err) );
         // debugger
        });
      })
  }
  aboutus(){
   // const browser = this.iab.create('http://dev9server.com/store-mapps/page/about-us','_self',{location:'no', fullscreen: "no", toolbar:'yes'});
   // debugger
   // this.router.navigate(['/terms-conditions'])
   this.router.navigate(['/about-us']);
  }
  tandc(){
    //const browser = this.iab.create('http://dev9server.com/store-mapps/page/terms-&-conditions','_self',{location:'no'});
   // debugger
   this.router.navigate(['/terms-conditions'])
  }
  pandp(){
    //const browser = this.iab.create('http://dev9server.com/store-mapps/page/privacy-policy','_self',{location:'no'});
    this.router.navigate(['/privacy-policy'])
  }
  getDetail(){
    this.helper.getByKeynew('storetoken', res=>{
      let body: any = {
        token:res,
        device_token: this.device_token ==null?'NOTFOUND':this.device_token,


      }
      this.helper.getMethod('get-profile', body, res => {
        console.log(res)
      if(res.status){
      this.userDetail = res.data;
      this.notification_count = this.userDetail.notification_count;
      localStorage.setItem("User",JSON.stringify(res.data));
      this.helper.setKeyValueNew('storeuser',res.data);
      this.helper.setsocketObs(res.data);
      this.two_factor = res.data.two_factor;
      this.notify = res.data.notification;
        //this.helper.clearStorageNew();
      //  this.router.navigate(['/auth'])
      }

       // this.helper.presentToast(res.message);

       // debugger
      }, err => {
        console.log(err)

      });
    })
  }

  notifications(){
     this.router.navigate(['/notification'])
  }

  notification_toggle(ev){
    let status;
console.log(ev.detail.checked);
if(ev.detail.checked){
status =1;
}
else{
  status=0;
}
this.helper.getByKeynew('storetoken', res=>{
  let body: any = {
    token:res,
    status:status,
    device_token: this.device_token ==null?'NOTFOUND':this.device_token,


  }
  this.helper.postMethod('toggle-notification', body, res => {
    console.log(res)
  if(res.status){
 
  }

  }, err => {
    console.log(err)

  });
})

  }
  ionViewDidEnter() {
    this.imagebaseurl = environment.image_baseurl;
    this. getDetail();
  }
}
