import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

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
const cube = new Mesh(
  new BoxGeometry(4, 4, 4),
  new MeshBasicMaterial({ wireframe: true })
);
scene.add(cube);

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;
camera.lookAt(cube.position);
scene.add(camera);

// Renderer
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
