import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  url
  constructor(private iab: InAppBrowser, public sanitize: DomSanitizer) { 

  }

  ngOnInit() {
    //const browser = this.iab.create('http://dev9server.com/store-mapps/page/privacy-policy','_self',{location:'no'}); 
  }

  sanitizeUrl() {
    return this.sanitize.bypassSecurityTrustResourceUrl('https://storemapps.co/page/privacy-policy')

  }
}
