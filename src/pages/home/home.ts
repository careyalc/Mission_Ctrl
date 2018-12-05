import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { ComponentsModule } from '../../components/components.module'
import { MenuController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SuppliesPage } from '../supplies/supplies';
import { LocationPage } from '../location/location';
import { MessagesPage } from '../messages/messages';
import { SettingsPage } from '../settings/settings';
import { NearbyPage } from '../nearby/nearby';
import { mapComponent } from '../../components/map/map';
import { ListViewComponent } from '../../components/list-view/list-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public people: any[];
  public planets: any[];
  public ports: any[];
  private hidemap: boolean = false;
  private hidelist: boolean = true;
  public data;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private firebaseProvider: FirebaseProvider) {
    this.firebaseProvider.getObservable().subscribe(() => {
      // console.log("home view updating")
      this.people = this.firebaseProvider.getPeople();
      this.ports = this.firebaseProvider.getPorts();
      this.planets = this.firebaseProvider.getPlanets();
      this.data = {'people_data': this.people, 'planets_data': this.planets, 'ports_data': this.ports}
    });
  }
  closeMenu(){
    this.menuCtrl.close();
    console.log("closing menu")
  }
  openMenu() {
    this.menuCtrl.open();
    console.log("opening menu")
  }
  goToListView(){
    this.hidemap = true;
    this.hidelist = false;
    //add border-bottom style change
  }
  goToMapView(){
    this.hidelist = true;
    this.hidemap = false;
    //add border-bottom style change
  }
  goToSupplies() {
    this.navCtrl.push(SuppliesPage, {'data':this.data});
  }
  goToLocation() {
    this.navCtrl.push(LocationPage, {'data':this.data});
  }
  goToNearby() {
    this.navCtrl.push(NearbyPage, {'data':this.data});
  }
  goToMessages() {
    this.navCtrl.push(MessagesPage, {'data':this.data});
  }
  goToSettings() {
    console.log(this.data)
    this.navCtrl.push(SettingsPage, {'data':this.data});
  }
}
