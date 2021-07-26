import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(private modalController: ModalController) { }
  chk1 = document.getElementById("isChecked1");
 chk2 = document.getElementById("isChecked2");
 chk3 = document.getElementById("isChecked");
  
  ngOnInit() {}
  async closeModal() {
    await this.modalController.dismiss();
    }
change(){

}
}
