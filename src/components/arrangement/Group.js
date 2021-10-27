import {html2element, scaleLinear} from "./helpers.js";
import CommentingManager from "../ui/commenting/src/CommentingManager.js";

// This class should just act as an UI and it should use the constituent items for the actual drawing.
// The main difficulty with this is drawing the standard deviation plot. How would that look like in 3D anyway?


let css = {
  view: `
	width: 300px;
	height: 200px;
  `,
  
  groupbutton: `
	border: none;
	background-color: transparent;
	color: gainsboro; 
	cursor: pointer;
	padding: 2.3px;
	margin-bottom: 10px;
  `,
  
  bookmark: `
    height: 20px; 
	width: 20px; 
	background-color: gainsboro;
  `
}; // css


// The div.item is the top element when the user clicks to drag. The dragging checks whether drag is the appropriate action (as opposed to view interactions) by checking if the event target equals the item node. For the group that is not so because it has an additional wrapper.
let template = `
<div class="item-group" style="position: absolute;">
  <table style="border-collapse: collapse;">
    <tbody>
	<tr>
	  <td>
		<div class="item-proxy" style="box-shadow: 1px 2px 4px 0px rgba(0,0,0,0.25);">
		  <div class="label">Group</div>
		  <div class="view-proxy"></div>
		  <div class="playcontrols-proxy"></div>
		  <div class="chapterform-proxy"></div>
		  <div class="commenting"></div>
		</div>
	  </td>
	  <td style="vertical-align: top;">
	    <button class="ungroup" style="${ css.groupbutton }">
		  <i class="fa fa-times" style="font-size: 20px;"></i>
		</button>
		<button class="dissolve" style="${ css.groupbutton } display:none;">
		  <i class="fa fa-trash-o" style="font-size: 20px;"></i>
		</button>
		<div class="bookmarks">
		</div>
	  </td>
	</tr>
	</tbody>
  </table>
</div>
`; // template


// Maybe this should be just an empty div over the item, and then that item should be shown? And other ones can just be hidden?? Maybe that is simplst - no moving of the controls needed at all. But commenting? How should that work? Just change the commenting?

let bookmarktemplate = `<div class="mark" style="${ css.bookmark }"></div>`;

/*
BUTTON NEEDS TO BE REINTRODUCED!!

If the group were to be a separate ViewFrame subclass, then the grouping cannot just be tagged on.
If the group is just an empty div that covers the currently shown item, then the interactions are blockd. 
*/


// When made it should have a series of squares, which when moused over will move between the individual items. Where should these controls be placed though? How should the title be made visible?
// Maybe controls should be above, and the name should change? Then the comments can always be below. Should there be a comment section for all of them at once? I guess so, so that they can all be characterised together.
// Ok, comment sections can be turned off - only the playbar is needed! It also needs a way to remove the group alltogether. A cross in the right top.

// This needs to reorder the items in the rendering.items so that te moused over one is the one drawn on top. Fo that it needs access to that array.
export default class Group{
  members = []
  
  constructor(drawingorder, members, tags){
	let obj = this;
	obj.node = html2element(template);
	obj.wrappednode = obj.node.querySelector("div.item-proxy");
    obj.wrappedview = obj.node.querySelector("div.view-proxy");	
	obj.bookmarks = obj.node.querySelector("div.bookmarks");
	obj.node.querySelector("div.label").innerText = tags[0].label;
	obj.tags = tags;
	
	// Drawing order allows the group to changethe order in which the GPU renders the items.
	obj.drawingorder = drawingorder;
	
	
	
	// Calculate where the node should be added. Store the original positions on the items, as long as they are in the group.
	let n = members.length;
	let pos = members.reduce((acc, item)=>{
		acc[0] += parseInt( item.node.style.left )/n;
		acc[1] += parseInt( item.node.style.top )/n;
		return acc
	}, [0,0])
	obj.node.style.left = pos[0] + "px";
	obj.node.style.top = pos[1] + "px";
	
	
	// All the members should also be moved to this position. Turn off their uis, wih the exception of the playbar. Also remember their relative positions?
	members.forEach(item=>{
		obj.add(item);
	}) // foEach
	obj.current = obj.members[0];
	
	
	
	
	
	// pos needs to be made before calling .add, but .add creates initialposition which is needed for calculating pos.
	
	
	
	// Removal of the group.
	obj.node.querySelector("button.ungroup").onclick = function(){
	  obj.remove();
	} // onclick
	
	
	// Dissolving the annotations.
	obj.node.querySelector("button.dissolve").onclick = function(){
		obj.dissolve()
	} // onclick
	
	
	// The view events should be passed down to the current item.
	obj.wrappedview.onmousedown  = function(e){ obj.current.cameraMoveStart(e) };
	obj.wrappedview.onmousemove  = function(e){ obj.current.cameraMove(e) };
	obj.wrappedview.onmouseup    = function(e){ obj.current.cameraMoveEnd() };
	obj.wrappedview.onmouseleave = function(e){ obj.current.cameraMoveEnd() };
	obj.wrappedview.addEventListener("wheel", (e)=>{
	  e.preventDefault();
	  obj.current.cameraZoom(e);
	}, {passive: false})
	
	
	
	
	// Add ina commenting module. Which id should it use? Maybe the one of the current object?
	obj.commenting = new CommentingManager( obj.current.ui.commenting.viewid );
	obj.node.querySelector("div.commenting").appendChild( obj.commenting.node );
	
	obj.updateWrapperSize();
	obj.update();
	
	
	// A flag that allows checking whether the group has been edited by the user.
	obj.edited = false;
  } // constructor
  
  
  // Setting hte user is important to for interactions with the annotations.
  set user(name){
	  let obj = this;
	  
	  // The commenting needs to know who is looking at it.
	  obj.commenting.user = name;
	  
	  // Store the name
	  obj._user = name;
	  
	  // Toggle the dissolve button if the user has any annotations.
	  let currentUserAnnotations = obj.tags.filter(tag=>tag.author==name);
	  if(currentUserAnnotations.length > 0){
		  obj.node.querySelector("button.dissolve").style.display = "";
	  } // if
  } // set user
  
