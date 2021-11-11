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
title:any;
store_id:any;
lat: any;
lng: any;
store_name: any;
store_image:any;
store_distance:any;
store_address:any;
matched_products:any=[];
store_category: any=[];
store_category_product: any=[];
update: any=[];
avg_rating;
image_url = environment.image_baseurl;
review_count;
page;
is_reviewed;
review: any;
user_location:any;
store_location:any;
  constructor(private router: Router,
    private helper: HelperService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      this.store_id=params['store_id'];
      this.title=params['title'];
this.page = params['page'];
this.user_location = JSON.parse(params['user_location']);
      console.log(this.list_id, this.title, this.store_id);
console.log('user location', this.user_location);
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
        this.is_reviewed = res.data.is_reviewed;
        this.review = res.data.review;
this.store_name=res.data.store.store_name;
this.store_image=res.data.store.store_images[0];
this.store_distance=res.data.store.distance;
this.matched_products=res.data.matched_products;
this.store_address=res.data.store.address;
this.store_category=res.data.store_category;
this.review_count= res.data.store.review_count;
this.avg_rating = res.data.store.avg_rating;
this.store_location = {lat: JSON.parse(res.data.store.lat), lng: JSON.parse(res.data.store.lng)};
console.log('Store Location',this.store_location);
console.log('review count----', this.review_count);
console.log(this.matched_products);
console.log('store category---', this.store_category);

for (let i = 0; i < this.matched_products.length; i++) {
  this.update.push({
    product: this.matched_products[i].id,
    quantity: this.matched_products[i].quantity,
  });
}
console.log('Update---',this.update);
      });
    });
  }

  open_shop(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id:this.list_id,
        store_id:this.store_id,
        title:this.title,
        page:this.page,
        user_location:JSON.stringify(this.user_location),
        store_location:JSON.stringify(this.store_location)
      },
    };

    this.router.navigate(['/shop'], navigationExtras);
  }

  open_category(i, id) {
    for(let j=0; j<this.store_category.length;j++){
if(i==j){
  this.store_category[i].open=!this.store_category[i].open;
}
else{
  this.store_category[j].open=false;
}
    }
     // this.store_category[i].open=!this.store_category[i].open;
if(this.store_category[i].open){
  this.helper.getByKeynew('storetoken', (res) => {
    let body: any = { token: res, shopping_list_id: this.list_id, store_id: this.store_id, category_id:id};
    this.helper.postMethod('store-category-product', body, (res) => {
      this.store_category_product=res.data;
      console.log('store-category-product ---',this.store_category_product);
      console.log(this.store_category);
    });
  });  
}
       
  }
increment(id, key,i){
  let index = this.update.findIndex((el) => {
    console.log(el);
    return el.product == id;
  });

  console.log(index, id);
  if (index != -1) {
    if(key=='match'){
    this.update[index].quantity++;
    this.matched_products[i].quantity++;
    }
    else{
      this.update[index].quantity++;
      this.store_category_product[i].quantity++;
    }
  }
  console.log(this.update);
  console.log(this.matched_products);
this.update_list();
}

decrement(id, key,i){
  let index = this.update.findIndex((el) => {
    console.log(el);
    return el.product == id;
  });

  console.log(index, id);
  if (index != -1) {
    if(key=='match'){
    if(this.matched_products[i].quantity <= 1){
      this.update.splice(index, 1);
      this.matched_products.splice(i, 1);
    }
    else{
    this.update[index].quantity --;
    this.matched_products[i].quantity --;
    }
  }

  else{
    if(this.store_category_product[i].quantity <= 1){
      this.update.splice(index, 1);
      this.store_category_product.splice(i, 1);
      }
    else{
    this.update[index].quantity --;
    this.store_category_product[i].quantity --;
    }
  }
  }
  console.log(this.update);
  console.log(this.matched_products);
this.update_list();

}


add_item(id,i) {
  
  // this.data[i].added=true;
  this.update.push({
    product:id,
    quantity:1
  });
  console.log(this.update);
this.store_category_product[i].quantity=1;

console.log(this.store_category_product);

this.matched_products.splice(0,0,this.store_category_product[i]);

console.log(this.matched_products);
  this.update_list();
}

checkForItem(id){
  if(id){ 
    return this.update.findIndex((el)=>{
     return el.product == id 
   }) != -1 ? true : false;
  }
  return false;
}

  update_list(){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        shopping_list_id: this.list_id,
        list_name: this.title,
        ingredients: JSON.stringify(this.update),
      };

      this.helper.postMethod('update-shopping-list', body, (res) => {
        console.log(res);
        if (res.status == true) {
          this.helper.presentToast(
            'Shopping List successfully updated.'
            );
            
        }
      });
    });
  }

  review_ratings(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.store_id,
        type:'STORE'
      },
    };

this.router.navigate(['/review-rating'], navigationExtras)
  }

  review_comment(review_type){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.store_id,
        type:'STORE',
        review_type:review_type,
        review_data:JSON.stringify(this.review)

      },
    };

this.router.navigate(['/review-comment'], navigationExtras)
  }
  }

