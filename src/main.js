/* To do: 
  DONE: - allow scrolling
  DONE: - add style to frames.
  DONE: - make divs appear side by side also
  DONE: - don't update invisible divs
  DONE: - zooming, panning
  
  DONE: - use the actual data
  DONE: - value based color shader calculation
  DONE: - (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  DONE: - auto set the original domain (DONE (width, height), near/far plane)

  DONE: - dragging frames around
  - auto selecting the height of the viewport in pixels
  - pinch gestures

  - play multiple views at once.
  - loading buffering && data limitation, and subsequent viewframe number limitation.
  
  - expandable description and tools section?
  - adding chapter annotations
  - comments, reintroduce tags as threads
  - spatial arranging and metadata connection
  - tree hierarchy
  - grouping (hierarchy operates on tags, and is thus independent of grouping)
  
  - put it all on a github webpage??
*/

// The mesh renderer implements the frag and color shaders, and runs the main drawing loop.
import MeshRenderer2D from "./renderers/MeshRenderer2D.js";
import { addDraggingToSiblingItems } from "./renderers/dragging.js";

// The MeshRenderer is the engine that draws the scene.
let renderer = new MeshRenderer2D();


// Make some makeshift metadata here. From here it should flow down to hte geometry etc.
// In this case the metadata holds the reference to the unsteady simulation metadata, which then holds the references to the actual files required for rendering.
var metadata = [
{label: "Maybe we", slice: "./data/testmetadata.json"},
{label: "should add", slice: "./data/testmetadata.json"},
{label: "some more", slice: "./data/testmetadata.json"},
{label: "tasks.", slice: "./data/testmetadata.json"},
] // metadata

// Add the players in. The HTML will position hte frames.
for(let i=0; i<4; i++){
	let m = metadata[i];
	let p = renderer.add(m.slice);
	p.title(m.label);
	p.metadata = m;
} // for


// The renderer starts updating straight away. It's the responsibility of the geometries to provide something to draw. In the end some initial geometry is provided as default, as the buffers are initialised straight away.
renderer.draw()

console.log(renderer)


// Add the dragging externally.
addDraggingToSiblingItems(renderer.items)


/*
Chapter are actually added as ordinal variables - they have a name, and a timestep value. So they are not simple tags. But the metadata ordinal variables definitely should not appear as chapters. But the correlation between both should be available.
*/


