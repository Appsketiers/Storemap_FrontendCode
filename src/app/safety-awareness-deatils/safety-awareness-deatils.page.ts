import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-safety-awareness-deatils',
  templateUrl: './safety-awareness-deatils.page.html',
  styleUrls: ['./safety-awareness-deatils.page.scss'],
})
export class SafetyAwarenessDeatilsPage implements OnInit {
  id: any;
  data: any;
  title:any;
  image:any;
  image_url = environment.image_baseurl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helper: HelperService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params)
      this.id = params.get('id');
    });

    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, safety_awareness_id: this.id };
      this.helper.postMethod('safety-awareness', body, (res) => {
        console.log(res);
        
        this.data= res.data.content;
        this.title= res.data.title;
        this.image= res.data.profile_image;
      });
    });
  }
}
