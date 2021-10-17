// Move the hierarchy to CORE!!
import { dimensioning } from "./dimensioning.js";
import TreeHierarchy from "./TreeHierarchy.js";

import {svg2element, joinDataToElements, scaleCategorical} from "./helpers.js";



/* TODO
- Connect to a scatter plot for interactive tag addition.
- Handle unassigned tasks.
*/

/* ADVANCED
- Single parent bundles should allow for straight links too.

- How to display very large trees?
	Make the tree zoomable?

- How should the group descriptions be presented? 
	Number of tasks, number of children, text description, AUTHOR!! All the data is available. Maybe on text hover all the information should be displayed?? Maybe in a tooltip?
- Which label to select when making nodes?
	The current author should be allowed to control their branch. This would require some differentiation between users. Certainly can't be done now. For now just select the first one?
- How to merge the groups interactively? I.e. a git pull.
*/

/* DONE
- Collapsible nodes - collapse, with the folding history saved.
- Enforce partial branches to be inserted - tree created on bundle level.
- Make text unselectable - add into app css
- Fix node mouseover css - css affects specific child of mover g.
*/




let template = `
<g transform="translate(20, 20)">
  <g class="bundles"></g>
  <g class="nodes"></g>
  <g class="nodetooltip"></g>
  <g class="linktooltip"></g>
</g>
`;



export default class TreeRender {
	constructor(){
		let obj = this;
		
		// Hierarchy
		obj.hierarchy = new TreeHierarchy();
		
		
		// Drawing
		obj.node = svg2element( template );
		obj.gnodes = obj.node.querySelector("g.nodes");
		obj.gbundles = obj.node.querySelector("g.bundles");
		
		obj.color = new scaleCategorical();
		
	} // constructor
	
	clear(){
		// When clearing by looping through .children and .remove() it only removed the nodes in the last step. When redrawing it added all of them back somehow...
		let obj = this;
		obj.gnodes.innerHTML = "";
		obj.gbundles.innerHTML = "";
	} // clear
	
	interact(){
		let obj = this;
		obj.clear();
		obj.map = dimensioning( obj.hierarchy.visiblenodes );
		obj.updatenodes();
		obj.updatelines();
	} // interact
	
	
	
	
	update(){
		let obj = this;
		obj.hierarchy.update();
		obj.interact();
	} // update
	
	// The functionality is added in here. Maybe refactor to remove the nestedness??
	updatenodes(){
		let obj = this
		
		obj.map.nodes.forEach(nodeobj=>{
			
			obj.gnodes.appendChild( nodeobj.node );
			nodeobj.update();
			
			
			// Add teh styling changes on mouseover. Clicking the label moves view to the group.
			nodeobj.node.querySelector("g.label").onclick = function(){ 
				obj.moveto(nodeobj) 
			} // onclick
			
			
			// Clicking on hte node just collapses branches.
			nodeobj.node.querySelector("g.marker").onclick = function(){
				nodeobj.hidden = !nodeobj.hidden;
				obj.interact();
			} // onclick

		}) // forEach
		
	} // updatenodes
	
	
	updatelines(){
		let obj = this;
		
		// The renderer controls the color of the lines!!
		obj.map.bundles.forEach(bundleobj=>{
			obj.gbundles.appendChild( bundleobj.node )
			bundleobj.update( obj.color.dom2range(bundleobj.author) )
		}) // forEach
	} // updatelines
	
	moveto(nodeobj){
		// I want to move to the group which contains only tasks given by "nodeobj.connections.group.members", but I also want to show all the groups within that grop.
		console.log("Move to", nodeobj.connections.group.members)
	} // moveto
	
} // TreeRender