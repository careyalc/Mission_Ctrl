import { Component } from '@angular/core';

/**
 * Generated class for the MapDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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
