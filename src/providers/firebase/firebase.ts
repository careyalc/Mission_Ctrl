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
  private people: [];
  private planets: [];
  private ports: [];
  private serviceObserver: Observer<any[]>;
  private clientObservable: Observable<any[]>;

  constructor() {
    console.log('Hello FirebaseProvider Provider');
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.clientObservable = Observable.create(e => {
        this.serviceObserver = e;
      });

      let peopleRef = this.db.ref('/people');
      peopleRef.on('value', snapshot => {
        this.people = [];
        snapshot.forEach(childSnapshot => {
          let person = {
            key: childSnapshot.key,
            name: childSnapshot.val().name,
            active: childSnapshot.val().active,
            friendly: childSnapshot.val().friendly,
            money: childSnapshot.val().money,
            supplies: childSnapshot.val().supplies,
          };
          this.people.push(person);
        });
      });
      let portRef = this.db.ref('/ports');
      portRef.on('value', snapshot => {
        this.ports = [];
        snapshot.forEach(childSnapshot => {
          let port = {
            key: childSnapshot.key,
            planet: childSnapshot.val().planet,
            rating: childSnapshot.val().rating,
            type: childSnapshot.val().type,
            quantity: childSnapshot.val().quantity,
            cost: childSnapshot.val().cost,
          };
          this.ports.push(port);
        });
      });
      let planetRef = this.db.ref('/planets');
      planetRef.on('value', snapshot => {
        this.planets = [];
        snapshot.forEach(childSnapshot => {
          let planet = {
            key: childSnapshot.key,
            name: childSnapshot.val().name,
            ports: childSnapshot.val().ports,
            friendly: childSnapshot.val().friendly,
            x: childSnapshot.val().x,
            y: childSnapshot.val().y,
            z: childSnapshot.val().z
          };
          this.planets.push(planet);
        });
      });
  }

  public getObservable(): Observable<any[]> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

  public getPlanets():any[] {
    let entriesClone = JSON.parse(JSON.stringify(this.planets));
    console.log("Someone got my planets! They got: ", entriesClone);
    return entriesClone;
  }
  public getPeople():any[] {
    let entriesClone = JSON.parse(JSON.stringify(this.people));
    console.log("Someone got my people! They got: ", entriesClone);
    return entriesClone;
  }
  public getPorts():any[] {
    let entriesClone = JSON.parse(JSON.stringify(this.ports));
    console.log("Someone got my ports! They got: ", entriesClone);
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


}
