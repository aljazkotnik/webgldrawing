import * as twgl from "twgl.js";
import {mat4} from "gl-matrix";


function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element


import {scaleMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix, multiplyArrayOfMatrices, perspectiveMatrix, invertMatrix} from "./matrices.js"



import Cube from "../components/cube.js";
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



export default class ViewFrame{
  constructor(gl){
	let obj = this;
	
	obj.gl = gl;
	obj.node = html2element(template);
	
	// Actual geometry to be drawn.
	obj.geometry = new Cube(gl);
	
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
	let view = obj.node.querySelector("div.view");
	view.onmousedown  = function(e){ obj.cameraMoveStart(e) };
	view.onmousemove  = function(e){ obj.cameraMove(e) };
	view.onmouseup    = function(e){ obj.cameraMoveEnd() };
	view.onmouseleave = function(e){ obj.cameraMoveEnd() };
	view.onwheel      = function(e){ 
	  e.preventDefault();
	  obj.cameraChangeDist(e.deltaY);
	};
	
	
	
  } // constructor
  
  
  /* The geometry moving is implemented in 'computeModelMatrix'. User interaction movement is implemented in 'computeViewMatrix'.  */
  computeModelMatrix( now ) {
	// This is the transformation of the scene coordinate system - not the single object coordinate system. However, since in this case the scene shows a single object, they are both the same.

	//Scale up
    var scale = scaleMatrix(1, 1, 1);
  
    // Rotate a slight tilt
    var rotateX = rotateXMatrix( now*0.002 );
  
    // Rotate according to time
    var rotateY = rotateYMatrix( now*0.001 );

    // Move the model around the scene. -z = away from screen
	// var moveInAndOut = 20 * Math.sin(now * 0.002);
	// var moveLeftAndRight = 15 * Math.sin(now * 0.0017);
	var position = translateMatrix(0, 0, -50);
  
    // Multiply together, make sure and read them in opposite order
    this.transforms.model = multiplyArrayOfMatrices([
      position, // step 4
      rotateY,  // step 3
      rotateX,  // step 2
      scale     // step 1
    ]);


	// Performance caveat: in real production code it's best not to create new arrays and objects in a loop. This example chooses code clarity over performance.
  } // computeModelMatrix
  
  computePerspectiveMatrix(){
	let obj = this;
    let camera = obj.camera;
	
	let width  = obj.viewport[2];
	let height = obj.viewport[3];  
	camera.aspectRatio = width / height;
	
	this.transforms.projection = perspectiveMatrix(
	  camera.fieldOfViewInRadians,
	  camera.aspectRatio,
	  camera.nearClippingPlaneDistance,
	  camera.farClippingPlaneDistance
	);
  } // computePerspectiveMatrix
  
  computeViewMatrix( now ) {
	let camera = this.camera;
	
	// Move the camera around
	var position = translateMatrix(camera.x, camera.y, camera.z);
	
	// The camera can also be tilted. Try tilting it up and down. Rottion angle is in radian. Pan up and down 10 degrees. 'rotate[XYZ]Matrix' specifies rotation about the [XYZ] axis. Left - right pan is therefore rotation about Y axis.
	var yaw = rotateYMatrix( camera.theta );
	var pitch = rotateXMatrix( camera.phi );

	// Multiply together, make sure and read them in opposite order
	var matrix = multiplyArrayOfMatrices([
	  position,
	  pitch,
	  yaw
	]);

	// Inverse the operation for camera movements, because we are actually moving the geometry in the scene, not the camera itself.
	this.transforms.view = invertMatrix( matrix );
  };
  
  
  update(now){
	let obj = this;
	
	// Compute our matrices
    obj.computeModelMatrix( now );
    obj.computeViewMatrix( now );
    obj.computePerspectiveMatrix( );
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
  
  
  cameraMoveStart(e){
	let camera = this.camera;
	camera.moveStart(e.clientX, e.clientY);
  } // startMove
  
  cameraMove(e){
	let camera = this.camera;
	camera.move(e.clientX, e.clientY) 
  } // cameraMove
  
  
  cameraMoveEnd(){
	let camera = this.camera;
	camera.moveEnd();
  } // cameraMoveEnd
  
  cameraChangeDist(d){
	let camera = this.camera;
	camera.incrementNearClippingPlane(d);
  } // cameraChangeDist
} // ViewFrame