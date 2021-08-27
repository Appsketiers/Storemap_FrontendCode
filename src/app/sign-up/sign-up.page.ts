import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../providers/helper.service';
import {
  ValidationService,
  emailNameValidator,
  passwordNameValidator,
} from '../providers/validation.service';
import { Device } from '@ionic-native/device/ngx';
import { CameraService } from '../providers/camera.service';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
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
  name_req:any=false;
  email_req:any=false;
  password_req:any=false;
  

  constructor(
    private formBuilder: FormBuilder,
    private iab: InAppBrowser,
    private location: Location,
    private cameraService: CameraService,
    private helper: HelperService,
    private device: Device,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    const browser = this.iab.create(
      'http://dev9server.com/store-mapps/page/terms-&-conditions',
      '_self',
      { location: 'no' }
    );
    // debugger
    // this.router.navigate(['/terms-conditions'])
  }
  pandp() {
    const browser = this.iab.create(
      'http://dev9server.com/store-mapps/page/privacy-policy',
      '_self',
      { location: 'no' }
    );
    //this.router.navigate(['/privacy-policy'])
  }

  changeCheckBox(event) {
    if (!event.detail.checked)
      this.signupForm.controls['checkData'].setValue(null);
  }
  signupSubmit() {
    //this.signupForm.controls['image'].setValue("image add successfully");
if(this.signupForm.controls['name'].value == ""){
  this.name_req=true;
}
if(this.signupForm.controls['email'].value == ""){
  this.email_req=true;
}
if(this.signupForm.controls['password'].value == ""){
  this.password_req=true;
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
      device_type: 'ANDROID',
      device_token: this.device.uuid ? this.device.uuid : 'asdfghjk1234rtyu',
      profile_image: this.imagepath,
    };
    this.helper.postMethod(
      'register',
      body,
      (res) => {
        console.log(res);
        //  alert("test "+JSON.stringify(res));
        this.helper.Alert(res.message,'');
        this.location.back();
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

  allow_char(event){
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z \-\']+/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
