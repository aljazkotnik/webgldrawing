import * as twgl from "twgl.js";
import {mat4} from "gl-matrix";


function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element


import {scaleMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix, multiplyArrayOfMatrices, perspectiveMatrix, orthographicMatrix, invertMatrix} from "./matrices.js"



import Mesh2D from "../components/Mesh2D.js";
import { Camera2D } from "./Camera.js";

// div must have opacity to register the mouse events!!
let template = `
<div class="item">
  <div class="view" style="width:300px; height:300px; opacity:0;">
  </div>
  
  <div class="label">
  </div>
</div>
`;



export default class ViewFrame2D{
  constructor(gl){
	let obj = this;
	
	obj.gl = gl;
	obj.node = html2element(template);
	
	// Actual geometry to be drawn.
	obj.geometry = new Mesh2D(gl);
	
	// Transformation matrices.
	obj.transforms = {};
	
	
	/*
	Interactivity:
	What should clicking and dragging do? Pan, or adjust camera angle? 
	
	For 2D panning is more useful.
	For 3D adjusting the camera angle is better.
	*/
	obj.camera = new Camera2D();
	obj.camera.nearClippingPlaneDistance = -1;
	obj.camera.farClippingPlaneDistance = 1;
	
	
	// (e.clientX, e.clientY)
	let view = obj.node.querySelector("div.view");
	view.onmousedown  = function(e){ obj.cameraMoveStart(e) };
	view.onmousemove  = function(e){ obj.cameraMove(e) };
	view.onmouseup    = function(e){ obj.cameraMoveEnd() };
	view.onmouseleave = function(e){ obj.cameraMoveEnd() };
	view.onwheel      = function(e){ 
	  e.preventDefault();
	  // Store the zoom point.
	  obj.cameraMoveStart(e);
	  obj.cameraChangeDist(e.deltaY);
	};
	
	
	
  } // constructor
  
  
  /* The geometry moving is implemented in 'computeModelMatrix'. User interaction movement is implemented in 'computeViewMatrix'.  */
  computeModelMatrix( now ) {
    // The model matrix incorporates the initial scaling and translation to make sure the data fits in view.
	let dom = this.geometry.domain;
	
	// First translate left bottom corner to origin, scale so that top right domain corner is at 2,2, and then reposition so that domain is between -1 and 1.
	let k = 2 / Math.max(dom.x[1]-dom.x[0], dom.y[1]-dom.y[0]);
	
	let translateToOrigin = translateMatrix(-dom.x[0], -dom.y[0], 0)
	let scaleToClipSpace = scaleMatrix(k,k,1);
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
  
  computeViewMatrix( now ) {
	let camera = this.camera;
	
	// Only panning is supported. But zooming should also be!
	let position = translateMatrix(camera.x, camera.y, camera.z);

	// For zooming a scaling operation should be performed. And the zooming should be based on hte pointers position. So that point should stay in hte same position, while the rest of the view scales.
	
	// The values need to be in coordinate units! So the pixel location needs to be changed to value location.
	let x0 = camera.mouseStart[0] * this.valuePerPixel;
	let y0 = camera.mouseStart[1] * this.valuePerPixel;
	let k  = camera.k;
	
	let translateToOrigin    = translateMatrix(-x0, -y0, 0);
	let scaleToZoomSpace     = scaleMatrix(k, k, 1);
	let translateToZoomSpace = translateMatrix(x0, y0, 0);


	// Inverse the operation for camera movements, because we are actually moving the geometry in the scene, not the camera itself.
	// this.transforms.view = invertMatrix( position );
	
	
	this.transforms.view = multiplyArrayOfMatrices([
	  translateToZoomSpace,
	  scaleToZoomSpace,
	  translateToOrigin,
	  invertMatrix( position )
	]) // model
	
  } // computeViewMatrix
  
  
  update(now){
	let obj = this;
	
	// Compute our matrices
    obj.computeModelMatrix( now );
    obj.computeViewMatrix( now );
    obj.computeOrthographicMatrix( );
  } // update
  
  get viewport(){
    let obj = this;
	let gl = obj.gl;
	let rect = obj.node.querySelector("div.view").getBoundingClientRect();
    
	let width  = rect.right - rect.left;
	let height = rect.bottom - rect.top;
	let left   = rect.left;
	let bottom = gl.canvas.clientHeight - rect.bottom;
	
	return [left, bottom, width, height]
  } // get viewport
  
  get valuePerPixel(){
	// Get the value per pixel that will definitely fit the whole domain into hte viewport.
	let obj = this;
	let domain = obj.geometry.domain;
	let k = obj.camera.k
	let arx = k*(domain.x[1] - domain.x[0]) / obj.viewport[2];
	let ary = k*(domain.y[1] - domain.y[0]) / obj.viewport[3];
	return Math.min(arx, ary)
  } // get aspectRatio
  
  
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
  
  cameraChangeDist(d){
	let camera = this.camera;
	// The 2D camera works off of a zoom value, because the perspective does not change. There is no perspective transformation because the data only has x/y, and to make zoom work through perspective a third z value would
	camera.incrementZoomValue(0.1);
  } // cameraChangeDist
} // ViewFrame2D