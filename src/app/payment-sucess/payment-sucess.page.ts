import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AudioService } from '../providers/audio.service';
@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.page.html',
  styleUrls: ['./payment-sucess.page.scss'],
})
export class PaymentSucessPage implements OnInit, AfterViewInit {

  constructor(public router:Router, private audio: AudioService) { }

  ngOnInit() {
  }

  ok(){
this.router.navigate(['/main-home']);
  }

  ngAfterViewInit(){
    this.audio.preload('payment_success', 'assets/AnimationSound.mp3');
    setTimeout(() => {
      this.audio.play('payment_success');
     }, 1000);
  }
}
