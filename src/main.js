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
  
  DONE: - expandable description and tools section?
  DONE: - adding chapter annotations
      The annotations are not really chapters. They can be, but they should also support having a start AND end points, and be allowed to overlap. The playbar san still show them in order of appearance, but a more general view of the tag annotations should be available.
  DONE comments, reintroduce tags as threads
  - spatial arranging and metadata connection
  DONE: - tree hierarchy
	  Need to still connect the tag adding to update the navigation tree. Maybe in this smaller example it's better to have the tree just under the title?
  DONE grouping (hierarchy operates on tags, and is thus independent of grouping)
  - lasso
	  How do I want the lasso to work? Do I want the toolbar? Or is it better to just make the group straightaway? In that case where should the option to make ordinal tags be?
	  Because it' grouping, categorical tags (can use the chapter form), and ordinal tags.
  
  - put it all on a github webpage??
  
*/

/*

Arranging by metadata: some metadata will change with respect to time. But those will have to be collected on the go - because the players can be navigated to different times. It's easiest to have this metadata attached to the timesteps. This is ok for now.

Unsteady dbslice: How should the unsteady dbslice handle this data? Should every timestep be a different row in the metadata? Or should unsteady metadata be structured differently, with each attribute being an array of time-value pairs?

*/



// Hierarchy expects each task object to have some tags. Maybe the metadata should be loaded in from some database, and then converted to an object which includes the tags?
var metadata = [
{taskId: "0", label: "Maybe we", slice: "./data/testmetadata.json"},
{taskId: "1", label: "should add", slice: "./data/testmetadata_copy0.json"},
{taskId: "2", label: "some more", slice: "./data/testmetadata_copy1.json"},
{taskId: "3", label: "tasks.", slice: "./data/testmetadata_copy2.json"},
] // metadata

// The actual metadata to use during arrangement etc is stored on the timesteps that are loaded by the individual players. In hte end all the metadata should be in the metadata above, and the players should recieve all the rows that correspond to a single task.
let ordinal = ["s"]



let canvas = document.getElementById("canvas");
let container = document.getElementById("table-top");
let svg = document.querySelector("svg.hud");

// The MeshRenderer implements the frag and color shaders, and runs the main drawing loop.
import MeshRenderer2D from "./renderers/MeshRenderer2D.js";
let renderer = new MeshRenderer2D(canvas, container);

// Add the players in. The HTML will position hte frames.
for(let i=0; i<4; i++){
	let m = metadata[i];
	// Player is added within the MeshRenderer because it needs the 'gl'.
	let p = renderer.add(m.slice);
	p.title(m.label);
	p.ui.metadata = m;
} // for

// The renderer starts updating straight away. It's the responsibility of the geometries to provide something to draw. In the end some initial geometry is provided as default, as the buffers are initialised straight away.
renderer.draw()
console.log(renderer)








// Knowledge manager handles the communication with the server, the updating of the relevant modules, and the grouping, navigation, and spatial arrangement.
import KnowledgeManager from "./components/KnowledgeManager.js";
let km = new KnowledgeManager( renderer.items, container, svg );
console.log(km)








// COMMENTING: Add the login info.
let login = document.querySelector("div.login").querySelector("input");
login.oninput = function(){
  renderer.items.forEach(item=>{
	item.ui.user = login.value;
  }) // forEach
  
  // Groups also need the author to be updated.
  km.grouping.groups.forEach(group=>{
	group.user = login.value;
  }) // forEach
} // oninput











/*
Adding/removing items to/from groups changes the groups. The changes should only be saved on demand. There should be a button that allows appears when changes were made. 

The changes should allow only a new group to be made, or the old one dissolved. To dissolve a group it's annotations need to be removed. For this the annotations will require to have annotation ids.

Only allow the author of hte group to dissolve it. Also means the groups need to follow the current author.


Dissolving deletes the annotations by the current user.
Saving the edited changes just makes new annotations? Or first deletes all theold ones, and then saves the new ones?


Change the chapterform also! It should allow submitting annotations without a starttime, but only those with a starttime can be added as chapters.
*/













