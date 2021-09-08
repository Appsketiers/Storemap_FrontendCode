import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  url
  constructor(private iab: InAppBrowser, public sanitize: DomSanitizer) {

   }

  ngOnInit() {
    //const browser = this.iab.create('http://dev9server.com/store-mapps/page/about-us','_self',{location:'no', toolbar:'yes'}); 
  }

  sanitizeUrl() {
    return this.sanitize.bypassSecurityTrustResourceUrl('http://dev9server.com/store-mapps/page/about-us')

  }

}
