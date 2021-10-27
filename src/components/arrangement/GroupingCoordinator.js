import { addDraggingToItem } from "./dragging.js";
import { arrayIncludesAll } from "./treenavigation/helpers.js"
import TreeRender from "./treenavigation/TreeRender.js";
import Group from "./Group.js";
import lasso from "./lasso.js";

/* 
Make a class that will be able to perform most coordination tasks required for the spatial harnessing. This involves getting and setting the coordinates of the small multiples.


Should groups allow the user to enter them? Maybe its simpler to restrict the navigation solely to the navigation tree. Otherwise when clicking on a group node it has to communicate to the GroupingCoordinator to initiate the change, and also keep track of the descendant groups.

If navigation is constrained to the navigation tree, then groups can just be an array of arrays of tasks. Maybe the navigation trre should be controlled from within here? And then the hierarchy can be used to create the groups on the go?
	

*/

export default class GroupingCoordinator {
  constructor(items, container, svg){
    // Container is only needed if groups need to be appended.
	let obj = this;
	obj.container = container;
	obj.items = items;
	obj.tasks = items.map(item=>item.ui.metadata.taskId);
	obj.groups = [];
	
	// First the items need to be draggable to allow for grouping.
	obj.addDraggingToSiblingItems(80);
	
	
	
	
	// The hierarchy is essentially a function of the grouping. The navigation tree can therefore be used to create teh grouping interface.
	obj.navigation = new TreeRender([]);
	// navigationsvg.appendChild(obj.navigation.node)
	// obj.navigation.update();
	
	obj.navigation.moveto = function(nodeobj){
		// Now remove all existing group items, hide all unnecessary items, calculate the direct descendant groups, and create items for them.
		let current = nodeobj.connections.group.members;
		
		obj.clear();
		obj.showCurrentTasks( current );
		obj.makeDirectDescendantGroups(nodeobj);
	} // moveto


	// Add the treenavigation graphic.
	svg.querySelector("g.tree")
	   .appendChild(obj.navigation.node)
	obj.navigation.update()
	
	// On lasso mouseup the GroupingCoordinator should create an additional group based on the lasso selection. So maybe this should all be moved into the knowledge manager?
	let lassoobj = new lasso(svg);
  } // constructor
  
  
  clear(){
	let obj = this;
	obj.groups.forEach(group=>{
		group.remove();
	})
	obj.groups = [];
  } // clear
  
  // When the parent group is specified the items should be adjusted immediately.
  showCurrentTasks(tasks){
	let obj = this;
	
	// First find if any of the specified tsks are valid.
	let validtasks = tasks.filter(task=>obj.tasks.includes(task));
	
	if(validtasks.length > 0){
		obj.items.forEach(item=>{
			if(validtasks.includes(item.ui.metadata.taskId)){
				item.node.style.display = "";
			} else {
				item.node.style.display = "none";
			} // if
		}) // forEach
	} // if
  } // showCurrentTasks
  
  
  makeDirectDescendantGroups(nodeobj){
	let obj = this;
	
	// First remove all existing groups.
	obj.groups.forEach(group=>{
		group.remove();
	}) // forEach
	
	
	// Find all groups that should appear.
	let descendants = nodeobj.connections.descendants;
	let directDescendants = descendants.filter(group=>{
		return !descendants.some(d=>{
			if(d != group){
				return arrayIncludesAll(d.members, group.members)
			} // if
			return false
		}) // some
	}) // filter
	
	
	// Make all groups that should appear.
	directDescendants.forEach(d=>{
		// Pass the actual item objects to the group.
		let members = obj.items.filter(item=>{
			return d.members.includes(item.ui.metadata.taskId);
		}) // filter
		
		// 'obj.items' needs to always be passed in so that when the bookmarks are moused over the drawing order can change. Tags are passed in to allow changes to be made.
		let groupitem = new Group(obj.items, members, d.tags);
		obj.groups.push( groupitem );
		obj.container.appendChild( groupitem.node );
		
		let ondrag = function(){
			groupitem.members.forEach(item=>{
				item.node.style.left = groupitem.node.style.left;
				item.node.style.top = groupitem.node.style.top;
			})
		};
		addDraggingToItem( groupitem, undefined, ondrag );
		
		groupitem.dissolveexternal = function(a){
			obj.dissolveexternal(a);
		} // function
		
		groupitem.createexternal = function(a){
			obj.createexternal(a);
		} // function
	}) // forEach
	
	
  } // makeDirectDescendantGroups
  