  get user(){
	  return this._user;
  } // get user
  
  // set and get current node ui?? This also ensures that the group div fully covers the actual item, and therefore the group gets dragged as opposed to the individual item.
  set current(item){
	let obj = this;
	
	// First return the ui controls if needed.
	obj.returnUiElements();
	
	// Now append the new current ui controls.
	obj.borrowUiElements(item);
	
	// If the commenting has already been established, update the user.
	if( obj.commenting ){ obj.commenting.user = item.ui.commenting.user; } // if
	
	
	if(obj._current){ obj._current.node.style.display = "none" } // if
	item.node.style.display = "inline-block";
	
	obj._current = item;  
  } // set current
  
  get current(){
	return this._current;
  } // get current
  
  
  updateWrapperSize(){
	let obj = this;
	
	// Interactions with the commening are not possible if the item is covered by an empty div.
	obj.wrappedview.style.width = obj.current.node.querySelector("div.view").style.width;
	obj.wrappedview.style.height = obj.current.node.querySelector("div.view").style.height;
	
  } // updateWrapperSize
  
  borrowUiElements(item){
	let obj = this;
	obj.wrappednode.querySelector("div.playcontrols-proxy").appendChild( item.ui.playcontrols.node );
	obj.wrappednode.querySelector("div.chapterform-proxy").appendChild( item.ui.chapterform.node );
  } // borrowUiElements
  
  returnUiElements(){
	let obj = this;
	let pc = obj.wrappednode.querySelector("div.playcontrols-proxy").children[0];
	if(pc){ obj.current.ui.playControlsWrapperNode.appendChild( pc ) } // if
	
	let cf = obj.wrappednode.querySelector("div.chapterform-proxy").children[0];
	if(pc){ obj.current.ui.chapterFormWrapperNode.appendChild( cf ) } // if
  } // returnUiElements
  
  update(){
	let obj = this;
	// Make a bookmark tab for each of the members. When the tab is moused over, the view should change. First remove allthe bookmarks before updating.
	let bookmarksToRemove = obj.bookmarks.querySelectorAll("div.mark");
	for(let i=0; i<bookmarksToRemove.length; i++){
		bookmarksToRemove[i].remove();
	} // for
	
	// Items should also be moved in order to update the view. And they should be triggered to draw.
	obj.members.forEach((item, i)=>{
		let bookmark = html2element( bookmarktemplate );
		obj.bookmarks.appendChild(bookmark);
		bookmark.onmouseenter = function(){
			obj.highlightBookmark(bookmark);
			
			// Place the item at the end of the draing line.
			obj.drawingorder.splice(obj.drawingorder.indexOf(item), 1);
			obj.drawingorder.push(item)
			
			obj.current = item;
			obj.updateWrapperSize();
		} // onmouseover
		
		var pressTimer
		bookmark.onmouseup = function(){
		  clearTimeout(pressTimer);
		  return false;
		} // onmouseup
		bookmark.onmousedown = function(){
		  pressTimer = window.setTimeout(function(){
			obj.release(item, obj.getReleaseScales());
			obj.members.splice(obj.members.indexOf(item), 1);
			obj.current = obj.members[0];
			obj.update();
		  },2000);
		  return false; 
		} // onmousedown
		
		if(obj.current == item){ obj.highlightBookmark(bookmark); } // if
	}) // forEach
	  
	// Collect all hte member comments, and put them into a combined commenting item.
	obj.commenting.clear();
	
	let allComments = obj.members.reduce((acc, member)=>{
		return acc.concat(member.ui.commenting.comments);
	}, []).map(commentobj=>commentobj.config).sort(function(a,b){
		return Date.parse(a.time)-Date.parse(b.time);
	}) // reduce().sort()
	
	
	allComments.forEach(comment=>{
		obj.commenting.add(comment)
	}) // forEach
	
  } // update
  
