import { Component, OnInit, NgZone } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-review-comment',
  templateUrl: './review-comment.page.html',
  styleUrls: ['./review-comment.page.scss'],
})
export class ReviewCommentPage implements OnInit {
  id:any;
  type:any;
  data: any;
  comment;
  rating;
  review_images:any=[];
  image_url = environment.image_baseurl;
  stars : any[] = [false , false , false , false , false];
  constructor(private router: Router,private helper: HelperService,
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

  }

  add_review(){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        review_for:this.type,
        target_id:this.id,
        comment:this.comment,
        rating:this.rating,
        review_images:this.review_images
              }
      this.helper.postMethod('add-review', body, (res) => {
        console.log(res);
        

      });
    });
  }

  addRate(rt){
    this.rating = null;
    //this.form.controls['rating'].setValue(rt+1);
   for(var i=0;i<=4;i++){  
     if(rt >= i){  
       this.stars[i]=true;  
     }  
     else{  
       this.stars[i]=false;  
     }
   }
   // console.log(rt , this.stars);
 }

}
