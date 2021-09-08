import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.page.html',
  styleUrls: ['./two-factor.page.scss'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class TwoFactorPage implements OnInit {
  otpForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  email: any;
  otp: any;
  isSkip: any;
  isLogin: any;
  two_factor: any;
  page:any;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private helper: HelperService,
    private device: Device,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
  }
  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.otp = params['otp'];
      this.isSkip = params['isSkip'];
      this.isLogin = params['isLogin'];
      this.two_factor = params['two_factor'];
      this.page = params['page'];
    });
    this.createForm();
    console.log(this.page);
  }
  goBack() {
    this.location.back();
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
  get f() {
    return this.otpForm.controls;
  }

  skipData() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        // name: "",
        token: res,
        //email: this.email,

        // device_type: 'ANDROID',
        // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
      };
      this.helper.postMethod(
        'skip-two-factor',
        body,
        async (res) => {
          console.log(res);
          //alert("test "+JSON.stringify(res));
          if (res.status) {
            this.router.navigate(['/main-home']);
          }
          //  this.router.navigate(['/auth/otp-verification'])

          this.helper.presentToast(res.message);
          // debugger
        },
        (err) => {
          console.log(err);
          this.helper.presentToast(err.message);
          // alert("error1 " +JSON.stringify(err) );
          // debugger
        }
      );
    });
  }
  resendcode() {
    this.otpForm.controls['a'].setValue(null);
    this.otpForm.controls['b'].setValue(null);
    this.otpForm.controls['c'].setValue(null);
    this.otpForm.controls['d'].setValue(null);
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        // name: "",
        token: res,
        email: this.email,

        // device_type: 'ANDROID',
        // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
      };
      this.helper.postMethod(
        'two-factor',
        body,
        async (res) => {
          console.log(res);
          //alert("test "+JSON.stringify(res));
          if (res.status) {
            this.otp = res.data;
          }
          //  this.router.navigate(['/auth/otp-verification'])

          this.helper.presentToast(res.message);
          // debugger
        },
        (err) => {
          console.log(err);
          this.helper.presentToast(err.message);
          // alert("error1 " +JSON.stringify(err) );
          // debugger
        }
      );
    });
  }
  changeCheckBox(event) {
    if (!event.detail.checked)
      this.otpForm.controls['checkData'].setValue(null);
  }
  optSubmit() {
    this.submmited = true;
    if (this.otpForm.invalid) {
      this.helper.presentToast('Please Enter valid otp')
      return;
    }

    let otpsubmit:string =
      String(this.otpForm.controls['a'].value) +
      String(this.otpForm.controls['b'].value) +
      String(this.otpForm.controls['c'].value) +
      String(this.otpForm.controls['d'].value);
    console.log(otpsubmit);

    if (String(this.otp) == otpsubmit) {
      console.log(this.otpForm.controls['checkData'].value);
      this.helper.getByKeynew('storetoken', (res) => {
        this.helper.getByKeynew('device_token', async (device_token) => {
          let two_factor: any =
            this.isLogin == 'true' ? 1 : !parseInt(this.two_factor);

          let body: any = {
            token: res,
            device_token: device_token ? device_token : 'asdfghjk1234rtyu',
            dont_ask: this.otpForm.controls['checkData'].value ? 1 : 0,
            two_factor: two_factor,
          };
          this.helper.postMethod(
            'complete-two-factor',
            body,
            (res) => {
              console.log(res);
              if (res.status) {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    page: 'two-factor',
                  },
                };

                if(this.page=='accounts'){
                  this.router.navigate(['/main-account']);
                }
                else{
                this.router.navigate(['/questionnaire'], navigationExtras);
              }}

              this.helper.presentToast(res.message);

              // debugger
            },
            (err) => {
              console.log(err);
            }
          );
        });
      });

      // let navigationExtras: NavigationExtras = {
      //   queryParams: {
      //       "email": this.email
      //   }
      // };
      // this.router.navigate(["/main-home"],  navigationExtras);
    } else {
      this.helper.Alert('Please Enter Valid Otp', '');
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
    } else if (event.keyCode == 13) {
      if (nextElement) {
        nextElement.setFocus();
      }
      else{
        this.optSubmit();
      }
    } else {
      event.path[0].value = '';
    }
  }
}
