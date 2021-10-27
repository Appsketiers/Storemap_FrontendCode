import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import { HelperService } from './helper.service';
import { AlertController, Platform, NavController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  loader
  static loader: any;
  isLoading = false;
  public loading: any;
  token: any;
  url = "";
  constructor( public http: HttpClient,
    public loadingController: LoadingController,
    private helper: HelperService, public navCtrl: NavController,
    public router: Router,) { }




  async showLoading() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.loading = await this.loadingController.create({
        message: "Please wait...",
      });
      this.loading.present();
    }
  }

  hideLoading() {
    setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.loadingController.dismiss(this.loading);
      }
    }, 1200);
   
  }

  setVaidations(form: any, custmMsg?: any): boolean {
    const formErrors = {};
    let formError = false;
    const validationMsg = {
      countryName: "Country Name",
      stateName: "State Name",
      cityName: "City Name",
      user_type: "User Type",
      full_name: "Full Name",
      address: "Location",
      fullname: "Full Name",
      phone: "Mobile Number",
      country_code: "ISD code",
      old_password: "Old Password",
      address_detail: "Business address",
      business_license: "License image",
      tax_document: "Document image",
      business_license_text: "License name",
      tax_document_text: "Document name",
      business_contact: "Business contact",
      new_password: "New Password",
      confirm_password: "Confirm Password",
      confirm_new_password: "Confirm New Password",
      password_confirmation: "Confirm Password",
    };
    // tslint:disable-next-line:prefer-const
    for (let i in form.controls) {
      if (form.controls[i].errors) {
        // console.log(form.controls[i].errors);
        for (const j in form.controls[i].errors) {
          if (form.controls[i].errors[j]) {
            formError = true;
            let msg = "";
            let str = "";
            if (validationMsg[i]) {
              str = validationMsg[i];
            }
            // tslint:disable-next-line:one-line
            else {
              if (i.indexOf("") !== -1) {
                str = (i.charAt(0).toUpperCase() + i.slice(1)).split("_").join(" ");
              } else {
                str = i.charAt(0).toUpperCase() + i.slice(1);
                for (let ii = 1; ii < str.length; ii++) {
                  if (str.charAt(ii) >= "A" && str.charAt(ii) <= "Z") {
                    str = str.substring(0, ii) + "" + str.substr(ii);
                    ii = ii + 2;
                  }
                }
              }
            }
            if (j === "required") {
              msg = " is required";
            } else if (j === "maxlength") {
              let term = "characters";
              if (i === "phone" || i === "business_contact") {
                term = "digits";
              }
              // tslint:disable-next-line:prefer-const
              let lrn = form.controls[i].errors[j].requiredLength;
              msg = " should be minimum of " + lrn + " " + term;
            } else if (j === "minlength") {
              let term = "characters";
              if (i === "mobile_number" || i === "business_contact") {
                term = "digits";
              }
              // tslint:disable-next-line:prefer-const
              let lrn = form.controls[i].errors[j].requiredLength;
              msg = " should be minimum of " + lrn + " " + term;
            } else if (j === "pattern") {
              let field = str.toLowerCase().replace(/ /g, "_");
              console.log("custmMsg[str]", custmMsg[str.toLowerCase()]);
              console.log("str ", str);

              if (custmMsg[field]) {
                console.log("str ", str);
                msg = custmMsg[field];
                str = "";
              } else {
                msg = " is Invalid!";
              }
            }

            this.helper.presentToast(str + "" + msg);
            break;
          }
        }
        if (formError) {
          break;
        }
      }
    }
    return !formError;
  }



  sendPostRequest(values) {
		//let form  = new FormData()
		//form.append('source' ,values.body.source)
		const body = new HttpParams().set('source', values.body.source)
		return this.http.post(values.url, body,
		{
		headers:{
			//'content':"application/json",
			'content-type':"application/x-www-form-urlencoded",
			// 'authorization': "Bearer sk_test_51HXEfhLIPk1CcfAdvOLQu9kpWt1n7xVxuc04QoTbSb9HFxkK8vAcVyiH2rpuENRoEahEQ3t6CWNwKjl2hBTs5LeM00dH6Q9Tyq"
			'authorization': "Bearer sk_test_51HMKpJApZbhhD6Q9AdSwj3c0aZombEjoc779uqaiPEcbXCRSoRH9m53HIGBIZ5hAv3RggIG53cqnrsiYr9xKyF8n00qSxuyi3k"

		}
		});
	  }
    sendGetRequest(values,live) {
      //let form  = new FormData()
      //form.append('source' ,values.body.source)
      const body = new HttpParams().set('source', values.body.source)
      return this.http.get(values.url, 
      {
      headers:{
        //'content':"application/json",
        'content-type':"application/x-www-form-urlencoded",
        	// 'authorization': "Bearer sk_test_51HXEfhLIPk1CcfAdvOLQu9kpWt1n7xVxuc04QoTbSb9HFxkK8vAcVyiH2rpuENRoEahEQ3t6CWNwKjl2hBTs5LeM00dH6Q9Tyq"
			  'authorization': "Bearer sk_test_51HMKpJApZbhhD6Q9AdSwj3c0aZombEjoc779uqaiPEcbXCRSoRH9m53HIGBIZ5hAv3RggIG53cqnrsiYr9xKyF8n00qSxuyi3k"

      }
      });
      }
      sendDeleteRequest(values,live) {
        //let form  = new FormData()
        //form.append('source' ,values.body.source)
        const body = new HttpParams().set('source', values.body.source)
        return this.http.delete(values.url,
        {
        headers:{
          //'content':"application/json",
          'content-type':"application/x-www-form-urlencoded",
          	// 'authorization': "Bearer sk_test_51HXEfhLIPk1CcfAdvOLQu9kpWt1n7xVxuc04QoTbSb9HFxkK8vAcVyiH2rpuENRoEahEQ3t6CWNwKjl2hBTs5LeM00dH6Q9Tyq"
			    'authorization': "Bearer sk_test_51HMKpJApZbhhD6Q9AdSwj3c0aZombEjoc779uqaiPEcbXCRSoRH9m53HIGBIZ5hAv3RggIG53cqnrsiYr9xKyF8n00qSxuyi3k"

        }
        });
        }

        
  async httpRequeststripe(url, type, form, withoutloder?, base_url?,live?) {
    if (!withoutloder) 
      this.showLoading();
    

    return new Promise((resolve, reject) => {
      this.helper.getByKeynew('storetoken', (res) => {
        this.token = res;
        let headers;
          headers = {
            headers: {
              'content-type':"application/x-www-form-urlencoded",
                
              'authorization': "Bearer sk_test_51HMKpJApZbhhD6Q9AdSwj3c0aZombEjoc779uqaiPEcbXCRSoRH9m53HIGBIZ5hAv3RggIG53cqnrsiYr9xKyF8n00qSxuyi3k"

            },
          };
        if (type === "POST") {
          this.http.post(url, form, headers).subscribe(
            (response: any) => {
              if (response) {
                resolve(response);
                if (!withoutloder) 
            this.hideLoading();
              } else {
                reject(response);
                if (!withoutloder) 
            this.hideLoading();
              }
            },
            (err) => {
              if (!withoutloder) 
            this.hideLoading();
              if (err.status == 401) {
                this.helper.clearStorageNew();
                      this.router.navigate(['/auth']);
                this.helper.presentToast(err.error.message);
              }  else if (err.status == 0) {
                return this.helper.presentToast("Oops, it seems you are not connected to the internet. Please try again later.");
              }
            }
          );
        } else if (type == "POSTUPLOAD") {
          let formData: FormData = new FormData();
          for (let property in form) {
            if (form[property] instanceof Array) {
              for (let files in form[property]) {
                formData.append(property + "[]", form[property][files]);
              }
            } else formData.append(property, form[property]);
          }
          this.http.post(url, formData, headers).subscribe(
            (response) => {
              resolve(response);
              if (!withoutloder) 
            this.hideLoading();
            },
            (err) => {
              if (!withoutloder) 
            this.hideLoading();
              if (err.status == 401) {
                this.helper.clearStorageNew();
                this.router.navigate(['/auth']);
                this.helper.presentToast(err.error.message);
              }  else if (err.status == 0) {
                return this.helper.presentToast("Oops, it seems you are not connected to the internet. Please try again later.");
                
              }
            }
          );
        } else if (type === "GET") {
          this.http.get(url, headers).subscribe(
            (response: any) => {
              if (response) {
                resolve(response);
                if (!withoutloder) 
            this.hideLoading();
              }
            },
            (err) => {
              if (!withoutloder) 
            this.hideLoading();
              if (err.status == 401) {
                this.helper.clearStorageNew();
                this.router.navigate(['/auth']);
                this.helper.presentToast(err.error.message);
              } else if (err.status == 0) {
                return this.helper.presentToast("Oops, it seems you are not connected to the internet. Please try again later.");
              }
            }
          );
        } else if (type === "DELETE") {
          this.http.delete(url, headers).subscribe(
            (response: any) => {
              if (response) {
                resolve(response);
                if (!withoutloder) 
                this.hideLoading();
              }
            },
            (err) => {
              if (!withoutloder) 
            this.hideLoading();
              if (err.status == 401) {
                this.helper.clearStorageNew();
                this.router.navigate(['/auth']);
                this.helper.presentToast(err.error.message);
              } else if (err.status == 0) {
                return this.helper.presentToast("Oops, it seems you are not connected to the internet. Please try again later.");
              }
            }
          );
        }
      });
    });
  }
}
