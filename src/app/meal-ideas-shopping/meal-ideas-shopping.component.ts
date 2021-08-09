import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-meal-ideas-shopping',
  templateUrl: './meal-ideas-shopping.component.html',
  styleUrls: ['./meal-ideas-shopping.component.scss'],
})
export class MealIdeasShoppingComponent implements OnInit {
  public shopping_list = this.navParams.get('shopping_list');
  chk1: any;
  selectedRadioGroup:any;
  selectedRadioItem:any;
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.shopping_list);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }

  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
}
