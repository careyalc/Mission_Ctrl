import { Component, Input } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ViewController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'list-view',
  templateUrl: 'list-view.html'
})
export class ListViewComponent {
  @Input() people;
  @Input() ports;
  @Input() planets;


  constructor(private firebaseProvider: FirebaseProvider) {
  }

}
