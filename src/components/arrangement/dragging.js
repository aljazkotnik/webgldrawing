// Padding can be clicked on, margin cannot. The click event is limited to the padding of the view object. A check is done on mousedown to make sure that interactions with the data don't trigger the div to move. When moving the item needs to be placed at the end of the rendering que, as well as the html order to ensure that it stays on top - so that other items don't draw over it, and that the dragging continues even when mousing over a div that was made after it.

// The dragging is done outside because I wish the rest of the interactivity - spatial arrangement, grouping to be added on top of this. That should make those aspects more general.

// The initial positions must be collected all at the same time, as otherwise the rest of the "position: relative;" divs will get repositioned to where the previous div was.



// How to make the addition of dragging more general?? There are some things that have to happen. Pass them in as additional functions?
export function addDraggingToItem(item, onstart, ondrag, onend){
	// Add an object to facilitate the dragging.
	item.dragging = {
		active: false,
		itemRelativePosition: [0, 0]
	} // dragging

	item.node.onmousedown = function(e){
		if(e.target == item.node || e.target == item.wrappednode){
			let rect = item.node.getBoundingClientRect();
			
			item.dragging.active = true;
			item.dragging.itemRelativePosition = [
				e.clientX - rect.x,
				e.clientY - rect.y
			];
			
			
			// Also move the viewFrame div up so that dragging over otehr higher divs is uninterrupted.
			item.node.parentNode.insertBefore(item.node, null);
			
			if(onstart){onstart()} // if
		} // if
	} // onmousedown
	item.node.onmousemove = function(e){
		if(item.dragging.active){
			let x = e.pageX - item.dragging.itemRelativePosition[0];
			let y = e.pageY - item.dragging.itemRelativePosition[1];
			
			item.node.style.left = x + "px"
			item.node.style.top  = y + "px"
			
			if(ondrag){ondrag()};
		} // if
	} // mousemove
	item.node.onmouseup   = function(){
		item.dragging.active = false;
		if(onend){onend()};
	} // onmouseup
} // addDraggingToItem








