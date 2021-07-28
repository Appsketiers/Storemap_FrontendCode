import { Component, OnInit } from '@angular/core';
// import { MyListComponent } from '../my-list/my-list.component';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-grocery-list-share',
  templateUrl: './grocery-list-share.page.html',
  styleUrls: ['./grocery-list-share.page.scss'],
})
export class GroceryListSharePage implements OnInit {
  image_url = environment.image_baseurl;
  data: any = [];
  limit: any = 10;
  page: any = 1;
  public Checked = [];
  list_id: any;
  select_all:boolean=false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helper: HelperService // private mylist:MyListComponent
  ) {
    // console.log(this.mylist.list);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      console.log(this.list_id);
    });

    this.get_users(false, '');
  }

  get_users(isFirstLoad, event) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, limit: this.limit, page: this.page };
      this.helper.postMethod('get-users', body, (res) => {
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
    this.get_users(true, event);
  }

  checked(ev: any, id: any) {
    if (ev.detail.checked) {
      this.Checked.push(id);
    } else {
      let index = this.Checked.findIndex((el) => {
        return el == id;
      });
      console.log(index, id);
      if (index != -1) {
        this.Checked.splice(index, 1);
      }
    }

    console.log('checked list: ', this.Checked);
  }

  removeCheckedFromArray(id: any) {
    return;
  }

  share() {
    if(this.Checked.length<1){
      this.helper.Alert('Please Select Contact','');
    }
    else{
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        shopping_list_id: this.list_id,
        user_id: JSON.stringify(this.Checked),
      };
      this.helper.postMethod('share-shopping-list', body, (res) => {
        console.log(res);
        if (res.status == true) {
          this.helper.Alert(res.message, '/shopping-lists');
        } else {
          this.helper.Alert('Fail', '');
        }
      });
    });
  }
  }

  all(){
    this.select_all=true;
  }
}
