import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
    const browser = this.iab.create('http://dev9server.com/store-mapps/page/about-us','_self',{location:'no'}); 
  }

}
