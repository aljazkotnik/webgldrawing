/*
The MeshRenderer should be the one initiating data collection/deleting because it's the only one that can determine which ViewFrames should currently be played.

Therefroe the ViewFrames should have a 'clear' method, which instructs the geometry to delete all the buffer data apart from the current. Furthermore, the ViewFrames need to have a method to tell the geometry to load additional data, and about which time step it should be anchored.

When moving the ViewFrames the player should pause automatically. Maybe it will be possible to keep updating as the frame moves also. But that would then not allow ViewFrames that are behind other ViewFrames to delete their buffers, as they may become visible as the other ViewFrame moves. Maybe for them to offload there should be at least two things covering them up?

The ViewFrame will also host the playbar in the end. So then the MeshRenderer can collect the time spans from the ViewFrames in view, and then time step through them.

Should there just be a minimize button on the ViewFrame so the user can switch a particular small multiple off without burying it under others?

How to pick the current time to play? Should the requestAnimationFrame be running continuously in the background? Yes - otherwise there are no interactions.

Maybe for now just have a single play pause button? And just time step through in percentage terms?

What will happen for simulations with very different time steps? Should just the closest frame be selected? Maybe the simplicity is best. Simulations with large time steps will just not change data that often.

Could the mesh renderer just do the rendering all the time, and teh ViewFrames decide whether or not they need to be played? Then I would only need to figure out how to link multiple views together. Maybe like a chain button that turns on, and when clicking one play button they would all start? So the view would send a command to the scene, and then the scene would start all of the players.
*/

import { html2element } from "./helpers.js";

import {scaleMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix, multiplyArrayOfMatrices, perspectiveMatrix, orthographicMatrix, invertMatrix} from "./matrices.js"


import { Camera2D } from "./Camera.js";

// div must have opacity to register the mouse events!!
// Furthermore the overall wrapper is defined here so that after the class is inherited from there is space to append other modules. The class is inherited from (as opposed to plugged in as a module)
let template = `
<div class="item">
  <div class="label">Label</div>
  <div class="view" style="width:300px; height:200px; opacity:0.001;">
  </div>
</div>
`;



export default class ViewFrame2D{
  constructor(gl){
	let obj = this;
	
	obj.gl = gl;
	obj.node = html2element(template);
	
	// obj.view is a convenience reference that points to the node. Transforms.view is the view transformation matrix.
	obj.view = obj.node.querySelector("div.view");
	
	// Some initial dummy geometry to allow initialisation.
	obj.geometry = { 
	  domain: {
		x: [0, 1],
		y: [0, 1]
	  }
	} // initial dummy values
	
	// Transformation matrices.
	obj.transforms = {};
	
	
	/*
	Interactivity:
	What should clicking and dragging do? Pan, or adjust camera angle? 
	
	For 2D panning is more useful.
	For 3D adjusting the camera angle is better.
	*/
	obj.camera = new Camera2D();
	
	// (e.clientX, e.clientY)
	obj.view.onmousedown  = function(e){ obj.cameraMoveStart(e) };
	obj.view.onmousemove  = function(e){ obj.cameraMove(e) };
	obj.view.onmouseup    = function(e){ obj.cameraMoveEnd() };
	obj.view.onmouseleave = function(e){ obj.cameraMoveEnd() };
	
	// adding a zoom directly causes the passive event warning to come up in the console, and also stops the wheel event from being properly executed.
	// If the div is empty the event does not occur!
	obj.view.addEventListener("wheel", (e)=>{
	  e.preventDefault();
	  obj.cameraZoom(e);
	}, {passive: false})
	
	
  } // constructor
  
  
  /* The geometry moving is implemented in 'computeModelMatrix'. User interaction movement is implemented in 'computeViewMatrix'.  */
  computeModelMatrix() {
    // The model matrix incorporates the initial scaling and translation to make sure the data fits in view.
	let dom = this.geometry.domain;
	
	// First translate left bottom corner to origin, scale so that top right domain corner is at 2,2, and then reposition so that domain is between -1 and 1.
	let k = 2 / Math.max(dom.x[1]-dom.x[0], dom.y[1]-dom.y[0]);
	
	// Correct for the aspect ratio of the view element. For now the y domain is rescaled because the example data featured a larger x domain, and the width was kep constant. This can be made adjustable later.
	let kar = ( dom.x[1]-dom.x[0] ) / ( dom.y[1]-dom.y[0] );
	
	let translateToOrigin = translateMatrix(-dom.x[0], -dom.y[0], 0)
	let scaleToClipSpace = scaleMatrix(k,k*kar,1);
	let translateToScaleSpace = translateMatrix(-1,-1,0);
	
	
    this.transforms.model = multiplyArrayOfMatrices([
	  translateToScaleSpace,
	  scaleToClipSpace,
	  translateToOrigin
	]) // model


	// Performance caveat: in real production code it's best not to create new arrays and objects in a loop. This example chooses code clarity over performance.
  } // computeModelMatrix
  
  computeOrthographicMatrix(){
	// viewport: left, bottom, width, height
	this.transforms.projection = [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
	]
  } // computeOrthographicMatrix
  
