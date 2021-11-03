import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from '../providers/helper.service';

import { timer } from 'rxjs';
@Component({
  selector: 'app-my-store-pop',
  templateUrl: './my-store-pop.component.html',
  styleUrls: ['./my-store-pop.component.scss'],
})
export class MyStorePopComponent implements OnInit {
  @Input() otp: any;
  @Input() order_id: any;
  private timer;

  constructor(private modalController: ModalController, private helper:HelperService) { }

  ngOnInit() {
    // this.timer = timer(5000);
    // this.timer.subscribe((t) => this.onTimeOut());
  this.timer = setInterval(() => {
    this.onTimeOut();
  }, 5000);
 

 
  }

  // close modal
async closeModal() {
  await this.modalController.dismiss();
  }

  onTimeOut() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, order_id: this.order_id};
      this.helper.postMethod('check-payment-status', body, (res) => {
      console.log(res);
      if(res.data.paid){
        clearInterval(this.timer)
        this.modalController.dismiss();

      }
    
      });
    }); 
}
  

}
