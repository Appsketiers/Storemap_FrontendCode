import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from './../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Device } from '@ionic-native/device/ngx';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userDetail: any;
  imagebaseurl: any;
  two_factor: any
  constructor(private helper: HelperService, private device: Device, private router: Router, private iab: InAppBrowser,) { 

  }

  ngOnInit() {
    // this.imagebaseurl = environment.image_baseurl;
    // this. getDetail();
  }
  ionViewWillEnter(){
    this.imagebaseurl = environment.image_baseurl;
    this. getDetail();
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
                        "two_factor":this.userDetail.two_factor
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
    const browser = this.iab.create('http://dev9server.com/store-mapps/page/about-us','_self',{location:'no'}); 
   // debugger
   // this.router.navigate(['/terms-conditions'])
  }
  tandc(){
    const browser = this.iab.create('http://dev9server.com/store-mapps/page/terms-&-conditions','_self',{location:'no'}); 
   // debugger
   // this.router.navigate(['/terms-conditions'])
  }
  pandp(){
    const browser = this.iab.create('http://dev9server.com/store-mapps/page/privacy-policy','_self',{location:'no'}); 
    //this.router.navigate(['/privacy-policy'])
  }
  getDetail(){
    this.helper.getByKeynew('storetoken', res=>{
      let body: any = {
        token:res,
        device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
   
        
      }
      this.helper.getMethod('get-profile', body, res => {
        console.log(res)
      if(res.status){
      this.userDetail = res.data
      this.helper.setKeyValueNew('storeuser',res.data);
      this.helper.setsocketObs(res.data);
      this.two_factor = res.data.two_factor
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
}
