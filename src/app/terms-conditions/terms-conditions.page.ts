import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
    //const browser = this.iab.create('http://dev9server.com/store-mapps/page/about-us','_self',{location:'no'}); 
  }

}
