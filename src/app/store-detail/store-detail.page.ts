import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {
list_id:any;
store_id:any;
lat: any;
lng: any;
store_name: any;
store_image:any;
store_distance:any;
matched_products:any=[];
image_url = environment.image_baseurl;
  constructor(private router: Router,
    private helper: HelperService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      this.store_id=params['store_id'];
      console.log(this.list_id);

      this.helper.get_location((data) => {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
        this.view_store();
      });
      
    });
  }

  view_store(){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        shopping_list_id:this.list_id,
        store_id:this.store_id,
        lat:this.lat,
        lng:this.lng
           
      };
      
      this.helper.postMethod('view-store', body, (res) => {
        console.log(res);
this.store_name=res.data.store.store_name;
this.store_image=res.data.store.store_images[0];
this.store_distance=res.data.store.distance;
this.matched_products=res.data.matched_products;
console.log(this.matched_products);
      });
    });
  }
}
