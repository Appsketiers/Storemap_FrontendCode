import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private modalController: ModalController) {}
  chk1: any;
  chk2: any;
  chk3: any;
  filter_value:any = 'MMP';

  ngOnInit() {}
  async closeModal() {
    await this.modalController.dismiss();
  }
  change1(e) {
    if (e.detail.checked) {
      this.filter_value='MMP';
      this.chk1 = true;
      this.chk2 = false;
      this.chk3 = false;
    }
    console.log(e);
  }

  change2(e) {
    if (e.detail.checked) {
      this.filter_value='NTF';
      this.chk2 = true;
      this.chk1 = false;
      this.chk3 = false;
    }
  }

  change3(e) {
    if (e.detail.checked) {
      this.filter_value='FTN';
      this.chk3 = true;
      this.chk1 = false;
      this.chk2 = false;
    }
  }

  filter(){
    this.newItemEvent.emit(this.filter_value);
  }
}
