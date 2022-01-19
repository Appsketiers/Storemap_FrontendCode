import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import * as _ from "lodash";
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
  title:any;
  sliderTwo: any;
  sliderOne:any;
  page;
  public_toilet;
  matched_products: any=[];
  arrangement: any=[];
  map_items:any=[];
  heighlightId = 0;
  image_url = environment.image_baseurl;
  slideOptsTwo = {
    initialSlide: 1,  
    slidesPerView: 3,
    loop: false,
    centeredSlides: true,
    spaceBetween: 10
  };

  slideOptsone = {
    initialSlide: 0,
    slidesPerView: 1,
    loop: false,
    centeredSlides: true,
    spaceBetween: 10
  };
  isBeginningSlide: true;
  isEndSlide: false;
  store_products: any=[];
  heighlightedItem;
  user_location:any;
  store_location:any;
  constructor(private helper: HelperService,   private router: Router,
    private route: ActivatedRoute) {

      this.route.queryParams.subscribe((params) => {
        this.list_id = params['id'];
        this.store_id = params['store_id'];
        this.title = params['title'];
        this.page = params['page'];
        this.public_toilet = params['public_toilet'];
        this.user_location = JSON.parse(params['user_location']);
        this.store_location = JSON.parse(params['store_location']);
        console.log('user_location', this.user_location);
        console.log('store location', this.store_location);
        console.log(this.list_id);
        console.log(this.store_id);
        console.log(this.title);
        console.log(this.page);
        console.log(this.public_toilet);
        
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
      
      let item = this.request.arrangement.filter((el)=>{
        return (el.row == i && el.col == j)
      }); 
      // console.log(item,i,j);
      if(item.length > 0){
        if(item[0].item_detail.length > 0 && item[0].region_type == "PRODUCT"){
        // if(item[0].item_detail[0].is_match){
         let Len =  item[0].item_detail.filter(ele2=>{return ele2.id === this.heighlightId && ele2.is_match})
         let Len2 =  item[0].item_detail.filter(ele2=>{return ele2.is_match})
        //  console.log(Len,i,j);
          if(Len.length > 0 ){
            return Len[0].images[0];
          }
         // console.log("Len",Len2,i,j);
          if(Len2[0]){
            if(_.isArray(Len2[0].images)){
              return Len2[0].images.length > 0 ? Len2[0].images[0] : '';
            }
            else{
              return Len2[0].images;
            }
          }else {
            return ""
          }
          
        // }
      }else if(item[0].item_detail.length > 0 && item[0].region_type == "INDOOR"){
        let Len =  item[0].item_detail.filter(ele2=>{return ele2.id === this.heighlightId})
        if(Len.length > 0 ){
          return Len[0].image;
        }
        return item[0].item_detail[0].image ? item[0].item_detail[0].image : '';
      }
       
        } 
      }
      return '';
    } 
  
  close(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
        store_id: this.store_id,
        title:this.title
      },
    };
    if(this.page == 'my_store'){
      this.router.navigate(['/my-stores']);
    }
    else{
this.router.navigate(['/stores-list'], navigationExtras)
    }
  }
  ngOnInit() {
// changes
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, store_id: this.store_id, shopping_list_id: this.list_id };
      this.helper.postMethod('store-blueprint', body, (res) => {
        console.log(res);
        this.row = res.data.grid.row;
        this.col = res.data.grid.col;
        this.request = res.data;
        this.arrangement = this.request.arrangement;
        console.log(this.arrangement);
        console.log(this.row, this.col);
        this.store_products = this.request.store_products
        console.log(this.store_products);

        for(let i = 0; i<this.arrangement.length; i++)
        {
          if(this.arrangement[i].item.length>0){
            for(let j = 0; j<this.arrangement[i].item_detail.length; j++){
              if(this.arrangement[i].item_detail[j].is_match)
              {
                this.matched_products.push(this.arrangement[i].item_detail[j]);
              }
            }
           
          }

        }
        console.log(this.matched_products);
      });
    });
  }


checkout(){

  let navigationExtras: NavigationExtras = {
    queryParams: {
      id:this.list_id,
      store_id:this.store_id,
      title:this.title,
      products:JSON.stringify(this.matched_products),
      user_location:JSON.stringify(this.user_location),
      store_location:JSON.stringify(this.store_location)
      },
  };

  this.router.navigate(['/checkout'], navigationExtras);
 
  // this.helper.getByKeynew('storetoken', (res) => {
  //   let body: any = { token: res, store_id: this.store_id, shopping_list_id: this.list_id};
  //   this.helper.postMethod('checkout', body, (res) => {
  //   console.log(res);
  //   if(res.status){
  //     this.router.navigate(['/payment-sucess']);
  //   }
  //   });
  // });  
  
}

shopping_list(){
  this.router.navigate(['/grocery-list']);
}

highlight(id){
      console.log(id);
      this.heighlightId = id;
      let data = this.arrangement.filter(ele=>{
        return ele.item_detail.length > 0 && ele.item_detail.filter(ele2=>{return ele2.id === id}).length >0;
      });
      if(this.heighlightedItem){
        console.log(this.heighlightedItem);
        console.log(document.getElementById("Col-"+this.heighlightedItem[0].row+""+this.heighlightedItem[0].col));
        document.getElementById("Col-"+this.heighlightedItem[0].row+""+this.heighlightedItem[0].col).style.border = "0px";
      }
      
      
      // console.log("Col-"+data[0].row+""+data[0].col)
      setTimeout(() => {
        this.heighlightedItem = data; 
        console.log(data);
        console.log(document.getElementById("Col-"+data[0].row+""+data[0].col));
        document.getElementById("Col-"+data[0].row+""+data[0].col).style.border = "3px solid #0000FF"  
      }, 10);
      
      // console.log()
     
      // console.log(data);
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
