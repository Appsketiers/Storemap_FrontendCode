import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import { passwordNameValidator } from '../providers/validation.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ChangePasswordPage implements OnInit {

  repasswordForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  email: any;
  constructor(private formBuilder: FormBuilder,  private helper: HelperService, private device: Device, private router: Router,private location: Location, private route: ActivatedRoute) {
 
   }

  ngOnInit() {
    this.createForm();
  }
  ionViewWillEnter()
  {
    this.route.queryParams.subscribe(params => {
      this.email =params["email"];
    });
    
    this.createForm();
  }
  createForm() {
    this.repasswordForm = this.formBuilder.group({
      currentpassword:['', [Validators.required]],
      password: ['', [Validators.required, passwordNameValidator(new RegExp('/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/'))]],
      repassword: ['', [Validators.required, passwordNameValidator(new RegExp('/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/'))]],
      
    });
  }
  get f() { return this.repasswordForm.controls; }

  resetPassSubmit() {
    this.submmited = true;
    if(!(this.repasswordForm.controls['password'].value === this.repasswordForm.controls['repassword'].value)){
      
      this.helper.presentToast("Re-Type passwprd should be same.");
      return ;
    }
    if (this.repasswordForm.invalid) {
     
      return;
    }
    this.helper.getByKeynew('storetoken', res=>{
    let body: any = {
      token:res,
      current_password:this.repasswordForm.controls['currentpassword'].value,
      new_password: this.repasswordForm.controls['password'].value
    
   
    }
   
    this.helper.postMethod('change-password', body, async res => {
      console.log(res)
      //alert("test "+JSON.stringify(res));
      if(res.status)
      this.location.back();
 

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
  getFormControl(name) {
    return this.repasswordForm.get(name);

  }


}
