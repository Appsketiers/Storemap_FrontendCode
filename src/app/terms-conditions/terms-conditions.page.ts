import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
  url
  constructor(private iab: InAppBrowser, public sanitize: DomSanitizer) { 

  }

  ngOnInit() {
    //const browser = this.iab.create('http://dev9server.com/store-mapps/page/about-us','_self',{location:'no'}); 
  }
  sanitizeUrl() {
    return this.sanitize.bypassSecurityTrustResourceUrl('https://storemapps.co/page/terms-&-conditions')

  }
}
