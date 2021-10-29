import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AudioService } from '../providers/audio.service';
import { ModalController } from '@ionic/angular';
import { MyStorePopComponent } from '../my-store-pop/my-store-pop.component';
@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.page.html',
  styleUrls: ['./payment-sucess.page.scss'],
})
export class PaymentSucessPage implements OnInit, AfterViewInit {
otp;
  constructor(public router:Router, private audio: AudioService, 
    public modalController: ModalController,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.otp = params['otp'];
      console.log(this.otp);

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
         }

    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      
    });
    return await modal.present();
  }
}
