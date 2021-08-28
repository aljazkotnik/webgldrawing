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

// It works!!! 

/* To do: 
  DONE: - allow scrolling
  DONE: - add style to frames.
  DONE: - make divs appear side by side also
  DONE: - don't update invisible divs
  DONE: - zooming, panning
  
  - use the actual data
  - value based color shader calculation
  DONE: (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  - dragging frames around
  - pinch gestures
*/