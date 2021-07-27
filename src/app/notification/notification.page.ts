import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private helper:HelperService) { }

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
       
      });
    });
  }
}
