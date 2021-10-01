import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav1', { static: false }) slideWithNav1: IonSlides;
  row: any;
  col: any;
  request;
  list_id: any;
  store_id: any;
  sliderTwo: any;
  sliderOne:any;
  matched_products: any=[];
  arrangement: any=[];
  image_url = environment.image_baseurl;
  slideOptsTwo = {
    initialSlide: 0,  
    slidesPerView: 3,
    loop: true,
    centeredSlides: true,
    spaceBetween: 10
  };

  slideOptsone = {
    initialSlide: 0,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    spaceBetween: 10
  };
  isBeginningSlide: true;
  isEndSlide: false;
  store_products;
  constructor(private helper: HelperService,   private router: Router,
    private route: ActivatedRoute) {

  
   
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res };
      this.helper.getMethod('store-blueprint', body, (res) => {
        console.log(res);
        this.row = res.data.grid.row+1;
        this.col = res.data.grid.col+1;
        this.request = res.data;
        this.arrangement = this.request.arrangement;
        console.log(this.arrangement);
        console.log(this.row, this.col);
        this.store_products = this.request.store_products
        console.log(this.store_products);

        for(let i = 0; i<this.arrangement.length; i++)
        {
          if(this.arrangement[i].item.length>0){
            this.matched_products.push(this.arrangement[i].item_detail[0]);
          }

        }
        console.log(this.matched_products);
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
      this.store_id = params['store_id'];
      console.log(this.list_id);
      console.log(this.store_id);
    });
  }


checkout(){
  debugger
  this.helper.getByKeynew('storetoken', (res) => {
    let body: any = { token: res, store_id: this.store_id, shopping_list_id: this.list_id};
    this.helper.postMethod('checkout', body, (res) => {
     
      console.log(res);
    });
  });  
  this.router.navigate(['/payment-sucess']);
}

    //Move to Next slide
    slideNext(object, slideView) {
      slideView.slideNext(500).then(() => {
        this.checkIfNavDisabled(object, slideView);
      });
    }
  
    //Move to previous slide
    slidePrev(object, slideView) {
      slideView.slidePrev(500).then(() => {
        this.checkIfNavDisabled(object, slideView);
      });;
    }
  
    //Method called when slide is changed by drag or navigation
    SlideDidChange(object, slideView) {
      this.checkIfNavDisabled(object, slideView);
    }
  
    //Call methods to check if slide is first or last to enable disbale navigation  
    checkIfNavDisabled(object, slideView) {
      this.checkisBeginning(object, slideView);
      this.checkisEnd(object, slideView);
    }
  
    checkisBeginning(object, slideView) {
      slideView.isBeginning().then((istrue) => {
        this.isBeginningSlide = istrue;
      });
    }
    checkisEnd(object, slideView) {
      slideView.isEnd().then((istrue) => {
        this.isEndSlide = istrue;
      });
    }

}
