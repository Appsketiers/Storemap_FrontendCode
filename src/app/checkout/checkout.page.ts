import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { PaymentService } from '../providers/payment.service';
import * as moment from 'moment';
import { IonRadioGroup } from '@ionic/angular';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @ViewChild('radioGroup') radioGroup: IonRadioGroup
  public addCardForm: FormGroup;
  cards = [];
  today;
  max;
  user:any;
  save = false;
  list_id: any;
  store_id: any;
  title:any;
  saved_card;
  add_new_card =false;
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
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      this.store_id = params['store_id'];
      this.title = params['title'];
      console.log(this.list_id);
      console.log(this.store_id);
      console.log(this.title);
    
    });

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
        this.saved_card = true;
        console.log('Cards -----', this.cards);
      }
      else{
        this.add_new_card=true;
      }
    });
  }


  addCard(form: any){
    console.log("form",form);
    if(!this.save) 
    return this.helper.presentToast('Please select save card securely to save this card')

    
    const customErrMsg = {
      
    };
  if (this.payment.setVaidations(this.addCardForm, customErrMsg)) {
    this.payment.showLoading();
    let card = {
      name:form.card_name,
      number:form.card_number,
      expMonth:Number(moment(form.expiry_date).format('MM')),
      expYear:Number(moment(form.expiry_date).format('YYYY')),
      cvc:form.cvv,
    }

    console.log("card",card);

    this.stripe.createCardToken(card).then(token => {
      this.getCards();
      this.addCardForm.reset();
      this.payment.hideLoading();
      console.log("cardID",token);
      if(this.save) 
      this.saveCard(token.id, res =>{
        this.getCards();
        setTimeout(
          function() {
            this.getCards();
          }, 2000);
      });
     
      // this.select('new',token.id);
     
    }).catch(error => { 
     this.payment.hideLoading();
      this.helper.presentToast(JSON.stringify(error));
      console.error(error)
     });
  }
  
  }
  // select(type,id ) {
  //   this.payment(type,id)
  // }

  saveCard(token, cb ){
    console.log("cutomer token", token);
    
    this.payment.sendPostRequest({url: "https://api.stripe.com/v1/customers/"+this.user.stripe_customer_id+"/sources", type: 'POST', body: {"source":token},base_url:true}).subscribe(response => {
    //  console.log(response);
    cb(response)
      setTimeout(
        function() {
          this.getCards();
        }, 1000);
     
      // this.navCtrl.pop();
    });
  }

  checkout(){
     this.helper.getByKeynew('storetoken', (res) => {
    let body: any = { token: res, store_id: this.store_id, shopping_list_id: this.list_id};
    this.helper.postMethod('checkout', body, (res) => {
    console.log(res);
    if(res.status){
      this.router.navigate(['/payment-sucess']);
    }
    });
  });  
  }

  show_saved_cards(){
    this.saved_card = !this.saved_card;
  }

  radioSelect(event) {
    console.log("radioSelect",event.detail);
  
  }

  radioGroupChange(event, token_type) {
    console.log("radioGroupChange",event.detail);
    console.log(' token_type ----',  token_type);
    
  }

  open_add_new_card(){
    this.add_new_card = !this.add_new_card;
    this.saved_card = false;
    this.radioGroup.value = null;
  }

  make_payment(token_type){

  }
}
