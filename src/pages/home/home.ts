import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module'
import { MenuController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private people: [];
  private planets: [];
  private ports: [];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private firebaseProvider: FirebaseProvider) {
    this.firebaseProvider.getObservable().subscribe(() => {
      this.people = this.firebaseProvider.getPeople();
      this.ports = this.firebaseProvider.getPorts();
      this.planets = this.firebaseProvider.getPlanets();
    });

  }
  // private saveToFirebase() {
  // }

  closeMenu(){
    this.menuCtrl.close();
    console.log("closing menu")
  }
  openMenu() {
    this.menuCtrl.open();
    console.log("opening menu")
  }
}
