import { Component, Input } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-supplies',
  templateUrl: 'supplies.html',
})
export class SuppliesPage {
  public people: any[];
  public planets: any[];
  public ports: any[];
  public data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    console.log(this.data);
    setTimeout(()=>{
      console.log("people", this.people)
      console.log("ports", this.ports)
      console.log("planets", this.planets)
    }, 2000);

  }



}
