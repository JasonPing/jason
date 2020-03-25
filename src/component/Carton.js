import React from "react";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

var container, clock, controls, sky, sunSphere, dirLight, hemiLight;
var camera,
  scene,
  renderer,
  mixerArray = [];
var birdNumber = 3;
let increase = 0.001;
let count = 0;

var effectController = {
  turbidity: 10,
  rayleigh: 2,
  mieCoefficient: 0.005,
  mieDirectionalG: 0.8,
  luminance: 1,
  inclination: 0.3, // elevation / inclination
  azimuth: 0.25, // Facing front,
  sun: true
};

function skyChanged(effectController) {
  var distance = 400000;

  var uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = effectController.turbidity;
  uniforms["rayleigh"].value = effectController.rayleigh;
  uniforms["mieCoefficient"].value = effectController.mieCoefficient;
  uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;
  uniforms["luminance"].value = effectController.luminance;

  var theta = Math.PI * (effectController.inclination - 0.5);
  var phi = 2 * Math.PI * (effectController.azimuth - 0.5);

  sunSphere.position.x = distance * Math.cos(phi);
  sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
  sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

  sunSphere.visible = effectController.sun;

  uniforms["sunPosition"].value.copy(sunSphere.position);

  renderer.render(scene, camera);
}

function initSky() {
  // Add Sky
  sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  // Add Sun Helper
  sunSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20000, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  sunSphere.position.y = -700000;
  sunSphere.visible = false;
  scene.add(sunSphere);

  dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.5, 1, 0.95);
  dirLight.position.copy(sunSphere.position);
  dirLight.position.multiplyScalar(1);
  scene.add(dirLight);

  skyChanged(effectController);
}

function init() {
  container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-100, 30, 30);

  scene = new THREE.Scene();
  scene.background = new THREE.Color().setHSL(0.6, 0, 1);

  clock = new THREE.Clock();

  var loader = new GLTFLoader();
  loader.load("/asset/model/Stork.glb", function(gltf) {
    var mesh = gltf.scene.children[0];

    var s = 0.05;
    mesh.scale.set(s, s, s);

    for (let i = 0; i < birdNumber; i++) {
      let cloneMesh = mesh.clone();
      let randomDis = getRandomFloat(0.8, 0.5);
      cloneMesh.position.set(0, 0, -i * 15 * randomDis);
      cloneMesh.rotation.set(0, 3, 0);
      cloneMesh.castShadow = true;
      cloneMesh.receiveShadow = true;

      scene.add(cloneMesh);

      let mixer = new THREE.AnimationMixer(cloneMesh);
      let randomDur = getRandomFloat(1.5, 1);
      mixer
        .clipAction(gltf.animations[0])
        .setDuration(randomDur)
        .play();

      mixerArray.push(mixer);
    }
  });

  // var gridHelper = new THREE.GridHelper(10, 20);
  // scene.add(gridHelper);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  //

  controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.minDistance = 5;
  controls.maxDistance = 160;
  controls.target.set(0, 0, -10);
  controls.update();

  //

  initSky();

  window.addEventListener("resize", onWindowResize, false);

  animate();
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var delta = clock.getDelta();

  for (let mixer of mixerArray) {
    if (mixer !== undefined) {
      mixer.update(delta);
    }
  }

  dirLight.position.copy(sunSphere.position);

  count += increase;

  let dayOrNight = count % 2;
  if (dayOrNight > 1) {
    // night
    effectController.turbidity = 7.8;
    effectController.rayleigh = 0;
    effectController.mieCoefficient = 0.002;
    effectController.azimuth = (dayOrNight - 1) * 0.55;
    dirLight.intensity = 0.5;
  } else {
    effectController.turbidity = 10;
    effectController.rayleigh = 2;
    effectController.mieCoefficient = 0.002;
    effectController.azimuth = dayOrNight * 0.55;
    dirLight.intensity = 1;
  }

  skyChanged(effectController);

  renderer.render(scene, camera);
}

class Carton extends React.Component {
  componentDidMount() {
    init();

    var startButton = document.getElementById("startButton");
    var overlay = document.getElementById("overlay");
    var instruction = document.getElementById("instruction");
    var canvas = document.getElementById("container").children[0];
    canvas.style.display = "none";

    startButton.addEventListener("click", () => {
      overlay.style.display = "none";
      instruction.style.display = "block";
      canvas.style.display = "block";
    });

    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        instruction.style.display = "none";
        overlay.style.display = "block";
        canvas.style.display = "none";
      }
    };
  }
  render() {
    return (
      <div id="three">
        <div id="overlay">
          <button id="startButton">Click to have a look</button>
        </div>

        <div id="instruction">
          <p>Press ESC to leave</p>
          <p>Try scroll and drag your mouse</p>
        </div>
        <div id="container"></div>
      </div>
    );
  }
}

export { Carton };
