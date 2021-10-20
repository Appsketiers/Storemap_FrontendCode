import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-meal-ideas-shopping',
  templateUrl: './meal-ideas-shopping.component.html',
  styleUrls: ['./meal-ideas-shopping.component.scss'],
})
export class MealIdeasShoppingComponent implements OnInit {
  my = true;
  shared = false;
  public shopping_list = this.navParams.get('shopping_list');
  chk1: any;
  disable: any = true;
  selectedRadioGroup:any;
  selectedRadioItem:any={
    
  };
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.shopping_list);
  }

  async closeModal() {
    await this.modalController.dismiss('','close');
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
    if(this.selectedRadioGroup.value){
      this.disable=false;
    }
    else{
      this.disable=true;
    }
  }

  radioSelect(title, id) {
    this.selectedRadioItem.id = id;
    this.selectedRadioItem.title = title;
    console.log(this.selectedRadioItem);
  }

  radioFocus() {
    console.log("radioFocus");
  }

  async apply(){
    await this.modalController.dismiss(this.selectedRadioItem,'apply');
  }

  shared_list(){
    this.shared=true
    this.my = false;
    this.shopping_list = this.navParams.get('shared_shopping_list');
  }

  my_list(){
this.my = true;
this.shared=false
this.shopping_list = this.navParams.get('shopping_list');
  }
}
