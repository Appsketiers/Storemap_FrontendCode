import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.page.html',
  styleUrls: ['./recommended.page.scss'],
})
export class RecommendedPage implements OnInit {
  page: any = 1;
  limit: any = 10;
  data: any = [];
  constructor(private helper:HelperService,    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recommended_meal_list(false, '');
  }

  recommended_meal_list(isFirstLoad, event) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        limit: this.limit,
        page: this.page,
      };
      this.helper.postMethod('recommended-meal-list', body, (res) => {
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
          this.data.push(res.data.data[i]);
          this.data[i].added = false;
        }
        if (isFirstLoad) event.target.complete();
        this.page++;
        console.log('data',this.data);
      });
    });
  } 

  doInfinite(event) {
    this.recommended_meal_list(true, event);
  }

  
  recommended_details(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/recommended-camping-trip'], navigationExtras);
  }

  create_list(id, title){
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, list_id: id, list_name: title };
      this.helper.postMethod('recommended-shopping', body, (res) => {
        console.log(res);
        this.helper.presentToast(res.message);
   
            });
    });
  }
}
