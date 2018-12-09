import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../../pages/home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Events } from 'ionic-angular';
// import { ListViewComponent } from '../components/list-view/list-view';

const PLACEHOLDER_IMAGE: string = "/assets/imgs/placeholder.png";
const SPINNER_IMAGE: string = "/assets/imgs/spinner.gif";
const PORT_IMAGE: string = "/assets/imgs/sample_port.jpg";

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
  private photo = PORT_IMAGE;
  public port: any;
  public rating: any;

  constructor(
    public navCtrl: NavController, private camera: Camera, private firebaseProvider: FirebaseProvider, public navParams: NavParams,
    public events: Events) {
    this.port = this.navParams.get("port");
    this.rating = this.port.rating;
    console.log(this.port)


    events.subscribe('star-rating:changed', (starRating) => {
       console.log(starRating);
       this.rating = starRating;
     });
  }

  private takePic(port) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL, //Usually a URL is a pointer to some data, but a  DATA_URL is a URL that actually contains all of the data within it. Since we’re going to be transferring data from the Camera app to our own app, this is the most expedient option.
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        if (imageData) {
          console.log("taking a picture")
          port.photo = 'data:image/jpeg;base64,' + imageData;
          this.firebaseProvider.updatePort(this.port);
        } else {
          port.photo = PLACEHOLDER_IMAGE;
        }
       }, (err) => {
         if (port.photo == PLACEHOLDER_IMAGE) {
           port.photo = PLACEHOLDER_IMAGE
         } else {
           port.photo = port.photo
         }
       });

     }

    // saveProfile(){
    //   this.firebaseProvider.updateProfile(this.)
    // }

}
