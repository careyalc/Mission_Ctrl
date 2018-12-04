import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

import { HttpModule, Http } from '@angular/http';
import { MapDetailComponent } from '../map-detail/map-detail';
import * as THREE from 'three';
import { Raycaster, Vector2 }  from 'three';
import * as webvrui from 'webvr-ui';
// import OrbitControls from 'three-orbitcontrols';
import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';
// import * as orient from 'three.orientation';
import CardboardVRDisplay from 'cardboard-vr-display';

@Component({
  selector: 'app-map',
  templateUrl: 'map.html',
  encapsulation: ViewEncapsulation.None
})
export class mapComponent implements OnInit {

    @ViewChild('mapCanvas') mapCanvas;


    private width: number = window.innerWidth;
    private height: number = window.innerHeight;

    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    private renderer: THREE.WebGLRenderer;

    private controls: VRControls = new VRControls(this.camera);
    // private controls: OrbitControls = new OrbitControls(this.camera);
    // private orientationControl: orient = new orient(this.camera);

    private effect: VREffect;
    private enterVR;
    private animationDisplay;

    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();

    @Input() people;
    @Input() ports;
    @Input() planets;

    private lastRender = 0;
    private timestamp: any = new Date();
    private config;
    private vrDisplay;
    private spaceport: THREE.Mesh;
    private traveller: THREE.Mesh;
    private loader: THREE.TextureLoader = new THREE.TextureLoader();

    constructor(private element: ElementRef, private ngRenderer: Renderer2, public popoverCtrl: PopoverController, private deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation, private gyroscope: Gyroscope) {
      // console.log(Math.min(this.timestamp - this.lastRender,500))
      // this.deviceMotion.getCurrentAcceleration().then(
      //   (acceleration: DeviceMotionAccelerationData) => console.log("acceleration",acceleration),
      //   (error: any) => console.log(error)
      // );
      //
      // // Watch device acceleration
      // var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      //   console.log(acceleration);
      // });
      //
      // // Stop watch
      // // subscription.unsubscribe();
      // this.deviceOrientation.getCurrentHeading().then(
      //   (data: DeviceOrientationCompassHeading) => console.log(data),
      //   (error: any) => console.log(error)
      // );
      //
      // // Watch the device compass heading change
      // var subscription = this.deviceOrientation.watchHeading().subscribe(
      //   (data: DeviceOrientationCompassHeading) => console.log(data)
      // );

      // Stop watching heading change
      // subscription.unsubscribe();
      console.log(this.gyroscope);
      let options: GyroscopeOptions = {
         frequency: 1000
      };
      this.gyroscope.getCurrent(options)
        .then((orientation: GyroscopeOrientation) => {
           console.log("orientation",orientation.x, orientation.y, orientation.z, orientation.timestamp);
         })
        .catch()


      this.gyroscope.watch()
         .subscribe((orientation: GyroscopeOrientation) => {
            console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
         });
    }


    ngOnInit() {
      this.config = (function() {
        let config2 = {};
        let q = window.location.search.substring(1);
        if (q === '') {
          return config2;
        }
      let params = q.split('&');
      let param, name, value;
      for (var i = 0; i < params.length; i++) {
        param = params[i].split('=');
        name = param[0];
        value = param[1];
        // All config values are either boolean or float
        config2[name] = value === 'true' ? true :
                       value === 'false' ? false :
                       parseFloat(value);
      }
      return config2;
    })();
    console.log('creating CardboardVRDisplay with options', this.config);
    this.vrDisplay = new CardboardVRDisplay(this.config);
    // navigator.getVRDisplays = function () {
    //   return new Promise(function (resolve) {
    //     resolve([this.vrDisplay]);
    //   });
    //};
    // this.vrDisplay.requestAnimationFrame(this.animate);


    this.renderer = new THREE.WebGLRenderer({antialias: false, canvas: this.mapCanvas.nativeElement});
    this.effect = new VREffect(this.renderer);
    this.renderer.vr.enabled = true;
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    setTimeout(()=>{
      this.populatePlanets()
    }, 1500);
    // create spaceports
    // loader.load('../../assets/textures/grass.jpg', (texture) => {
    //     this.spaceport = this.createSpaceport(texture);
    //     this.spaceport.position.set(.075,.075,.075);
    //     this.planet1.add(this.spaceport);
    // });
    //
    // // create travellers
    // this.traveller = this.createTraveller('rgb(0,0,0)');
    // this.traveller.position.set(2, this.controls.userHeight, -1);
    // this.scene.add(this.traveller);

    this.controls.standing = true;
    this.camera.position.y = this.controls.userHeight;

    this.effect.setSize(this.width, this.height);

    this.loader.load('../../assets/textures/sky.jpg', (texture) => {
        this.initScene(texture);
    });
    window.addEventListener('resize', () => {
        this.onResize();
    });
    window.addEventListener('vrdisplaypresentchange', () => {
        this.onResize();
    });
    window.addEventListener( 'click', (e)=>{
      this.onSelect(e);
    });
    window.addEventListener('touchmove', function(e) {
      e.preventDefault();
    });
  }


