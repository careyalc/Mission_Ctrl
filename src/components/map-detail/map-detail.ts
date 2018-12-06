import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'map-detail',
  templateUrl: 'map-detail.html'
})
export class MapDetailComponent {

  public planetName: any= this.navParams.get('planet_name');
  public planetDetails: any[];

  public people: any[] = this.navParams.get('people_data');
  public planets: any[] = this.navParams.get('planets_data');
  public ports: any[] = this.navParams.get('ports_data');

  constructor(public viewCtrl: ViewController, public navParams:NavParams) {
    this.getPlanetDetails()
  }
  getPlanetDetails(){
    console.log("gettingplanet details")
    for ( var i = 0; i < this.planets.length; i++ ) {
      if (this.planets[ i ].name==this.planetName){
        console.log("found planet details", this.planets[ i ]);
        this.planetDetails = this.planets[ i ];
      } else{
        console.log("issue with planets")
      }
    }
  }

}
