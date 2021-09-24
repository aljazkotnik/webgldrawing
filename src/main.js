// The mesh renderer implements the frag and color shaders, and runs the main drawing loop.
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
  
  DONE: - use the actual data
  DONE: - value based color shader calculation
  DONE: - (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  DONE: - auto set the original domain (DONE (width, height), near/far plane)

  - dragging frames around
  - pinch gestures

  - play multiple views at once.
  - loading buffering
  
  - chapter annotations
  - comments, reintroduce tags as threads
  - spatial arranging and metadata connection
  - tree hierarchy
  - grouping (hierarchy operates on tags, and is thus independent of grouping)
*/

// Padding can be clicked on, margin cannot.


// Add the dragging of the frames here. For that first loop over all the view divs, readjust their positions to position absolute, and then add the dragging.
// The dragging is done outside because I wish the rest of the interactivity - spatial arrangement, grouping to be added on top of this. That should make those aspects more general.

// Maybe it didn't work because after one item is adjusted the others change position? In that case let's try to first collect all the positions, and then change the positioning style.
let positions = renderer.items.reduce((acc,item)=>{
	acc.push([item.node.offsetLeft, item.node.offsetTop])
	return acc
},[])

renderer.items.forEach((item,i)=>{
		
	item.node.style.position = "absolute";
	item.node.style.left = positions[i][0] + "px"
	item.node.style.top = positions[i][1] + "px"
	
	// Add an object to facilitate the dragging.
	item.dragging = {
		active: false,
		itemRelativePosition: [0, 0]
	} // dragging

	item.node.onmousedown = function(e){
		if(e.target == item.node){
			let rect = item.node.getBoundingClientRect();
			
			item.dragging.active = true;
			item.dragging.itemRelativePosition = [
				e.clientX - rect.x,
				e.clientY - rect.y
			];
			
			// Move this item to the end of the drawing queue to ensure it's drawn on top.
			renderer.items.splice(renderer.items.indexOf(item), 1);
			renderer.items.push(item)
		} // if
	} // onmousedown
	item.node.onmousemove = function(e){
		if(item.dragging.active){
			let x = e.pageX - item.dragging.itemRelativePosition[0];
			let y = e.pageY - item.dragging.itemRelativePosition[1];
			
			item.node.style.left = x + "px"
			item.node.style.top  = y + "px"
		} // if
	} // mousemove
	item.node.onmouseup   = function(){
		item.dragging.active = false;
	} // onmouseup

}) // forEach


