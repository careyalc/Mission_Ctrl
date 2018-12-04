import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SuppliesPage } from '../pages/supplies/supplies';
import { LocationPage } from '../pages/location/location';
import { MessagesPage } from '../pages/messages/messages';
import { SettingsPage } from '../pages/settings/settings';
import { NearbyPage } from '../pages/nearby/nearby';

import { ListViewComponent } from '../components/list-view/list-view';
import { MapDetailComponent } from '../components/map-detail/map-detail';
import { mapComponent } from '../components/map/map';

import { ComponentsModule } from '../components/components.module'
import { FirebaseProvider } from '../providers/firebase/firebase';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SuppliesPage,
    LocationPage,
    MessagesPage,
    SettingsPage,
    NearbyPage,
    ListViewComponent,
    MapDetailComponent,
    mapComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SuppliesPage,
    LocationPage,
    MessagesPage,
    SettingsPage,
    NearbyPage,
    MapDetailComponent,
    ListViewComponent,
    mapComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceMotion,
    DeviceOrientation,
    Gyroscope,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
