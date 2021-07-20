import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-stores',
  templateUrl: './my-stores.page.html',
  styleUrls: ['./my-stores.page.scss'],
})
export class MyStoresPage implements OnInit {

  constructor(public modalController: ModalController,
    private router: Router) { }

  ngOnInit() {
  }
  async optionModal() {
    const modal = await this.modalController.create({
    component: MyStorePopComponent,
    cssClass: 'option_modal',
    });
     
    return await modal.present();
    }
    ratings(){
this.router.navigate(['/review-rating'])
    }
}
