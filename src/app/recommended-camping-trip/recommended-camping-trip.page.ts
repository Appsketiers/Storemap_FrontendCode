import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
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
thumbnail:any;
  constructor(private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.recommended_meal_details();
  }

  recommended_meal_details(){
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, meal_id: this.id };
      this.helper.postMethod('recommended-meal-detail', body, (res) => {
        console.log(res);
        this.ingredients=res.data.ingredient_list;
        this.title=res.data.title;
        this.thumbnail=res.data.thumbnail;
      });
    });
  }
}
