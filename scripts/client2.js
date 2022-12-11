// Art 109 Three.js Demo Site
// client7.js
// A three.js scene which uses planes and texture loading to generate a scene with images which can be traversed with basic WASD and mouse controls, this scene is full screen with an overlay.

// Import required source code
// Import three.js core

// 2 for shower
// 3 for toilet
//4 for open door
// 5 for Window
//6 for person wakes up
// press 1 to make water faceut spit water
import * as THREE from "../build/three.module.js";
// Import pointer lock controls
import {
  PointerLockControls
} from "../src/PointerLockControls.js";
import {
  FontLoader
} from "../src/FontLoader.js"
import {
  GLTFLoader
} from "../src/GLTFLoader.js";

// Establish variables
let camera, scene, renderer, controls, material, mixer, action;

const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {
  // Establish the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 10;

  // Define basic scene parameters
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0xffffff, 0, 750);

  // Define scene lighting
  const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  // Define controls
  controls = new PointerLockControls(camera, document.body);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  // Listen
  instructions.addEventListener("click", function() {
    controls.lock();
  });
  // Remove overlays and begin controls on click
  controls.addEventListener("lock", function() {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  // Restore overlays and stop controls on esc
  controls.addEventListener("unlock", function() {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  // Add controls to scene
  scene.add(controls.getObject());

  // Define key controls for WASD controls
  const onKeyDown = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Add raycasting for mouse controls
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );





// const geometry4 = new THREE.IcosahadedronGeometry(2,1);
// const matLineBasic = new THREE.LineBasicMaterial( {
//   color: 0xaa42f5,
//   linewidth: 4
// });
// const wireframe= new THREE.WireframeGeometry(geometry4)
// const line = new THREE.LineSegments(wireframe, matLineBasic);
// lne.position.set (0,10,0);
// scene.add( plane);

  // Generate the ground
  let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);

  // Vertex displacement pattern for ground
  let position = floorGeometry.attributes.position;

  for (let i = 0, l = position.count; i < l; i++) {
    vertex.fromBufferAttribute(position, i);

    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

  position = floorGeometry.attributes.position;
  const colorsFloor = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    colorsFloor.push(color.r, color.g, color.b);
  }

  floorGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorsFloor, 3)
  );

  const floorMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  // Insert completed floor into the scene
  scene.add(floor);


let mesh1;
  // Load preanimated model, add material, and add it to the scene
const loader = new GLTFLoader();
loader.load(
  "assets/room2.glb",
	function ( gltf ) {
mesh1 = gltf.scene;
mesh1.scale.set(20,20,20);
mesh1.position.set(-90,2 ,120);
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		scene.add( mesh1 );
  },
)
// let mesh2;
//   // Load preanimated model, add material, and add it to the scene
// const loader2 = new GLTFLoader();
// loader2.load(
//   "assets/bed.glb",
// 	function ( gltf ) {
// mesh2 = gltf.scene;
// mesh2.scale.set(4,6,8);
// mesh2.position.set(60,0 ,-160);
// mesh2.rotation.set(0,124.1,0)
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh2 );
//   },
// )
// let mesh3;
//   // Load preanimated model, add material, and add it to the scene
// const loader3 = new GLTFLoader();
// loader3.load(
//   "assets/bed.glb",
// 	function ( gltf ) {
// mesh3 = gltf.scene;
// mesh3.scale.set(4,6,8);
// mesh3.position.set(-30,0 ,23);
// mesh3.rotation.set(0,14.1,0)
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh3 );
//   },
// )
// let mesh4;
//   // Load preanimated model, add material, and add it to the scene
// const loader4 = new GLTFLoader();
// loader4.load(
//   "assets/chair.glb",
// 	function ( gltf ) {
// mesh4 = gltf.scene;
// mesh4.scale.set(3,2,3);
// mesh4.position.set(88,0 ,-105);
// mesh4.rotation.set(0,121,0);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh4 );
//   },
// )
//
// let mesh5;
//   // Load preanimated model, add material, and add it to the scene
// const loader5 = new GLTFLoader();
// loader5.load(
//   "assets/Table.glb",
// 	function ( gltf ) {
// mesh5 = gltf.scene;
// mesh5.scale.set(4,4,4);
// mesh5.position.set(90,0 ,-127);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh5 );
//   },
// )
//
// let mesh6;
//   // Load preanimated model, add material, and add it to the scene
// const loader6 = new GLTFLoader();
// loader6.load(
//   "assets/light.glb",
// 	function ( gltf ) {
// mesh6 = gltf.scene;
// mesh6.scale.set(2,2,2);
// mesh6.position.set(78,18 ,-140);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh6 );
//   },
// )
//
// let mesh7;
//   // Load preanimated model, add material, and add it to the scene
// const loader7 = new GLTFLoader();
// loader7.load(
//   "assets/tablet.glb",
// 	function ( gltf ) {
// mesh7 = gltf.scene;
// mesh7.scale.set(10,10,10);
// mesh7.position.set(90,24 ,-135);
// mesh7.rotation.set(0,11,0);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh7 );
//   },
// )
//
// let mesh8;
//   // Load preanimated model, add material, and add it to the scene
// const loader8 = new GLTFLoader();
// loader8.load(
//   "assets/monitor.glb",
// 	function ( gltf ) {
// mesh8 = gltf.scene;
// mesh8.scale.set(3,3,3);
// mesh8.position.set(-62,22.5 ,-75);
// mesh8.rotation.set(0,4.5,0);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh8 );
//   },
// )
//
// let mesh9;
//   // Load preanimated model, add material, and add it to the scene
// const loader9 = new GLTFLoader();
// loader9.load(
//   "assets/food.glb",
// 	function ( gltf ) {
// mesh9 = gltf.scene;
// mesh9.scale.set(4,4,4);
// mesh9.position.set(90,19 ,-130);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh9 );
//   },
// )
//
//
//
// let mesh10;
//   // Load preanimated model, add material, and add it to the scene
// const loader10 = new GLTFLoader();
// loader10.load(
//   "assets/box1.glb",
// 	function ( gltf ) {
// mesh10 = gltf.scene;
// mesh10.scale.set(7,7,7);
// mesh10.position.set(-70,4.3 ,80);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh10 );
//   },
// )
// let mesh11;
//   // Load preanimated model, add material, and add it to the scene
// const loader11 = new GLTFLoader();
// loader11.load(
//   "assets/box2.glb",
// 	function ( gltf ) {
// mesh11 = gltf.scene;
// mesh11.scale.set(7,7,7);
// mesh11.position.set(-70,4.3 ,100);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh11 );
//   },
// )
// let mesh12;
//   // Load preanimated model, add material, and add it to the scene
// const loader12 = new GLTFLoader();
// loader12.load(
//   "assets/table.glb",
// 	function ( gltf ) {
// mesh12 = gltf.scene;
// mesh12.scale.set(4,4,4);
// mesh12.position.set(-70,4.3 ,-80);
// mesh12.rotation.set(-0,14.1 ,0);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh12 );
//   },
// )
// let mesh13;
//   // Load preanimated model, add material, and add it to the scene
// const loader13 = new GLTFLoader();
// loader13.load(
//   "assets/road.glb",
// 	function ( gltf ) {
// mesh13 = gltf.scene;
// mesh13.scale.set(12,4,10);
// mesh13.position.set(150,2,0);
// mesh13.rotation.set(0,4.65 ,0);
// 		gltf.animations; // Array<THREE.AnimationClip>
// 		gltf.scene; // THREE.Group
// 		gltf.scenes; // Array<THREE.Group>
// 		gltf.cameras; // Array<THREE.Camera>
// 		gltf.asset; // Object
// 		scene.add( mesh13 );
//   },
// )




















