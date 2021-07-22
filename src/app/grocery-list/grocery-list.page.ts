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
  ingredients:any;
  image_url=environment.image_baseurl;
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
        this.ingredients=res.data.ingredients;
        
      });
    });
  }
}
