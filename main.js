import {
  Scene,
  Mesh,
  BoxGeometry,
  EdgesGeometry,
  MeshBasicMaterial,
  LineBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  LineSegments,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const gui = new GUI();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new Scene();

// Cube
const edges = new EdgesGeometry(new BoxGeometry(1, 1, 1));
const cube = new LineSegments(
  edges,
  new LineBasicMaterial(),
);
scene.add(cube);
gui
  .add(cube.scale, 'x')
  .min(-10)
  .max(10)
  .step(1);
gui
  .add(cube.scale, 'y')
  .min(-10)
  .max(10)
  .step(1);
gui
  .add(cube.scale, 'z')
  .min(-10)
  .max(10)
  .step(1);

const parameters = {
  Generate: () => {},
  Explode: () => {},
}
gui
  .add(parameters, 'Generate');
gui
  .add(parameters, 'Explode');

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;
camera.lookAt(cube.position);
scene.add(camera);

// Renderer
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});
