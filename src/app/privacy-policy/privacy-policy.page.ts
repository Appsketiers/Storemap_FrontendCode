import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
    const browser = this.iab.create('http://dev9server.com/store-mapps/page/privacy-policy','_self',{location:'no'}); 
  }

}
