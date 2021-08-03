import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
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
  saved: any= false;
  constructor(
    private formBuilder: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public navCtrl:NavController
  ) {
    this.toggled = false;
  }
 
  ngOnInit() {
    this.createform();
    this.shoping_item_list(false, '');
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
    this.shoping_item_list(true, event);
  }

  add_item(id,i) {
  
    this.data[i].added=true;
    this.items.push({
      product:id,
      quantity:1
    });
    console.log(this.items);
  }
  createform() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  remove_item(id,i) {
    this.data[i].added=false;
    let index = this.items.findIndex((el) => {
      console.log(el)
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
      return;
    }

    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        list_name: this.form.controls['name'].value,
        ingredients: JSON.stringify(this.items)
      };
      
      this.helper.postMethod('create-shopping-list', body, (res) => {
        console.log(res);
        if (res.status == true) {
          this.helper.Alert('Shopping List successfully created.',"/shopping-lists");
          
          this.saved = true;
          //this.navCtrl.pop();
        }
      });
    });
  }

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  searchThis(ev) {
    console.log(ev.target.value.length);
    if(ev.target.value.length>=3){
      let search_string = ev.target.value;
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          limit: this.limit,
          search: this.RemoveDoubleQuotes(search_string),
          page: this.page,
        };
        this.helper.postMethod('item-list', body, (res) => {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            this.data.push(res.data.data[i]);
            this.data[i].added = false;
          }
          this.page++;
          console.log('data',this.data);
        });
      });
    }
  }

   RemoveDoubleQuotes(a) {
    var fIndex = a.indexOf('"');
    var lIndex = a.lastIndexOf('"');
    if(fIndex >= 0 && lIndex >= 0){
      a = a.substring(fIndex+1, lIndex+1);
    }
    debugger
    return a;
    
}
  cancelSearch(ev) {
    this.toggle();
  }
}
