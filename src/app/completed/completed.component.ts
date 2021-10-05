import { Component, OnInit, NgZone } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent implements OnInit {
  data: any = [];
  page: any = 1;
  limit: any = 10;
  image_url = environment.image_baseurl;
  constructor(private helper: HelperService, private ngZone:NgZone, private router: Router) { }

  ngOnInit() {
    this.completed_orders_list(false, '');
  }

  completed_orders_list(isFirstLoad, event){
    this.ngZone.run(()=>{
      this.helper.getByKeynew('storetoken', (res) => {
        let body: any = {
          token: res,
         type:'COMPLETED',
          limit: this.limit,
          page: this.page,
        }
        this.helper.postMethod('my-orders', body, (res) => {
          console.log(res);
          this.data = [...this.data,...res.data.data];
          // for (let i = 0; i < res.data.data.length; i++) {
          //   this.data.push(res.data.data[i]);
          // }
          if (isFirstLoad) event.target.complete();
          this.page++;
          console.log('data', this.data);
  
        });
      });
    })
  }



  doInfinite(event) {
    this.completed_orders_list(true, event);
  }

  open_order(){
    this.router.navigate(['/past-orders1']);
      }
}
