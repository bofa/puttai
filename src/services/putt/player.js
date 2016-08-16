import THREE from 'three';

const JUMP_COOL_DOWN = 40;
const RESPAWN_DEPTH = -300;
const JUMP_STRENGTH = 170;
const FORCE_MULTIPLYER = 14;

export default class Player {

  static loader = new THREE.JSONLoader(); // init the loader util

  constructor(scene, playerIndex, Physijs, ai) {
    this.playerIndex = playerIndex;
    this.scene = scene;
    this.mass = 1;
    this.jumpCooldown = 0;
    this.ai = ai;

    this.forceVector = new THREE.Vector3(0, 0, 0);
    this.forceVectorSensor = new THREE.Vector3(0, 0, 0);

    // Cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
    const hex = Math.random() * 0xffffff;

    for (let i = 0; i < geometry.faces.length; i += 2) {
      geometry.faces[i].color.setHex(hex);
      geometry.faces[i + 1].color.setHex(hex);
    }

    this.mesh = new Physijs.BoxMesh(geometry, material, 5);
    // cube = new THREE.Mesh( geometry, material );

    this.mesh.position.set(Math.random() * 10, Math.random() * 10, 0);
    this.mesh.rotation.y = -Math.PI / 2;
    this.mesh.scale.set(3, 3, 3);

    this.scene.add(this.mesh);
  }


  updateSensor(sensorData) {
    if (!this.mesh) {
      return;
    }

    this.forceVectorSensor = new THREE.Vector3(
      FORCE_MULTIPLYER * sensorData[1],
      0,
      FORCE_MULTIPLYER * sensorData[0]
    );
  }

  jump() {
    if (!this.mesh || this.jumpCooldown > 0) {
      return;
    }

    // TODO dynamiskt hopp
    const jumpImpulse = new THREE.Vector3(0, JUMP_STRENGTH, 0);
    this.jumpCooldown = JUMP_COOL_DOWN;

    this.mesh.applyCentralImpulse(jumpImpulse);
  }

  updatePhysics(resetCallback) {
    if (!this.mesh) {
      return;
    }

    // Run ai
    if(this.ai) {
      this.updateSensor(this.ai.update());
    }

    // Lowpass filter.
    this.forceVector.add(this.forceVectorSensor);
    this.forceVector.multiplyScalar(0.5);

    this.mesh.applyCentralForce(this.forceVector);

    // TODO make steplength dependent
    this.jumpCooldown--;

    if (this.mesh.position.y < RESPAWN_DEPTH) {
      this.reset();
      resetCallback(this.playerIndex);
    }


  }

  reset() {
    this.mesh.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    this.mesh.position.set(10 * (Math.random() - 0.5), 3, 10 * (Math.random() - 0.5));
    this.mesh.__dirtyPosition = true;
  }

  removePlayer() {
    this.scene.remove(this.mesh);
  }
}
