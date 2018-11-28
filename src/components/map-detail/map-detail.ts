import { Component } from '@angular/core';

@Component({
  selector: 'map-detail',
  templateUrl: 'map-detail.html'
})
export class MapDetailComponent {

  text: string;

  constructor() {
    console.log('Hello MapDetailComponent Component');
    this.text = 'Hello World';
  }

}
