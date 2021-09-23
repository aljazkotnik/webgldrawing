
/* 3D
import MeshRenderer from "./renderers/MeshRenderer.js";

// The MeshRenderer is the engine that draws the scene.
let renderer = new MeshRenderer();

// Add the players in. The HTML will position hte frames.
for(let i=0; i<100; i++){
	renderer.add(i)
} // for


// In the end the renderer will have to wait for the data to be loaded. Therefore the update loop should be outside.
renderer.draw()

console.log(renderer)
*/
// It works!!! 


// 2D

import MeshRenderer2D from "./renderers/MeshRenderer2D.js";

// The MeshRenderer is the engine that draws the scene.
let renderer = new MeshRenderer2D();

// Add the players in. The HTML will position hte frames.
for(let i=0; i<4; i++){
	renderer.add(i)
} // for


// In the end the renderer will have to wait for the data to be loaded. Therefore the update loop should be outside.
renderer.draw()

console.log(renderer)


/* To do: 
  DONE: - allow scrolling
  DONE: - add style to frames.
  DONE: - make divs appear side by side also
  DONE: - don't update invisible divs
  DONE: - zooming, panning
  
  DONE: use the actual data
  DONE: value based color shader calculation
  DONE: (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  - dragging frames around
  - pinch gestures
  DONE: auto set the original domain (DONE (width, height), near/far plane)
*/

// For 2D drawing the transformation matrices have to be different. That means that the ViewFrame needs to be changed, as that implements the matrices.