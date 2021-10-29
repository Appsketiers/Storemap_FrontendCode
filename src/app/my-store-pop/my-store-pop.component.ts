import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-store-pop',
  templateUrl: './my-store-pop.component.html',
  styleUrls: ['./my-store-pop.component.scss'],
})
export class MyStorePopComponent implements OnInit {
  @Input() otp: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  // close modal
async closeModal() {
  await this.modalController.dismiss();
  }
  

}
