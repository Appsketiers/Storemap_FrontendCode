import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-safety-awareness',
  templateUrl: './safety-awareness.page.html',
  styleUrls: ['./safety-awareness.page.scss'],
})
export class SafetyAwarenessPage implements OnInit {
  public cat_list: any;
  public List: any;
  public id: any;
  image_url = environment.image_baseurl;
  constructor(
    private helper: HelperService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res };
      this.helper.getMethod('safety-awareness-category-list', body, (res) => {
        console.log(res);
        this.cat_list = res.data;
      });
    });
    this.list(1);
  }

  list(id) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, category_id: id };
      this.helper.postMethod('safety-awareness-list', body, (res) => {
        console.log(res);
        this.List = res.data;
      });
    });
  }

  safety_awareness(id) {
    let NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate(['/safety-awareness-deatils'], NavigationExtras);
  }
}
