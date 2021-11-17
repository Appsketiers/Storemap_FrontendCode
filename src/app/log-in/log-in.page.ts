import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {
  emailNameValidator,
  passwordNameValidator,
} from '../providers/validation.service';
import { IonRouterOutlet } from '@ionic/angular';
import { ShowHidePasswordComponent } from '../show-hide-password/show-hide-password.component';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  email_req: any = false;
  password_req: any = false;
  loginForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  isRemember: any = false;
  rem:any;
  device_type;
  device_token;
  constructor(
    private keyboard: Keyboard,
    private nativeStorage: NativeStorage,
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private device: Device,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    private storage: Storage,
  ) {
    this.helper.clearStorageNew();

    this.storage.get("Platform").then((data) => {
      this.device_type = data;
      console.log('Device Type -------', this.device_type);
      });
  
      this.storage.get("fcmtoken").then((data) => {
        this.device_token = data;
        console.log('Device FCM Token -------', this.device_token);
        });
  }

  ngOnInit() {
    this.createForm();
    this.nativeStorage.getItem("rem").then(data=>{
this.rem=data;
console.log(this.rem);
    })
  }
  ionViewWillEnter() {
    this.routerOutlet.swipeGesture = false;
    //this.createForm();
    this.helper.clearStorageNew();
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['password'].setValue('');

    this.helper.getByKeynew('remember', (res) => {
      if (res) {
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
      email: [
        '',
        [
          Validators.required,
          emailNameValidator(
            new RegExp(
              '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
            )
          ),
        ],
      ],
      password: ['', [Validators.required]],
      //checkData: [false],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  changeCheckBox(event) {
    if (event.detail.checked) {
      this.isRemember = true;
      debugger;
    } else {
      this.isRemember = false;
    }

    this.helper.setKeyValueNew('rem',this.isRemember);
  }

  loginSubmit() {
    if (this.loginForm.controls['email'].value == '') {
      this.email_req = true;
    }

    if (this.loginForm.controls['password'].value == '') {
      this.password_req = true;
    }

    this.submmited = true;
    if (this.loginForm.invalid) {
      return;
    }
    let form: any = {
      name: '',
      email: this.loginForm.controls['email'].value,

      password: this.loginForm.controls['password'].value,
      device_type: this.device_type || 'WEB',
      device_token: this.device_token==null?'NOTFOUND':this.device_token,
    };
    this.helper.postMethod(
      'login',
      form,
      async (res) => {
        console.log(res);
        //alert("test "+JSON.stringify(res));
        if (res.status) {
          this.helper.setKeyValueNew('tag_list', res.data.my_tags);
          console.log(res.data.my_tags);
          // await this.helper.setObject('storeuser',res.data);
          // this.helper.setStringValue("storetoken", res.data.token)
          this.helper.setKeyValueNew('device_token', form.device_token);
          if (this.isRemember) {
            let remain = {
              email: this.loginForm.controls['email'].value,

              password: this.loginForm.controls['password'].value,
            };
            this.helper.setKeyValueNew('remember', remain);
          }

          if (res.data.two_factor == 1) {
            if (res.data.dont_ask == 0) {
              let body: any = {
                // name: "",
                token: res.data.token,
                email: res.data.email,

                // device_type: 'ANDROID',
                // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
              };
              this.helper.postMethod(
                'two-factor',
                body,
                async (res1) => {
                  console.log(res1);
                  //alert("test "+JSON.stringify(res));
                  if (res1.status) {
                    this.helper.setKeyValueNew('storeuser', res.data);
                    this.helper.setKeyValueNew('storetoken', res.data.token);

                    let otp = res1.data;
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        email: res.data.email,
                        otp: otp,
                        isSkip: false,
                        isLogin: true,
                        two_factor: res.data.two_factor,
                      },
                    };

                    this.router.navigate(
                      ['/main-account/two-factor'],
                      navigationExtras
                    );
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
            } else {
              this.helper.setKeyValueNew('storeuser', res.data);
              this.helper.setKeyValueNew('storetoken', res.data.token);

              this.router.navigate(['/main-home']);
            }
          } else {
            if (res.data.is_skip == 0) {
              let body: any = {
                // name: "",
                token: res.data.token,
                email: res.data.email,

                // device_type: 'ANDROID',
                // device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
              };
              this.helper.postMethod(
                'two-factor',
                body,
                async (res1) => {
                  console.log(res1);
                  //alert("test "+JSON.stringify(res));
                  if (res1.status) {
                    localStorage.setItem("User",JSON.stringify(res.data)); 
                    this.helper.setKeyValueNew('storeuser', res.data);
                    this.helper.setKeyValueNew('storetoken', res.data.token);
                    let otp = res1.data;
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        email: res.data.email,
                        otp: otp,
                        isSkip: true,
                        isLogin: true,
                        two_factor: res.data.two_factor,
                      },
                    };

                    this.router.navigate(
                      ['/main-account/two-factor'],
                      navigationExtras
                    );
                  }
                  //  this.router.navigate(['/auth/otp-verification'])

                  this.helper.presentToast(res1.message);
                  // debugger
                },
                (err) => {
                  console.log(err);
                  this.helper.presentToast(err.message);
                  // alert("error1 " +JSON.stringify(err) );
                  // debugger
                }
              );
            } else {
              this.helper.setKeyValueNew('storeuser', res.data);
              this.helper.setKeyValueNew('storetoken', res.data.token);
              this.router.navigate(['/main-home']);
            }
          }
        } else {
          this.helper.presentToast(res.message);
        }

        // this.helper.presentToast(res.message); (two times)
        // debugger
      },
      (err) => {
        console.log(err);
        this.helper.presentToast(err.message);
        // alert("error1 " +JSON.stringify(err) );
        // debugger
      }
    );
  }
  getFormControl(name) {
    return this.loginForm.get(name);
  }

  handleLogin(){
this.keyboard.hide();
  }
}
