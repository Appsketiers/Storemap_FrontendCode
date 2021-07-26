import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';
@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.page.html',
  styleUrls: ['./stores-list.page.scss'],
})
export class StoresListPage implements OnInit {
  list_id: any;
  data: any = [];
  page: any = 1;
  limit: any = 10;
  cord: any;
  lat: any;
  lng: any;
  image_url = environment.image_baseurl;
  liked:any=[];
  MMP:any=false;
  NTF:any=false;
  FTN:any=false;
  constructor(
    public alertController: AlertController,
    private router: Router,
    private helper: HelperService,
    private route: ActivatedRoute,
    public modalController: ModalController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      console.log(this.list_id);
    });

    this.helper.get_location((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      this.store_list(false, '');
    });
    console.log(this.lat);
  }
  open_store(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.list_id,
        store_id: id
      },
    };
    this.router.navigate(['/store-detail'], navigationExtras);
  }

  store_list(isFirstLoad, event) {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        shopping_list_id: this.list_id,
        filter: 'MMP',
        lat: JSON.stringify(this.lat),
        lng: JSON.stringify(this.lng),
        limit: this.limit,
        page: this.page,
      };
      this.helper.postMethod('search-store', body, (res) => {
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
          this.data.push(res.data.data[i]);
        }
        if (isFirstLoad) event.target.complete();
        this.page++;
        console.log('data', this.data);
      });
    });
  }

  doInfinite(event) {
    this.store_list(true, event);
  }

  async filter() {
    const modal = await this.modalController.create({
      component:FilterComponent ,
      cssClass: 'option_modal',
      });
       
      return await modal.present();
  }

  like(id,status,i){
   if (status==1){
     this.data[i].is_favourite=1;
   }
   else{
    this.data[i].is_favourite=0;
   }
    this.helper.getByKeynew('storetoken', (res) => {
      console.log(res);
      let body: any = { token: res, store_id: id, status:status};
      this.helper.postMethod('like-dislike-store', body, (res) => {
        console.log(res);
        this.helper.Alert(res.message,'');
      });
    });
  }
}
