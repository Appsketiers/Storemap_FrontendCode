import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Output, EventEmitter, Input } from '@angular/core';
import { Storage } from "@ionic/storage";
import { HelperService } from '../providers/helper.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filter_key: any;
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private modalController: ModalController, private storage: Storage, private helper: HelperService,) {}
  chk1: any;
  chk2: any;
  chk3: any;
  filter_value:any = 'MMP';

  ngOnInit() {
if(this.filter_key == 'MMP'){
  this.chk1 = true;
      this.chk2 = false;
      this.chk3 = false;
}
else if(this.filter_key == 'FTN'){
  this.chk2 = true;
  this.chk1 = false;
  this.chk3 = false;
}
else if(this.filter_key == 'NTF'){
  this.chk3 = true;
  this.chk1 = false;
  this.chk2 = false;
}
else{
  
}

  }
  async closeModal() {
    await this.modalController.dismiss('MMP');
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
      this.filter_value='FTN';
      this.chk2 = true;
      this.chk1 = false;
      this.chk3 = false;
    }
  }

  change3(e) {
    if (e.detail.checked) {
      this.filter_value='NTF';
      this.chk3 = true;
      this.chk1 = false;
      this.chk2 = false;
    }
  }

  filter(){
    this.newItemEvent.emit(this.filter_value);
  }

  async apply(){
    await this.modalController.dismiss(this.filter_value);
  }
}
