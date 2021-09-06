import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private keyboard: Keyboard) { }

  ngOnInit() {
  }

  handleLogin(){
    this.keyboard.hide();
      }
}
