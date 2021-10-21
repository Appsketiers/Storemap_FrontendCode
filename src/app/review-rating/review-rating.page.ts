import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.page.html',
  styleUrls: ['./review-rating.page.scss'],
})
export class ReviewRatingPage implements OnInit {
id:any;
type:any;
data: any = [];
page: any = 1;
limit: any = 10;
image_url = environment.image_baseurl;
  constructor( private router: Router,private helper: HelperService,
    private route: ActivatedRoute, private ngZone:NgZone) { }

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      if(params['id']){
      this.id = params['id'];
      this.type = params['type'];
      }
      console.log(this.id);
      console.log(this.type);
    });

    this.review_list(false, '');
  }

  review_list(isFirstLoad, event) {
    this.ngZone.run(()=>{
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
          review_type:this.type,
          target_id:this.id,
          limit: this.limit,
          page: this.page,
        }
        this.helper.postMethod('review-list', body, (res) => {
          console.log(res);
          this.data = [...this.data,...res.data.data];
          // for (let i = 0; i < res.data.data.length; i++) {
          //   this.data.push(res.data.data[i]);
          // }
          if (isFirstLoad) event.target.complete();
          this.page++;
          console.log('data', this.data);
  
        });
        this.convert_to_array();
      });
    })
  }

  convert_to_array(){
    let img:any=[];
     for (let i = 0; i < this.data.length; i++) {
      this.data[i].pictures= JSON.parse(this.data[i].pictures);
            }
            console.log(this.data);
  }
  

  doInfinite(event) {
    this.review_list(true, event);
  }
}
