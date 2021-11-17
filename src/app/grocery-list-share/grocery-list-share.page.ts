import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  LoadMore = true;
  someValue: any;
  public toggled: boolean = false;
  constructor(
    private router: Router,public change: ChangeDetectorRef,
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
          this.data[i].check=false;
          
          
        }
        console.log('nitin -----', this.data);
        if (isFirstLoad) event.target.complete();
        if(res.data.current_page == res.data.last_page){
          this.LoadMore = false;
        }else{
          this.LoadMore = true;
          this.page++;
        }  
        // if(res.data.from == 1){
        //   this.page = 1;
        // }
        console.log(res);
      });
    });
  }

  doInfinite(event) {
    this.get_users(true, event);
  }

  checked(action, id: any, i) {
    if (action == 'add') {
      this.data[i].check=true;
      this.Checked.push(id);
    } else {
      this.data[i].check=false;
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

  checkForItem(id){
    if(id){ 
      return this.Checked.findIndex((el)=>{
        console.log(el);
       return el.id == id 
     }) != -1 ? true : false;
    }
    return false;
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
          this.helper.presentToast(res.message);
          this.router.navigate(['/shopping-lists']);
          
        } else {
          this.helper.Alert('Fail', '');
        }
      });
    });
  }
  }

  all(){
    this.select_all=!this.select_all;

    if (this.select_all){
   for(let i=0; i<this.data.length; i++){
    this.Checked.push(this.data[i].id);
      this.data[i].check=true;
      
   }
    
console.log(this.Checked);
    }
    else{
      this.Checked=[];
     console.log(this.Checked);

     for(let i=0; i<this.data.length; i++){
      this.data[i].check=false;
        
     }
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  cancelSearch(ev) {
    this.toggle();
    this.someValue="";
  }


  searchThis(ev) {
    this.page=1;
    
    console.log(ev.srcElement.value);
    if(ev.target.value.length>=3){
      let search_string = ev.target.value;
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          limit: this.limit,
          search: ev.srcElement.value,
          page: this.page,
        };
        this.helper.postMethod('get-users', body, (res) => {  
          console.log(res);
          this.data = [];
          this.data = [...this.data,...res.data.data];
          console.log(this.data,"this.data");
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
          console.log('data',this.data);
        });
      });
    }
  }

  search2(ev){
    
    if(ev.srcElement.value == ""){
      this.get_users(false,'');
    }
  }
}
