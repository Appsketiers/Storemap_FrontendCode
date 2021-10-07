import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.page.html',
  styleUrls: ['./payment-sucess.page.scss'],
})
export class PaymentSucessPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  ok(){
this.router.navigate(['/main-home']);
  }
}
