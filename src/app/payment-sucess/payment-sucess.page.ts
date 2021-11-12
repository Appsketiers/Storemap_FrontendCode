import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AudioService } from '../providers/audio.service';
import { ModalController, Platform } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';
@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.page.html',
  styleUrls: ['./payment-sucess.page.scss'],
})
export class PaymentSucessPage implements OnInit, AfterViewInit {
otp;
order_id;
backbutton;
  constructor(public router:Router, private audio: AudioService, 
    public modalController: ModalController,
    private route: ActivatedRoute,
    private platform: Platform,) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.otp = params['otp'];
      this.order_id = params['order_id'];
      console.log(this.otp);
      console.log('order id ', this.order_id);

    });
  }

  ok(){
this.router.navigate(['/main-home']);
  }

  ngAfterViewInit(){
    this.audio.preload('payment_success', 'assets/AnimationSound.mp3');
    setTimeout(() => {
      this.audio.play('payment_success');
     }, 1000);

     setTimeout(() => {
      //this.audio.play('payment_success');
    this.presentModal(); 
    }, 2000);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MyStorePopComponent,
      cssClass: 'option_modal',
      componentProps: {
        'otp': this.otp,
        'order_id': this.order_id
         }

    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      
    });
    return await modal.present();
  }

  ionViewDidEnter() {
    this.backbutton = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    })
  }

  ionViewWillLeave() {
    this.backbutton.unsubscribe();
  }
}