  // Proxies.
  dissolveexternal(a){ console.log("Remove annotations", a) } // dissolveexternal
  createexternal(a){ console.log("Make annotations", a) } // createexternal
  
  
  getCurrentPositions(items, variable){
    // Current positions are needed for calculating correlations, or for adding additional metadata variables based on the users actions. How should the positions and the metadata be combined actually? Should there be a specific method for it? If a variable is specified, then return it with the positions.
	return items.map(item=>{
	  let pos = [
		ParseInt(item.node.style.left), 
		ParseInt(item.node.style.top)
      ];

	  if(variables != undefined){
		pos.push(item.metadata[variable])
	  } // if
	  
	  return pos 
	}) // map
  } // getCurrentPositions
  
  addDraggingToSiblingItems(headeroffset){
	// To add the dragging an additional "dragging" attribute is introduced to the items. The items are ViewFrame objects that all have their nodes inside the same parent node. The parent node must be the same as the initial positions of the frames are calculated based on their current positions within hte parent div.
	let obj = this;

	let positions = obj.items.reduce((acc,item)=>{
		acc.push([item.node.offsetLeft, item.node.offsetTop + headeroffset])
		return acc
	},[])

	obj.items.forEach((item,i)=>{
			
		item.node.style.position = "absolute";
		item.node.style.left = positions[i][0] + "px"
		item.node.style.top = positions[i][1] + "px"
		
		
		let onstart = function(){
			// Move this item to the end of the drawing queue to ensure it's drawn on top.
			obj.items.splice(obj.items.indexOf(item), 1);
			obj.items.push(item)
		} // function
		let onend = function(){
			console.log("Check if item should be added to group");
			
			// It should be either if hte item is fully within hte group, or very close to the top left corner?
			obj.groups.every(group=>{
			  // Item should jut be added to a single group.
			  let addToThisGroup = sufficientlyOverlaid(item, group);
			  if( addToThisGroup ){
				group.add(item);
				group.update();
			  } // if
			  return !addToThisGroup
			}) // every
		}// function
		addDraggingToItem(item, onstart, undefined, onend)
		
	}) // forEach
	
  } // addDraggingToSiblingItems


 
  
  
  
  setPositionsByMetadata(items, variable){
    // Reposition hte items on screen given their metadata values. Reposition to within the current client viewport, or the whole document? Whole document to spread the small multiples out a bit.
	
	
	
	
  } // setPositionsByMetadata
  
  
  makeGroupFromArrayOfItems(items){
    // Calculate the position of the group and create the html elements required for it. How should the renderer be convinced to draw the appropriate contours? It gets the viewport directly from the ViewFrame, which in this case will be disabled. Allow the group object to pass it's own viewport to the correct item, and use them if the div is set to display none?
	
	
  } // makeGroupFromArrayOfItems
  
} // GroupingCoordinator


function sufficientlyOverlaid(item,group){
	let itemrect  = item.node.getBoundingClientRect();
	let grouprect = group.node.getBoundingClientRect();
	
	let itemFullyInGroup = (grouprect.left <= itemrect.left && itemrect.right <= grouprect.right) && 
	                       (grouprect.top  <= itemrect.top  && itemrect.bottom <= grouprect.bottom);
	let itemCloseEnough = ((grouprect.left - itemrect.left)**2 + (grouprect.top - itemrect.top)**2)<40**2;
	
	return itemFullyInGroup || itemCloseEnough
} // sufficientlyOverlaid