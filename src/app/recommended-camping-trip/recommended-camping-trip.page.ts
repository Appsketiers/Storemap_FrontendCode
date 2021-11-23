import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MealIdeasShoppingComponent } from '../meal-ideas-shopping/meal-ideas-shopping.component';
@Component({
  selector: 'app-recommended-camping-trip',
  templateUrl: './recommended-camping-trip.page.html',
  styleUrls: ['./recommended-camping-trip.page.scss'],
})
export class RecommendedCampingTripPage implements OnInit {
id:any;
image_url = environment.image_baseurl;
title: any;
ingredients:any=[];
ingredients_list:any=[];
thumbnail:any;
selected_shopping_list:any;
update: any = [];
my_list: any = [];
shared_list: any = [];
people;
  constructor(private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.recommended_meal_details();
    this.my_shopping_list();
    this.shared_shopping_list();
  }

  recommended_meal_details(){
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, meal_id: this.id };
      this.helper.postMethod('recommended-meal-detail', body, (res) => {
        console.log(res);
        this.ingredients_list=res.data.ingredient_list;
        this.title=res.data.title;
        this.thumbnail=res.data.thumbnail;
        this.people = res.data.people;
      });
    });
  }

  async add_to_shopping_list(id) {
    const modal = await this.modalController.create({
      component: MealIdeasShoppingComponent,
      cssClass: 'option_modal',
      componentProps: {shopping_list:this.my_list, shared_shopping_list:this.shared_list},
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      if(data.role=='apply'){
      this.update= [...this.update, {product: id, quantity: 1}];
      this.selected_shopping_list = data;
      this.shopping_list_details();
      console.log(this.update);
    }

    });

    return await modal.present();
  }

  shopping_list_details() {
    this.helper.getByKeynew('storetoken', (res) => {
     console.log(res);
     let body: any = { token: res, list_id: this.selected_shopping_list.data.id };
     this.helper.postMethod('shopping-list-detail', body, (res) => {
       console.log(res);
       this.ingredients = res.data.ingredients;
       //this.title = res.data.title;
       for (let i = 0; i < this.ingredients.length; i++) {
         this.update.push({
           product: this.ingredients[i].id,
           quantity: this.ingredients[i].quantity,
         });
       }
       console.log(this.update);
       this.update_list(this.selected_shopping_list.data.id, this.selected_shopping_list.data.title);
     });
   });
   
 }

 update_list(id, title){
  console.log(this.update);
  this.helper.getByKeynew('storetoken', (res) => {
    let body: any = {
      token: res,
      shopping_list_id: id,
      list_name: title,
      ingredients: JSON.stringify(this.update),
    };

    this.helper.postMethod('update-shopping-list', body, (res) => {
      console.log(res);
      if (res.status == true) {
        this.update=[];
        this.helper.Alert(
          'Item Added to Shopping List successfully.',
          ''
        );
      }
    });
  });
}

my_shopping_list() {
  this.helper.getByKeynew('storetoken', (res) => {
    let body: any = { token: res, list_type: 'MY' };
    this.helper.postMethod('shopping-list', body, (res) => {
      console.log(res);
      this.my_list = res.data;
      console.log(this.my_list);
    });
  });
}

shared_shopping_list() {
  this.helper.getByKeynew('storetoken', (res) => {
    let body: any = { token: res, list_type: 'SHARED' };
    this.helper.postMethod('shopping-list', body, (res) => {
      console.log(res);
      this.shared_list = res.data;
      console.log(this.shared_list);
    });
  });
}
}
