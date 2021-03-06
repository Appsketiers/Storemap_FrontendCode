import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../providers/helper.service';
import {
  ValidationService,
  emailNameValidator,
  passwordNameValidator,
  NameValidator,
} from '../providers/validation.service';
import { Device } from '@ionic-native/device/ngx';
import { CameraService } from '../providers/camera.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class SignUpPage implements OnInit {
  signupForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  name_req: any = false;
  email_req: any = false;
  password_req: any = false;
  user_name: any;
  name_length;
  device_type;
  device_token;

  constructor(
    private keyboard: Keyboard,
    private formBuilder: FormBuilder,
    private iab: InAppBrowser,
    private location: Location,
    private cameraService: CameraService,
    private helper: HelperService,
    private device: Device,
    private router: Router,
    private cd: ChangeDetectorRef,
    private storage: Storage,
  ) {
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
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
      password: [
        '',
        [
          Validators.required,
          passwordNameValidator(
            new RegExp(
              "/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/"
            )
          ),
        ],
      ],
      checkData: [null, Validators.required],
      image: ['', Validators.required],
    });
  }
  get f() {
    return this.signupForm.controls;
  }
  async captureImage() {
    this.cameraService.presentCameraActionSheet(async (obj) => {
      let pathimage = obj.imagedata;
      this.imagepath = pathimage;
      this.ornamentimage = 'data:image/jpg;base64,' + pathimage;

      this.signupForm.controls['image'].setValue('image add successfully');
    });
  }
  tandc() {
    this.router.navigate(['/terms-conditions']);
  }
  pandp() {
    this.router.navigate(['/privacy-policy']);
  }
  removeSpace(value) {
    this.name_length = value.length;

    console.log(value);
    let val = value.trim();
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val)) {
      let val1 = val.replace(/[^a-zA-Z ]/g, '');
      setTimeout(() => {
        this.signupForm.controls['name'].setValue(val1);
      }, 200);

      this.cd.detectChanges();
    } else {
      this.signupForm.controls['name'].setValue(val);
    }
  }

  changeCheckBox(event) {
    if (!event.detail.checked)
      this.signupForm.controls['checkData'].setValue(null);
  }
  signupSubmit() {
    //this.signupForm.controls['image'].setValue("image add successfully");
    if (
      this.signupForm.controls['name'].value == '' ||
      this.signupForm.controls['name'].value.length < 3
    ) {
      this.name_req = true;
    }

    if (this.signupForm.controls['email'].value == '') {
      this.email_req = true;
    }
    if (this.signupForm.controls['password'].value == '') {
      this.password_req = true;
    }
    this.submmited = true;
    if (this.signupForm.invalid) {
      return;
    }
    let body: any = {
      name: this.signupForm.controls['name'].value,
      email: this.signupForm.controls['email'].value,
      country_code: '',
      mobile_number: '',
      password: this.signupForm.controls['password'].value,
      device_type: this.device_type,
      device_token: this.device_token,
      profile_image: this.imagepath,
    };
    console.log(body);
    this.helper.postMethod(
      'register',
      body,
      (res) => {
        console.log(res);
        //  alert("test "+JSON.stringify(res));
        this.helper.presentToast(res.message);
        if(res.status)
        {
          this.location.back();
        }
        // debugger
      },
      (err) => {
        console.log(err);
        //  alert("error1 " +JSON.stringify(err) );
        // debugger
      }
    );
  }
  getFormControl(name) {
    return this.signupForm.get(name);
  }

  allow_char(event) {
    let newValue = event.target.value;

    let regExp = new RegExp('^[A-Za-z0-9? ]+$');

    if (!regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
    // var inp = String.fromCharCode(event.keyCode);

    // if (/^[a-zA-Z \-\']+/.test(inp)) {
    //   return true;
    // } else {
    //   event.preventDefault();
    //   return false;
    // }
  }

  handleLogin() {
    this.keyboard.hide();
  }
}
