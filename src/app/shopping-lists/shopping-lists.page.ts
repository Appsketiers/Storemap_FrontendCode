import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})
export class ShoppingListsPage implements OnInit {
  list:any=[];
  page;
  public category: string = "MyList";
  constructor(public helper:HelperService,    private router: Router,
    private route: ActivatedRoute) { 
    // this.shoping_list_items();
    this.route.queryParams.subscribe((params) => {
      if(params['page']){
      this.page = params['page'];
      this.category = 'SharedList'
      }
      console.log(this.page);
    });
  }

  ngOnInit() {
 
  }

  ionViewWillEnter(){
    this.shoping_list_items();
  }
  


  shoping_list_items() {
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
