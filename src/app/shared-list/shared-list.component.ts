import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
@Component({
  selector: 'app-shared-list',
  templateUrl: './shared-list.component.html',
  styleUrls: ['./shared-list.component.scss'],
})
export class SharedListComponent implements OnInit {

  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.helper.getByKeynew('storetoken', res=>{
      let body: any = { token: res, list_type: 'SHARED'};
      this.helper.postMethod('shopping-list',body, res =>{
        console.log(res);
      })
    })
  }

}
