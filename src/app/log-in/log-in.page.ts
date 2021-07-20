import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import { emailNameValidator, passwordNameValidator } from '../providers/validation.service';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  loginForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  isRemember : any = false;
  constructor(private formBuilder: FormBuilder,  private helper: HelperService, private device: Device, private router: Router, private routerOutlet: IonRouterOutlet) {
  this.helper.clearStorageNew()
   }

  ngOnInit() {
    this.createForm();
  
  }
  ionViewWillEnter()
  {
    this.routerOutlet.swipeGesture = false;
    //this.createForm();
    this.helper.clearStorageNew()
    this.loginForm.controls['email'].setValue('');
        this.loginForm.controls['password'].setValue('');

    this.helper.getByKeynew('remember', res=>{
      if(res){
        this.loginForm.controls['email'].setValue(res.email);
        this.loginForm.controls['password'].setValue(res.password);
      }
  
    });
    
  }
  ionViewWillLeave() {
    this.routerOutlet.swipeGesture = true;
}
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      //checkData: [false],
      
    });
  }
  get f() { return this.loginForm.controls; }
  changeCheckBox(event){

    if(event.detail.checked){
      this.isRemember = true;
      debugger
    }
    
    else
        this.isRemember = false;
      }
      
  loginSubmit() {
    this.submmited = true;
    if (this.loginForm.invalid) {
      return;
    }
    let form: any = {
     name: "",
      email: this.loginForm.controls['email'].value,
    
      password: this.loginForm.controls['password'].value,
      device_type: 'ANDROID',
      device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
     
      
    }
    this.helper.postMethod('login', form, async res => {
      console.log(res)
      //alert("test "+JSON.stringify(res));
      if(res.status){
        // await this.helper.setObject('storeuser',res.data);
        // this.helper.setStringValue("storetoken", res.data.token)
        this.helper.setKeyValueNew("device_token", form.device_token);
        if(this.isRemember){
          let remain = {
            email: this.loginForm.controls['email'].value,
      
            password: this.loginForm.controls['password'].value,
          }
          this.helper.setKeyValueNew('remember',remain);
        }
     
        
        if(res.data.two_factor == 1){
          if(res.data.dont_ask == 0){
            let body: any = {
              // name: "",
              token:res.data.token,
                email: res.data.email,
              
                // device_type: 'ANDROID',
                // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
               
                
              }
              this.helper.postMethod('two-factor', body, async res1 => {
                console.log(res1)
                //alert("test "+JSON.stringify(res));
                if(res1.status)
                {  this.helper.setKeyValueNew('storeuser',res.data);
                this.helper.setKeyValueNew("storetoken", res.data.token)
               
                  let otp = res1.data
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                        "email": res.data.email,
                        "otp":otp,
                        "isSkip": false,
                        "isLogin": true,
                        "two_factor":res.data.two_factor
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
          

          }else{
            this.helper.setKeyValueNew('storeuser',res.data);
            this.helper.setKeyValueNew("storetoken", res.data.token)
           
            this.router.navigate(['/main-home']);
          }

        }else {
          if(res.data.is_skip == 0){
           
              let body: any = {
                // name: "",
                token:res.data.token,
                  email: res.data.email,
                
                  // device_type: 'ANDROID',
                  // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
                 
                  
                }
                this.helper.postMethod('two-factor', body, async res1 => {
                  console.log(res1)
                  //alert("test "+JSON.stringify(res));
                  if(res1.status)
                  {
                    
                    this.helper.setKeyValueNew('storeuser',res.data);
                    this.helper.setKeyValueNew("storetoken", res.data.token)
                    let otp = res1.data
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                          "email": res.data.email,
                          "otp":otp,
                          "isSkip": true,
                          "isLogin": true,
                          "two_factor":res.data.two_factor
                      }
                    };
                
                    this.router.navigate(["/main-account/two-factor"],  navigationExtras);
                 
                  }
                //  this.router.navigate(['/auth/otp-verification'])
                  
                  
                  
            
                  this.helper.presentToast(res1.message);
                 // debugger
                }, err => {
                  console.log(err)
                  this.helper.presentToast(err.message);
                 // alert("error1 " +JSON.stringify(err) );
                 // debugger
                });
            
          }else{
            
            this.helper.setKeyValueNew('storeuser',res.data);
            this.helper.setKeyValueNew("storetoken", res.data.token);
            this.router.navigate(['/main-home']);
          }
        }
       
      }
     
     // this.helper.presentToast(res.message); (two times)
     // debugger
    }, err => {
      console.log(err)
      this.helper.presentToast(err.message);
     // alert("error1 " +JSON.stringify(err) );
     // debugger
    });

  }
  getFormControl(name) {
    return this.loginForm.get(name);

  }

}
