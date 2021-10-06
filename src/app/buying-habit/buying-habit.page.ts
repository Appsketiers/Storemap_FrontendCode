import { Component, OnInit, NgZone } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-buying-habit',
  templateUrl: './buying-habit.page.html',
  styleUrls: ['./buying-habit.page.scss'],
})
export class BuyingHabitPage implements OnInit {
  data: any = [];
  page: any = 1;
  limit: any = 10;
  image_url = environment.image_baseurl;
  constructor(private helper:HelperService, private ngZone:NgZone) { }

  ngOnInit() {
    this.buying_habits(false, '');
  }


  buying_habits(isFirstLoad, event){
    this.ngZone.run(()=>{
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, limit: this.limit,
        page: this.page,};
      this.helper.getMethod('buying-habits', body, (res) => {
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
    this.buying_habits(true, event);
  }

}
