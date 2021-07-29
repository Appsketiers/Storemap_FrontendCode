import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})
export class ShoppingListsPage implements OnInit {
  list:any=[];
  constructor(public helper:HelperService) { 
    // this.shoping_list_items();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.shoping_list_items();
  }
  public category: string = "MyList";


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
