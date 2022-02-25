import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() products: string;
  image_url = environment.image_baseurl;
  items :any;
  selected_products :any=[];
  constructor(private modalController: ModalController, private navParams: NavParams) {
    console.log(JSON.parse(navParams.get('products')));
    this.items = JSON.parse(navParams.get('products'));
    console.log('check items -----', this.items)
    this.selected_products = this.items.item_detail;
   }

  ngOnInit() {}


 async closeModal(){
    await this.modalController.dismiss();
  }
}
