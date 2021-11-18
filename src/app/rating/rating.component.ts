import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit,OnChanges {

  @Input() rating:any;
  constructor() { 
  
    
  }

  ngOnInit() {
    console.log(this.rating);
  }


  ngOnChanges(value){
    console.log(value);
  }
}
