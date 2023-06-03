import GUI from 'lil-gui';
import { cube } from './Scene.js';
import { actions } from './Actions.js';

//All inputs are stored here
const gui = new GUI();

// Cube inputs
gui
  .add(cube.scale, 'x')
  .min(1)
  .step(1);
gui
  .add(cube.scale, 'y')
  .min(1)
  .step(1);
gui
  .add(cube.scale, 'z')
  .min(1)
  .step(1);

//Generate/Explode buttons
gui
  .add(actions, 'Generate');
gui
  .add(actions, 'Explode');
