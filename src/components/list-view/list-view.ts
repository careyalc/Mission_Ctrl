import { Component } from '@angular/core';

@Component({
  selector: 'list-view',
  templateUrl: 'list-view.html'
})
export class ListViewComponent {

  text: string;

  constructor() {
    console.log('Hello ListViewComponent Component');
    this.text = 'Hello World';
  }

}
