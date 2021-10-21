import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MealIdeasShoppingComponent } from '../meal-ideas-shopping/meal-ideas-shopping.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-meal-ideas',
  templateUrl: './meal-ideas.page.html',
  styleUrls: ['./meal-ideas.page.scss'],
})
export class MealIdeasPage implements OnInit {
  list_id: any;
  authentic: any;
  credit_link: any;
  description: any;
  heading: any;
  title: any;
  ingredient_list: any = [];
  ingredients: any = [];
  update: any = [];
  liked: any;
  image: any;
  my_list: any = [];
  shared_list: any = [];
  image_url = environment.image_baseurl;
  selected_shopping_list:any;
  avg_rating;
  today_view_count;
  total_review;
  is_reviewed;
  review:any;
  constructor(
    private iab: InAppBrowser,
    private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      console.log(this.list_id);
    });
    this.meal_idea_details();
    this.my_shopping_list();
    this.shared_shopping_list();
  }

  meal_idea_details() {
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, meal_id: this.list_id };
      this.helper.postMethod('meal-idea-detail', body, (res) => {
        console.log(res);
        if (res.data.is_favourite == 1) {
          this.liked = true;
        } else {
          this.liked = false;
        }
        this.authentic = res.data.authentic;
        this.credit_link = res.data.credit_link;
        this.description = res.data.description;
        this.heading = res.data.heading;
        this.title = res.data.title;
        this.ingredient_list = res.data.ingredient_list;
        this.image = res.data.image;
        this.today_view_count = res.data.today_view_count;
        this.avg_rating = res.data.avg_rating;
        this.total_review = res.data.total_review;
        this.is_reviewed = res.data.is_reviewed;
        this.review = res.data.review;
      });
    });
  }
  like(status) {
    this.liked = !this.liked;
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, meal_id: this.list_id, status: status };
      this.helper.postMethod('like-dislike-meal', body, (res) => {
        console.log(res);
        //this.helper.Alert(res.message,'');
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

  open_link(){
    const browser = this.iab.create(this.credit_link,'_system',{location:'no'}); 
  }

  review_ratings(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
        type:'MEAL'
      },
    };

this.router.navigate(['/review-rating'], navigationExtras)
  }

  review_comment(review_type){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
        type:'MEAL',
        review_type:review_type,
        review_data:JSON.stringify(this.review)
      },
    };

this.router.navigate(['/review-comment'], navigationExtras)
  }
}
