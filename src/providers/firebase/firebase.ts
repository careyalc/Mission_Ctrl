import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBwMK5WTk8xSE3TGtf4uCn3rdePPzd2cYY",
  authDomain: "mission-ctrl-37ebc.firebaseapp.com",
  databaseURL: "https://mission-ctrl-37ebc.firebaseio.com",
  projectId: "mission-ctrl-37ebc",
  storageBucket: "mission-ctrl-37ebc.appspot.com",
  messagingSenderId: "887433729015"
};

@Injectable()
export class FirebaseProvider {
  private db: any;
  private people: any[];
  private planets: any[];
  private ports: any[];
  private serviceObserver: Observer<any[]>;
  private clientObservable: Observable<any[]>;
  private items: any;
  constructor() {
    console.log("now we have a provider");
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.clientObservable = Observable.create(e => {
        this.serviceObserver = e;
      });

      this.items = [
       {title: 'one'},
       {title: 'two'},
       {title: 'three'},
       {title: 'four'},
       {title: 'five'},
       {title: 'six'}
   ];

    let peopleRef = this.db.ref('/people');
    peopleRef.on('value', snapshot => {
      this.people= [];
      snapshot.forEach(childSnapshot => {
        let person = {
          key: childSnapshot.key,
          name: childSnapshot.val().name,
          status: childSnapshot.val().status,
          demeanor: childSnapshot.val().demeanor,
          money: childSnapshot.val().money,
          supplies: childSnapshot.val().supplies,
          photo: childSnapshot.val().photo,
          location: childSnapshot.val().location
        };
        this.people.push(person);
      });
      this.notifySubscribers();
    });
    let portRef = this.db.ref('/ports');
    portRef.on('value', snapshot => {
      this.ports= [];
      snapshot.forEach(childSnapshot => {
        let port = {
          key: childSnapshot.key,
          comments: childSnapshot.val().comments,
          planet: childSnapshot.val().planet,
          rating: childSnapshot.val().rating,
          type: childSnapshot.val().type,
          quantity: childSnapshot.val().quantity,
          cost: childSnapshot.val().cost,
        };
        this.ports.push(port);
      });
      this.notifySubscribers();
    });
    let planetRef = this.db.ref('/planets');
    planetRef.on('value', snapshot => {
      this.planets = [];
      snapshot.forEach(childSnapshot => {
        let planet = {
          key: childSnapshot.key,
          name: childSnapshot.val().name,
          ports: childSnapshot.val().ports,
          // photo: childSnapshot.val().photo,
          demeanor: childSnapshot.val().demeanor,
          location: childSnapshot.val().location,

        };
        this.planets.push(planet);
      });
      this.notifySubscribers();
    });
  }

  public getObservable(): Observable<any[]> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }
  public getPlanets():any[] {
    let entriesClone = this.planets;
    return entriesClone;
  }
  public getPeople():any[] {
    let entriesClone = this.people;
    return entriesClone;
  }
  public getPorts():any[] {
    let entriesClone = this.ports;
    return entriesClone;
  }
  private findSupplyByName(name: string): any {
    for (let e of this.ports) {
      if (e.type === name) {
         return e;
      }
    }
    return undefined;
  }
  private findPortByName(name: string): any {
    for (let e of this.ports) {
      if (e === name) {
         return e;
      }
    }
    return undefined;
  }

// update supply quantity on planet
// update supply quantity on person
// update money quantity on person

  public filterItems(searchTerm, searchCat){
    console.log("searchCat",searchCat);
    let entriesClone = searchCat;
    console.log("clone",entriesClone);
    console.log("search term",searchTerm);
    return entriesClone.filter((item) => {
      console.log(item.name.toLowerCase());
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