  computeViewMatrix() {
	let camera = this.camera;
	
	// PANNING
	let position = translateMatrix(camera.x, camera.y, camera.z);

	// For zooming a scaling operation should be performed. And the zooming should be based on hte pointers position. So that point should stay in hte same position, while the rest of the view scales.
	
	// The values need to be in coordinate units! So the pixel location needs to be changed to value location. Mouse locations are per client window, and so must be corrected for viewport location to ensure consistent zooming behavior. Initially the zooming is not needed.
	
	
	// THE ZOOM POINT MUST BE CONVERTED TO THE CLIP SPACE FROM PIXEL COORDINATES!!! I want to translate to 0,0. That's the middle of the viewport. y has to be calculated in terms of client window.
	
	// For zooming I want the zoomed point to remain where it is at the moment, and everything around it should be scaled. So, for that to happen the mesh needs to be translated by the location of the point in clip coordinates, scaled, and translated back to the same coordinates in pixel values.
	let dx = camera.zoomPointClip[0];
	let dy = camera.zoomPointClip[1];
	let k  = camera.k;
	
	
	
	// let x0 = camera.mouseStart[0] * this.valuePerPixel;
	// let y0 = camera.mouseStart[1] * this.valuePerPixel;
	// let k  = camera.k;
	
	let translateToOrigin    = translateMatrix(-dx, -dy, 0);
	let scaleToZoomSpace     = scaleMatrix(k, k, 1);
	let translateToZoomSpace = translateMatrix(dx, dy, 0);


	// Inverse the operation for camera movements, because we are actually moving the geometry in the scene, not the camera itself.
	// this.transforms.view = invertMatrix( position );
	
	
	this.transforms.view = multiplyArrayOfMatrices([
	  invertMatrix( position ),
	  translateToZoomSpace,
	  scaleToZoomSpace,
	  translateToOrigin
	]) // model
	
  } // computeViewMatrix
  
  
  // On the go updates.
  update(){
	let obj = this;
	
	// Compute our matrices
    obj.computeModelMatrix();
    obj.computeViewMatrix();
    obj.computeOrthographicMatrix();
  } // update
  
  get viewport(){
    let obj = this;
	let gl = obj.gl;
	let rect = obj.view.getBoundingClientRect();
    
	// The viewport bottom is measured from the bottom of the screen.
	let width  = rect.right - rect.left;
	let height = rect.bottom - rect.top;
	let left   = rect.left;
	let bottom = gl.canvas.clientHeight - rect.bottom;
	
	return [left, bottom, width, height]
  } // get viewport
  
  get valuePerPixel(){
	// The zoom transformation will work in the clip space, which is within [-1,1]. Therefore the range is 2, and independent of hte domain of the data.
	let obj = this;
	let arx = obj.camera.k*2/obj.viewport[2];
	let ary = obj.camera.k*2/obj.viewport[3];
	return Math.max(arx, ary)
  } // get aspectRatio
  
  get isOnScreen(){
	// Check whether the viewframe is still on hte canvas screen. If it's display has been set to "none" then just return a false. "display: none" will be required when introducing the grouping interfaces.
	let obj = this;
	
	let isOnScreen = false;
	if(obj.node.style.display != "none"){
		let rect = obj.node.getBoundingClientRect();
    
		let isOffScreen = 
		  (rect.bottom < 0 || rect.top > obj.gl.canvas.clientHeight) || 
		  (rect.right < 0 || rect.left > obj.gl.canvas.clientWidth)
		  
		isOnScreen = !isOffScreen;
	} // if
	
	return isOnScreen;
  } // isOnScreen
  
  // Camera
  cameraMoveStart(e){
	let camera = this.camera;
	camera.moveStart(e.clientX, e.clientY);
  } // startMove
  
  cameraMove(e){
	let camera = this.camera;
	camera.move(e.clientX, e.clientY, this.valuePerPixel) 
  } // cameraMove
  
  cameraMoveEnd(){
	let camera = this.camera;
	camera.moveEnd();
  } // cameraMoveEnd
  
  cameraZoom(e){
	let obj = this;
	// The 2D camera works off of a zoom value, because the perspective does not change. There is no perspective transformation because the data only has x/y, and to make zoom work through perspective a third z value would have to be spliced into the ArrayBuffer data.
	
	// The first translate can be made using the clip coordinates. The translate back after scaling has to be done using pixels, because the point should stay at the same pixel location. Store both the clip coordinate, and the pixel coordinate.
	obj.camera.zoomPointClip = obj.pixel2clip([e.clientX, e.clientY]);
	obj.camera.incrementZoomValue(e.deltaY<0 ? 0.1 : -0.1);
  } // cameraChangeDist
  
  
  pixel2clip(p){
	// Pixel values can be obtained from the event. Convert the pixel value to the clip space values.
	let obj = this;
	
	let rect = obj.view.getBoundingClientRect();
	
	// Clicked point within the viewport, in terms of pixels.
	let x_px = p[0] - rect.left;
	let y_px = p[1] - rect.top;
	
	// Convert to clip coordinates. Camera.x is in data coordinates.
	let x_clip =  2*( x_px / (rect.right - rect.left) ) - 1;
	let y_clip = -2*( y_px / (rect.bottom - rect.top) ) + 1;
	
	return [x_clip, y_clip]
  } // pixel2clip
  
  // When finding the return transformation I'm figuring out what the translation of the left lower corner should be to keep a particular point at the same pixel location.
  
  // But the model matrix converts from the data domain to hte clip domain.
  
  
  title(label){
	// Change the title of the player.
	this.node.querySelector("div.label").textContent = label;
  } // title
} // ViewFrame2D