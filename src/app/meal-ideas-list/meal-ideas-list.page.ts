import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-meal-ideas-list',
  templateUrl: './meal-ideas-list.page.html',
  styleUrls: ['./meal-ideas-list.page.scss'],
})
export class MealIdeasListPage implements OnInit {
  limit: any = 10;
  page: any = 1;
  data: any = [];
  image_url = environment.image_baseurl;
  constructor(private helper:HelperService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.meal_idea_list(false, '');
  }

  meal_idea_list(isFirstLoad, event){
      this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, limit: this.limit, page:this.page};
      this.helper.postMethod('meal-idea-list', body, (res) => {
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
    this.meal_idea_list(true, event);
  }

  meal_idea(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": id
      }
    };

    this.router.navigate(["/meal-ideas"],  navigationExtras);
  }
}
