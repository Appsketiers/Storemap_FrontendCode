import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(private modalController: ModalController) {}
  chk1: any;
  chk2: any;
  chk3: any;

  ngOnInit() {
    this.chk1=document.getElementById("chk1");
    this.chk2=document.getElementById("chk2");
    this.chk3=document.getElementById("chk3");
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
  change1(e) {
    
   this.chk2=false;
   this.chk3=false;
  }

  change2(e) {
    
    this.chk1=false;
    this.chk3=false;
   
  }

  change3(e) {

   
    this.chk1=false;
    this.chk2=false;
  }

  
}
