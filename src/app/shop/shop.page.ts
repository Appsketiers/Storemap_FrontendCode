import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  row: any;
  col: any;
  request;
  list_id: any;
  store_id: any;
  image_url = environment.image_baseurl
  constructor(private helper: HelperService,   private router: Router,
    private route: ActivatedRoute) {

  
   
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res };
      this.helper.getMethod('store-blueprint', body, (res) => {
        console.log(res);
        this.row = res.data.grid.row+1;
        this.col = res.data.grid.col+1;
        this.request = res.data;
        console.log(this.row, this.col);
      });
    });
   }

   getData(i, j) {
    if(this.request){
      return this.request.arrangement.findIndex((el)=>{
        return (el.row == i && el.col == j)
      }) != -1 ? true : false; 
    }
  return false;    
  }
  getData2(i,j){
    if(this.request){
      console.log();

      let item = this.request.arrangement.filter((el)=>{
        return (el.row == i && el.col == j)
      }); 
      if(item.length > 0){
        if(item[0].item_detail.length > 0){
          return item[0].item_detail[0].images.length > 0 ? item[0].item_detail[0].images[0] : '';
        }
        
      }
      return '';
    } 
  }
  close(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
        store_id: this.store_id,
      },
    };
this.router.navigate(['/stores-list'], navigationExtras)
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      console.log(this.list_id);
    });
  }

}
