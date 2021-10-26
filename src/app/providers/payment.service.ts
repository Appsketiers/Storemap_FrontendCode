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
                
              'authorization': "Bearer sk_test_51HXEfhLIPk1CcfAdvOLQu9kpWt1n7xVxuc04QoTbSb9HFxkK8vAcVyiH2rpuENRoEahEQ3t6CWNwKjl2hBTs5LeM00dH6Q9Tyq"

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
}
