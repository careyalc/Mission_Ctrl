import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'list-view',
  templateUrl: 'list-view.html'
})
export class ListViewComponent {

  private searchTerm: string = '';
  private searchCat: any;
  private items: any;

  public people: any[];
  public planets: any[];
  public ports: any[];
  private listPorts: boolean;
  private listPeople: boolean;
  private listPlanets: boolean;


  constructor(private firebaseProvider: FirebaseProvider) {
    this.firebaseProvider.getObservable().subscribe(()=> {
      console.log("please list view updating")
      this.people = this.firebaseProvider.getPeople();
      this.ports = this.firebaseProvider.getPorts();
      this.planets = this.firebaseProvider.getPlanets();
    });
    this.listPorts = false;
    this.listPeople = false;
    this.listPlanets = true;
  //  this.searchCat = this.planets;

  }

  showPlanets() {
    this.listPorts = false;
    this.listPeople = false;
    this.listPlanets = true;
    this.searchCat = this.planets;
  }

  showPeople() {
    this.listPorts = false;
    this.listPeople = true;
    this.listPlanets = false;
    this.searchCat = this.people;
  }

  showPorts() {
    this.listPorts = true;
    this.listPeople = false;
    this.listPlanets = false;
    this.searchCat = this.ports;
  }

  showFriendly() {

    }
  setFilteredItems(): void {
    //console.log("testing");
    this.searchCat = this.firebaseProvider.filterItems(this.searchTerm, this.searchCat);
    //console.log(this.planets);
  }
}
