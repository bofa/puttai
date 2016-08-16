import PlayerHandler from './player-handler';

export function createBlockCube(THREE, Physijs, scene) {
  // Cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const hex = Math.random() * 0xffffff;

  for (let i = 0; i < geometry.faces.length; i += 2) {
    geometry.faces[i].color.setHex(hex);
    geometry.faces[i + 1].color.setHex(hex);
  }

  const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });

  const cube = new Physijs.BoxMesh(geometry, material, 5);
  // cube = new THREE.Mesh( geometry, material );
  cube.position.y = 15;
  scene.add(cube);

  return cube;
}

export function checkCube(cube, THREE) {
  if (cube.position.y < -100) {
    cube.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    cube.position.set(0, 15, 0);
    cube.__dirtyPosition = true;
  }
}

export function initGameObjects(scene, THREE, Physijs) {
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 2, 500);
  camera.position.set(55, 30, 0);
  camera.lookAt(scene.position);

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.position.set(0, 1, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const light1 = new THREE.PointLight(0xff0040, 1, 500);
  // light1.castShadow = true;
  scene.add(light1);

  const light2 = new THREE.PointLight(0x0040ff, 1, 500);
  scene.add(light2);

  const light3 = new THREE.PointLight(0x80ff80, 1, 500);
  scene.add(light3);

  const cube = createBlockCube(THREE, Physijs, scene);

  const mPlayerHandler = new PlayerHandler(scene);
  // mPlayerHandler.createPlayer();

  // Ground
  const groundMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ color: 0xFF99BB, shading: THREE.FlatShading, overdraw: 0.5 }),
    0.18, // high friction
    0.07 // low restitution
  );

  // ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
  // ground_material.map.repeat.set( 3, 3 );

  const groundSize = 65;

  const ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(groundSize, 2, groundSize),
    groundMaterial,
    0 // mass
  );

  // ground.receiveShadow = true;
  ground.position.set(0, -10, 0);
  scene.add(ground);

  const elevatedBoxDepth = 20;

  const elevatedBox = new Physijs.BoxMesh(
    new THREE.BoxGeometry(20, 2, groundSize),
    groundMaterial,
    0 // mass
  );

  elevatedBox.position.set(-(groundSize / 2 + elevatedBoxDepth / 2), -8, 0);
  scene.add(elevatedBox);

  return [camera, mPlayerHandler, cube];
}

