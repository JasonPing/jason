import React from "react";
import * as THREE from "three";

import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

let camera, controls, scene, renderer, effect;

let sphere, plane;

let start = Date.now();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 150;
  camera.position.z = 500;

  scene = new THREE.Scene();

  let light = new THREE.PointLight(0xffffff, 0.25);
  light.position.set(-500, -500, -500);
  scene.add(light);

  sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(200, 20, 10),
    new THREE.MeshPhongMaterial({ flatShading: true })
  );
  scene.add(sphere);

  // Plane

  plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(400, 400),
    new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
  );
  plane.position.y = -200;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effect = new AsciiEffect(renderer, " jasonPing", { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";

  // Special case: append effect.domElement, instead of renderer.domElement.
  // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

  document.body.appendChild(effect.domElement);

  controls = new TrackballControls(camera, effect.domElement);

  //

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  var timer = Date.now() - start;

  sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
  sphere.rotation.x = timer * 0.0003;
  sphere.rotation.z = timer * 0.0002;

  controls.update();

  effect.render(scene, camera);
}

class CollisionPlay extends React.Component {
  componentDidMount() {
    init();
    animate();
  }
  render() {
    return <div id="container"></div>;
  }
}

export { CollisionPlay };
