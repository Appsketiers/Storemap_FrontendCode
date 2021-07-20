import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ForgotPasswordPage implements OnInit {
  emailForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  constructor(private formBuilder: FormBuilder, private location: Location, private helper: HelperService, private device: Device, private router: Router) {
  
   }

  ngOnInit() {
    this.createForm();
  }
  goBack(){
    this.location.back();
      }
  ionViewWillEnter()
  {
    
    this.createForm();
  }
  createForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
 
      
    });
  }
  get f() { return this.emailForm.controls; }

  emailSubmit() {
    this.submmited = true;
    if (this.emailForm.invalid) {
      return;
    }
    let body: any = {
    // name: "",
      email: this.emailForm.controls['email'].value,
    
      // device_type: 'ANDROID',
      // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
     
      
    }
    
    this.helper.postMethod('forgot-password', body, async res => {
      console.log(res)
      //alert("test "+JSON.stringify(res));
      if(res.status)
      {
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "email": this.emailForm.controls['email'].value,
              "otp":res.data
          }
        };
    
        this.router.navigate(["/auth/otp-verification"],  navigationExtras);
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

  }
  getFormControl(name) {
    return this.emailForm.get(name);

  }


}
