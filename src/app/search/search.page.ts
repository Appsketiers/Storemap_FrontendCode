import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { environment } from 'src/environments/environment';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  someValue: any;
  data: any = [];
  page: any = 1;
  limit: any = 10;
  image_url = environment.image_baseurl;
  LoadMore;
  history: any = [];
  recent: any = [];
  trending: any = [];
  constructor(
    private keyboard: Keyboard,
    private helper: HelperService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trending_recent();
  }

  handleLogin() {
    this.keyboard.hide();
  }

  search_all(ev) {
    this.page = 1;

    console.log(ev.srcElement.value);
    if (ev.target.value.length >= 3) {
      let search_string = ev.target.value;
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          limit: this.limit,
          keyword: ev.srcElement.value,
          page: this.page,
        };
        this.helper.postMethod('search-all', body, (res) => {
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

  search(isFirstLoad, event) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        limit: this.limit,
        page: this.page,
      };
      this.helper.postMethod('search-all', body, (res) => {
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

  search2(ev) {
    if (ev.srcElement.value == '') {
      this.search(true, '');
    }
  }

  cancelSearch(ev) {
    this.search(false, '');
  }

  doInfinite(event) {
    this.search(true, event);
  }

  open_details(id, type) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    if (type === 'MEAL') {
      this.router.navigate(['/meal-ideas'], navigationExtras);
    }
    if (type === 'RECOMMENDED_MEAL') {
      this.router.navigate(['/recommended-camping-trip'], navigationExtras);
    }
    if (type === 'SHOPPING_LIST') {
      this.router.navigate(['/grocery-list'], navigationExtras);
    }
  }

  trending_recent() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
      };
      this.helper.getMethod('recent-trending', body, (res) => {
        console.log(res);
        this.recent = res.data.recent;
        this.trending = res.data.trending;
      });
    });
  }

  trending_recent_search(search){
    console.log(search);
    if (search.length >= 3) {
     // let search_string = ev.target.value;
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          limit: this.limit,
          keyword: search,
          page: this.page,
        };
        this.helper.postMethod('search-all', body, (res) => {
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
}
