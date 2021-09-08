import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../providers/helper.service';
import { ValidationService, emailNameValidator, passwordNameValidator } from '../providers/validation.service';
import { Device } from '@ionic-native/device/ngx';
import { CameraService } from '../providers/camera.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  signupForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any
  user:any;
  imageUpdate: any;
  constructor(private formBuilder: FormBuilder,private iab: InAppBrowser, private route: ActivatedRoute, private location: Location, private cameraService: CameraService, private helper: HelperService, private device: Device, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  ionViewWillEnter()
  {
    this.createForm();
    this.route.queryParams.subscribe(params => {
      this.user =JSON.parse(params["user"]) ;
      this.signupForm.controls['email'].setValue(this.user.email);
      this.signupForm.controls['name'].setValue(this.user.name);
      this.ornamentimage = environment.image_baseurl+this.user.profile_image ;
    });
    
   
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     // password: ['', [Validators.required, passwordNameValidator(new RegExp('/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/'))]],
     // checkData: [null, Validators.required],
     // image: ['', Validators.required],
    });
  }
  get f() { return this.signupForm.controls; }
  async captureImage() {
    this.cameraService.presentCameraActionSheet(async obj => {
      let pathimage = obj.imagedata;
      this.imagepath = pathimage;
      this.ornamentimage = 'data:image/jpg;base64,' + pathimage;
this.imageUpdate = true;
     //  this.signupForm.controls['image'].setValue("image add successfully");

    });
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

  changeCheckBox(event){

    if(!event.detail.checked)
    this.signupForm.controls['checkData'].setValue(null);
      }
  signupSubmit() {
    //this.signupForm.controls['image'].setValue("image add successfully");

    this.submmited = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.helper.getByKeynew('storetoken', token=>{
    let body: any 
    if(this.imageUpdate) {
      body = {
        token: token,
        name: this.signupForm.controls['name'].value,
        profile_image: this.imageUpdate  ? this.imagepath : this.ornamentimage? this.ornamentimage:null
      }
    } else {
      body = {
        token: token,
        name: this.signupForm.controls['name'].value,
      }
    }
   
    this.helper.postMethod('update-profile', body, res => {
      console.log(res)
    //  alert("test "+JSON.stringify(res));
      this.helper.presentToast(res.message);
      this.location.back();
     // debugger
    }, err => {
      console.log(err)
   //  alert("error1 " +JSON.stringify(err) );
     // debugger
    });
  });
  }
  getFormControl(name) {
    return this.signupForm.get(name);

  }

}

