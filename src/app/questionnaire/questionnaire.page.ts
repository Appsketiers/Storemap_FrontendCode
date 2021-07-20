import { Component, OnInit } from '@angular/core';
import { HelperService } from '../providers/helper.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {
  public checkboxlist: any;
  public Checked = [];
  constructor(private helper: HelperService, private router: Router) {}

  ngOnInit() {
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res };
      this.helper.getMethod('questionnaire-tag-list', body, (res) => {
        console.log(res);
        this.checkboxlist = res.data;
        console.log('check box list data', this.checkboxlist);
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
      let body: any = { token: res, tag_list: this.Checked.toString() };
      this.helper.postMethod('add-questionnaire-tag', body, (res) => {
        console.log(res);
      });
    });
    this.router.navigate(['/main-home']);
  }

  skip() {
    this.router.navigate(['/main-home']);
  }
}
