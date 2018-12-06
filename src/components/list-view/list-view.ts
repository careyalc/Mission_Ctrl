import { Component, OnInit, Input } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'list-view',
  templateUrl: 'list-view.html'
})
export class ListViewComponent {
  @Input() people;
  @Input() ports;
  @Input() planets;

  private searchTerm: string = '';
  private searchCat: any;
  private items: any;

  private listPorts: boolean = false;
  private listPeople: boolean = false;
  private listPlanets: boolean = true;

  constructor(private firebaseProvider: FirebaseProvider) {
    this.showPlanets();
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
    if (this.listPlanets) {
      this.planets = this.firebaseProvider.filterItems(this.searchTerm, this.searchCat);
    }
    if (this.listPeople) {
      this.people = this.firebaseProvider.filterItems(this.searchTerm, this.searchCat);
    }
    //console.log(this.planets);
  }
}