  initScene(texture): void {
      let skybox = this.createSky(15, texture);
      this.scene.add(skybox);

      // this.animationDisplay = window;
      // window.requestAnimationFrame(() => {
      //     this.update();
      // });
      this.vrDisplay.requestAnimationFrame(() => {
          this.update();
      });
  }

  update(): void {
    console.log(this.gyroscope);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.effect.render(this.scene, this.camera);
      this.vrDisplay.requestAnimationFrame(() => {
          this.update();
      });
      // this.animationDisplay.requestAnimationFrame(() => {
      //     this.update();
      // });
  }

    onResize(): void {
        this.effect.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    populatePlanets(){
      if (this.planets){
        for ( var i = 0; i < this.planets.length; i++ ) {
          console.log("location", this.planets[i])
            let x = this.planets[i].location[0];
            let y = this.planets[i].location[1];
            let z = this.planets[i].location[2];
            let planetName = this.planets[i].name
            this.loader.load('../../assets/textures/'+this.planets[i].name+'.jpg', (texture) => {
              console.log("loading")
              let planet = this.createPlanet(0.25, texture);
              planet.position.set(x,y,z);
              planet.name = planetName;
              this.scene.add(planet);
            });
          }

      } else {
        console.log("planets haven't loaded yet")
      }
    }
    // rotatePlanets(){
    //   if (this.planets){
    //       for ( var i = 0; i < this.planets.length; i++ ) {
    //           console.log("rotating",this.planets[i])
    //           this.planets[i].name.rotateY(0.01);
    //         }
    //   } else {
    //     console.log("planets haven't loaded yet")
    //   }
    // }

    createSky(size, texture): THREE.Mesh {
        texture.wrapT = THREE.RepeatWrapping;
        let geometry = new THREE.SphereGeometry(size, size, size);
        let material = new THREE.MeshBasicMaterial({
            color: 0xb5e8fc,
            map: texture,
            side: THREE.BackSide,
        });
        return new THREE.Mesh(geometry, material);
    }

    //make planets
    createPlanet(size, texture): THREE.Mesh {
      var geometry = new THREE.SphereGeometry( size, size, size );
      var material = new THREE.MeshBasicMaterial( {map:texture} );
      return new THREE.Mesh( geometry, material );
    }
    createSpaceport(texture): THREE.Mesh{
      var geometry = new THREE.BoxGeometry( .05, .05, .05 );
      var material = new THREE.MeshBasicMaterial( {map:texture} );
      return new THREE.Mesh( geometry, material );
    }
    createTraveller(color): THREE.Mesh{
      var geometry = new THREE.SphereGeometry( .01, .01, .01 );
      var material = new THREE.MeshBasicMaterial( {color} );
      return new THREE.Mesh( geometry, material );
    }
    presentPopover(event, object) {
      let data = {'planet_name':object.name,'people_data': this.people, 'planets_data': this.planets, 'ports_data': this.ports}
      let popover = this.popoverCtrl.create(MapDetailComponent, data);
      popover.present({
        ev: event
      });
    }
    onSelect(event) {
    	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1 ;
    	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1 ;
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.scene.children );
      for ( var i = 0; i < intersects.length; i++ ) {
        if (intersects[i].object.name){
          console.log("intersects", intersects[i].object.name);
          this.presentPopover(this.mouse, intersects[i].object);
        }
      }
    }

}
