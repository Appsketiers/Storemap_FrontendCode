import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.page.html',
  styleUrls: ['./grocery-list.page.scss'],
})
export class GroceryListPage implements OnInit {
  list_id: any;
  ingredients: any = [];
  image_url = environment.image_baseurl;
  title: any;
  update: any = [];
  default_src='../../assets/img/item_placeholder.png';
  constructor(
    private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      console.log(this.list_id);
    });
    this.shoping_list();
  }

  share_list() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
      },
    };
    this.router.navigate(['/grocery-list-share'], navigationExtras);
  }

  shoping_list() {
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, list_id: this.list_id };
      this.helper.postMethod('shopping-list-detail', body, (res) => {
        console.log(res);
        this.ingredients = res.data.ingredients;
        this.title = res.data.title;
        for (let i = 0; i < this.ingredients.length; i++) {
          this.update.push({
            product: this.ingredients[i].id,
            quantity: this.ingredients[i].quantity,
          });
        }
        console.log(this.update);
      });
    });
  }

  delete_ingredient(id) {
    let index = this.update.findIndex((el) => {
      console.log(el);
      return el.product == id;
    });

    console.log(index, id);
    if (index != -1) {
      this.update.splice(index, 1);
      this.ingredients.splice(index, 1);
    }
    console.log(this.update);
    console.log(this.ingredients);
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
          this.helper.Alert(
            'Shopping List successfully updated.',
            '/grocery-list'
          );
        }
      });
    });
  }

  show_store() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
      },
    };
    this.router.navigate(['/stores-list'], navigationExtras);
  }

  default(){
    let src;
    return src='../../assets/img/item_placeholder.png'
  }
}
