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

//Actions buttons
gui
  .add(actions, 'Generate');
gui
  .add(actions, 'Explode')
  .onChange(() => { // if Explode pressed
    gui.controllers[4].show(false); // it's becomes invisible
    gui.controllers[5].show(true); // and Assemble becomes visible
  })
gui
  .add(actions, 'Assemble')
  .show(false)
  .onChange(() => { // if Explode pressed
    gui.controllers[4].show(true); // Explode becomes visible
    gui.controllers[5].show(false); // and Assemble becomes invisible
  })
