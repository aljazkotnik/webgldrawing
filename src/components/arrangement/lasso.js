import {svg2element} from "./helpers.js";


let template = `
<polygon class="lasso" points="" style="fill: cornflowerblue; stroke: dodgerblue; stroke-width: 2; opacity: 0.4;"></polygon>
`; // template


export default class lasso{
	/* 
		`lasso' implements a generic lasso that can be added to svg elements.
	
	The input MUST be an svg element to which a d3.drag event can be applied.
	
	
	If the lasso has access to the data then it can compute the selected tasks as a computed. Otherwise a wrapper may be necessary, that will observe the lasso boundary, and then
	*/
	
	constructor(svg){
		
		// Make reactive??
	
		let obj = this;
	
		obj.svg = svg;
		obj.polygon = svg.appendChild(svg2element(template));
		
		// An internal boundary is used for all the drawing, and an external boundary is presented to other interested modules. Only the exposed boundary is observable. The exposed boundary is used to determine the lasso selection.
		obj._boundary = [];
		obj.boundary = [];

		obj.svg.addEventListener("mousedown", function(event){
			obj.clearBoundary()
			obj.active = true;
		}) // mousedown

		obj.svg.addEventListener("mousemove", function(event){
			if(obj.active){
				obj.addBoundaryPoint(event)
				obj.draw()
			} // if
		}) // mousedown
		
		obj.svg.addEventListener("mouseup", function(event){
			obj.hide()
			
			// The bounadry.replace was mobx functionality.
			obj.boundary = obj._boundary;
			obj.active = false;
		}) // mousedown
	
	} // constructor
	
	
	clearBoundary(){
		let obj = this;
		obj._boundary = [];
	} // clearBoundary

	addBoundaryPoint(event){
		let obj = this;
		
		// The svgbox changes if the user scrolls around in the window.
		let svgbox = obj.svg.getBoundingClientRect();
		
		obj._boundary.push({
			x: event.clientX - svgbox.x,
			y: event.clientY - svgbox.y
		})
		
	} // addBoundaryPoint
	
	
	
	  
	isPointInside(point){
		// Check wheteher the 'point' [pixel coordinates] is within the polygon defined by the points array 'boundary'.
		let obj = this;
		
		// Default answer is no.
		let isInside = false
		
		let n = obj.boundary.length
		if(n>2){
			for(let i=1; i<n; i++){
				// Check whether this edge is being passed when moving from the point to the right. If it passes an even number of edges it's outside, otherwise it's inside.
				let p = passesEdge(obj.boundary[i-1], obj.boundary[i], point)
				isInside = p ? !isInside : isInside
			} // for
			
			// Need to check the same number of edge segments as vertex points. The last edge should be the last and the first point.
			let p = passesEdge(obj.boundary[n-1], obj.boundary[0], point)
			isInside = p ? !isInside : isInside
		} // if
		
		return isInside
	} // isPointInside
		
	draw(){
		let obj = this;
		obj.polygon.setAttribute("points", obj._boundary.map(p=>`${p.x},${p.y}`).join(" "))
	} // draw
	
	hide(){
		// Remove the selection drawing.
		let obj = this
		obj.polygon.setAttribute("points", "")
	} // remove
	
} // lasso



// A ray casting method to check whether a point is within a polygon or not.
function passesEdge(p0, p1, point){
	// One point needs to be above, while the other needs to be below -> the above conditions must be different.
	
	if( (p0.y > point.y) !== (p1.y > point.y) ){
		// One is above, and the other below. Now find if the x are positioned so that the ray passes through. Essentially interpolate the x at the y of the point, and see if it is larger.
		let x = (p1.x - p0.x)/(p1.y - p0.y)*(point.y - p0.y) + p0.x
		return x > point.x
		
	} else {
		return false
	} // if
} // checkIntersect
	