import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class OtpVerificationPage implements OnInit {

  otpForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  email: any;
  otp:any;
  constructor(private formBuilder: FormBuilder,  private helper: HelperService,private location: Location, private device: Device, private router: Router, private route: ActivatedRoute) {
 
   }

  ngOnInit() {
    this.createForm();
  }
  goBack(){
    this.location.back();
      }
  ionViewWillEnter()
  {
    
    this.route.queryParams.subscribe(params => {
      this.email = params["email"];
      this.otp = params["otp"];
    });
    this.createForm();
  }
  createForm() {
    this.otpForm = this.formBuilder.group({
      a: ['', [Validators.required]],
      b: ['', [Validators.required]],
      c: ['', [Validators.required]],
      d: ['', [Validators.required]],
      checkData: [false, Validators.required],
      
    });
  }
  get f() { return this.otpForm.controls; }

  resendcode(){
    let body: any = {
      // name: "",
        email: this.email,
      
        // device_type: 'ANDROID',
        // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
       
        
      }
      this.helper.postMethod('forgot-password', body, async res => {
        console.log(res)
        //alert("test "+JSON.stringify(res));
        if(res.status)
        {
          this.otp = res.data
      
       
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
  changeCheckBox(event){

if(!event.detail.checked)
this.otpForm.controls['checkData'].setValue(null);
  }
  optSubmit() {
    this.submmited = true;
    if (this.otpForm.invalid) {
      return;
    }
    
let otpsubmit =  this.otpForm.controls['a'].value+this.otpForm.controls['b'].value+this.otpForm.controls['c'].value+this.otpForm.controls['d'].value;
    console.log(otpsubmit);
    debugger
if(this.otp == otpsubmit ){
  let navigationExtras: NavigationExtras = {
    queryParams: {
        "email": this.email
    }
  };
  this.router.navigate(["/auth/reset-password"],  navigationExtras);
}

else{
  this.helper.Alert('Please Enter Valid Otp','');
}
    

  
    //this.router.navigate(['/auth/reset-password'])
    // this.helper.postMethod('forgot-password', body, async res => {
    //   console.log(res)
    //   //alert("test "+JSON.stringify(res));
    //   if(res.status)
    //   this.router.navigate(['/auth/otp-verification'])
      
      
      

    //   this.helper.presentToast(res.message);
    //  // debugger
    // }, err => {
    //   console.log(err)
    //   this.helper.presentToast(err.message);
    //  // alert("error1 " +JSON.stringify(err) );
    //  // debugger
    // });

  }
  getFormControl(name) {
    return this.otpForm.get(name);

  }

  moveFocus(event, nextElement, previousElement) {
    console.log(event.keyCode);
    if (event.keyCode === 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }
}
