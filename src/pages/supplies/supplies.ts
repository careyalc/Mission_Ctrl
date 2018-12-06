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
  public person: any[];
  public data: any[];
  public supplies: any[];
  public money: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    this.people = this.data['people_data'];
    this.planets = this.data['planets_data'];
    this.ports = this.data['ports_data'];
    this.supplies = this.people[0].supplies
    this.money = this.people[0].money
    console.log(this.people[0])
    // add supply quantity
  }



}
