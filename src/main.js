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
      The annotations are not really chapters. They can be, but they should also support having a start AND end points, and be allowed to overlap. The playbar san still show them in order of appearance, but a more general view of the tag annotations should be available.
  DONE comments, reintroduce tags as threads
  - spatial arranging and metadata connection
  - tree hierarchy
  - grouping (hierarchy operates on tags, and is thus independent of grouping)
  
  - put it all on a github webpage??
  
*/

// The mesh renderer implements the frag and color shaders, and runs the main drawing loop.




// "C:/Users/ak2164/Documents/CAMBRIDGE/PhD/github_repos/webgldrawing/src/components/ui/commenting/commentingServerCommunications.js"




// Make some makeshift metadata here. From here it should flow down to hte geometry etc.
// In this case the metadata holds the reference to the unsteady simulation metadata, which then holds the references to the actual files required for rendering.
// There should be an overhead object attached to eachtask? So that the filtering still happens on hte actual object read from hte json, but all the other metadata - tags,... are stored in hte overhead?
var metadata = [
{label: "Maybe we", slice: "./data/testmetadata.json", tags: []},
{label: "should add", slice: "./data/testmetadata_copy0.json", tags: []},
{label: "some more", slice: "./data/testmetadata_copy1.json", tags: []},
{label: "tasks.", slice: "./data/testmetadata_copy2.json", tags: []},
] // metadata







// The MeshRenderer is the engine that draws the scene.
import MeshRenderer2D from "./renderers/MeshRenderer2D.js";
let renderer = new MeshRenderer2D();

// Add the players in. The HTML will position hte frames.
for(let i=0; i<4; i++){
	let m = metadata[i];
	// Player is added within the MeshRenderer because it needs the 'gl'.
	let p = renderer.add(m.slice);
	p.title(m.label);
	p.metadata = m;
} // for

// The renderer starts updating straight away. It's the responsibility of the geometries to provide something to draw. In the end some initial geometry is provided as default, as the buffers are initialised straight away.
renderer.draw()
console.log(renderer)







// Add the dragging externally. The tabletop was positioned absolutely, with top: 0px. If this is not so the dragging will move the items on the initial drag start by the offset amount.
import { addDraggingToSiblingItems } from "./components/arrangement/dragging.js";addDraggingToSiblingItems(renderer.items, 80);






// COMMENTING: Add the login info.
let login = document.querySelector("div.login").querySelector("input");
login.oninput = function(){
  renderer.items.forEach(item=>{
	item.ui.user = login.value;
  }) // forEach
} // oninput






// Load some test comments.
import { getRequiredComments, sendCommentChanges } from "./components/ui/commenting/commentingServerCommunications.js";
getRequiredComments( renderer.items.map( item=>item.ui.commenting ) )


/*
Chapter are actually added as ordinal variables - they have a name, and a timestep value. So they are not simple tags. But the metadata ordinal variables definitely should not appear as chapters. But the correlation between both should be available.
*/




// The tags in the metadata and the comments are separate things! So comments can just keep track of their own tags, but the full annotations of the metadata are required for the navigation. The small multiples can just add to their metadata. Eventually the server should just be pushing the new updated annotations to the client all the time to keep it up to speed, which will be a good time to update the maps. Maybe it can even be done periodically?

// For navigation the tags must be like: {id: "Root", author: "session"};

// Tag adding works directly on the metadata. That means it's not exposed here - which means its more difficult to decide when to update. If it's on a hidden HUD then when it's toggled on. But what about the small map?
let navigationdiv = document.querySelector("div.navigation-background");
let navigationsvg = navigationdiv.querySelector("svg.navigation");
import TreeRender from "./components/ui/treenavigation/TreeRender.js"
let treenavigation = new TreeRender(metadata);
navigationsvg.appendChild(treenavigation.node)
treenavigation.update()

document.querySelector("button.navigation").onclick = function(){navigationdiv.style.display = "none"}; 
navigationdiv.onclick = function(event){ navigationdiv.style.display = "none"; }
navigationsvg.onclick = function(event){ event.stopPropagation(); }

// Maybe htere should be two separate trees. One that shows all the data at once, and another that just shows the small multiples in the view?


























