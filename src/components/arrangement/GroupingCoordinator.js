import { addDraggingToSiblingItems, addDraggingToItem } from "./dragging.js";
import { arrayIncludesAll } from "./treenavigation/helpers.js"
import TreeRender from "./treenavigation/TreeRender.js";
import Group from "./Group.js";

/* 
Make a class that will be able to perform most coordination tasks required for the spatial harnessing. This involves getting and setting the coordinates of the small multiples.


Should groups allow the user to enter them? Maybe its simpler to restrict the navigation solely to the navigation tree. Otherwise when clicking on a group node it has to communicate to the GroupingCoordinator to initiate the change, and also keep track of the descendant groups.

If navigation is constrained to the navigation tree, then groups can just be an array of arrays of tasks. Maybe the navigation trre should be controlled from within here? And then the hierarchy can be used to create the groups on the go?
	

*/

export default class GroupingCoordinator {
  constructor(container, items){
    let obj = this;
	obj.container = container;
	obj.items = items;
	obj.tasks = items.map(item=>item.ui.metadata.taskId);
	obj.groups = [];
	
	// First the items need to be draggable to allow for grouping.
	addDraggingToSiblingItems(items, 80);
	
	
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
		
		console.log("Move to", nodeobj )
	} // moveto

	
	
	// Allow the current makeup to be communicated from outside. So a number of groups can be passed into here, and the groups for them should be created. The groups can be simply the taskids. Task ids are better than view ids because they allow groups to be carried over between slices (view ids are slice specific, but allow comments to be specifically targeted.).
	// So, hte parent group needs to be specified, as well as the child groups.
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
		
		// 'obj.items' needs to always be passed in so that when the bookmarks are moused over the drawing order can change.
		let groupitem = new Group(obj.items, members);
		obj.groups.push( groupitem );
		obj.container.appendChild( groupitem.node );
		
		let ondrag = function(){
			groupitem.members.forEach(item=>{
				item.node.style.left = groupitem.node.style.left;
				item.node.style.top = groupitem.node.style.top;
			})
		};
		addDraggingToItem( groupitem, undefined, ondrag );
	}) // forEach
	
	
  } // makeDirectDescendantGroups
  
  
  
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
  
  
  
  setPositionsByMetadata(items, variable){
    // Reposition hte items on screen given their metadata values. Reposition to within the current client viewport, or the whole document? Whole document to spread the small multiples out a bit.
	
	
	
	
  } // setPositionsByMetadata
  
  
  makeGroupFromArrayOfItems(items){
    // Calculate the position of the group and create the html elements required for it. How should the renderer be convinced to draw the appropriate contours? It gets the viewport directly from the ViewFrame, which in this case will be disabled. Allow the group object to pass it's own viewport to the correct item, and use them if the div is set to display none?
	
	
  } // makeGroupFromArrayOfItems
  
} // GroupingCoordinator