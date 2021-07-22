import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
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
  ingredient_list: any = [];
  open_ingredient_list: any = false;
  constructor(private helper: HelperService) {}

  ngOnInit() {
    this.saved_meal_list(false, '');
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
        console.log(res);
      });
    });
  }

  doInfinite(event) {
    this.saved_meal_list(true, event);
  }

  open_ingredient(i) {
    this.open_ingredient_list = !this.open_ingredient_list;
    this.ingredient_list = this.data[i].ingredient_list;
    console.log(this.ingredient_list);
  }
}
