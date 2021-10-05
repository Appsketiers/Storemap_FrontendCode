import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.page.html',
  styleUrls: ['./past-orders.page.scss'],
})
export class PastOrdersPage implements OnInit {
  public category: string = "pending";
  constructor(private router: Router) { }

  ngOnInit() {
  }
  open_order(){
this.router.navigate(['/past-orders1']);
  }
}
  