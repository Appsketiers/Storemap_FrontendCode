import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-shared-list',
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.scss'],
})
export class SharedListComponent implements OnInit {
  data: any = [];
  image_url = environment.image_baseurl;
  list: any;
  constructor(
    private helper: HelperService,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.shoping_list_items();
  }

  shoping_list(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };

    this.router.navigate(['/grocery-list'], navigationExtras);
  }

  remove(id) {
    this.helper.getByKeynew('storetoken', async (res) => {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Are you sure you want to Delete List',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'Okay',
            handler: () => {
              let body: any = { token: res, shopping_list_id: id };
              this.helper.postMethod('delete-shopping-list', body, (res) => {
                console.log(res);
                if (res.status == true) {
                  this.shoping_list_items();
                }
              });
            },
          },
        ],
      });

      await alert.present();
    });
  }

  shoping_list_items() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, list_type: 'SHARED' };
      this.helper.postMethod('shopping-list', body, (res) => {
        console.log(res);
        this.data = res.data;
        console.log(this.data);
      });
    });
  }

  ionViewWillEnter() {
    this.shoping_list_items();
  }
}
