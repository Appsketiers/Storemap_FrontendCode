import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { PaymentService } from '../providers/payment.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public addCardForm: FormGroup;
  cards = [];
  today;
  max;
  user:any;

  constructor(public stripe: Stripe,
    private router: Router,
    private helper: HelperService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private payment:PaymentService) {

      this.helper.getByKeynew('storeuser', (res) => {
        this.user = res;
        this.getCards();
        console.log(this.user);
            });

            let date = new Date()
            this.today = new Date(date.setMonth(date.getMonth()+2)).toISOString();
            this.max = new Date(date.setMonth(date.getMonth()+84)).toISOString();
     }

  ngOnInit() {
    this.addCardForm = this.fb.group({
      card_name: new FormControl("", [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]),
      card_number: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]),
      expiry_date: new FormControl("", [Validators.required]),
      cvv:new FormControl("", [Validators.required])
    });
   
  }

  getCards(){
    this.payment.httpRequeststripe('https://api.stripe.com/v1/customers/'+this.user.stripe_customer_id+'/sources', 'GET',{},true,false).then((response:any) => {
      if(response.data.length>0){
        this.cards = response.data;
      }
    });
  }

}
