import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
     // private deviceOrientation: DeviceOrientation
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this.deviceOrientation.getCurrentHeading().then(
      //   (data: DeviceOrientationCompassHeading) => console.log("data", data),
      //   (error: any) => console.log(error)
      // );
      //
      // var subscription = this.deviceOrientation.watchHeading().subscribe(
      //   (data: DeviceOrientationCompassHeading) => console.log("data", data)
      // );
      //
      //
      // subscription.unsubscribe();

    });
  }
}
