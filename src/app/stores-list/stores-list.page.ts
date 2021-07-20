import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.page.html',
  styleUrls: ['./stores-list.page.scss'],
})
export class StoresListPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
open_store(){
this.router.navigate(['/store-detail']);
}
}
