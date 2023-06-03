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
  AxesHelper,
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

const axesHelper = new AxesHelper( 5 );
scene.add( axesHelper );

// Cube
const edges = new EdgesGeometry(new BoxGeometry(1, 1, 1));
const cube = new LineSegments(
  edges,
  new LineBasicMaterial(),
);
scene.add(cube);
gui
  .add(cube.scale, 'x')
  .min(1)
  .max(10)
  .step(1);
gui
  .add(cube.scale, 'y')
  .min(1)
  .max(10)
  .step(1);
gui
  .add(cube.scale, 'z')
  .min(1)
  .max(10)
  .step(1);

//Generate, Explode
const parameters = {
  Generate: () => {
    console.log(cube.scale)
    const { x: scaleX, y: scaleY, z: scaleZ } = cube.scale;

    for (let x = 0; x < scaleX; x++) {
      for (let y = 0; y < scaleY; y++) {
        for (let z = 0; z < scaleZ; z++) {
          const newFigure = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial()
          );
          newFigure.position.set(
            x - (scaleX - 1) / 2,
            y - (scaleY - 1) / 2,
            z - (scaleZ - 1) / 2
          );
          scene.add(newFigure);
        }
      }
    }
  },
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
