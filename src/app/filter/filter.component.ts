import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(private modalController: ModalController) { }
  chk1:boolean=false; 
 chk2:boolean=false; 
 chk3:boolean=false; 
  
  ngOnInit() {}
  async closeModal() {
    await this.modalController.dismiss();
    }
    change(){
this.chk2=false;
this.chk3=false;

}
}
