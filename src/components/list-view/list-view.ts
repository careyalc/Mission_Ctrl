import { Component, OnInit,  Input } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ViewController, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ListDetailComponent } from '../list-detail/list-detail';
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

//   public people: any[];
//   public planets: any[];
//   public ports: any[];
  private listPorts: boolean;
  private listPeople: boolean;
  private listPlanets: boolean;


  constructor(private firebaseProvider: FirebaseProvider, public navCtrl: NavController) {
    console.log(this.planets)
   this.searchCat = this.planets;
   this.listPorts = false;
   this.listPeople = false;
   this.listPlanets = true;

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
    if(this.listPlanets){
      this.planets = this.firebaseProvider.filterItems(this.searchTerm, this.searchCat);
    }
    if(this.listPeople){
      this.people = this.firebaseProvider.filterItems(this.searchTerm, this.searchCat);
    }
    //console.log(this.planets);
  }

  private goToDetail(port) {
    console.log(port);
    this.navCtrl.push(ListDetailComponent, {"port" : port});
  }
}
