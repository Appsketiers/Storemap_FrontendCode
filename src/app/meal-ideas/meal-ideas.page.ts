import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MealIdeasShoppingComponent } from '../meal-ideas-shopping/meal-ideas-shopping.component';
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
  liked: any;
  image: any;
  list: any = [];
  image_url = environment.image_baseurl;
  constructor(
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
    this.shopping_list();
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

  async add_to_shopping_list() {
    const modal = await this.modalController.create({
      component: MealIdeasShoppingComponent,
      cssClass: 'option_modal',
      componentProps: {shopping_list:this.list},
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
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
}
