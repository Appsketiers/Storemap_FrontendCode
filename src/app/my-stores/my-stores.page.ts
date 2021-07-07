import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';

@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.page.html',
  styleUrls: ['./my-stores.page.scss'],
})
export class MyStoresPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async optionModal() {
    const modal = await this.modalController.create({
    component: MyStorePopComponent,
    cssClass: 'option_modal',
    });
     
    return await modal.present();
    }

}
