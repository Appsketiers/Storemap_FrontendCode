import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ModalController } from '@ionic/angular';
import { MealIdeasShoppingComponent } from '../meal-ideas-shopping/meal-ideas-shopping.component';
@Component({
  selector: 'app-saved-meals',
  templateUrl: './saved-meals.page.html',
  styleUrls: ['./saved-meals.page.scss'],
})
export class SavedMealsPage implements OnInit {
  shownGroup = null;
  data: any = [];
  limit: any = 10;
  page: any = 1;
  update: any = [];
  ingredient_list: any = [];
  open_ingredient_list: any = false;
  list: any = [];
  selected_shopping_list:any;
  ingredients: any = [];
  constructor(private helper: HelperService, public modalController: ModalController) {}

  ngOnInit() {
    this.saved_meal_list(false, '');
    this.shopping_list();
  }

  saved_meal_list(isFirstLoad, event) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, limit: this.limit, page: this.page };
      this.helper.postMethod('saved-meal-idea', body, (res) => {
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
          this.data.push(res.data.data[i]);
        }
        if (isFirstLoad) event.target.complete();
        this.page++;
        console.log(this.data);
      });
    });
  }

  doInfinite(event) {
    this.saved_meal_list(true, event);
  }

  open_ingredient(i) {
    this.data[i].open=!this.data[i].open;
    // this.open_ingredient_list = !this.open_ingredient_list;
    this.ingredient_list = this.data[i].ingredient_list;
    console.log(this.ingredient_list);
    
  }

 async add_to_shopping_list(id){
    const modal = await this.modalController.create({
      component: MealIdeasShoppingComponent,
      cssClass: 'option_modal',
      componentProps: {shopping_list:this.list},
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

  shopping_list() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, list_type: 'MY' };
      this.helper.postMethod('shopping-list', body, (res) => {
        console.log(res);
        this.list = res.data;
        console.log(this.list);
      });
    });
  }

  shopping_list_details() {
    this.helper.getByKeynew('storetoken', (res) => {
     console.log(res);
     let body: any = { token: res, list_id: this.selected_shopping_list.data.id };
     this.helper.postMethod('shopping-list-detail', body, (res) => {
       console.log(res);
       this.ingredients = res.data.ingredients;
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
          'ingredient Added to Shopping List successfully.',
          ''
        );
      }
    });
  });
}
}
