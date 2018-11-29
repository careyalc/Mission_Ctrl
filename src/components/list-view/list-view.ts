import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'list-view',
  templateUrl: 'list-view.html'
})
export class ListViewComponent {

  public people: any[];
  public planets: any[];
  public ports: any[];

  constructor(private firebaseProvider: FirebaseProvider) {
    this.firebaseProvider.getObservable().subscribe(() => {
      console.log("list view updating")
      this.people = this.firebaseProvider.getPeople();
      this.ports = this.firebaseProvider.getPorts();
      this.planets = this.firebaseProvider.getPlanets();
    });
    console.log("people", this.people)
  }

}
