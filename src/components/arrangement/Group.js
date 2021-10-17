import {html2element} from "./helpers.js";

// This class should just act as an UI and it should use the constituent items for the actual drawing.
// The main difficulty with this is drawing the standard deviation plot. How would that look like in 3D anyway?

let template = `
<div class="item item-group" style="position: absolute;">
  <div class="label">
    Group
	<button class="ungroup" style="float: right; background-color: white; border: none; color: gainsboro;"><i class="fa fa-times" style="font-size: 20px;"></i></button>
  </div>
  <div class="view" style="width:300px; height:200px; opacity:0.001;">
  </div>
</div>
`; // template


// When made it should have a series of squares, which when moused over will move between the individual items. Where should these controls be placed though? How should the title be made visible?
// Maybe controls should be above, and the name should change? Then the comments can always be below. Should there be a comment section for all of them at once? I guess so, so that they can all be characterised together.
// Ok, comment sections can be turned off - only the playbar is needed! It also needs a way to remove the group alltogether. A cross in the right top.

export default class Group{
  constructor(members){
	let obj = this;
	obj.node = html2element(template);
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
		
		item.ui.chapterform.node.style.display = "none";
		item.ui.commenting.node.style.display = "none";
	}) // forEach
	
	
	// Removal of the group.
	obj.node.querySelector("button.ungroup").onclick = function(){
	  obj.node.remove();
		
	  // Redistribute the items according to their original positions.`	
		
	  obj.members.forEach((item, i)=>{
		item.node.style.left = obj.pos.items[i][0] + "px";
	    item.node.style.top = obj.pos.items[i][1] + "px";
		
		item.ui.chapterform.node.style.display = "";
		item.ui.commenting.node.style.display = "";
	  })
	} // onclick
	
  } // constructor
  
  remove(){
	  // All the members should be made visible again, and their comment sections should be turned back on, and they should be staggered to their relative psitions.
	  let obj = this;
	  
	  obj.members.forEach(item=>{
		item.ui.chapterform.node.style.display = "";
		item.ui.commenting.node.style.display = "";
	  }) // forEach
	  
	  obj.node.remove();
  } // remove
} // Group