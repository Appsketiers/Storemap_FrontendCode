import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private _storage: Storage ;
  private user$: BehaviorSubject<any> = new BehaviorSubject(null);
  public userDetail = this.user$.asObservable();
  constructor(private alertCtrl: AlertController,private http: HttpClient, public toastController: ToastController, private router: Router, private nativeStorage: NativeStorage, private storage: Storage, public loadingController: LoadingController, private geolocation: Geolocation) {
    this.init();
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  getsocketObs(): Observable<any> {
    return this.user$.asObservable();
}

setsocketObs(profile: any) {
    this.user$.next(profile);
}
  async getMethod(url: any, data: any, res: any, errHandler?: any) {
    const loading = await this.loadingController.create({
      cssClass: 'my-api-call-loading',
      message: '',
      // duration: 2000
    });
    await loading.present();

    const baseurl: any = environment.baseurl;
    const headers = { 'content-type': 'application/json'
    ,
  	"Authorization": "Bearer " + data.token };
    let params = new HttpParams();
    for (let key in data) {

      params = params.append(key, data[key]);
    }



    this.http.get<any>(baseurl + url, { headers :headers, params: params }).subscribe(data => {
      loading.dismiss();
      res(data);

    }, err => {
      errHandler(err);
      loading.dismiss();
    });

  }
  async postMethod(url: any, data: any, res: any, errHandler?: any) {
    const loading = await this.loadingController.create({
      cssClass: 'my-api-call-loading',
      message: '',
      // duration: 2000
    });
    await loading.present();

    const baseurl: any = environment.baseurl;
    const headers = { 'content-type': 'application/json' 
  };
    const body = JSON.stringify(data);
    this.http.post<any>(baseurl + url, body, { headers }).subscribe(data => {
      loading.dismiss();
      res(data);

    }, err => {
      errHandler(err);
      loading.dismiss();
    });
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  logout(){
    this.nativeStorage.getItem("storeuser")
    .then(
      data => {
        console.log(data)
      },
       
      error => {
        this.router.navigate(["/auth"]);
        
      }
    );

  }
  // storage start
  isLoggedIn1(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let res = await this._storage?.get("storeuser");

      if (res) {
        console.log(res)
        resolve(true);
      }
      else {
        this.router.navigate(["/auth"]);
        reject(false);
      }


    });


  }
  isLoggedIn(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      
      this.nativeStorage.getItem("storeuser")
      .then(
        data => {
          console.log(data)
          resolve(true);
        },
        error => {
          let data = JSON.parse(localStorage.getItem("storeuser"))
          if(data){
            console.log(data)
            resolve(true);
          }else{
            this.router.navigate(["/auth"]);
            reject(false);
          }
    
        }
      );
 
    });

  }
  getUserdetail(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let res = await this._storage?.get("storeuser");

      if (res) {
        console.log(res)
        resolve(res);
      }
      else {
        // this.router.navigate(["/auth"]);
        reject(false);
      }
    });
  }
  async getUser(callback?: any) {
    this.nativeStorage.getItem("storeuser")
    .then(
      data => {
        console.log(data)
        callback(data);
      },
      error => {
        callback(false);
      }
    );
  }
  async setObject(key: string, value: any) {
    value = JSON.stringify(value);
    await this._storage?.set(key, value);
  }
  setStringValue(key: string, value: any) {
    this._storage?.set(key, value);
  }
  getObject1(name: string, callback?: any) {

    this._storage?.get(name).then(res => {
      if (res)
        callback(true);
      else
        callback(false);
    });



  }
  async getObject(name: string) {

    return await this._storage?.get(name);

  }
  getStorage(name: string) {
    this._storage?.get(name).then(res => {
      return res;
    });
  }

  async clearStorage() {
    this.nativeStorage.clear()
    .then(
      () => console.log('Stored item!'),
      async error => {
        await this._storage?.clear();
      }
    );
  
  }
  // end 
  // native storage start
  setKeyValue(key: string, object: any) {
    this.nativeStorage.setItem(key, object)
      .then(
        () => console.log('Stored item!'),
        error => {
          this.setObject(key, object);
        }
      );
  }

  getByKey(Key: string, callback?: any, err?: any) {
    this.nativeStorage.getItem(Key)
      .then(
        data => {
          callback(data);
        },
        async error => {let res = await this._storage?.get(Key);
          callback( JSON.parse(res) );
        }
      );
  }
  // end

  async clearStorageNew() {
    this.nativeStorage.remove('storeuser')
.then(
  () => {
    localStorage.clear();
    console.log('Stored item!')},
  async error => {
    localStorage.clear();
  }
);
this.nativeStorage.remove('storetoken')
.then(
  () => {
    localStorage.clear();
    console.log('Stored item!')},
  async error => {
    localStorage.clear();
  }
);
    // this.nativeStorage.clear()
    // .then(
    //   () => {
    //     localStorage.clear();
    //     console.log('Stored item!')},
    //   async error => {
    //     localStorage.clear();
    //   }
    // );
  
  }
  // end 
  // native storage start
  setKeyValueNew(key: string, object: any) {
    this.nativeStorage.setItem(key, object)
      .then(
        () => console.log('Stored item!'),
        error => {
          localStorage.setItem(key,JSON.stringify(object));

        }
      );
  }

  getByKeynew(Key: string, callback?: any, err?: any) {
    this.nativeStorage.getItem(Key)
      .then(
        data => {
          callback(data);
        },
        async error => {
          callback(JSON.parse(localStorage.getItem(Key)));
        }
      );
  }

  async Alert(msg: string, url){
		let alert = await this.alertCtrl.create({
		  header: msg,
		  buttons: [
			{
			  text: "Ok",
			  handler: data => {
          if(url===''){

          }
          else{
            this.router.navigate([url]);
          }
         
			  }
			}
		  ]
		});
		alert.present();
	  }

    get_location(data){
       this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        data(resp)
       }).catch((error) => {
         console.log('Error getting location', error);
       });
       return 
    }
}
