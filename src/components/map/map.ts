import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { ViewController, PopoverController } from 'ionic-angular';

import { HttpModule, Http } from '@angular/http';
import { MapDetailComponent } from '../map-detail/map-detail';
import * as THREE from 'three';
import { Raycaster, Vector2 }  from 'three';
import * as webvrui from 'webvr-ui';
// import OrbitControls from 'three-orbitcontrols';
import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';

@Component({
  selector: 'app-map',
  templateUrl: 'map.html',
  encapsulation: ViewEncapsulation.None
})
export class mapComponent implements OnInit {

    @ViewChild('mapCanvas') mapCanvas;
    @Input() people;
    @Input() ports;
    @Input() planets;

    private width: number = window.innerWidth;
    private height: number = window.innerHeight;

    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 1000);
    private renderer: THREE.WebGLRenderer;

    private controls: VRControls = new VRControls(this.camera);
    // private controls: OrbitControls = new OrbitControls(this.camera);

    private effect: VREffect;
    private enterVR;
    private animationDisplay;

    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();

    private planet1: THREE.Mesh;
    private planet2: THREE.Mesh;
    private planet3: THREE.Mesh;
    private spaceport: THREE.Mesh;
    private traveller: THREE.Mesh;

    constructor(private element: ElementRef, private ngRenderer: Renderer2, public popoverCtrl: PopoverController) {
    }

    ngOnInit() {
        this.renderer = new THREE.WebGLRenderer({antialias: false, canvas: this.mapCanvas.nativeElement});
        this.effect = new VREffect(this.renderer);
        let loader: THREE.TextureLoader = new THREE.TextureLoader();

        this.renderer.vr.enabled = true;
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // create planets - pull in all planets from database
        // console.log()
        loader.load('../../assets/textures/planet_1.jpg', (texture) => {
            this.planet1 = this.createPlanet(0.15, texture);
            this.planet1.position.set(-.3, 1.2, -1);
            this.planet1.name = "planet1"
            this.scene.add(this.planet1);
        });
        loader.load('../../assets/textures/planet_2.jpg', (texture) => {
            this.planet2 = this.createPlanet(0.08, texture);
            this.planet2.position.set(0, 3, -3);
            this.planet2.name = "planet2"
            this.scene.add(this.planet2);
        });
        loader.load('../../assets/textures/planet_3.jpg', (texture) => {
            this.planet3 = this.createPlanet(0.05, texture);
            this.planet3.position.set(0, 1, -1);
            this.planet3.name = "planet3"
            this.scene.add(this.planet3);
        });

        // create spaceports
        loader.load('../../assets/textures/grass.jpg', (texture) => {
            this.spaceport = this.createSpaceport(texture);
            this.spaceport.position.set(.075,.075,.075);
            this.planet1.add(this.spaceport);
        });

        // create travellers
        this.traveller = this.createTraveller('rgb(0,0,0)');
        this.traveller.position.set(2, this.controls.userHeight, -1);
        this.scene.add(this.traveller);

        this.controls.standing = true;
        this.camera.position.y = this.controls.userHeight;

        this.effect.setSize(this.width, this.height);

        loader.load('../../assets/textures/sky.jpg', (texture) => {
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
    }

    initScene(texture): void {
        let skybox = this.createSky(15, texture);
        this.scene.add(skybox);

        this.animationDisplay = window;
        window.requestAnimationFrame(() => {
            this.update();
        });
    }

    update(): void {
      //planet movements
        this.planet1.rotateY(0.01);
        this.planet2.rotateY(0.01);
        this.planet3.rotateY(0.01);

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.effect.render(this.scene, this.camera);
        this.animationDisplay.requestAnimationFrame(() => {
            this.update();
        });
    }

    onResize(): void {
        this.effect.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

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
        if (intersects[ i ].object.name){
          console.log("intersects", intersects[ i ].object.name);
          this.presentPopover(this.mouse, intersects[ i ].object);
        }
      }
    }

}
