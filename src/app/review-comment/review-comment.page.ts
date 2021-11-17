import { Component, OnInit, NgZone } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CameraService } from '../providers/camera.service';
@Component({
  selector: 'app-review-comment',
  templateUrl: './review-comment.page.html',
  styleUrls: ['./review-comment.page.scss'],
})
export class ReviewCommentPage implements OnInit {
  store_id:any;
  type:any;
  data: any;
  comment;
  rating;
  review_images:any=[];
  image_path: any = [];
  image_url = environment.image_baseurl;
  stars : any[] = [false , false , false , false , false];
  review_type;
  review_data:any;
  delete_image: any = [];
  pictures:any = [];
  list_id;
  title;
  user_location:any;
  target_id;
  constructor(private router: Router,private helper: HelperService,
    private route: ActivatedRoute, private ngZone:NgZone,
    private cameraService: CameraService,) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      
      
      this.type = params['type'];
      if(this.type =='STORE'){
        this.target_id = params['store_id'];
        this.user_location = JSON.parse(params['user_location']);
      }
      else{
        this.target_id = params['id'];
      }
      this.review_type = params['review_type'];
      this.store_id = params['store_id'];
      this.list_id =  params['id'];
      this.title=params['title'];
      this.review_data = JSON.parse(params['review_data']);
      
      
      console.log(this.store_id);
      console.log(this.type);

      if(this.review_type =='EDIT'){
        this.comment = this.review_data.comment;
        this.rating = this.review_data.rating;
        this.pictures = JSON.parse(this.review_data.pictures);

        for(let i=0; i<this.pictures.length; i++)
    {
      this.review_images.push({
        image:this.pictures[i],
      camera_image: false})
    }
      }
    });

  }

  onRateChange(ev){
console.log(this.rating);
  }

  setValue(value){
    this.rating = value;
    console.log(this.rating);
    
  }

  add_review(){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        review_type:this.review_type,
        review_for:this.type,
        target_id:this.target_id,
        comment:this.comment,
        rating:this.rating,
        review_images:this.image_path,
        delete_images:this.delete_image
              }
      this.helper.postMethod('add-review', body, (res) => {
        console.log(res);
        
this.helper.presentToast(res.message);
if (res.status){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      id:this.list_id,
      title:this.title,
      store_id:this.store_id,
      user_location:JSON.stringify(this.user_location)
    },
  };
  if(this.type =='STORE'){
  this.router.navigate(['/store-detail'], navigationExtras);
  }
else{
  this.router.navigate(['/meal-ideas-list'], navigationExtras);
}

}
      });
      console.log(body);
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

 async captureImage() {
  this.cameraService.presentCameraActionSheet(async (obj) => {
    let pathimage = obj.imagedata;
    this.image_path.push(pathimage);
    this.review_images.push( {
      image: 'data:image/jpg;base64,' + pathimage,
      camera_image:true
    });
    console.log(this.review_images);
    console.log(this.image_path);
  });
}

removeImageByIndex(index, image, camera_image) {
if(!camera_image){
  this.delete_image.push(image);
  console.log(this.delete_image);
}
this.review_images.splice(index, 1)

if(camera_image){
  image = image.replace('data:image/jpg;base64,','')
  let index = this.image_path.findIndex((el) => {
    console.log(el);
    return el === image;
  });

  console.log(index);
  if (index != -1) {
    this.image_path.splice(index, 1);
    
  }
  console.log(this.image_path);


}
  // this.productImages.splice(index, 1);
  // this.productFiles.splice(index, 1);
}
}
