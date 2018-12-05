import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverController } from 'ionic-angular';
// import { HttpModule, Http } from '@angular/http';
import { MapDetailComponent } from '../map-detail/map-detail';
import * as THREE from 'three';
import { Raycaster, Vector2 }  from 'three';

import OrbitControls from 'three-orbitcontrols';
// import VRControls from 'three-vrcontrols-module';
import VREffect from 'three-vreffect-module';

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

  // private controls: VRControls = new VRControls(this.camera);
  private controls: OrbitControls = new OrbitControls(this.camera);

  private effect: VREffect;
  private animationDisplay;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  @Input() people;
  @Input() ports;
  @Input() planets;

  private loader: THREE.TextureLoader = new THREE.TextureLoader();

  constructor(public popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    this.renderer = new THREE.WebGLRenderer({antialias:true, canvas: this.mapCanvas.nativeElement});
    this.effect = new VREffect(this.renderer);
    this.renderer.vr.enabled = true;
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    setTimeout(()=>{
      this.populatePlanets();
      this.populatePeople();
    }, 2000);

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
    this.controls.target=new THREE.Vector3(-2.090743905901129 -0.5779857632670825 -2.3795666436257363);
    this.effect.setSize(this.width, this.height);


    this.loader.load('../../assets/textures/sky.jpg', (texture) => {
        this.initScene(texture);
        console.log("sky loaded")
    });
    window.addEventListener('resize', () => {
        this.onResize();
        console.log("screen is being resized")
    });
    window.addEventListener('vrdisplaypresentchange', () => {
        this.onResize();
        console.log("detected VR display")
    });
    window.addEventListener( 'click', (e)=>{
      console.log("testing click for iphone (click), Alex is it working?", e)
      this.onSelect(e);
    });
    window.addEventListener( 'mouseclick', (e)=>{
      console.log("testing click for iphone (mouseclick), Alex is it working?", e)
      this.onSelect(e);
    });
    window.addEventListener( 'touchstart', (e)=>{
      console.log("testing click for iphone (touchstart), Alex is it working?", e)
      this.onSelect(e);
    });

    // window.addEventListener('touchend', (e)=>{
    //   console.log("camera location",this.camera.rotation.x, this.camera.rotation.y, this.camera.rotation.z)
    // });
  }

  initScene(texture): void {
      let skybox = this.createSky(20, texture);
      skybox.name = "sky"
      this.scene.add(skybox);
      this.animationDisplay = window;
      window.requestAnimationFrame(() => {
          this.update();
      });
  }

  update(): void {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.effect.render(this.scene, this.camera);
      this.animationDisplay.requestAnimationFrame(() => {
          this.update();
      });
      this.rotatePlanets();
  }

    onResize(): void {
        this.effect.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    populatePlanets(){
      if (this.planets){
        console.log("populating planets")
        for ( var i = 0; i < this.planets.length; i++ ) {
            let x = this.planets[i].location[0];
            let y = this.planets[i].location[1];
            let z = this.planets[i].location[2];
            let planetName = this.planets[i].name
            this.loader.load('../../assets/textures/'+this.planets[i].name+'.jpg', (texture) => {
              let planet = this.createPlanet(0.85, texture);
              planet.position.set(x,y,z);
              planet.name = planetName;
              planet.location={x,y,z};
              this.scene.add(planet);
            });
          }

      } else {
        console.log("planets haven't loaded yet")
      }
    }
    rotatePlanets(){
      for ( var i = 0; i < this.scene.children.length; i++ ) {
        if (this.scene.children[i].name!=="sky"){
          // console.log("rotating",this.scene.children[i])
          this.scene.children[i].rotateY(0.01);

        } else{
          this.scene.children[i].rotateY(0.0005);
        }
      }
    }
    populatePeople(){
      if (this.people){
        console.log("populating people")
        for ( var i = 0; i < this.people.length; i++ ) {
            let x = this.people[i].location[0];
            let y = this.people[i].location[1];
            let z = this.people[i].location[2];
            let personName = this.people[i].name
            this.loader.load('../../assets/textures/planet7.jpg', (texture) => {
              let person = this.createTraveller(0xff69b4);
              person.position.set(x,y,z);
              person.name = personName;
              this.scene.add(person);
            });
          }

      } else {
        console.log("people haven't loaded yet")
      }
    }

    createSky(size, texture): THREE.Mesh {
      console.log("creating sky")
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
      console.log("creating planets")
      var geometry = new THREE.SphereGeometry( size, size, size );
      var material = new THREE.MeshBasicMaterial( {map:texture} );
      return new THREE.Mesh( geometry, material );
    }
    createSpaceport(texture): THREE.Mesh{
      console.log("creating a spaceport")
      var geometry = new THREE.BoxGeometry( .05, .05, .05 );
      var material = new THREE.MeshBasicMaterial( {map:texture} );
      return new THREE.Mesh( geometry, material );
    }
    createTraveller(color): THREE.Mesh{
      console.log("creating a traveller")
      var geometry = new THREE.ConeBufferGeometry( .1, .1, .1 );
      var material = new THREE.MeshBasicMaterial( {color} );
      return new THREE.Mesh( geometry, material );
    }
    presentPopover(event, object) {
      console.log("object name", object.name)
      let data = {'planet_name':object.name,'people_data': this.people, 'planets_data': this.planets, 'ports_data': this.ports}
      let popover = this.popoverCtrl.create(MapDetailComponent, data);
      popover.present({
        ev: event
      });
    }
    onSelect(event) {
      //TODO: change controls target to object location via lookAt()
      //TODO: increase click radius for click events
      console.log(this.mouse.x)
      console.log(this.mouse.y)
    	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1 ;
    	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1 ;
      this.raycaster.setFromCamera( this.mouse, this.camera );
      var intersects = this.raycaster.intersectObjects( this.scene.children );
      for ( var i = 0; i < intersects.length; i++ ) {
        if (intersects[i].object.name!=="sky"){
          console.log("intersects", intersects[i].object.name);
          this.presentPopover(this.mouse, intersects[i].object);
        }
      }
    }

}