// end of room 1


  // Define Rendered and html document placement
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Listen for window resizing
  window.addEventListener("resize", onWindowResize);
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
//teleporting to different areas
function portalRedirect1() {
  //Change coordinates based on your model.
  // change -5 and 5 to location of portal plus and minus 5. Model is at 0
  if (controls.getObject().position.x >  180 && controls.getObject().position.x < 250){
    // change -75 and -65 location of portal plus and minus 5. Model is at -70
    console.log("hi");
    if (controls.getObject().position.z > 60 && controls.getObject().position.z < 120){
      //change url to your url
      window.open("https://docs.google.com/document/d/1jtiVamfnPJw8ITcHz33VCJ8e0fliPrBj3uVICBwiVHg/edit");
    }
  }
  //for debugging open console to see position
  console.log("x = "+controls.getObject().position.x+"  z = "+controls.getObject().position.z);

  // place as a function "portalRedirect();" in "animate" function.
}
function portalRedirect2() {
  //Change coordinates based on your model.
  // change -5 and 5 to location of portal plus and minus 5. Model is at 0
  if (controls.getObject().position.x >  250 && controls.getObject().position.x < 300){
    // change -75 and -65 location of portal plus and minus 5. Model is at -70
    console.log("hi");
    if (controls.getObject().position.z > -10 && controls.getObject().position.z < 40){
      //change url to your url
      window.open("https://docs.google.com/spreadsheets/d/19hU0mbIXwRkl9OoFcxJnZgCrGkghHu3vxtwL4BsLfkM/edit#gid=1632573556");
    }
  }


  // place as a function "portalRedirect();" in "animate" function.
}
function portalRedirect3() {
  //Change coordinates based on your model.
  // change -5 and 5 to location of portal plus and minus 5. Model is at 0
  if (controls.getObject().position.x >  200 && controls.getObject().position.x < 250){
    // change -75 and -65 location of portal plus and minus 5. Model is at -70
    console.log("hi");
    if (controls.getObject().position.z > -90 && controls.getObject().position.z < -70){
      //change url to your url
      window.open("https://docs.google.com/presentation/d/1RFHH6bGUVk6W-_mLOymjO5DuShG9xWeUijz_s7rClJY/edit#slide=id.p");
    }
  }
  //for debugging open console to see position
}

// Animation function
function animate() {
  portalRedirect1();
  portalRedirect2();
  portalRedirect3();
  requestAnimationFrame(animate);

  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }

  prevTime = time;

  renderer.render(scene, camera);
}
