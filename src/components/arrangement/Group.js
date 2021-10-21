import {html2element} from "./helpers.js";
import CommentingManager from "../ui/commenting/src/CommentingManager.js";

// This class should just act as an UI and it should use the constituent items for the actual drawing.
// The main difficulty with this is drawing the standard deviation plot. How would that look like in 3D anyway?


let css = {
  view: `
	width: 300px;
	height: 200px;
  `,
  
  ungroupbutton: `
    float: right;  
	border: none;
	background-color: transparent;
	color: gainsboro; 
	cursor: pointer;
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
		<div class="item">
		  <div class="label">
			Group 1
			<button class="ungroup" style="${ css.ungroupbutton }">
			  <i class="fa fa-times" style="font-size: 20px;"></i>
			</button>
		  </div>
		  <div class="view" style="${ css.view }"></div>
		  <div class="playcontrols"></div>
		  <div class="commenting"></div>
		</div>
	  </td>
	  <td style="vertical-align: top;">
		<div class="bookmarks">
		</div>
	  </td>
	</tr>
	</tbody>
  </table>
</div>
`; // template


let bookmarktemplate = `<div class="mark" style="${ css.bookmark }"></div>`;

/*
let template = `
<div style="position: absolute;">
    <div class="label">
      Group
	  <button class="ungroup" style="${ css.ungroupbutton }"><i class="fa fa-times" style="font-size: 20px;"></i></button>
    </div>
	<div class="view" style="${ css.view }"></div>
	<div class="bookmarks" style="${ css.bookmarks }"></div>
</div>
`; // template



If the group were to be a separate ViewFrame subclass, then the grouping cannot just be tagged on. 
*/


// When made it should have a series of squares, which when moused over will move between the individual items. Where should these controls be placed though? How should the title be made visible?
// Maybe controls should be above, and the name should change? Then the comments can always be below. Should there be a comment section for all of them at once? I guess so, so that they can all be characterised together.
// Ok, comment sections can be turned off - only the playbar is needed! It also needs a way to remove the group alltogether. A cross in the right top.

// This needs to reorder the items in the rendering.items so that te moused over one is the one drawn on top. Fo that it needs access to that array.
export default class Group{
  constructor(drawingorder, members){
	let obj = this;
	obj.node = html2element(template);
	obj.wrappednode = obj.node.querySelector("div.item");
	obj.bookmarks = obj.node.querySelector("div.bookmarks");
	
	obj.drawingorder = drawingorder;
	obj.members = members;
	
	// Calculate where the node should be added:
	let n = obj.members.length;
	obj.pos = obj.members.reduce((acc, item)=>{
		let p = [parseInt( item.node.style.left ), parseInt( item.node.style.top )]
		acc.group[0] += p[0]/n;
		acc.group[1] += p[1]/n;
		acc.items.push(p);
		return acc
	}, {group: [0,0], items: []})
	
	obj.node.style.left = obj.pos.group[0] + "px";
	obj.node.style.top = obj.pos.group[1] + "px";
	
	// All the members should also be moved to this position. Turn off their uis, wih the exception of the playbar. Also remember their relative positions?
	obj.members.forEach(item=>{
		item.node.style.left = obj.pos.group[0] + "px";
		item.node.style.top = obj.pos.group[1] + "px";
		
		item.node.style.boxShadow = "none";
		item.node.querySelector("div.label").style.color = "transparent";
		
		item.ui.chapterform.node.style.display = "none";
		item.ui.commenting.node.style.display = "none";
	}) // forEach
	
	
	// Removal of the group.
	obj.node.querySelector("button.ungroup").onclick = function(){
	  obj.remove();
	} // onclick
	
	
	// The view events should be passed down to the current item.
	obj.current = obj.members[obj.members.length-1];
	
	let view = obj.node.querySelector("div.view");
	view.onmousedown  = function(e){ obj.current.cameraMoveStart(e) };
	view.onmousemove  = function(e){ obj.current.cameraMove(e) };
	view.onmouseup    = function(e){ obj.current.cameraMoveEnd() };
	view.onmouseleave = function(e){ obj.current.cameraMoveEnd() };
	view.addEventListener("wheel", (e)=>{
	  e.preventDefault();
	  obj.current.cameraZoom(e);
	}, {passive: false})
	
	// Move the playbar from the member to the group for interaction.
	obj.borrowPlayerControls();
	
	
	
	// Add ina commenting module. Which id should it use? Maybe the one of the current object?
	obj.commenting = new CommentingManager( obj.current.ui.commenting.viewid );
	obj.node.querySelector("div.commenting").appendChild( obj.commenting.node );
	
	
	obj.update();
	
  } // constructor
  
  
  update(){
	let obj = this;
	// Make a bookmark tab for each of the members. When the tab is moused over, the view should change. How will I see this? All hte data is the same currently? Maybe set them to different time steps?
	// Items should also be moved in order to update the view. And they should be triggered to draw.
	obj.members.forEach((item, i)=>{
		let bookmark = html2element( bookmarktemplate );
		obj.bookmarks.appendChild(bookmark);
		bookmark.onmouseenter = function(){
			obj.highlightBookmark(bookmark);
			obj.returnPlayerControls();
			
			// Place the item at the end of the draing line.
			obj.drawingorder.splice(obj.drawingorder.indexOf(item), 1);
			obj.drawingorder.push(item)
			
			obj.current = item;
			obj.commenting.viewid = obj.current.ui.commenting.viewid;
			obj.borrowPlayerControls();
		} // onmouseover
		
		if(obj.current == item){ obj.highlightBookmark(bookmark); } // if
	}) // forEach
	  
	// Collect all hte member comments, and put them into a combined commenting item.
	let allComments = obj.members.reduce((acc, member)=>{
		return acc.concat(member.ui.commenting.comments);
	}, []).map(commentobj=>commentobj.config).sort(function(a,b){
		return Date.parse(a.time)-Date.parse(b.time);
	}) // reduce().sort()
	console.log(allComments,obj)
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
  
  borrowPlayerControls(){
	let obj = this;
	obj.node.querySelector("div.playcontrols").appendChild(obj.current.ui.playcontrols.node);
  } // borrowPlayerControls
  
  returnPlayerControls(){
	let obj = this;
	obj.current.ui.node.insertBefore(obj.current.ui.playcontrols.node, undefined);
  } // returnPlayerControls
  
  
  remove(){
	// All the members should be made visible again, and their comment sections should be turned back on, and they should be staggered to their relative psitions.
	let obj = this;
	
	
	// Move the playbar back to its rightfl owner.
	obj.returnPlayerControls();
	  
	obj.node.remove();
		
	// Redistribute the items according to their original positions.`		
	obj.members.forEach((item, i)=>{
		item.node.style.left = obj.pos.items[i][0] + "px";
	    item.node.style.top = obj.pos.items[i][1] + "px";
		
		item.node.style.boxShadow = "1px 2px 4px 0px rgba(0,0,0,0.25)";
		item.node.querySelector("div.label").style.color = "#888";
		
		item.ui.chapterform.node.style.display = "";
		item.ui.commenting.node.style.display = "";
	})
  } // remove
} // Group