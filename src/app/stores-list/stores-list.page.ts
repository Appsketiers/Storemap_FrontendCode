import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.page.html',
  styleUrls: ['./stores-list.page.scss'],
})
export class StoresListPage implements OnInit {
  list_id: any;
  data: any = [];
  page: any = 1;
  limit: any = 10;
  cord:any;
  lat:any;
  lng:any;
  constructor(private router: Router, private helper:HelperService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      console.log(this.list_id);
    });
    this.store_list(false, '');
    this.helper.get_location((data)=>{
     this.lat=data.coords.latitude;
     this.lng=data.coords.longitude;
    });
    
  }
open_store(){
this.router.navigate(['/store-detail']);
}

store_list(isFirstLoad, event){
  this.helper.getByKeynew('storetoken', (res) => {
    let body: any = {
      token: res,
      shopping_list_id: this.list_id,
      filter:'MMP',
      limit: this.limit,
      page: this.page,
    };
    this.helper.postMethod('search-store', body, (res) => {
      console.log(res);
      if (isFirstLoad) event.target.complete();
      this.page++;
      console.log('data',this.data);
    });
  });
}

doInfinite(event) {
  this.store_list(true, event);
}
}
