import { svg2element } from "./helpers.js";
import DrawLink from "./DrawLink.js";

// Lines are drawn in bundles. The links are drawn as two pats, one in color, and the other white. The white paths are in the background and help make the transitions over lines neater. If links were drawn individually then the bundle itself would have an overlap somewhere.	
let template = `
<g class="bundle">
  <path stroke="white" stroke-width="5" fill="none"></path>
  <path stroke="black" stroke-width="2" fill="none"></path>
</g>
`; // tempalte


// These should just be exposed at the link level... The tree level also has them, and it's non hygienic.
let node_label_width = 70
let bundle_width = 4
let line_width = 4
let r = 16

// Bundles are the connections between two levels of nodes.
export default class treebundle{
	// Index is the ranked position of this bundle within hte level. It determines the position of hte vertical line segment, and the corner radius.
	links = []
	_bendi = 0;
	
	constructor(seednode, author){
		// A seed node is passed in to define the bundle parents and thus instantiate a bundle. After instantialisation only the children of the bundle can change.
		// NOTE: seednode is a `treenode' instance, but parents and children are `taskgroup' instances. The level is only defined for the node because it can change when the user interacts with the tree.
		let obj = this;
		obj.node = svg2element( template );
		
		obj.author = author,
		obj.level = seednode.level;
		obj.parents = seednode.connections.parents;
	    obj.children = [seednode.connections.group];
		
		obj.nodeChildren = [seednode];
		obj.nodeParents = [];
		
	} // constructor
	
	set bendi(i){
		// When a bunldes bend index is set it should propagate it to all the children.
		let obj = this;
		obj.links.forEach(link=>{
			link.bendi = i;
		}) // forEach
		obj._bendi = i;
	} // bendi
	
	get bendi(){return this._bendi} // get bendi
	
	update(color){
		let obj = this;
		
		let paths = obj.node.querySelectorAll("path");
		for(let i=0; i<paths.length; i++){
			paths[i].setAttribute("d", obj.path)
		} // for
		
		if(color){
			paths[paths.length-1].setAttribute("stroke", color);
		} // if
	} // update
	
	
	addparent(node){
		// Only nodes can be pushed. And only the ones declared upon initialisation!
		let obj = this;
		
		let isNodeAllowed = obj.parents.includes(node.connections.group);
		let isNodeUnknown = !obj.nodeParents.includes(node);
		
		if( isNodeAllowed && isNodeUnknown ){
			obj.nodeParents.push(node);
			obj.updateNodeMinPositions();
		} // if
	} // addparent
	
	addchild(node){
		let obj = this;
		if(!obj.children.includes(node.connections.group)){
			obj.children.push(node.connections.group);
		} // if
		
		if(!obj.nodeChildren.includes(node)){
			obj.nodeChildren.push(node);
			obj.updateNodeMinPositions();
		} // if
	} // addchild
	
	makelinks(){
		let obj = this;
					
		// Links must be made for every child-parent combination. Strictly speaking at least one link must be made for all the children, and at least one link must connect to every parent.
		let links = []
		
		obj.nodeParents.forEach(p=>{
			obj.nodeChildren.forEach(c=>{
				links.push( new DrawLink(p,c) )
			}) // forEach
		}) // forEach
		
		obj.links = links;
		
	} // links
	
	
	// Make the full path here??
	get path(){
		let obj = this;
		return obj.links.map(link=>link.path).join("")
	} // path
	
	
	get width(){
		// The width of the bundle is the fixed horizontal distance plus the number of bundles multiplied by the width reserved for the vertical line segment. The nodes, and therefore the lines are not yet positioned properly, therefore their width cannot be used to calculate the bunlde width. But they can be just summed together though!
		// Note that this is the minimum width of spanning one level, and not the entire width of the bundle, which may include lines spanning multiple levels!
		
		return node_label_width + obj.bundles.length*bundle_width + r;
	} // get width
	
	updateNodeMinPositions(){
		// This should just be run whenever teh parents or the children are changed.
		// Because the links make two 90 degree turns when connecting the parent to the child the radii of these turns constitute the minimum y offset of this bundle relative to the previous one. Furthermore, this is offset relative to the lowest parent! This is important when positioning the child nodes.
		let obj = this;
		
		let y_lowest_parent = obj.nodeParents.reduce((acc, p)=>{
			return acc > p.y ? acc : p.y
		}, 0)
		
		obj.nodeChildren.forEach(child=>{
			child.miny = y_lowest_parent + 2*r;
		}) // forEach
		
	} // y_min
	
} // treebundle