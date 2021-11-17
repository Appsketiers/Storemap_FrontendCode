import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@Component({
  selector: 'app-shopping-lists1',
  templateUrl: './shopping-lists1.page.html',
  styleUrls: ['./shopping-lists1.page.scss'],
})
export class ShoppingLists1Page implements OnInit {
  public added: boolean = false;
  public add: boolean = true;
  items: any = [];
  form: FormGroup;
  submmited: any = false;
  public toggled: boolean = false;
  someValue: any;
  data: any = [];
  page: any = 1;
  limit: any = 10;
  image_url = environment.image_baseurl;
  saved: any = false;
  empty = false;
  LoadMore;
  list_id: any;
  view_store: any = false;
  constructor(
    private keyboard: Keyboard,
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public navCtrl: NavController
  ) {
    this.toggled = false;
  }

  ngOnInit() {
    this.createform();
    this.shoping_item_list(false, '');
  }

  checkForItem(id) {
    if (id) {
      return this.items.findIndex((el) => {
        return el.product == id;
      }) != -1
        ? true
        : false;
    }
    return false;
  }
  shoping_item_list(isFirstLoad, event) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        limit: this.limit,
        page: this.page,
      };
      this.helper.postMethod('item-list', body, (res) => {
        console.log(res);
        if (this.page == 1) {
          this.data = [];
        }
        this.data = [...this.data, ...res.data.data];
        console.log(this.data, 'this.data');
        // for (let i = 0; i < res.data.data.length; i++) {
        //   this.data.push(res.data.data[i]);
        //   this.data[i].added = false;
        // }
        if (isFirstLoad) event.target.complete();
        if (res.data.current_page == res.data.last_page) {
          this.LoadMore = false;
        } else {
          this.LoadMore = true;
          this.page++;
        }
        // if(res.data.from == 1){
        //   this.page = 1;
        // }

        console.log('data', this.data);
      });
    });
  }

  doInfinite(event) {
    this.shoping_item_list(true, event);
  }

  add_item(id, i) {
    // this.data[i].added=true;
    this.items.push({
      product: id,
      quantity: 1,
    });
    console.log(this.items);
  }
  createform() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  remove_item(id, i) {
    this.data[i].added = false;
    let index = this.items.findIndex((el) => {
      console.log(el);
      return el.product == id;
    });

    console.log(index, id);
    if (index != -1) {
      this.items.splice(index, 1);
    }
    console.log(this.items);
  }

  getFormControl(name) {
    return this.form.get(name);
  }

  get f() {
    return this.form.controls;
  }

  save() {
    this.submmited = true;
    if (this.form.invalid) {
      this.helper.Alert('Please Enter Shopping List Name', '');
      return;
    }
    if (this.items.length > 0) {
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          list_name: this.form.controls['name'].value,
          ingredients: JSON.stringify(this.items),
        };

        this.helper.postMethod('create-shopping-list', body, (res) => {
          console.log(res);
          if (res.status == true) {
            if (!this.view_store) {
              this.helper.presentToast(res.message);
              this.router.navigate(['/shopping-lists']);
              // this.helper.Alert(
              //   'Shopping List successfully created.',
              //   '/shopping-lists'
              // );
              this.saved = true;
            } else {
              this.list_id = res.data.id;
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  id: this.list_id,
                },
              };
              this.router.navigate(['/stores-list'], navigationExtras);
            }

            //this.navCtrl.pop();
          }
        });
      });
    } else {
      this.helper.Alert('Please add ingredients', '');
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  searchThis(ev) {
    this.page = 1;

    console.log(ev.srcElement.value);
    if (ev.target.value.length >= 3) {
      let search_string = ev.target.value;
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          limit: this.limit,
          search: ev.srcElement.value,
          page: this.page,
        };
        this.helper.postMethod('item-list', body, (res) => {
          console.log(res);
          this.data = [];
          this.data = [...this.data, ...res.data.data];
          console.log(this.data, 'this.data');
          // for (let i = 0; i < res.data.data.length; i++) {
          //   this.data.push(res.data.data[i]);
          //   this.data[i].added = false;
          // }
          if (res.data.current_page == res.data.last_page) {
            this.LoadMore = false;
          } else {
            this.LoadMore = true;
            this.page++;
          }
          // if(res.data.from == 1){
          //   this.page = 1;
          // }
          console.log('data', this.data);
        });
      });
    }
  }

  search2(ev) {
    if (ev.srcElement.value == '') {
      this.shoping_item_list(true, '');
    }
  }

  cancelSearch(ev) {
    this.toggle();
    this.shoping_item_list(false, '');
    this.someValue="";
  }

  show_store() {
    let that = this;
    this.helper.confirm('Save List and Show Store', function (status) {
      if (status) {
        that.view_store = true;
        that.save();
      } else {
        console.log('denied');
      }
    });
  }

  ionViewWillEnter() {
    this.view_store = false;
  }

  handleLogin(){
    this.keyboard.hide();
      }
}
