import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocationService } from '../providers/location.service';
import { HelperService } from '../providers/helper.service';
import {Platform } from '@ionic/angular';
@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.page.html',
  styleUrls: ['./my-stores.page.scss'],
})
export class MyStoresPage implements OnInit {
  data: any = [];
  page: any = 1;
  limit: any = 10;
  cord: any;
  lat: any;
  lng: any;
  image_url = environment.image_baseurl;

  constructor(public modalController: ModalController,
    private router: Router, private location_service: LocationService,
    private helper: HelperService,private ngZone:NgZone,private platform: Platform) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      if (this.platform.is('android' || 'ios')) {
 
       this.location_service.requestGPSPermission((data) => {
         console.log('Location Services data----', data);
         if (data.code == 4) {
           this.helper.Alert('Please enable GPS', '/grocery-list');
         } else {
           this.lat = data.coords.latitude;
           this.lng = data.coords.longitude;
           if (this.lat && this.lng) {
             this.my_store_list(false, '');
           } else {
             this.helper.Alert('Check your GPS', '');
           }
         }
       });
 
        
       }
       else{
         console.log("running in a browser on mobile!");
 
         this.helper.get_location(data=>{
           this.lat = data.coords.latitude;
       this.lng = data.coords.longitude;
             if(this.lat && this.lng){
       this.my_store_list(false, '');
     }
 
     else{
       this.helper.Alert('Check your GPS','');
     }
         })
       }
 
   });
  }



  async optionModal() {
    const modal = await this.modalController.create({
    component: MyStorePopComponent,
    cssClass: 'option_modal',
    });
     
    return await modal.present();
    }
    ratings(){
this.router.navigate(['/review-rating'])
    }


    my_store_list(isFirstLoad, event) {
      this.ngZone.run(()=>{
        this.helper.getByKeynew('storetoken', (res) => {
          let body: any = {
            token: res,
            lat: JSON.stringify(this.lat),
            lng: JSON.stringify(this.lng),
            limit: this.limit,
            page: this.page,
          }
          this.helper.postMethod('my-stores', body, (res) => {
            console.log(res);
            this.data = [...this.data,...res.data.data];
            // for (let i = 0; i < res.data.data.length; i++) {
            //   this.data.push(res.data.data[i]);
            // }
            if (isFirstLoad) event.target.complete();
            this.page++;
            console.log('data', this.data);
    
          });
        });
      })
      
    }

    doInfinite(event) {
      this.my_store_list(true, event);
    }

    like(id, status) {
       this.helper.getByKeynew('storetoken', (res) => {
        console.log(res);
        let body: any = { token: res, store_id: id, status: status };
        this.helper.postMethod('like-dislike-store', body, (res) => {
          console.log(res);
          // this.helper.Alert(res.message,'');

          this.my_store_list(false, '');
        });
      });
    }
}
