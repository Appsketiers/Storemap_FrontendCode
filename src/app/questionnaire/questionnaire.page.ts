import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {
  public checkboxlist: any=[];
  public Checked = [];
  page:any;
  selected:any=[];
  constructor(private nativeStorage: NativeStorage, private helper: HelperService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'];
      console.log(this.page);
    });
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res };
      this.helper.getMethod('questionnaire-tag-list', body, (res) => {
        console.log(res);
        this.checkboxlist = res.data;
        console.log('check box list data', this.checkboxlist);


      this.nativeStorage.getItem("tag_list")
      .then(
        data => {
          console.log(data);
          this.selected=data;

          for(let i =0; i<this.checkboxlist.length; i++){
            for(let j = 0; j<this.selected.length; j++){
              if(this.checkboxlist[i].id==this.selected[j]){
                this.checkboxlist[i].selected = true;
                this.Checked.push(this.checkboxlist[i].id);
              }
            }
          }
        } 

      );
 
    console.log(this.checkboxlist);
      });
    });

  
  }

  checked(ev: any, id: any) {
    if (ev.detail.checked) {
      this.Checked.push(id);
    } else {
      let index = this.Checked.findIndex((el) => {
        return el == id;
      });
      console.log(index, id);
      if (index != -1) {
        this.Checked.splice(index, 1);
      }
    }

    console.log('checked list: ', this.Checked);
  }

  removeCheckedFromArray(id: any) {
    return;
  }

  next() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, tag_list: JSON.stringify(this.Checked) };
      this.helper.postMethod('add-questionnaire-tag', body, (res) => {
        console.log(res);

        if(res.status){
          this.helper.setKeyValueNew('tag_list',this.Checked);
          this.helper.Alert(res.message,'/main-home')
          // this.router.navigate(['/main-home']);
        }
      });
  
    });
    
  }

  skip() {
    this.router.navigate(['/main-home']);
  }
}
