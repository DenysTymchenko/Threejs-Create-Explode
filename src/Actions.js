import { cube, scene } from './Scene.js';
import {
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader
} from 'three';
import { gsap } from 'gsap';

const figures = []; // all created meshes will be contained here, for explode animation

const textureLoader = new TextureLoader();
const materials = [
  new MeshBasicMaterial({ map: textureLoader.load('/fire.jpg') }),
  new MeshBasicMaterial({ map: textureLoader.load('/earth.jpg') }),
  new MeshBasicMaterial({ map: textureLoader.load('/water.jpg') }),
]

const geometries = [
  new BoxGeometry(1, 1, 1),
  new SphereGeometry(0.5, 15, 15),
  new CylinderGeometry(0.5, 0.5, 1),
];

export const actions = {
  Generate: () => {
    //If figures already exists, delete them from scene and from figures array
    if (figures.length > 0) {
      figures.forEach(figure => scene.remove(figure.mesh)); //removing figure from scene})
      figures.length = 0; //empty the array
    };

    const { x: scaleX, y: scaleY, z: scaleZ } = cube.scale;
    // Generates random figures inside of cube
    for (let x = 0; x < scaleX; x++) {
      for (let y = 0; y < scaleY; y++) {
        for (let z = 0; z < scaleZ; z++) {
          const figure = new Mesh(
            //getting random geometry and material
            geometries[Math.floor(Math.random() * geometries.length)],
            materials[Math.floor(Math.random() * materials.length)],
          );
          // setting the position of the figure relative to the cube
          figure.position.set(
            x - (scaleX - 1) / 2, // (scaleX - 1) / 2 represents half the size of the cube in this axes.
            y - (scaleY - 1) / 2,
            z - (scaleZ - 1) / 2
          );

          figures.push({
            mesh: figure,
            x: figure.position.x,
            y: figure.position.y,
            z: figure.position.z,
          }); // pushing new figure to our figures array

          scene.add(figure);
        }
      }
    }
  },

  // Making all figures, inside of cube, fly different ways and disappearing in the end
  Explode: () => {
    const { x: scaleX, y: scaleY, z: scaleZ } = cube.scale;

    figures.forEach(figure =>
      gsap.to(figure.mesh.position,
        {
          duration: 2,
          x: Math.random() * (scaleX - (-scaleX)) + (-scaleX),
          y: Math.random() * (scaleY - (-scaleY)) + (-scaleY),
          z: Math.random() * (scaleZ - (-scaleZ)) + (-scaleZ),
        }
      )
    )
  },

  // Set figures position to its original state
  Assemble: () => {
    figures.forEach(figure =>
      gsap.to(figure.mesh.position, {
        duration: 2,
        x: figure.x,
        y: figure.y,
        z: figure.z,
      })
    );
  },
}
