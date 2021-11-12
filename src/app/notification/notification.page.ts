import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { Router, ActivatedRoute, NavigationExtras, } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  data: any = [];
  constructor(private helper:HelperService, private router: Router,) { }

  ngOnInit() {
this.notification();
  }
  unread(item:any){

  }

  delete_notification(id, type){


    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, type: type, notification_id: id };
      this.helper.postMethod('delete-notification', body, (res) => {
        console.log(res);
        
       this.notification();
      });
    });
  }

  notification(){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res };
      this.helper.getMethod('notification-list', body, (res) => {
        console.log(res);
       this.data= res.data;
       console.log('data-----', this.data);
      });
    });
  }

  open_notification(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: data,
      },
    };
    this.router.navigate(['notification-detail'], navigationExtras);
  }
}
