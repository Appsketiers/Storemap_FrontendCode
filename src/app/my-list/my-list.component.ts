import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
})
export class MyListComponent implements OnInit {
  list: any = [];
  @Input() MyList=[];
  constructor(
    private helper: HelperService,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.shoping_list_items();
  }

  ngOnInit() {
    //this.shoping_list_items();
  }

  ngOnChange(data){
    console.log(data);
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
                  let index = this.MyList.findIndex((el) => {
                    console.log(el);
                    return el.id == id;
                  });

                  console.log(index, id);
                  if (index != -1) {
                    this.MyList.splice(index, 1);
                    console.log(this.MyList);
                  }
                }
              });
            },
          },
        ],
      });

      await alert.present();
    });
  }
  shoping_list(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };

    this.router.navigate(['/grocery-list'], navigationExtras);
  }

  shoping_list_items() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, list_type: 'MY' };
      this.helper.postMethod('shopping-list', body, (res) => {
        console.log(res);
        this.list = res.data;
        console.log(this.list);
      });
    });
  }

  // ionViewWillEnter() {
  //   debugger;
  //   this.shoping_list_items();
  // }
}
