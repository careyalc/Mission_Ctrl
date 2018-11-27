import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
