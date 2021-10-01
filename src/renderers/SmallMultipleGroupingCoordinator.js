/* 
Make a class that will be able to perform most coordination tasks required for the spatial harnessing. This involves getting and setting the coordinates of the small multiples.
*/
export default class SmallMultipleGroupingCoordinator {
  constructor(items){
    let obj = this;
	obj.items = items;
	
	// Should the tree navigation system really be used to establish the groups?
	obj.groups = [];
  } // constructor
  
  
  getCurrentPositions(items, variable){
    // Current positions are needed for calculating correlations, or for adding additional metadata variables based on the users actions. How should the positions and the metadata be combined actually? Should there be a specific method for it? If a variable is specified, then return it with the positions.
	return items.map(item=>{
	  let pos = [
		ParseInt(items.node.style.left), 
		ParseInt(items.node.style.top)
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
  
} // SmallMultipleGroupingCoordinator