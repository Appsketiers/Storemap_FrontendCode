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
  someValue: any;
  public toggled: boolean = false;
  page: any = 1;
  limit: any = 10;
  LoadMore;
  pagination = false;
  search_string;
  constructor(
    private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if(params['id']){
      this.list_id = params['id'];
      }
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

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  shoping_list() {
    this.ingredients=[];
    this.update=[];
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

  add_item(id,i) {
  
    // this.data[i].added=true;
    this.update.push({
      product:id,
      quantity:1
    });
    console.log(this.update);

    this.update_list();
  }

  checkForItem(id){
    if(id){ 
      return this.update.findIndex((el)=>{
       return el.product == id 
     }) != -1 ? true : false;
    }
    return false;
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
  this.update_list();
  }

  confirm(id){
    let that= this;
    this.helper.confirm('Are you sure you want to delete the item from the list', function(status){
      if(status){
        that.delete_ingredient(id);
      }
    })
  }

  update_list(){
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
          this.helper.presentToast(
            'Shopping List successfully updated.'
            );
            this.router.navigate(['/grocery-list']);
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

  search2(ev){
    
    if(ev.srcElement.value == ""){
      this.shoping_list();
      this.pagination=false;
    }
  }

  cancelSearch(ev) {
    this.toggle();
    this.shoping_list();
    this.someValue="";
  }

  searchThis(ev) {
    this.page=1;
    
    console.log(ev);
    if(ev.target.value.length>=3){
      this.search_string = ev.target.value;
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          limit: this.limit,
          search: this.search_string,
          page: 1,
        };
        this.helper.postMethod('item-list', body, (res) => {  
          console.log(res);
          this.ingredients = [];
          this.ingredients = [...this.ingredients,...res.data.data];
          if(this.ingredients.length>0){
            this.pagination=true;
          }
          console.log(this.ingredients,"this.data");
          // for (let i = 0; i < res.data.data.length; i++) {
          //   this.data.push(res.data.data[i]);
          //   this.data[i].added = false;
          // } 
        if(res.data.current_page == res.data.last_page){
          this.LoadMore = false;
        }else{
          this.LoadMore = true;
          this.page++;
        }  
        // if(res.data.from == 1){
        //   this.page = 1;
        // }
          console.log('data',this.ingredients);
        });
      });
    }
  }

  doInfinite(event) {
    //this.shoping_item_list(true, event);

    this.searchThis(this.search_string);
  }
}
