import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { Device } from '@ionic-native/device/ngx';
import { passwordNameValidator } from '../providers/validation.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ResetPasswordPage implements OnInit {
  repasswordForm: FormGroup;
  submmited: any = false;
  imagepath: any;
  ornamentimage: any;
  email: any;

  n_passwordType: string = 'password';
  n_passwordIcon: string = 'eye-off-outline';

  r_passwordType: string = 'password';
  r_passwordIcon: string = 'eye-off-outline';
  constructor(private formBuilder: FormBuilder,  private helper: HelperService, private location: Location,private device: Device, private router: Router, private route: ActivatedRoute) {
 
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
      this.email =params["email"];
    });
    
    this.createForm();
  }
  createForm() {
    this.repasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, passwordNameValidator(new RegExp('/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/'))]],
      repassword: ['', [Validators.required, passwordNameValidator(new RegExp('/[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/'))]],
      
    });
  }
  get f() { return this.repasswordForm.controls; }

  resetPassSubmit() {
    this.submmited = true;
    if(!(this.repasswordForm.controls['password'].value === this.repasswordForm.controls['repassword'].value)){
      
      this.helper.presentToast("Re-Type password should be same.");
      return ;
    }
    if (this.repasswordForm.invalid) {
     
      return;
    }
    let body: any = {
  
      email:this.email,
      new_password: this.repasswordForm.controls['password'].value
    
   
    }
   
    this.helper.postMethod('reset-password', body, async res => {
      console.log(res)
      //alert("test "+JSON.stringify(res));
      if(res.status)
      this.router.navigate(['/auth'])
      
      
      

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
    return this.repasswordForm.get(name);

  }


  n_hideShowPassword(){
    this.n_passwordType = this.n_passwordType === 'text' ? 'password' : 'text';
     this.n_passwordIcon = this.n_passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  r_hideShowPassword(){
    this.r_passwordType = this.r_passwordType === 'text' ? 'password' : 'text';
     this.r_passwordIcon = this.r_passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }
}
