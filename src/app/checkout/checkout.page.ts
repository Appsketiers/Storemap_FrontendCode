import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HelperService } from '../providers/helper.service';
import { PaymentService } from '../providers/payment.service';
import * as moment from 'moment';
import { IonRadioGroup } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  image_url = environment.image_baseurl;
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
  selected_card_id;
  products =[];
  user_location:any;
  store_location:any;
  update: any=[];
  total : any = 0;
  distance;
  constructor(public stripe: Stripe,
    private router: Router,
    private helper: HelperService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private payment:PaymentService,
    public modalController: ModalController,) {

      this.helper.getByKeynew('storeuser', (res) => {
        this.user = res;
        this.getCards();
        console.log(this.user);
            });

            let date = new Date()
            this.today = new Date(date.setMonth(date.getMonth())).toISOString();
            this.max = new Date(date.setMonth(date.getMonth()+84)).toISOString();
     }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.list_id = params['id'];
      this.store_id = params['store_id'];
      this.title = params['title'];
      this.products = JSON.parse(params['products']);
      this.user_location = JSON.parse(params['user_location']);
      this.store_location = JSON.parse(params['store_location']);
      console.log('user_location', this.user_location);
      console.log('store location', this.store_location);
      console.log(this.list_id);
      console.log(this.store_id);
      console.log(this.title);
    console.log(this.products);

    for (let i = 0; i < this.products.length; i++) {
      this.update.push({
        product: this.products[i].id,
        quantity: this.products[i].quantity,
      });
      console.log(this.total,'asas', this.products[0].price,"gjhg ", this.products[0].quantity);
      
      this.total =this.total+ this.products[i].price *  this.products[i].quantity;
    }
    console.log('Update---',this.update);
    });

    this.addCardForm = this.fb.group({
      card_name: new FormControl("", [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]),
      card_number: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]),
      expiry_date: new FormControl("", [Validators.required]),
      cvv:new FormControl("", [Validators.required])
    });
   this.distance=this.calculate_distance(this.user_location.lat, this.user_location.lng, this.store_location.lat,this.store_location.lng
    )
    console.log('Distance----', this.distance);
  }

  getCards(){
    this.payment.httpRequeststripe('https://api.stripe.com/v1/customers/'+this.user.stripe_customer_id+'/sources', 'GET',{},true,false).then((response:any) => {
      if(response.data.length>0){
        this.cards = response.data;
        this.saved_card = true;
        this.add_new_card = false;
        console.log('Cards -----', this.cards);
      }
      else{
        this.add_new_card=true;
      }
    });
  }


  addCard(form: any){
    debugger
    console.log("form",form);
    // if(!this.save) 
    // return this.helper.presentToast('Please select save card securely to save this card')

    
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
      let that = this;
      that.addCardForm.reset();
      // setTimeout(() => {
      //   that.payment.hideLoading();
      // }, 1000);
      that.payment.hideLoading();
      if(this.save) {
        console.log("cardID",token);
        this.addCardForm.reset();
        // this.payment.hideLoading();
        this.saveCard(token.id, res =>{
          console.log("res",res);
            if(res.id){
              this.makeCheckoutPayemt('CARD', res.id);
          }else{
            this.helper.presentToast('this card is not in list ');
          }
        });

      }else{
        this.addCardForm.reset();
        // this.payment.hideLoading();
this.makeCheckoutPayemt('TOKEN',token.id);
      }

     /// this.getCards();
   
     
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

  makeCheckoutPayemt(type,token){
  
    let that=this;
    that.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, store_id: that.store_id, shopping_list_id: that.list_id,source_token:token,token_type:type};
      that.helper.postMethod('checkout', body, (res) => {
      console.log(res);
      if(res.status){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            otp: res.data,
            order_id: res.order_detail.id
          },
        };
        that.router.navigate(['/payment-sucess'], navigationExtras);
      }
  });
});
  }

  saveCard(token, cb ){
    console.log("cutomer token", token);
    this.payment.sendPostRequest({url: "https://api.stripe.com/v1/customers/"+this.user.stripe_customer_id+"/sources", type: 'POST', body: {"source":token},base_url:true}).subscribe(response => {
        cb(response)
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
    this.add_new_card = false;
  }

  radioSelect(event) {
    console.log("radioSelect",event.detail);
  
  }

  radioGroupChange(event, token_type) {
    this.selected_card_id = event.detail;
    console.log("radioGroupChange",this.selected_card_id);
    console.log(' token_type ----',  token_type);
    
  }

  open_add_new_card(){
    this.add_new_card = !this.add_new_card;
    this.saved_card = false;
    this.radioGroup.value = null;
  }

  make_payment(token_type){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = { token: res, store_id: this.store_id, shopping_list_id: this.list_id,source_token:this.selected_card_id.value,token_type:token_type };
      this.helper.postMethod('checkout', body, (res) => {
      console.log(res);
      if(res.status){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            otp: res.data,
            order_id: res.order_detail.id
          },
        };
        this.router.navigate(['/payment-sucess'],navigationExtras );
      }
      });
    });  
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MyStorePopComponent,
      cssClass: 'option_modal',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }

  calculate_distance(lat1, lon1, lat2, lon2){
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    return finalDistance * 1000;
    
  }

  toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

  decrement(id, i){
 let index = this.update.findIndex((el) => {
    console.log(el);
    return el.product == id;
  });

  console.log(index, id);
  if (index != -1) {
   
    if(this.products[i].quantity <= 1){
      this.update.splice(index, 1);
      let price =  this.products[i].price
      price = price*1
      this.total =this.total- price;
      this.products.splice(i, 1);
    }
    else{
    this.update[index].quantity --;
    this.products[i].quantity --;
    this.total =this.total- this.products[i].price *  1;
    }
  

  }
  console.log(this.update);
  console.log(this.products);
this.update_list();
  }

  increment(id, i){
    let index = this.update.findIndex((el) => {
      console.log(el);
      return el.product == id;
    });
  
    console.log(index, id);
    if (index != -1) {
      
      this.update[index].quantity++;
      this.products[i].quantity++;
      this.total =this.total+ this.products[i].price *  1;
   
    }
    console.log(this.update);
    console.log(this.products);
  this.update_list();

  }

  update_list(){
    this.helper.getByKeynew('storetoken', (res) => {
      let body: any = {
        token: res,
        shopping_list_id: this.list_id,
        list_name: this.title,
        ingredients: JSON.stringify(this.update),
      };

      this.helper.postMethod('update-shopping-list', body, (res) => {
        console.log(res);
        if (res.status == true) {
          this.helper.presentToast(
            'Shopping List successfully updated.'
            );
            
        }
      });
    });
  }

  remove(i,id){
    this.helper.confirm("Are you sure you want to remove this card?",(res)=>{
      if(res){
    this.payment.httpRequeststripe('https://api.stripe.com/v1/customers/'+this.user.stripe_customer_id+'/sources/'+id, 'DELETE',  {},true,false).then((response:any) => {
      if(response.deleted){
         if(this.cards.length>0){
           this.cards.splice(i,1);
         }
      }
    });
  }
  })

  }
}