  highlightBookmark(b){
	let obj = this;
	let allBookmarks = obj.bookmarks.querySelectorAll("div.mark");
	for(let i=0; i<allBookmarks.length; i++){
		allBookmarks[i].style.backgroundColor = b == allBookmarks[i] ? "gray" : "gainsboro";
	} // for
  } // highlightBookmarks
  
  
  
  remove(){
	// All the members should be made visible again, and their comment sections should be turned back on, and they should be staggered to their relative psitions.
	let obj = this;
	
	// First return the ui elements so that the items are again complete.
	obj.returnUiElements();
	
	
	// When ungrouping the items should be positioned close to where the group used to be (within 1 width of the item). Position the exiting items within 1 width of the top left corner.
	
	// What I really want is to get the maximum relative distances, scale them down, and then calculate where to position hte items.
	let scales = obj.getReleaseScales();
	
		
	// Redistribute the items according to their original positions.`		
	obj.members.forEach((item, i)=>{
		obj.release(item, scales);
	}) // forEach
	obj.members = [];
	
	// Remove the actual DOM.
	obj.node.remove();
  } // remove
  
  release(item, scales){
	let obj = this;
	// Need to calculate the position to release to...
		
	
	item.node.querySelector("div.label").style.color = "#888";
	item.node.style.display = "inline-block";
	item.ui.node.style.display = "";
	item.node.style.boxShadow = "1px 2px 4px 0px rgba(0,0,0,0.25)";
	
	
	let x = parseInt(item.node.style.left) + scales.x.dom2range(item.initialposition[0]);
	let y = parseInt(item.node.style.top) + scales.y.dom2range(item.initialposition[1]);
	
	item.node.style.left = x + "px";
	item.node.style.top = y + "px";
	
	delete item.initialposition
	
	obj.edited = true;
  } // release
  
  add(item){
	// Add an item to the group by dragging it over the group.
	let obj = this;
	obj.members.push(item);
	
	// Make a temporary attribute to store the position at which the noe was collected.
	item.initialposition = [parseInt( item.node.style.left ), parseInt( item.node.style.top )];
	
	item.node.style.left = obj.node.style.left;
	item.node.style.top = obj.node.style.top;
	item.node.querySelector("div.label").style.color = "transparent";
	item.node.style.boxShadow = "none";
	item.node.style.display = obj.current == item ? "inline-block" : "none";
	item.ui.node.style.display = "none";
	
	// A flag highlighting that the group has changed.
	obj.edited = true;
  } // add

  dissolve(){
	let obj = this;
	
	// Soo, find all hte annotations that can be dissolved, and then dissolve them. This will require a call to the knowledge manager. How should this be messaged upstream?
	let currentUserAnnotations = obj.tags.filter(tag=>tag.author==obj.user);
	obj.dissolveexternal( currentUserAnnotations );
	obj.remove();
  } // dissolve
  
  actualise(){
	let obj = this;
	
	// Similarto before, first dissolve all the annotations by this user, and then add new annotations for all members.
	let currentUserAnnotations = obj.tags.filter(tag=>tag.author==obj.user);
	obj.dissolveexternal( currentUserAnnotations );
	
	let t = Date();
	let newAnnotations = obj.members.map((item,i)=>{
	  return {
		id: `${obj.user} ${t} ${i}`, 
		taskId: item.ui.metadata.taskId, 
		label: obj.node.querySelector("div.label").innerText, 
		author: obj.user
	  }
	})
	obj.createexternal(newAnnotations);
  } // actualise
  
  
  dissolveexternal(a){ 
	console.log("Remove annotations: ", a); 
  } // dissolveexternal
  
  createexternal(a){
	console.log("Make annotations: ", a)
  }
  
  getReleaseScales(){
	let obj = this;
	let domain = obj.members.reduce((acc,member)=>{
		acc.x[0] = acc.x[0] > member.initialposition[0] ? member.initialposition[0] : acc.x[0];
		acc.x[1] = acc.x[1] < member.initialposition[0] ? member.initialposition[0] : acc.x[1];
		
		acc.y[0] = acc.y[0] > member.initialposition[0] ? member.initialposition[0] : acc.y[0];
		acc.y[1] = acc.y[1] < member.initialposition[0] ? member.initialposition[0] : acc.y[1];
		 
		return acc
	}, {x: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY], y: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]})
	
	let xscale = new scaleLinear();
	xscale.domain = domain.x;
	xscale.range = [-150, 150];
	
	let yscale = new scaleLinear();
	yscale.domain = domain.y;
	yscale.range = [-150, 150];  
	
	return {x: xscale, y: yscale}
  } // releaseScales

} // Group