import THREE from 'three';
import { initGameObjects, checkCube } from './game-objects';

// inject Three.js
const Physijs = require('physijs-browserify')(THREE);

Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

let container;

let camera;
let scene;
let renderer;

let backgroundScene;
let backgroundCamera;

let cube;

let mPlayerHandler;

function safeUpdate() {
  checkCube(cube, THREE);
  mPlayerHandler.updatePhysics();
}

/**
 */
export function resize(width, height) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // TODO fix the resize with respect to menu and bars.
  renderer.setSize(width, height);
}

function renderScene() {
  renderer.autoClear = false;
  // renderer.clear();
  renderer.render(backgroundScene, backgroundCamera);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  renderScene();
  // stats.update();
  scene.simulate(undefined, 1);
}

export function init(width, heigth) {
  container = document.getElementById('game');

  scene = new Physijs.Scene();

  scene.setGravity(new THREE.Vector3(0, -50, 0));
  scene.addEventListener(
    'update',
    safeUpdate
  );

  [camera, mPlayerHandler, cube] = initGameObjects(scene, THREE, Physijs, cube);

  // Load the background texture
  const texture = THREE.ImageUtils.loadTexture('feature_graphics2.png');
  const backgroundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 0),
    new THREE.MeshBasicMaterial({
      map: texture,
    })
  );

  backgroundMesh.material.depthTest = false;
  backgroundMesh.material.depthWrite = false;

  // Create your background scene
  backgroundScene = new THREE.Scene();
  backgroundCamera = new THREE.Camera();
  backgroundScene.add(backgroundCamera);
  backgroundScene.add(backgroundMesh);

  renderer = new THREE.WebGLRenderer();
  // renderer.shadowMapEnabled = true;
  // renderer.shadowMapType = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  resize(width, heigth);
  container.appendChild(renderer.domElement);

  animate();
}

/**
 * Create new Player
 */
export function createPlayer(id, ai) {
  mPlayerHandler.createPlayer(id, Physijs, ai);
}

/**
 * Remove player
 */
export function deletePlayer(id) {
  mPlayerHandler.disconnect(id);
}

/**
 * Update sensor
 */
export function updateSensor(id, data) {
  mPlayerHandler.updateSensor(id, data);
}

/**
 * Jump
 */
export function jump(id, data) {
  mPlayerHandler.jump(id, data);
}

/**
 * @param {function} callback - callback that gets the player id as argument.
 */
export function setRespawnCallback(callback) {
  mPlayerHandler.setRespawnCallback(callback);
}

/**
 * @param {function} callback - callback that gets the player id as argument.
 * @return {array} players - List of all the players.
 */
export function getPlayers() {
  return mPlayerHandler.getPlayers();
}
