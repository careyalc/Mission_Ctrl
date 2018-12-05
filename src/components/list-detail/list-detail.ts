import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../../pages/home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';
// import { ListViewComponent } from '../components/list-view/list-view';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";

/**
 * Generated class for the ListDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-detail',
  templateUrl: 'list-detail.html'
})
export class ListDetailComponent {

  text: string;
  private image = PLACEHOLDER_IMAGE;

  constructor(
    public navCtrl: NavController, private camera: Camera, private firebaseProvider: FirebaseProvider
    ) {
    console.log('Hello ListDetailComponent Component');
    this.text = 'Hello World';
  }

  private takePic() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL, //Usually a URL is a pointer to some data, but a  DATA_URL is a URL that actually contains all of the data within it. Since we’re going to be transferring data from the Camera app to our own app, this is the most expedient option.
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        if (imageData) {
          this.image = 'data:image/jpeg;base64,' + imageData;
        } else {
          this.image = PLACEHOLDER_IMAGE;
        }
       }, (err) => {
          this.image = PLACEHOLDER_IMAGE;
       });
      this.image = SPINNER_IMAGE;
    }

}
