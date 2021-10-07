import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-past-orders1',
  templateUrl: './past-orders1.page.html',
  styleUrls: ['./past-orders1.page.scss'],
})
export class PastOrders1Page implements OnInit {
  order_id:any;
  store_name;
  order_time;
  order_amount;
  store_image;
  image_url = environment.image_baseurl;
  data:any=[];
  constructor(private router: Router,private helper: HelperService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if(params['id']){
      this.order_id = params['id'];
      this.store_name = params['name'];
      this.order_time = params['time'];
      this.order_amount = params['amount'];
      this.store_image = params['image'];
      }
      console.log(this.order_id);
      console.log(this.store_name);
      console.log(this.order_time);
      console.log(this.order_amount);
      console.log(this.store_image);
     
    });
    this.order_details();
  }

  order_details() {
  
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          order_id:this.order_id
        }
        this.helper.postMethod('order-detail', body, (res) => {
          console.log(res);
         
  this.data=res.data;
        });
      });
   
  

}
}