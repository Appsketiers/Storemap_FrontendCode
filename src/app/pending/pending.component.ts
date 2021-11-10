import { Component, OnInit, NgZone } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SlicePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  data: any = [];
  page: any = 1;
  limit: any = 10;
  // JSON = JSON;
  json = JSON;
  image_url = environment.image_baseurl;
from=0;
to=0;
  constructor(private helper: HelperService,
    public modalController: ModalController, private ngZone:NgZone, private router: Router) { }

  ngOnInit() {
    this.pending_orders_list(false, '');
  }

  pending_orders_list(isFirstLoad, event){
    
    this.ngZone.run(()=>{
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
         type:'PENDING',
          limit: this.limit,
          page: this.page,
        }
        this.helper.postMethod('my-orders', body, (res) => {
          console.log(res);
          this.data = [...this.data,...res.data.data];
           
          // for (let i = 0; i < res.data.data.length; i++) {
          //   this.data.push(res.data.data[i]);
          // }
          if (isFirstLoad) event.target.complete();
          this.page++;
          console.log('data', this.data);
         
        });
        // this.convert_to_array();
      });
    })
   
  }


convert_to_array(){
  for (let i = 0; i < this.data.length; i++) {
    this.data[i].store_images= JSON.parse(this.data[i].store_images);
          }
          console.log(this.data);
}

  doInfinite(event) {
    this.pending_orders_list(true, event);
  }

  open_order(id, name, time, amount, image){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        name:name,
        time:time,
        amount:amount,
        image:image
      },
    };
    this.router.navigate(['/past-orders1'], navigationExtras);
      }

      async presentModal(otp, order_id) {
        const modal = await this.modalController.create({
          component: MyStorePopComponent,
          cssClass: 'option_modal',
          componentProps: {
            'otp': otp,
            'order_id': order_id
             }
    
        });
    
        modal.onDidDismiss().then((data) => {
          console.log(data);
          this.pending_orders_list(false, '');
        });
        return await modal.present();
      }
}
