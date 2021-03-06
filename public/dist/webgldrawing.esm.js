import * as twgl from 'twgl.js';

function html2element$3(html){
  let template = document.createElement('template'); 
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template.content.firstChild;
} // html2element
 // joinDataToElements

function multiplyMatrices(a, b) {
  
  // TODO - Simplify for explanation
  // currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337
  
  var result = [];
  
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
      a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
      a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
      a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  // Cache only the current line of the second matrix
  var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
  result[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  result[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  result[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  result[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  result[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  result[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  result[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  result[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  result[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  result[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  result[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  result[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  result[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
  result[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
  result[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
  result[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

  return result;
}

function multiplyArrayOfMatrices(matrices) {
  
  var inputMatrix = matrices[0];
  
  for(var i=1; i < matrices.length; i++) {
    inputMatrix = multiplyMatrices(inputMatrix, matrices[i]);
  }
  
  return inputMatrix;
}


function scaleMatrix(w, h, d) {
	return [
	    w,    0,    0,   0,
	    0,    h,    0,   0,
	    0,    0,    d,   0,
	    0,    0,    0,   1
	];
}


function translateMatrix(x, y, z) {
	return [
	    1,    0,    0,   0,
	    0,    1,    0,   0,
	    0,    0,    1,   0,
	    x,    y,    z,   1
	];
}

function invertMatrix( matrix ) {
	
	// Adapted from: https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
	
	// Performance note: Try not to allocate memory during a loop. This is done here
	// for the ease of understanding the code samples.
	var result = [];

	var n11 = matrix[0], n12 = matrix[4], n13 = matrix[ 8], n14 = matrix[12];
	var n21 = matrix[1], n22 = matrix[5], n23 = matrix[ 9], n24 = matrix[13];
	var n31 = matrix[2], n32 = matrix[6], n33 = matrix[10], n34 = matrix[14];
	var n41 = matrix[3], n42 = matrix[7], n43 = matrix[11], n44 = matrix[15];

	result[ 0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
	result[ 4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
	result[ 8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
	result[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
	result[ 1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
	result[ 5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
	result[ 9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
	result[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
	result[ 2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
	result[ 6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
	result[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
	result[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
	result[ 3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
	result[ 7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
	result[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
	result[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

	var determinant = n11 * result[0] + n21 * result[4] + n31 * result[8] + n41 * result[12];

	if ( determinant === 0 ) {
		throw new Error("Can't invert matrix, determinant is 0");
	}
	
	for( var i=0; i < result.length; i++ ) {
		result[i] /= determinant;
	}

	return result;
}

class Camera{
  
  mouseDown = false
  mouseStart = [0,0]
  
  // A third angle could be used to encode the camera 'roll'. 'z' is not changed in the current apps, but it would be used if the camera had 'walking' controls, e.g. through the arrow keys.
  x = 0
  y = 0
  z = 0
  theta = 0
  phi = 0
  
  xStart = 0
  yStart = 0
  thetaStart = 0
  phiStart = 0
  
  
  
  fieldOfViewInRadians = Math.PI * 0.2
  aspectRatio = 1
  nearClippingPlaneDistance = 1
  farClippingPlaneDistance = 100
  
  constructor(){
  } // constructor
  
  moveStart(x,y){
	let obj = this;
	obj.mouseStart = [x, y];
	obj.mouseDown = true;
	
	obj.thetaStart = obj.theta;
	obj.phiStart = obj.phi;
	obj.xStart = obj.x;
	obj.yStart = obj.y;
  } // moveStart
  
  move(x,y){
	let obj = this;
	
	if(obj.mouseDown){
		// Angles have to be in radians!! Division by 4 is just a relaxation parameter.
		let diffX = Math.PI/180*(x - obj.mouseStart[0])/4;
		let diffY = Math.PI/180*(y - obj.mouseStart[1])/4;
		
		obj.theta = obj.thetaStart + diffX;
		obj.phi = constrainValue( obj.phiStart - diffY, -Math.PI/2, Math.PI/2);
	} // if  
  } // move
  
  moveEnd(){
	let obj = this;
	obj.mouseDown = false;
  } // moveEnd
  
  incrementNearClippingPlane(d){
	let obj = this;
	obj.nearClippingPlaneDistance = Math.max(1, obj.nearClippingPlaneDistance + (d)/10);
  } // cameraChangeDist
} // Camera

	
 
// The differences between the cameras are just the movement controls.
class Camera2D extends Camera{
  // The 2D camera has panning instead of changing the camera angle.
  
  // The z coordinate is not important here because it gets defined in the shaders as 0 in any case.
  
  constructor(){
	super();
	let obj = this;
	
	obj.zoomPointClip = [0,0];
	obj.k = 1;
  } // constructor
  
  
  move(x,y, vpp){
	// Instead of changing the camera pitch/yaw/roll pan the view.
	let obj = this;
	vpp = vpp == undefined ? 1 : vpp;
	
	if(obj.mouseDown){
		let diffX = (x - obj.mouseStart[0])*vpp;
		let diffY = (y - obj.mouseStart[1])*vpp;
		
		// Limit the panning?
		obj.x = obj.xStart - diffX;
		obj.y = obj.yStart + diffY;
	} // if  
  } // move
  
  incrementZoomValue(d){
	this.k += d;
  } // incrementZoomValue
} // Camera2D



function constrainValue(v,a,b){
  // Constrain value 'v' to a <= v <= b.
  return Math.max(Math.min(v, b), a);
} // constrainValue

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

// div must have opacity to register the mouse events!!
// Furthermore the overall wrapper is defined here so that after the class is inherited from there is space to append other modules. The class is inherited from (as opposed to plugged in as a module)
let template$g = `
<div class="item">
  <div class="label">Label</div>
  <div class="view" style="width:300px; height:200px; opacity:0.001;">
  </div>
</div>
`;



class ViewFrame2D{
  constructor(gl){
	let obj = this;
	
	obj.gl = gl;
	obj.node = html2element$3(template$g);
	
	// obj.view is a convenience reference that points to the node. Transforms.view is the view transformation matrix.
	obj.view = obj.node.querySelector("div.view");
	
	// Some initial dummy geometry to allow initialisation.
	obj.geometry = { 
	  domain: {
		x: [0, 1],
		y: [0, 1]
	  }
	}; // initial dummy values
	
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
	obj.view.onmousedown  = function(e){ obj.cameraMoveStart(e); };
	obj.view.onmousemove  = function(e){ obj.cameraMove(e); };
	obj.view.onmouseup    = function(e){ obj.cameraMoveEnd(); };
	obj.view.onmouseleave = function(e){ obj.cameraMoveEnd(); };
	
	// adding a zoom directly causes the passive event warning to come up in the console, and also stops the wheel event from being properly executed.
	// If the div is empty the event does not occur!
	obj.view.addEventListener("wheel", (e)=>{
	  e.preventDefault();
	  obj.cameraZoom(e);
	}, {passive: false});
	
	
  } // constructor
  
  
  /* The geometry moving is implemented in 'computeModelMatrix'. User interaction movement is implemented in 'computeViewMatrix'.  */
  computeModelMatrix() {
    // The model matrix incorporates the initial scaling and translation to make sure the data fits in view.
	let dom = this.geometry.domain;
	
	// First translate left bottom corner to origin, scale so that top right domain corner is at 2,2, and then reposition so that domain is between -1 and 1.
	let k = 2 / Math.max(dom.x[1]-dom.x[0], dom.y[1]-dom.y[0]);
	
	// Correct for the aspect ratio of the view element. For now the y domain is rescaled because the example data featured a larger x domain, and the width was kep constant. This can be made adjustable later.
	let kar = ( dom.x[1]-dom.x[0] ) / ( dom.y[1]-dom.y[0] );
	
	let translateToOrigin = translateMatrix(-dom.x[0], -dom.y[0], 0);
	let scaleToClipSpace = scaleMatrix(k,k*kar,1);
	let translateToScaleSpace = translateMatrix(-1,-1,0);
	
	
    this.transforms.model = multiplyArrayOfMatrices([
	  translateToScaleSpace,
	  scaleToClipSpace,
	  translateToOrigin
	]); // model


	// Performance caveat: in real production code it's best not to create new arrays and objects in a loop. This example chooses code clarity over performance.
  } // computeModelMatrix
  
  computeOrthographicMatrix(){
	// viewport: left, bottom, width, height
	this.transforms.projection = [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
	];
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
	]); // model
	
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
		  (rect.right < 0 || rect.left > obj.gl.canvas.clientWidth);
		  
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
	camera.move(e.clientX, e.clientY, this.valuePerPixel); 
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

/*
Should these be split up into a Mesh2D superclass and an UnsteadyMesh2D childclass?
*/
  

// Some geometry to initialise the buffers.
let vertices = [
  1, -0.99,
  1, -1,
  0.99, -1
]; // vertices

// clockwise triangles. 
let indices = [
  0, 1, 2
]; // indices


// values per vertex
let values = [
  0,
  0,
  0
]; // values
 
// Initial domain.
let initdomain = {
  x: [-1, 1],
  y: [-1, 1],
  v: [0, 1],
  t: [0, 1]
};


class Mesh2D{
  constructor(gl, unsteadyMetadataFilename){
	let obj = this;

	obj.gl = gl;
    // obj.vertices = vertices;
    // obj.indices = indices;
    // obj.colors = colors;

	// "In case of glBufferData, the buffer object currently bound to target is used." (https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBufferData.xhtml)
	
	
	// Size of the data used by each vertex is selected in 'MeshRenderer.updateAttributesAndUniforms'. However, that should really be kept with the data specification, so that MeshRenderer doesn't need to change if the data changes. Then the MeshRenderer becomes independent of the dimension of data.
    let verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	obj.verticesBuffer = verticesBuffer;
	
	let valuesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
    obj.valuesBuffer = valuesBuffer;
	
    let indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
	obj.indicesBuffer = indicesBuffer;
	obj.indicesLength = indices.length;
	
	
	// If teh index defines which frame to play next, then the timesteps need to be ordered. Maybe it's best to just enforce this by sorting the timesteps when they are loaded.
	obj._currentFrameInd = 0;
	
	
	
	// Imagine that some metadata was loaded in.
	// "./data/testmetadata.json"
    fetch(unsteadyMetadataFilename)
	  .then(res=>res.json())
	  .then(content=>{
		
		// But all three need to be available at the same time before rendering.
		let indicesPromise = loadBinData(content.indices)
		  .then(ab=>{ return new Uint32Array(ab) });
		let verticesPromise = loadBinData(content.vertices)
		  .then(ab=>{ return new Float32Array(ab) });
		  
		  
		/* The values should be loaded in separately from the vertices and indices.
		
		Do we just loop through some timesteps and make the promises. However, the data size restrictions should be maintained at all times! The data loading function should keep that in mind.
		*/
		let valuesPromise = loadBinData(content.timesteps[obj.currentFrameInd].filename)
		  .then(ab=>{ return new Uint8Array(ab) })
		  .then(ui8=>{ return Float32Array.from(ui8) });
		
		
		Promise.all([indicesPromise, verticesPromise, valuesPromise]).then(d=>{
		  
		  
		  // Domain has to be overwritten when the actual data is loaded. Afterwards, only the 'c' property should change with the timesteps. By changing the global color value ranges the colorbar can be adjusted by the user.]
		  obj.domain = content.domain;
		  obj.timesteps = content.timesteps;
		  
		  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
		  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, d[0], gl.STATIC_DRAW);
		  obj.indicesLength = d[0].length;
		  		  
		  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
		  gl.bufferData(gl.ARRAY_BUFFER, d[1], gl.STATIC_DRAW);
		  
		  gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
		  gl.bufferData(gl.ARRAY_BUFFER, d[2], gl.STATIC_DRAW);
		
		  
		  
		  
		
		}); // then
		
		
	}); // fetch
	
	
	
	
	
  } // constructor
  

 
  // The 'values' are stored as a 'scaled uint8 array' to save memory. The values are retransformed back into the original domain on the GPU by mapping them from [0,255] to 'currentUintRange', which is obtained from the metadata file of this unsteady simulation.
  
  // The MeshRenderer2D looks at the domain to determine what the full value domain of this small multiple will be. It looks at the c to determine the uint compression domain.
  domain = initdomain
  timesteps = []
  
  get currentUintRange(){
	// This used to be in domain under 'c', but was moved here as it will change as the frames change.
	let obj = this;
	
	return obj.timesteps.length > 0 ? obj.timesteps[obj.currentFrameInd].c_uint : [0,1];
	
	// return [871, 977]
  } // currentUintRange
  
  get currentTime(){
	// Get the time of the current frame as a fraction of the total time span available.
	let obj = this;
	return obj.timesteps[obj.currentFrameInd].t;
  } // currentTimestep
  
  get memoryUsed(){
	let obj = this;
	
	let memory = 0;
	obj.timesteps.forEach(t=>{
	  if(t.byteLength){
		memory += t.byteLength;
	  } // if
	});
	
	return memory
  } // memoryUsed
  
  // There should be two separate methods to pick the current frame. One is by incrementing, and the other is by setting the appropriate time.
  incrementCurrentFrame(){
	// When incrementing past the end of the available time range we loop to the start.
	let obj = this;
	obj.currentFrameInd = (obj.currentFrameInd + 1) % obj.timesteps.length;
  } // incrementCurrentFrame
  
  timestepCurrentFrame(t){
	// Different players can start at different times. However, if a dt is passed in to increment the current frame the incrementing can truncate a part of the dt, leading to different players to be at different times. Therefore the actual time is expected. If t is outside of the time range available, the min or max frame indices are returned as appropriate.
	let obj = this;
	
	
	let i = 0;
	let dist = Number.POSITIVE_INFINITY;
	obj.timesteps.forEach((timestep,j)=>{
		let d = Math.abs( timestep.t-t );
		if(d < dist){
			dist = d;
			i = j;
		} // if
	}); // forEach
	
	obj.currentFrameInd = i;

  } // timestepCurrentFrame
  
  
  // This should be reworked into an outside call, because eventually it would be beneficial if the files can be loaded by a library system, and the mesh is only responsible to declare what it would like?
  set currentFrameInd(i){
	// When the index is set automatically manage the data. This will allow the data to be loaded once and kept in memory.
	let obj = this;
	
	obj._currentFrameInd = i;
	
	// For now just load the current frame here, and save it to the timestep.
	let timestep = obj.timesteps[obj._currentFrameInd];
	if(timestep.valuesPromise == undefined){
		timestep.valuesPromise = loadBinData(timestep.filename)
		  .then(ab=>{ return new Uint8Array(ab) });
		timestep.valuesPromise.then(ui8=>{
			timestep.byteLength = ui8.byteLength;
		});
	} // if
	
  } // set currentFrameInd
  
  get currentFrameInd(){
	return this._currentFrameInd;
  } // get currentFrameInd
  
  
  updateCurrentFrameBuffer(){
	// The UnsteadyPlayer will input an actual timestep, as opposed to just increment the frame. This allows simulations with different temporal resolutions to be compared directly. Comparable time frames are selected based on available data.
	
	// What will be passed in? Just an icrement I guess, and it's up to the user to provide time variables with the same dt and in the same domain.
	let obj = this;
	let gl = obj.gl;
	
	// The values from the files were stored as uint8, but the GPU requires them to be float32. The data is converted just before passing it to the buffer.	
	obj.timesteps[obj.currentFrameInd].valuesPromise
	  .then(ui8=>{ return Float32Array.from(ui8) })
	  .then(f32=>{
		  gl.bindBuffer(gl.ARRAY_BUFFER, obj.valuesBuffer);
		  gl.bufferData(gl.ARRAY_BUFFER, f32, gl.STATIC_DRAW);
	
	  });
	
  } // updateCurrentFrameBuffer
  
  
} // Mesh2D


function loadBinData(filename){
  return fetch(filename).then(res=>res.arrayBuffer());
} // getBinData



/*
{
	x: [-0.76, 1.01],
	y: [-0.1, 1],
	v: [870.4389253677576, 977.0020293037556]
}
*/

function html2element$2(html){
  let template = document.createElement('template'); 
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template.content.firstChild;
} // html2element


function svg2element$2(svg){
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = svg.trim();
  return g.firstChild;
} // svg2element


class scaleLinear$1 {
  
  _domain = [0, 1]
  _range = [0, 1]

  set domain(d){ this._domain = d; } // domain
  get domain(){ return this._domain } // domain

  set range(r){ this._range = r; } // range
  get range(){ return this._range } // range

  dom2range(v){
	return mapSpaceAValueToSpaceB$1(v, this.domain, this.range)
  } // dom2range
  
  range2dom(v){
	return mapSpaceAValueToSpaceB$1(v, this.range, this.domain)  
  } // range2dom
} // scaleLinear

function mapSpaceAValueToSpaceB$1(v, A, B){
	return (v-A[0])/(A[1]-A[0]) * (B[1]-B[0]) + B[0]
} // mapSpaceAValueToSpaceB
 // joinDataToElements

function play(width, y){
	
	
	// Calculate the size of the triangle, and where the drawing should begin.
	let height = width*2*Math.sqrt(3)/3;
	
	
	let r_max = height*Math.sqrt(3)/6;
    let r = 3 > r_max ? r_max : 3;
    let dH = r*Math.sqrt(3); // Length of side cut by 1 rounding.
	

    let Mx = 0;
	let My = y + 5 - height/2;
    
    let p0 = [Mx, My];
    let p1 = [Mx + height*Math.sqrt(3)/2, My + height/2];
    let p2 = [Mx, My + height];
    
	
    
    return `M${p0[0]} ${p0[1]+dH}
      a ${r},${r}, 0,0,1  ${r*3/2}, ${-dH/2}
      L ${p1[0]-r*3/2} ${p1[1]-dH/2}
      a ${r},${r}, 0,0,1  0, ${dH}
      L ${p2[0]+r*3/2} ${p2[1]-dH/2}
      a ${r},${r}, 0,0,1  ${-r*3/2}, ${-dH/2}
      Z
      `
	
} // playPath

function pause(width, y){
	
    let height = width*2*Math.sqrt(3)/3 - 2*(3*Math.sqrt(3)-3);
    let dx = width/5;
    let r = 3;
    
	let Mx = 0;
	let My = y + 5 - height/2;
	
    return `
      M ${Mx+r} ${My} 
      L ${Mx+2*dx-r} ${My}
      a ${r},${r} 0,0,1 ${r},${r}
      L ${Mx+2*dx} ${My+height-r}
      a ${r},${r} 0,0,1 ${-r},${r}
      L ${Mx+r} ${My+height}
      a ${r},${r} 0,0,1 ${-r},${-r}
      L ${Mx} ${My+r}
      a ${r},${r} 0,0,1 ${r},${-r}
	  M ${Mx+3*dx + r} ${My}
      L ${Mx+5*dx-r} ${My}
      a ${r},${r} 0,0,1 ${r},${r}
      L ${Mx+5*dx} ${My+height-r}
      a ${r},${r} 0,0,1 ${-r},${r}
      L ${Mx+3*dx+r} ${My+height}
      a ${r},${r} 0,0,1 ${-r},${-r}
      L ${Mx+3*dx} ${My+r}
      a ${r},${r} 0,0,1 ${r},${-r}
    `
} // pausePath


let template$f = `
<g style="cursor: pointer;">
  <path fill="tomato" d=""></path>
</g>
`;





// Maybe the y should just be set outside? And the same for the chapter?? Maybe give it the y it should center itself about?

// textHeight + textBottomMargin + rectHighlightHeightDelta + rectHeight/2 - H/2
class PlayButton{
	
  // The y is given as the centerline about which to position the button. Half above, and half below. The initial y is therefore half the height, and should draw the button completely on hte svg.
  y = 20*2*Math.sqrt(3)/3 / 2;
  width = 20;
	
  constructor(){
    let obj = this;
	obj.node = svg2element$2( template$f );
  } // constructor
  
  update(playing){
	let obj = this;
	let d = playing ? pause(obj.width, obj.y) : play(obj.width, obj.y);
	obj.node.querySelector("path").setAttribute("d", d);	
  } // update
} // PlayButton

let defaultRectAttributes = `stroke="white" stroke-width="2px"`;
let template$e = `<g class="chapter">
  <rect class="background" fill="gainsboro" ${ defaultRectAttributes }"></rect>
  <rect class="buffering" fill="gray" ${ defaultRectAttributes }"></rect>
  <rect class="foreground" fill="tomato" ${ defaultRectAttributes }"></rect>
  <text style="display: none;"></text>
</g>`;


class PlayBarAnnotation{
	
  // y = textHeight + textBottomMargin + highlightHeightDelta
  y = 12 + 2 + 3;
  height = 10
  dh = 4
  
  constructor(config, tscale){
    let obj = this;
	obj.node = svg2element$2(template$e);
	
	obj.background = obj.node.querySelector("rect.background");
	obj.buffering = obj.node.querySelector("rect.buffering");
	obj.foreground = obj.node.querySelector("rect.foreground");
	obj.label = obj.node.querySelector("text");
	
	obj.config = config;
	obj.tscale = tscale;
	
	
	obj.node.addEventListener("mouseenter", ()=>{
		obj.highlight();
	}); // addEventListener
	
	obj.node.addEventListener("mouseover", ()=>{
		obj.highlight();
	}); // addEventListener
	
	obj.node.addEventListener("mouseout", ()=>{
		obj.unhighlight();			
	}); // addEventListener
  } // constructor
  
  update(t_play, t_buffer){
	let obj = this;
	
	let y = obj.y;
	let x = obj.tscale.dom2range(obj.config.starttime);

    obj.background.setAttribute("y", y);
	obj.background.setAttribute("x", x);
	obj.background.setAttribute("width", obj.width);
	obj.background.setAttribute("height", obj.height);
	 
	obj.buffering.setAttribute("y", y);
	obj.buffering.setAttribute("x", x);
	obj.buffering.setAttribute("width", obj.width*obj.timeFraction(t_buffer));
	obj.buffering.setAttribute("height", obj.height);
	  
	obj.foreground.setAttribute("y", y);
	obj.foreground.setAttribute("x", x);
	obj.foreground.setAttribute("width", obj.width*obj.timeFraction(t_play));
	obj.foreground.setAttribute("height", obj.height);
	  
	obj.label.setAttribute("y", 12);
	obj.label.setAttribute("x", x);
	obj.label.innerHTML = obj.config.label;

  } // update
  
  
  get width(){
	let obj = this;
	let x0 = obj.tscale.dom2range(obj.config.starttime);
	let x1 = obj.tscale.dom2range(obj.config.endtime);
	// At the beginning hte widths may be negative because the starttime of the comment exceeds the time domain of the playbar that hasn't yet been updated to the right interval. Returen 0 while this is so.
	return x1 - x0 < 0 ? 0 : x1 - x0;
  } // width
  
  timeFraction(t){
	let obj = this;
	let tf = ( t - obj.config.starttime ) / (obj.config.endtime - obj.config.starttime);
	return Math.abs(tf - 0.5) <= 0.5 ? tf : tf>0;
  } // timeFraction
  
  highlight(){
	let obj = this;
	highlightRectangle( obj.background, obj.y, obj.height, obj.dh );
	highlightRectangle( obj.buffering, obj.y, obj.height, obj.dh );
	highlightRectangle( obj.foreground, obj.y, obj.height, obj.dh );
	obj.label.style.display = "";
  } // highlight
  
  unhighlight(){
	let obj = this;
	unhighlightRectangle( obj.background, obj.y, obj.height );
	unhighlightRectangle( obj.buffering, obj.y, obj.height );
	unhighlightRectangle( obj.foreground, obj.y, obj.height );
	obj.label.style.display = "none";
  } // highlight
} // PlayBarAnnotation


function highlightRectangle(r, y, h, dh){
	r.height.baseVal.value = h + 2*dh; 
	r.y.baseVal.value = y - dh;
} // highlightRectangle

function unhighlightRectangle(r, y, h){
	r.height.baseVal.value = h;
	r.y.baseVal.value = y;
} // unhighlightRectangle

// This class is in charge of drawing the play bar. It takes in user prescribed annotations and the min and maximum times. It fills the gaps between the user prescribed annotations and the min/max times with empty chapters. The process is repeated anytime a new annotation is added.

let template$d = `<g style="cursor: pointer;"></g>`; // template

class PlayBar{
	
  // Coordinates in whole svg frame.
  y = 12 + 2 + 3;
  x0 = 20 + 6;
  x1 = 300;
	
  annotations = []
	
  t_min = 0
  t_max = 1
	
  t_buffer = 0
  t_play = 0
	
  constructor(){
	let obj = this;
	obj.node = svg2element$2( template$d );
	
	obj._tscale = new scaleLinear$1();
  } // constructor
  
    
  get tscale(){
	// The tscale is relative to the whole svg element, and takes in whole svg coordinates.
	let obj = this;
		
	obj._tscale.domain = [obj.t_min, obj.t_max];
	obj._tscale.range = [obj.x0, obj.x1];
	
	return obj._tscale;
	  
  } // get tscale
  
  
  rebuild(){
	// I need to do the join, but on objects instead of elements... Or just throw them all out and create new ones? Simpler I guess
	let obj = this;
	
	let exiting = obj.node.querySelectorAll("g.chapter");
	for(let i=0; i<exiting.length; i++){
		exiting[i].remove();
	} // for
	
	// The creation of the chapters to show after somme annotations have been pushed still needs to be implemented.
	function makeChapterObj(label, starttime, endtime){
		return {label: label, starttime: starttime, endtime: endtime==undefined ? obj.t_max : endtime}
	} // makeChapterObj
	
	
	// The ultimate way of doing it would be for the annotations to persist below other smaller annotations.
	let chapters = obj.annotations.reduce((acc, a, i)=>{
		
		let previous = acc[acc.length - 1];
		let current = makeChapterObj( a.label, a.starttime, a.endtime );
		
		if(previous.endtime < current.starttime){
			// Don't curtail hte previous one but instead allow it to draw completely. This allows the chapters to be 'stacked'. Ordering them by start time ensures they all have a handle available.
			
			// Push in the needed padding, and then the annotation.
			acc.push( makeChapterObj( "", previous.endtime, current.starttime ) );
		} // if
		
		acc.push( current );
		
		if(i==(obj.annotations.length-1) && current.endtime < obj.t_max){
		    acc.push( makeChapterObj( "", current.endtime, obj.t_max ) );
		} // if
		
		return acc
	}, [ makeChapterObj("", obj.t_min, obj.t_max) ]);
	
	// Cpters need to be sorted by starttime in order for all start points to be visible.
	obj.chapters = chapters.sort((a,b)=>a.starttime-b.starttime).map(c=>{
		let a = new PlayBarAnnotation(c, obj.tscale);
		a.y = obj.y;
		return a;
	}); // map
	
	obj.chapters.forEach(chapter=>{
		obj.node.appendChild(chapter.node);
	}); // forEach
	
  } // rebuild
  
  update(){
	let obj = this;
	obj.chapters.forEach(chapter=>{
		chapter.update( obj.t_play, obj.t_buffer );
	});
  } // update
  
  addchapter(tag){
	// The player may need to be updated when the serverr pushes updates. Also if other users update the annotations it should appear straightaway.
	let obj = this;
	
	// tags are required to have a 'starttime'.
	if(tag.starttime){
		let i = obj.annotations.findIndex(a=>a.id==tag.id);
		obj.annotations.splice(i>-1 ? i : 0, i>-1, tag);
	
		// Update the bar.
		obj.rebuild();
		obj.update();
	} // if
  } // addchapter
} // PlayBar

/*
PLAYBAR only controls the appearance of the playbar, but does not control the playing. It just allows the user interaction with the playbar.
*/

// The canvas will be positioned, and this should be relative to that positioning. Maybe there should be an overall div that contains the canvas and a sibling div that contains all the markup.
let template$c = `
<div class="player-controls">
  <svg id="playbar" width="100%" height="32px">
    <g class="playbutton"></g>
    <g class="playbar"></g>
  </svg>
</div>
`; // template





class PlayControls{
	
  textHeight = 12 
  textBottomMargin = 2 
  highlightHeightDelta = 3
	
  constructor(){
	let obj = this;
	
	obj.node = html2element$2(template$c);
	
	let y = obj.textHeight + obj.textBottomMargin + obj.highlightHeightDelta;
	
	// Make a play button.
	obj.button = new PlayButton();
	obj.button.y = y;
	obj.node.querySelector("g.playbutton").appendChild(obj.button.node);
	
	obj.button.node.addEventListener("click",event=>{
		// Get the action required based on the button icon.
		if( obj.t_play == obj.t_max ){
			obj.t_play = obj.t_min;
		} // if
		
		obj.playing = !obj.playing;
	}); // addEventListener
	
	
	
	
	
	
	
	// The bar is just a node at this point
	obj.bar = new PlayBar();
	obj.bar.y = y;
	obj.node.querySelector("g.playbar").appendChild( obj.bar.node );
	
	obj.bar.node.addEventListener("click", event=>{
		// On click the playbar should register the correct time.
		
		// The tscale takes inputs in the svg coordinates, and the event returns them in the client coordinates. Therefore the client coordinates must be adjusted for the position of the SVG.
		let x1 = event.clientX;
		let x0 = obj.node.getBoundingClientRect().x;
		let t = obj.bar.tscale.range2dom(x1-x0);
		
		// Now just set the t to the right value, and update the view.
		obj.bar.t_play = t;
		obj.bar.update();
		
		// The playtime changed, therefore pause the video.
		obj.playing = false;
		obj.skipped = true;
	}); // addEventListener
	
	
	obj.bar.rebuild();
	obj.bar.update();
	
	
	
	obj.playing = false;
	obj.skipped = false;
	
	// Annotations. Comments should be based on the chapter tags I think. The discussion is intended to be based on observed events. The logical progress is that events need to first be identified, and then discussed in a separate step. There should be a single dialogue box, and in that one tags can be added. This allows a single comment to be seen in multiple threads. Replies will have to be handled separately. Eventually the user should also be able to pin comments.
	
  } // constructor
  
  
  set t_domain(t){
	// Since t is coming from a specific location, it should be the same reference always. Therefore == comparison is valid.
	let obj = this;
	if((t[0] != obj.bar.t_min) || (t[1] != obj.bar.t_max)){
	  obj.bar.t_min = t[0];
	  obj.bar.t_max = t[1];
	  obj.bar.rebuild();
	  obj.bar.update();
	} // if
  } // set t_domain
  
  get t_domain(){
	return [this.bar.t_min, this.bar.t_max]
  } // get t_domain
  
  
  set playing(v){
	let obj = this;
	obj._playing = v;
	obj.update(v);
  } // set playing
  
  get playing(){
	return this._playing;
  } // get playing
  
  
  // FUNCTIONALITY
  update(){
	let obj = this;
	obj.button.update( obj.playing );
	obj.bar.update();
  } // update
  
} // PlayControls

function html2element$1(html){
  let template = document.createElement('template'); 
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template.content.firstChild;
} // html2element

function joinDataToElements(data, elements, idAccessor){
  
  // Find data that has no elements, find the elements that have data, and the leftover.
  let elementsArray = [...elements];
  let elementsDataIds = elementsArray.map(el=>idAccessor(el.__data__));
  
  
  let g = elementsArray.reduce((acc,el)=>{
	let d = data.filter(d_=>{
		return idAccessor(el.__data__) == idAccessor(d_)
	}); // filter
	if( d.length > 0 ){
	  el.__data__ = d[0];
	  acc.update.push(el);
	} else {
	  acc.exit.push(el);
	} // if
	return acc
  }, {update: [], exit: []}); // filter
  
  g.enter = data.filter(d=>{
	return !elementsDataIds.includes(idAccessor(d))
  }); // filter
  
  return g
} // joinDataToElements

/*
Maybe this one should be remade into a manager so it can keep add comments to itself. Otherwise they have to be routed outside.
*/
let css$4 = {
  textarea: `
    width: 100%;
    border: none;
    resize: none;
    overflow: hidden;
    max-height: 100px;
  `,

  submitbutton: `
    color: white;
	background-color: black;
	border-radius: 4px;
	cursor: pointer;
  `
}; // css



let template$b = `
<div>
  <textarea class="comment" type="text" rows="1" placeholder="What do you think?" style="${css$4.textarea}"></textarea>
  <button class="submit" style="${css$4.submitbutton}"><b>Submit</b></button>
</div>
`; // template


class AddCommentForm{
  _user = ""

  constructor(id){
    let obj = this;
	
	obj.node = html2element$1(template$b);
	obj.viewid = id;
	
	// Author input got omitted because the author also needs to be known when voting on a comment, and I didn't want to implement an input there. That's why now there will be an overall login box that will control everything.
	obj.commentinput = obj.node.querySelector("textarea.comment");
	obj.submitbutton = obj.node.querySelector("button.submit");
	
	
	obj.commentinput.style.display = "block";
	obj.submitbutton.style.display = "none";
	
	
	obj.commentinput.oninput = function(){
	  obj.update();
	}; // oninput
	
  } // constructor
  
  
  update(){
	let obj = this;
	
	// Change the height
	obj.commentinput.style.height = "1px";
    obj.commentinput.style.height = (obj.commentinput.scrollHeight)+"px";
	
	// Show or hide button.
	obj.submitbutton.style.display = obj.config ? "block" : "none";
  } // update
  
  
  clear(){
	let obj = this;  
	obj.commentinput.value = "";
    obj.update();
  } // clear
  
  set user(name){
	this._user = name;
	this.update();
  } // set user
  
  get user(){
	return this._user;
  } // get user
  
  get config(){
	let obj = this;
	return obj.commentinput.value && obj.user ? {author: obj.user, viewid: obj.viewid,text: obj.commentinput.value} : false;
  } // config
  
  
  
} // AddCommentForm

let css$3 = {
	
  button: `
    border: none;
	background-color: white;
	cursor: pointer;
  `,
	
  replybutton: `
    color: gray;
	padding: 0 0 0 0;
  `,
  
  votenumberi: `
    margin-left: 4px;
  `,
  
  timestampspan: `
    color: gray;
	font-size: 14px;
	margin-left: 12px;
  `
}; // css

let template$a = `
<div class="comment">
  <div class="header">
    <b class="author"></b>
	<span class="timestamp" style="${ css$3.timestampspan }"></span>
  </div>
  <div class="body"></div>
  <div class="footer">
    <button class="upvote" style="${ css$3.button }">
	  <i class="fa fa-thumbs-up"></i>
	  <i class="vote-number"></i>
	</button>
	<button class="downvote" style="${ css$3.button }">
	  <i class="fa fa-thumbs-down"></i>
	  <i class="vote-number" style="${ css$3.votenumberi }"></i>
	</button>
	<button class="reply" style="${css$3.button} ${ css$3.replybutton }"><b>REPLY</b></button>
  </div>
</div>
`; // template



class Comment{
  
  user = "Default User: Aljaz"
	
  constructor(config){
	let obj = this;
	
	// Make a new node.
	obj.node = html2element$1(template$a);
	
	// Fill the template with the options from the config. There must be a comment, and there must be an author.
	obj.config = config;
	
	// Upon creation the author is also the user? True when the user makes them, not otherwise... But the user is updated when the login is initiated.
	obj.user = obj.config.author;
	
	// Fill some options that may not be defined in config.
	obj.config.time      = config.time ? config.time : Date();
	obj.config.upvotes   = config.upvotes ? config.upvotes : [];
	obj.config.downvotes = config.downvotes ? config.downvotes : [];
	obj.config.tags      = config.tags ? config.tags : [];
	
	// Modify the node to reflect the config.
	let header = obj.node.querySelector("div.header");
	header.querySelector("b.author").innerText = config.author;
	
	let body = obj.node.querySelector("div.body");
	body.innerText = config.text;
	
	obj.update();
	
	
	// Add the upvoting and downvoting. Where will the author name come from?? The upvote/downvote buttons should also be colored depending on whether the current user has upvoted or downvoted the comment already. Maybe the top app should just push the current user to the elements, and then they can figure out how to handle everything. That means that the functionality can be implemented here.
	
	let footer = obj.node.querySelector("div.footer");
	footer.querySelector("button.upvote").onclick = function(){
		obj.upvote(obj.user);
	}; // onclick
	
	footer.querySelector("button.downvote").onclick = function(){
		obj.downvote(obj.user);
	}; // onclick
	
  } // constructor
  
  get id(){
	let obj = this;
	return [obj.config.viewid, obj.config.author, obj.config.time].join(" ");
  } // get id
  
  update(){
	// Only the time is allowed to be updated (if it will be calculated back), and the up and down votes.
	let obj = this;
	
	obj.updateTimestamp();
	
	obj.updateVoteCounter("upvote");
	obj.updateVoteCounter("downvote");
	
  } // update
	
  updateTimestamp(){
	let obj = this;
	
	let timestamp = obj.node
	  .querySelector("div.header")
	  .querySelector("span.timestamp");
	
	// Dates are saved as strings for ease of comprehension. For formatting they are first translated into miliseconds passed since 1970.
	let t = obj.config.time;
	let now = Date.now();
	let stamp = Date.parse(t);
	
	let dayInMiliseconds = 1000*60*60*24;
	let todayInMiliseconds = getDayInMiliseconds(now);
	
	// Format the time so that it shows everything from today as n minutes/hours ago, everything from yesterday as yesterday at :... and everything else as the date. 
	if( stamp > now - todayInMiliseconds ){
		// This was today, just report how long ago.
		timestamp.innerText = getAgoFormattedString(now - stamp);
	} else if (stamp > now - todayInMiliseconds - dayInMiliseconds){
		// Yesterday at HH:MM
		timestamp.innerText = `Yesterday at ${t.split(" ").splice(4,1)[0]}`;
	} else {
		// Just keep the first 4 parts which should be day name, month name, day number, year number
		timestamp.innerText = t.split(" ").splice(0,4).join(" ");
	} // if
	
  } // updateTimestamp


  updateVoteCounter(buttonClassName){
	let obj = this;
	
	let button = obj.node
	  .querySelector("div.footer")
	  .querySelector(`button.${ buttonClassName }`);
	
	
	let icon = button.querySelector("i.fa");
	let counter = button
	  .querySelector("i.vote-number");
	
	let n = 0;
	switch( buttonClassName ){
	  case "upvote":
		n = obj.config.upvotes.length;
		counter.innerText = n > 0 ? n : "";
		icon.style.color = obj.config.upvotes.includes(obj.user) ? "green" : "black";
		break;
	  case "downvote":
		n = obj.config.downvotes.length;
		counter.innerText = n > 0 ? -n : "";
		icon.style.color = obj.config.downvotes.includes(obj.user) ? "tomato" : "black";
		break;
	} // switch

  } // updateVoteCounter
	
  
  // Maybe these should also allow the neutering of an upvote/downvote?
  upvote(author){
	let obj = this;
	pushValueToAWhichCompetesWithB(author, obj.config.upvotes, obj.config.downvotes);
	obj.update();
  } // upvote
	
  downvote(author){
	let obj = this;
	pushValueToAWhichCompetesWithB(author, obj.config.downvotes, obj.config.upvotes);
	obj.update();
  } // upvote
  
} // Comment


function pushValueToAWhichCompetesWithB(value, A, B){
    if(!A.includes(value)){
	  A.push(value);
	  if(B.includes(value)){
		B.splice(B.indexOf(value), 1);
	  } // if
	} // if
  } // pushValueToAWhichCompetesWithB
  
  
  
function getDayInMiliseconds(msdate){
	// 'msdate' is a date in miliseconds from 1970. Calculate how many miliseconds have already passed on the day that msdate represents.
	var d = new Date(msdate);
	return ( ( d.getHours()*60 + d.getMinutes() )*60 + d.getSeconds() )*1000 + d.getMilliseconds();
} // getDayInMiliseconds


function getAgoFormattedString(delta){
	// delta is the number of miliseconds ago for which this should return a human readable string. If delta is more than a day, then the result is returned as days.
	
	
	let seconds = Math.floor( delta/1000 );
	let minutes = Math.floor( seconds/60 );
	let hours   = Math.floor( minutes/60 );
	let days    = Math.floor( hours/24 );
	
	if(days > 0){
		return `${days} days ago`;
	} // if
	
	if(hours > 0){
		return `${hours} hours ago`;
	} // if
	
	if(minutes > 0){
		return `${minutes} minutes ago`;
	} // if
	
	return `${seconds} seconds ago`
	
} // getAgoFormattedString

class ReplyComment extends Comment{
  constructor(config){
    super(config);
	let obj = this;
	
	// The secondary comments need to be indented.
	obj.node.style.marginLeft = "20px";
	
	// Replies can't be replied to. Maybe allow them too, but just put a hashtagged name in front?
	obj.node.querySelector("button.reply").remove();
	
  } // constructor
} // ReplyComment

// If a general comment owns its replies, then keeping the replies in control is easy. What happens when someone else make a reply on a separate client though, and the data is just pushed to this client? How should the reply be added to the right parent? Maybe the reply should have an identifier that can be constructed from the comment (e.g. view id + author name + time), and that can be used to merge the comments. Then everytime a comment is pushed to the storage an update can be fired? Also, how will the changes be communicated back to the server? Let the backend handle the updates - just find the comment with the proper id, and resolve the differences, and then push any comments that had differences. Maybe it's simpler to just adjust everything when the connection closes?

// Sort the comments before passing them to the comments below. How will replies be updated? Ultimately everything should be coming from the server??


// This is just a template for the controls which allow the replies to be expanded or collapsed. These are invisible at first.
let template$9 = `
<div style="display: none;">
  <div class="expand-controls" style="color: blue; cursor: pointer;">
    <i class="fa fa-caret-down"></i>
	<i class="control-text">View replies</i>
  </div>
  <div class="replies" style="display: none;"></div>
</div>
`;

// Maybe the general comments can be added on top, but the replies should follow in chronological order.
class GeneralComment extends Comment{
  
  replies = [];
  
  constructor(config){
    super(config);
	let obj = this;
	
	// The general comment can have replies associated with it. Handle these here. Furthermore an additional control for expanding, reducing hte comments is required.
	obj.replynode = html2element$1(template$9);
	obj.node.appendChild( obj.replynode );
	
	// Add the functionality to the caret.
	obj.repliesExpanded = false;
	obj.replynode.querySelector("div.expand-controls").onclick = function(){
	    obj.repliesExpanded = !obj.repliesExpanded;
		obj.update();
	}; // onclick
	
	// Replies on the config need to be initialised. But actually, they should be stored as separate entries for ease of updating...
	
	obj.update();
  } // constructor
  
  reply(replyconfig){
	// Replies can also need to be updated if the server pushes an updated version. In that case handle the replacement here.
	let obj = this;
	
	// Make a comment node, and append it to this comment.
	replyconfig.parentid = obj.id;
	let r = new ReplyComment(replyconfig);
	
	let existing = findArrayItemById$1(obj.replies, r.id);
	if(existing){
	  obj.replaceReply(existing, r);
	} else {
	  // Add this one at the end.
	  obj.replynode.querySelector("div.replies").appendChild(r.node);
	  obj.replies.push(r);	
	} // if
	
	// Update the view.
	obj.update();
  } // reply
  
  replaceReply(existing, replacement){
	// For simplicity handle the replacing of hte comment here.
	let obj = this;
	
	// Update the internal comments store.
	obj.replies.splice(obj.replies.indexOf(existing), 1, replacement);
	
	// Update teh DOM.
	let container = obj.node.querySelector("div.replies");
	container.insertBefore(replacement.node, existing.node);
  } // replaceReply
  
  
  update(){
	// Only the time is allowed to be updated (if it will be calculated back), and the up and down votes.
	let obj = this;
	
	// From superclass
	obj.updateTimestamp();
	obj.updateVoteCounter("upvote");
	obj.updateVoteCounter("downvote");
	
	// GeneralComment specific.
	obj.updateReplies();
  } // update
  
  updateReplies(){
	let obj = this;
	
	// First update is called when the superclass constructor is called.
	if(obj.replies){
	  let n = obj.replies.length;
	  obj.replynode.style.display = n > 0 ? "" : "none";
	
	  // View replies or hide replies
	  let s = n == 1 ? "y" : `ies (${n})`;
	  obj.replynode
	    .querySelector("div.expand-controls")
	    .querySelector("i.control-text")
	    .innerText = obj.repliesExpanded ? `Hide repl${s}` : `View repl${s}`;
		
	  obj.replynode
	    .querySelector("div.expand-controls")
	    .querySelector("i.fa")
	    .classList.value = obj.repliesExpanded ? "fa fa-caret-up" : "fa fa-caret-down";
	
	  obj.replynode.querySelector("div.replies").style.display = obj.repliesExpanded ? "" : "none";
	} // if
  } // updateReplies
  
} // GeneralComment

function findArrayItemById$1(A, id){
  let candidates = A.filter(a=>{
	return a.id == id;
  }); // filter
  
  return candidates.length > 0 ? candidates[0] : false;
} // findArrayItemById

let template$8 = `
<div style="margin-bottom: 5px;"></div>
`; // template

// Maybe make them grey with italis writing?
let css$2 = `
border: none;
background-color: gainsboro;
margin-right: 2px;
cursor: pointer;
`; // css

let tagtemplate = `
<button style="${ css$2 }"><i></i></button>
`;

// A general tag should always be present. This tag should then show all comments without tags.
class DiscussionSelector{
  
  tags = []
  selected = [] 
  
  
  constructor(){
    let obj = this;
	obj.node = html2element$1(template$8);
	
	
  } // constructor
  
  update(newtags){
	let obj = this;

	if(newtags){
	  // Replace the tags if necessary. The same tags should be grouped together, but different authors may have differing views on what constitutes features.
	  obj.tags = newtags;
	  obj.selected = obj.selected.filter(d=>newtags.includes(d));
	  obj.externalAction();
	} // if

	let buttons = joinDataToElements(obj.tags, obj.node.querySelectorAll("button"), d=>d);
	
	buttons.enter.forEach(d=>{
		let el = html2element$1(tagtemplate);
		obj.node.appendChild( el );
		el.querySelector("i").innerText = d;
		el.__data__ = d;
		
		el.onclick = function(){
			obj.toggle(el);
		}; // onclick
	}); // forEach
	
	buttons.exit.forEach(button=>button.remove());
	  
  } // update
  
  toggle(el){
	let obj = this;
	if(obj.selected.includes(el.__data__)){
		obj.selected.splice(obj.selected.indexOf(el.__data__),1);
		el.style.fontWeight = "";
	} else {
		obj.selected.push(el.__data__);
		el.style.fontWeight = "bold";
	} // if
	
	obj.externalAction();
  } // toggle
  
  // Placeholder that will allow the actual comments to be hidden. Maybe just name it that?
  externalAction(){} // externalAction
} // DiscussionSelector

// Needs a way to minimise the commenting completely.
let template$7 = `
<div class="commenting" style="width:300px;">
  <div class="hideShowText" style="cursor: pointer; margin-bottom: 5px; color: gray;">
    <b class="text">Show comments</b>
	<b class="counter"></b>
	<i class="fa fa-caret-down"></i>
  </div>
  <div class="commentingWrapper" style="display: none;">
    <div class="comment-form"></div>
    <hr>
    <div class="comment-tags"></div>
    <div class="comments" style="overflow-y: auto; max-height: 200px;"></div>
  </div>
</div>
`; // template


class CommentingManager{
  constructor(id){
    let obj = this;
	obj.node = html2element$1( template$7 );
	obj.viewid = id;
	obj.comments = [];
	
	// Make the form;
    obj.form = new AddCommentForm(id);
    obj.node
	  .querySelector("div.comment-form")
	  .appendChild(obj.form.node);
  
    // Make both replies and general comments to use a single form.
    obj.form.submitbutton.onclick = function(){
	  let config = obj.form.config;
	  if(config){
	    // The form should only be cleared if a comment was successfully added.
	    config.tags = obj.discussion.selected.map(d=>d);
		obj.add(config);
	    obj.form.clear();
	  } // if
    }; // onclick
	
	
	// Add the comment tags, which serve as selectors of the discussion topics. This should be another module. At the saem time this one will have to update when the module is updated. Maybe the placeholder reactions function should just be defined here??
	obj.discussion = new DiscussionSelector();
    obj.node
	  .querySelector("div.comment-tags")
	  .appendChild(obj.discussion.node);
    // obj.discussion.update(["#vortex", "#shock"])
	obj.discussion.externalAction = function(){
		obj.hideNonDiscussionComments();
	}; // externalAction
	
	
	// At the beginning show only general comments? Better yet, show no comments.
	obj.hideNonDiscussionComments();
	
	
	// Finally add teh controls that completely hide comments.
	let hsdiv = obj.node.querySelector("div.hideShowText");
	let cdiv = obj.node.querySelector("div.commentingWrapper");
	hsdiv.onclick = function(){
	  let hidden = cdiv.style.display == "none";
	  cdiv.style.display = hidden ? "" : "none";
	  
	  // It changed from hidden to show, but hidden is past state.
	  hsdiv.querySelector("b.text").innerText = hidden ? "Hide comments" : "Show comments";
	  hsdiv.querySelector("i").classList.value = hidden ? "fa fa-caret-up" : "fa fa-caret-down";
	}; // onclick
	
  } // constructor
  
  hideNonDiscussionComments(){
	let obj = this;
	obj.comments.forEach(comment=>{
      // This should really be select any!
	  let pertinent = (obj.discussion.selected.length == 0) 
	               || (obj.discussion.selected.some(d=>comment.config.tags.includes(d)));
	  comment.node.style.display = pertinent ? "" : "none";
	}); // forEach
  } // hideNonDiscussionComments
  
  
  updateCommentCounter(){
	let obj = this;
	
	let n = obj.comments.reduce((acc,c)=>{
		acc += 1;
		acc += c.replies.length;
		return acc
	},0);
	let counterNode = obj.node
	  .querySelector("div.hideShowText")
	  .querySelector("b.counter");
	counterNode.innerText = n ? `(${n})` : "";
	
  } // updateCommentCounter
  
  
  submit(config){
	// This function is called when the button is pressed. By default it just routes the comment to 'add' so that the comment is added straight away. Alternately it should be passed to the server first. Maybe it's good if both things are done in cases when the connection is not good?
	this.add(config);
  } // submit
  
  clear(){
	let obj = this;
	obj.comments = [];
	let commentsToRemove = obj.node.querySelector("div.comments").children;
	for(let i=0; i<commentsToRemove.length; i++){
		commentsToRemove[i].remove();
	} // for
  } // clear
  
  
  add(config){
	// When the comments are loaded from the server they will be added through this interface. Therefore it must handle both the primary and secondary comments.
	let obj = this;
	
	if(config.parentid){
	  // Comments that have a parent id are replies. Find the right parent comment.
	  obj.addReplyComment(config);
	} else {
	  // It's a general comment. 
	  obj.addGeneralComment(config);
	} // if
	
	// Update the comments count.
	obj.hideNonDiscussionComments();
	obj.updateCommentCounter();
  } // add
  
  addReplyComment(config){
	let obj = this;
	
	let parent = findArrayItemById(obj.comments, config.parentid);
	if(parent){
	  parent.reply(config);
	} // if
  } // addReplyComment
  
  addGeneralComment(config){
	let obj = this;
	  
	// If there is an existing one, that one should be updated. Whatever is coming from the server is the truth. Maybe it'll be simpler just to replace the comment in that case?? The comment config does not contain hte comment id, which is computed....
	
	
	// Generally new comments should be attached at teh top. Here the attachment point is variable to reuse this method as a way to replace an existing comment with the same id.
	
	
	let c = new GeneralComment(config);
	
	// Remove the existing one, and replace it with the current one.
	let existing = findArrayItemById(obj.comments, c.id);
	if(existing){
	  obj.replaceGeneralComment(existing, c);
	} else {
		
	  obj.comments.push(c);
	  
	  // Add the functionality to add secondary comments:
	  c.node.querySelector("button.reply").onclick = function(){
	    if(obj.form.config){
		  c.reply(obj.form.config);
		  obj.form.clear();
	    } // if
	  }; // onclick
	
	  // Insert the new comment at teh very top.
	  let container = obj.node.querySelector("div.comments");
	  container.insertBefore(c.node, container.firstChild);
	} // if
  } // addGeneralComment
  
  
  replaceGeneralComment(existing, replacement){
	// For simplicity handle the replacing of hte comment here.
	let obj = this;
	
	// Update the internal comments store.
	obj.comments.splice(obj.comments.indexOf(existing), 1, replacement);
	
	// Update teh DOM.
	let container = obj.node.querySelector("div.comments");
	container.insertBefore(replacement.node, existing.node);
  } // replaceGeneralComment
  
  get user(){
	return this.form.user;
  } // get user
  
  set user(name){
	let obj = this;
	
	// The form has a change of author.
	obj.form.user = name;
	
	// The comment appearance and functionality changes depends on who is checking them.
	obj.comments.forEach(comment=>{
	  comment.user = name;
	  comment.update();
	}); // forEach
  } // set user
  
  getCommentsForSaving(){
	// The obj.comments is an array of GeneralComment instances, and just the configs have to be collected before being passed on. Collect them here.
	let obj = this;
	// Note that the general comments hold the reply comments. Extract the secondary comments here and store them in a single layer array for ease of updating the changes on the server.
	return obj.comments.reduce((acc,comment)=>{
		acc.push(comment.config);
		acc.push(...comment.replies.map(reply=>reply.config));
		return acc
	},[])
  } // getCommentsForSaving
  
} // CommentingManager


function findArrayItemById(A, id){
  let candidates = A.filter(a=>{
	return a.id == id;
  }); // filter
  
  return candidates.length > 0 ? candidates[0] : false;
} // findArrayItemById

let css$1 = {
  button: `
    border: none;
	cursor: pointer;
	border-radius: 4px;
  `,
  
  timebutton: `
    background-color: gainsboro;
  `,
  
  submitbutton: `
    background-color: black;
	color: white;
  `
}; // css


let template$6 = `
<div style="300px">
  <input type="text" placeholder="#tag-name" style="width: 100px;"></input>
  
  <div style="display: inline-block; float: right;">
  <button class="starttime" style="${ css$1.button } ${css$1.timebutton}">start</button>
  <i>-</i>
  <button class="endtime" style="${ css$1.button } ${css$1.timebutton}">end</button>
  <button class="submit" style="${ css$1.button } ${css$1.submitbutton}">
    Submit
  </button>
  </div>
  
  
</div>
`; // template

class ChapterForm{
  
  user = "Default user: Aljaz"
  
  constructor(){
    let obj = this;
	obj.node = html2element$2(template$6);
	
	obj.input = obj.node.querySelector("input");
	
	// This value will be overwritten during interactions, and is where the tag manager collects the time for the timestamps.
	obj.t = 0;
	obj.clear();
	// The button should cycle through black, green, and red. It will need some way of tracking its current state, and a way to load in existing tags! This will allow users to subsequently change the tag if needed? Maybe this is a bit much for now. It will need a submit button.
	// If the tag is loaded and the button switches to timestamping then any user can add the ned timesteps. Then the users name needs to be checked in addition. Maybe some way of filtering out the tags that are added? How would that work?
	// For now add 3 buttons. A starttime endtime and submit button. For the submit button only the start and name need to be filled in. The buttons must also show the selected times!
	
	// If one of the times is set, it should check with the other time to make sure it's set correctly.
	
	
	obj.node.querySelector("button.starttime").onclick = function(){
		obj.starttime = obj.t;
		obj.update();
	}; // onclick
	
	obj.node.querySelector("button.endtime").onclick = function(){
		obj.endtime = obj.t;
		obj.update();
	}; // onclick
	
	obj.node.querySelector("button.submit").onclick = function(){
		let tag = obj.tag;
		if(tag){
			obj.submit(tag);
			obj.clear();
		} // if
	}; // onclick
	
	obj.input.oninput = function(){
		obj.update();
	}; // oninput
	
  } // constructor
  
  update(){
	let obj = this;
	
	// Ensure that the times are always consistent (end > start);
	if(obj.endtime && obj.starttime){
		let t0 = Math.min(obj.starttime, obj.endtime);
		let t1 = Math.max(obj.starttime, obj.endtime);
		obj.starttime = t0;
		obj.endtime = t1;
	} // if
	
	// Update the time tags also.
	let it0 = obj.node.querySelector("button.starttime");
	let it1 = obj.node.querySelector("button.endtime");
	
	it0.innerText = (obj.starttime != undefined) ? obj.starttime.toFixed(3) : "start";
	it1.innerText = (obj.endtime != undefined) ? obj.endtime.toFixed(3) : "end";
	
	
	// The button is black by default, and making it look disabled is a bit more involved.
	let button = obj.node.querySelector("button.submit");
	if(obj.tag){
		// Enable.
		button.style.opacity = 1;
		button.style.backgroundColor = "black";
		button.style.color = "white";
	} else {
		button.style.opacity = 0.6;
		button.style.backgroundColor = "gainsboro";
		button.style.color = "black";
	} // if
  } // update
  
  clear(){
	let obj = this;
	obj.starttime = undefined;
	obj.endtime = undefined;
	obj.input.value = "";
	obj.update();
  } // clear
  
  get tag(){
	// Chapter tag should belong to the task id so that the observations across multiple slices are available together to the user.
	let obj = this;
	// The time should be defined, but it can also be 0, or less than 0!
	return obj.user && obj.input.value && ( obj.starttime != undefined ) ? { 
		taskId: obj.taskId,
		label: obj.input.value,	
		author: obj.user,  
		starttime: obj.starttime, 
		endtime: obj.endtime,
		id: `${obj.user} ${Date()}`
	} : false; 
  } // tag

  // Placeholder for communication between classes.
  submit(tag){} // submit
} // ChapterForm

// DONE: Which annotations should be seen on the playbar? Just the current users, or those of otehr users as well? Capturing all annotations would allow feature tracking for example. But it may clutter the play bar. 
	
// On the other hand, when discussing the tags it's good to avoid misunderstaning.

// Furthermore, it would be good to just accept someone elses tags. What about clicking on the users name? Then select adopting their annotations? How do you revert back? A clear all button? Allow reloading of annotations for editing??
	
// Anyway, the commenting should show all possible annotations.
	
// What about showing the most popular annotations by default?? Ideally, the annotations would show up when the comment addressing them would be hovered over.

let template$5 = `
<div>
  <div class="playcontrols-wrapper"></div>
  <div class="chapterform-wrapper"></div>
  <div class="commenting-wrapper"></div>
</div>
`; // template


class interactivePlayerUI{
  constructor(id){
	let obj = this;
	obj.viewid = id;
	obj.node = html2element$2(template$5);
	obj.playControlsWrapperNode = obj.node.querySelector("div.playcontrols-wrapper");
	obj.chapterFormWrapperNode  = obj.node.querySelector("div.chapterform-wrapper");
	obj.commentingWrapperNode   = obj.node.querySelector("div.commenting-wrapper");
	
	// Add in a playbar
	obj.playcontrols = new PlayControls();
	obj.playControlsWrapperNode.appendChild( obj.playcontrols.node );
	
	
	// The tag adding.
	obj.chapterform = new ChapterForm();
	obj.chapterFormWrapperNode.appendChild( obj.chapterform.node );
	
	// Add in the commenting system. The metadata filename is used as the id of this 'video', and thus this player. The node needs to be added also.
	obj.commenting = new CommentingManager( id );
	obj.commentingWrapperNode.appendChild( obj.commenting.node );
	
	
	//  Tags need to be pushed to the playbar, but also to the commenting! Should individual tags be allowed to influence the navigation? I guess so?
	obj.chapterform.submit = function(tag){
		obj.playcontrols.bar.addchapter(tag);
		
		let discussiontags = obj.playcontrols.bar.annotations.map(a=>a.label);
		obj.commenting.discussion.update(discussiontags);
	}; // submit
	
	
	// Add onhover events to the tagged keywords in the text? That allows the user to show exactly which part of the data they meant, and also to compare it to others interpretations.
	
	// What happens when the user replies in a thread for which he does not have an annotation for? For replies, it's the parent annotations that get pasted in. But what if you're making a general comment without having the playbar annotations? Which one should get selected? Or should just the text tags be retained? But in that case I can't show the different versions. Maybe keep the tag names, but also keep the annotations separate - that way they can only be added for mouseover if they're in hte text? And in the text they need to be marked using a #? But then no disagreements with the thread parent comment are possible... How to deal with this? Only allow the user to use their own annotations?
	
	// Anyyyyyway, first include the tree navigation
	
	
	
  } // constructor
  
  

  
  
  
  /*
  Getters and setters to simplify the API:
	t_domain
	t
	playing
	skipped
	user
  */ 

  get playing(){
	return this.playcontrols.playing;
  } // get playing
  
  get skipped(){
	return this.playcontrols.skipped;
  } // get skipped
  
  set skipped(v){
	this.playcontrols.skipped = false;
  } // set skipped
  
  get t_play(){
	return this.playcontrols.bar.t_play;
  } // get t_play
  
  set t_play(t){
	this.chapterform.t = t;
	this.playcontrols.bar.t_play = t;
	this.playcontrols.bar.update();
  } // set t_play
  
  get t_domain(){
	return this.playcontrols.t_domain;
  } // get t_domain
  
  set t_domain(t){
	this.playcontrols.t_domain = t;
  } // set t_domain
  
  get user(){
	// The annotation form is the primary annotation.
	return this.chapterform.user
  } // get user
  
  set user(name){
	this.commenting.user = name;
	this.chapterform.user = name;
  } // set user
  
  set metadata(m){
	this._metadata = m;
	this.chapterform.taskId = m.taskId;
  } // set metadata
  
  get metadata(){
	return this._metadata;
  } // set metadata
  
} // interactivePlayerUI

// How to actually perform the playing? First, just allow a small multiple to play itself. When the button is pressed the player becomes 'active'. The UnsteadyPlayer must be given the fps at which the data should change. Then when the internal document timestamp passes another full timestep from the beginning of the document it changes the data. The data must be ready beforehand though.


// It's advantageous to inherit from ViewFrame2D because the geometry changes on the go - first some dummy geometry is specified, and after the actual geometry is loaded in that just gets automatically used on next FrameAnimationRate step. If the ViewFrame is a module then the UnsteadyPlayer has to monitor when the geometry changes, and update the ViewFrame accordingly.
// Because it's advantageous to inherit from ViewFrame2D it is also advantageous to create the outside html player wrapper in it. Then the unsteady player only needs to add other modules into it.
class UnsteadyPlayer2D extends ViewFrame2D {
  constructor(gl, unsteadyMetadataFilename){
    super(gl);
	let obj = this;
	
	
	// Actual geometry to be drawn.
	obj.geometry = new Mesh2D(gl, unsteadyMetadataFilename);
	
	// The FPS at which to swap out data.
	obj.fps = 24;
	obj.dt = 1000 / obj.fps;
	obj.timelastdraw = 0;
	
	
	
	// Add in precofigured UI. The metadata filename identifies this small multiple.
	obj.ui = new interactivePlayerUI(unsteadyMetadataFilename);
	obj.node.appendChild( obj.ui.node );
	
  } // constructor
  
  update(now){
	let obj = this;
	
	// Compute the view matrices
    obj.computeModelMatrix();
    obj.computeViewMatrix();
    obj.computeOrthographicMatrix();
	
	// Will the rendering loop have to be redone in order to allow promises to be returned to ensure that the player is ready for the next step?
	if(now > obj.timelastdraw + obj.dt){
	  if( obj.ui.playing ){
		obj.timelastdraw = now;
		obj.incrementTimeStep();
	  } else if ( obj.ui.skipped ){
		obj.timelastdraw = now;
		obj.incrementTimeStep(0);
		obj.ui.skipped = false;
	  } // if
	} // if
    
    
	// The time domain can only be known AFTER the metadata is loaded. But, after the timesteps are updated the playcontrols need to be updated too. Specifically, the chapters need to be rebuild because they are independent of the actual annotations. But they currently don't need to be! Yes, they do - e.g. padding etc.
	obj.ui.t_domain = obj.geometry.domain.t;
  } // update
  
  
  incrementTimeStep(dt){
	/*
	The small multiple should be able to play on its own. In that case it should just update the data 24 times per second.
	
	It should of course support playing several small multiples at once. If the 'dt' for all the simulations are the same then playing several at once just requires an input that will toggle several small multiples on at the same time. If the 'dt' are not the same, then it becomes more difficult because the data can't be loaded by incrementing, and instead a desired time must be passed to the player. Furthermore, the player should support several small multiples to be played at once, but starting from different times. In those cases the player must keep track of the time increment total to ensure all small multiples move by the same amount.
	
	For now the playbar can just play forward correctly, and the t_play can be used to keep track of the actual playing time. The dt is just added on to that time them.
	*/
	let obj = this;
	
	if(dt >= 0){
	  let t_new = obj.ui.t_play + dt;
	  obj.geometry.timestepCurrentFrame(t_new);
	  obj.ui.t_play = t_new;
	} else {
	  obj.geometry.incrementCurrentFrame();
	  obj.ui.t_play = obj.geometry.currentTime;
	} // if
	
	obj.geometry.updateCurrentFrameBuffer();
  } // incrementTimeStep
  
} // UnsteadyPlayer2D

/* No need to implement anything else than panning and zooming for the 2D example. The model matrix and the rojection matrix are not needed. The view is needed to allow for zooming.

updateAttributesAndUniforms needs to be changed to accomodate different size elements.

Actually, Graham's own rendering was effectively using 3D coordinates. The 2D position 'a_position' was expanded with z=0 and w=1 before multiplying with matrices.

Still, hte program needs to be assembled in a different way.

projection: orthographic - no distortion
view: camera movement.
model: unit matrix, model not moving.
*/

let vertshader = `
//Each point has a position and color
attribute vec2 position;
attribute float value;

// The transformation matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// Pass the color attribute down to the fragment shader
varying float v_uint_colorval;

void main() {
  
  // Pass the color down to the fragment shader.
  v_uint_colorval = value;
  
  // Read the multiplication in reverse order, the point is taken from the original model space and moved into world space. It is then projected into clip space as a homogeneous point. Generally the W value will be something other than 1 at the end of it.
  gl_Position = projection * view * model * vec4( position, 0.0, 1.0 );
}`;


let fragshader = `
precision mediump float;
varying float v_uint_colorval;

uniform sampler2D colormap;
uniform float u_cmin, u_cmax;
uniform float u_uint_cmin, u_uint_cmax;

void main() {
  gl_FragColor = texture2D(colormap, vec2( ( (v_uint_colorval/255.0*(u_uint_cmax-u_uint_cmin)+u_uint_cmin) - u_cmin)/(u_cmax-u_cmin), 0.5));;
}`;



// A viridis colormap. Values for color channels in frag shader should be [0, 1].
let cmap = new Uint8Array( [
  68, 1, 84, 255,
  71, 19, 101, 255,
  72, 36, 117, 255,
  70, 52, 128, 255,
  65, 68, 135, 255,
  59, 82, 139, 255,
  53, 95, 141, 255,
  47, 108, 142, 255,
  42, 120, 142, 255,
  37, 132, 142, 255,
  33, 145, 140, 255,
  30, 156, 137, 255,
  34, 168, 132, 255,
  47, 180, 124, 255,
  68, 191, 112, 255,
  94, 201, 98, 255,
  122, 209, 81, 255,
  155, 217, 60, 255,
  189, 223, 38, 255,
  223, 227, 24, 255,
  253, 231, 37, 255
] ); // cmap



class MeshRenderer2D{
  constructor(canvas, container){
	let obj = this;  
	
	obj.domcontainer = container;
		
	obj.canvas = canvas;
	obj.canvas.width = window.innerWidth;
	obj.canvas.height = window.innerHeight;

	// Grab a context and setup a program.
	let gl = canvas.value = canvas.getContext("webgl", {antialias: true, depth: false});
	
	// The extension is needed to allow indices to be uint32.
	gl.getExtension("OES_element_index_uint");
	// console.log("can uints be used? ", uints_for_indices)
	
	obj.webglProgram = setupProgram(gl);
	obj.gl = gl;
	
	
	
	// The texture represents a solorbar, and stores the color values. It is indexed on a range of 0 - 1. The index is computed in the colorshader.
	// gl.texImage2D( ... , width, height, border, format, type, ArrayBuffer)
	obj.colormapTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
	gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 21, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, cmap);
	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	
	// Collection of plots to draw.
	obj.items = [];
	
  } // constructor
  
  
  draw(){
	let obj = this;
	let gl = obj.gl;
	
	// Common current time. This should be changed so that it starts from when the user presses a play. Furthermore the views should be either linked or individual
	let now = performance.now();
	
	// Move the canvas to the right position for scrolling.
	gl.canvas.style.transform = `translateY(${window.scrollY}px)`;
	
	
	// The actual drawing loop.
	obj.items.forEach(item=>{
		// Check whether the item is visible or not.
		if( obj.isItemVisible(item) ){
		  // Update the ViewFrame to calculate new transform matrices. Nothing (camera, model, zoom) moves as a function of time. Time is still passed in to synchronise the player updates.
		  item.update(now);
		
		  // Update the data going to the GPU
		  obj.updateAttributesAndUniforms(item);
		
		  // Set the rectangle to draw to. Scissor clips, viewport transforms the space. The viewport seems to be doing the scissoring also...
		  obj.updateViewport(item);
		
		  // Perform the actual draw. gl.UNSIGNED_INT allows teh use of Uint32Array indices, but the 'OES_element_index_uint' extension had to be loaded.
		  gl.drawElements(gl.TRIANGLES, item.geometry.indicesLength, gl.UNSIGNED_INT, 0);
		
		} // if
	}); // forEach
	
	requestAnimationFrame( obj.draw.bind(obj) );
  } // draw
  
  add(meshMetadataFilename){
	let obj = this;
	
	// let newplayer = new ViewFrame2D(obj.gl);
	let newplayer = new UnsteadyPlayer2D(obj.gl, meshMetadataFilename);
	obj.domcontainer.appendChild(newplayer.node);
	obj.items.push(newplayer);
	
	// Return the newplayer if metadata has to be added to it.
	return newplayer
  } // add
  
  updateViewport(item){
	let gl = this.gl;
	 
	gl.viewport(...item.viewport);
	gl.scissor(...item.viewport);
	gl.clearColor(...[0,0,0,0]);  
  } // updateViewport
  
  
  // Maybe the update could be performed by the item itself. That way both 2D and 3D objects could potentially be drawn alongside. 
  // But the programme declares the variables it expects, so the program would have to be redone also, which means another webgl instance is needed, and thus another canvas.
  
  
  updateAttributesAndUniforms(item){
	// 'item' is a 'ViewFrame' instance. This method needs to update the transformation matrices, which are owned by the 'ViewFrame' instance, as well as the geometry buffers owned by the 'ViewFrame.geometry' instance.
	// 'transforms' should have the 'model', 'projection', and 'view' transform 4x4 matrices that will be used to draw the scene.
	// In addition to that this update also requires the 'position' and 'color' buffers. So the entire geometry is needed here to update gl before drawing. 
	let obj = this;
	let gl = this.gl;
	
	// Locations are pointers to the GPU buffers. Transforms are the transformation matrices. Buffers are the geometry arrays.
	let locations = obj.webglProgram.locations;
	let transforms = item.transforms;
	
	
	// Update the transformations.
	gl.uniformMatrix4fv( locations.model, false, new Float32Array(transforms.model));
	gl.uniformMatrix4fv( locations.projection, false, new Float32Array(transforms.projection));
	gl.uniformMatrix4fv(locations.view, false, new Float32Array(transforms.view));

	// Set the vertices attribute
	gl.enableVertexAttribArray( locations.position );
	gl.bindBuffer(gl.ARRAY_BUFFER, item.geometry.verticesBuffer );
	gl.vertexAttribPointer( locations.position, 2, gl.FLOAT, false, 0, 0 );

	// Update the colors attribute
	gl.enableVertexAttribArray( locations.value );
	gl.bindBuffer(gl.ARRAY_BUFFER, item.geometry.valuesBuffer);
	gl.vertexAttribPointer( locations.value, 1, gl.FLOAT, false, 0, 0);

	// Update the indices attribute.
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.geometry.indicesBuffer );





	/* 
	vec2( (v_colorval-u_cmin)/(u_cmax-u_cmin), 0.5)

	v_colorval : [0, 255]
	u_cmin : variable min value
	u_cmax : variable max value

	First I need to map from [0, 255] to [a,b], then to [0,1]. The first [0,255] represents the frame specific uint encoding. The second encoding allows all the values to be drawn to the correct value across several files. However, the [0, 255] values are pushed to the GPU straight away, and both mappings must occur there.
	*/

	// cmin/cmax give the global (for all small multiples) colorbar range.
	gl.uniform1f(locations.cmin, obj.globalColormapRange[0] ); // 0   880
	gl.uniform1f(locations.cmax, obj.globalColormapRange[1] ); // 255   920
	
	// uint_cmin/uint_cmax give the local (particular small multiple) colorbar range,
	gl.uniform1f(locations.uint_cmin, item.geometry.currentUintRange[0] ); // 0   880
	gl.uniform1f(locations.uint_cmax, item.geometry.currentUintRange[1] ); // 255   920
	
	
	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
    gl.uniform1i(locations.colormap, 0);


  } // updateAttributesAndUniforms
  
 
  // This should focus solely on hte view div rectangle!!
  isItemVisible(item){
	// Check whether the current item is visible. (!!!!) Extend later to check whether other items obscure the current item.
	let obj = this;
		
	// The idea is to collect all the boundingClientRects, and check if any of the following items overlap it, in which case skip the drawing.
	// The limit is 16 items drawn at once. There can be more items in analysis at the same time, but only 16 drawn at once. This means that if the items overlap, there can be any number of them, as long as they are in maximum 15 piles.
	// It all really depends on the connection speed and the size of the files...
	let rect = item.node.querySelector("div.view").getBoundingClientRect();
	let isCovered = false;
	for(let i=obj.items.indexOf(item)+1; i<obj.items.length; i++){
		// Check if the i-th viewFrame covers this one. This is a simple version that skirts the problem of figuring out if a bunch of viewFrames collectively cover this viewFrame.
		// Maybe later on there can just be group interfaces added as a separate attribute, and those can be made to hide the other frames,
		let higherRect = obj.items[i].node.querySelector("div.view").getBoundingClientRect();
		isCovered = isCovered ? true : isRectInHigherRect(rect, higherRect);
	} // for
	
	return item.isOnScreen && !isCovered
  } // isItemVisible
  
  get globalColormapRange(){
	let obj = this;
	
	return obj.items.reduce((acc,item)=>{
		// v is the domain across all the frames of an unsteady simulation instance.
		let v = item.geometry.domain.v;
		acc[0] = acc[0] > v[0] ? v[0] : acc[0];
		acc[1] = acc[1] < v[1] ? v[1] : acc[1];
		return acc
	}, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])
	
	
  } // globalColormapRange

} // MeshRenderer2D


function isRectInHigherRect(rect, higherRect){
	// For it to be in hte rect it must be in the x and y range of the rect.
	return ( (higherRect.left <= rect.left) && (rect.right <= higherRect.right) ) &&
	       ( (higherRect.top <= rect.top)   && (rect.bottom <= higherRect.bottom) )
} // isPointInRect


function setupProgram(gl){
 
	// WHAT EXACTLY DOES TWGL DO THAT I CAN'T DO MYSELF?
 
	// Setup a WebGL program
	let webglProgram = twgl.createProgramInfo(gl, [vertshader, fragshader]);
	let program = webglProgram.program;
	gl.useProgram(program);
	
	// Save the attribute and uniform locations
    let loc_model = gl.getUniformLocation(program, "model");
    let loc_view = gl.getUniformLocation(program, "view");
    let loc_projection = gl.getUniformLocation(program, "projection");
	
	let loc_colormap = gl.getUniformLocation(program, "colormap");
	let loc_cmax = gl.getUniformLocation(program, "u_cmax");
	let loc_cmin = gl.getUniformLocation(program, "u_cmin");
	let loc_uint_cmax = gl.getUniformLocation(program, "u_uint_cmax");
	let loc_uint_cmin = gl.getUniformLocation(program, "u_uint_cmin");
	
    let loc_position = gl.getAttribLocation(program, "position");
	let loc_value = gl.getAttribLocation(program, "value");
    // let loc_color = gl.getAttribLocation(program, "color");


	// For 2D triangle meshes culling and depth testing is not needed.
	// gl.enable(gl.CULL_FACE);
    // gl.enable(gl.DEPTH_TEST);
	
	// Scissor defines the part of canvas to draw to.
	gl.enable(gl.SCISSOR_TEST);


	return {
		locations: {
			model: loc_model,
			view: loc_view,
			projection: loc_projection,
			colormap: loc_colormap,
			cmax: loc_cmax,
			cmin: loc_cmin,
			uint_cmax: loc_uint_cmax,
			uint_cmin: loc_uint_cmin,
			position: loc_position,
			value: loc_value
		},
		program: program
	};
} // setupProgram

// Padding can be clicked on, margin cannot. The click event is limited to the padding of the view object. A check is done on mousedown to make sure that interactions with the data don't trigger the div to move. When moving the item needs to be placed at the end of the rendering que, as well as the html order to ensure that it stays on top - so that other items don't draw over it, and that the dragging continues even when mousing over a div that was made after it.

// The dragging is done outside because I wish the rest of the interactivity - spatial arrangement, grouping to be added on top of this. That should make those aspects more general.

// The initial positions must be collected all at the same time, as otherwise the rest of the "position: relative;" divs will get repositioned to where the previous div was.



// How to make the addition of dragging more general?? There are some things that have to happen. Pass them in as additional functions?
function addDraggingToItem(item, onstart, ondrag, onend){
	// Add an object to facilitate the dragging.
	item.dragging = {
		active: false,
		itemRelativePosition: [0, 0]
	}; // dragging

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
			
			if(onstart){onstart();} // if
		} // if
	}; // onmousedown
	item.node.onmousemove = function(e){
		if(item.dragging.active){
			let x = e.pageX - item.dragging.itemRelativePosition[0];
			let y = e.pageY - item.dragging.itemRelativePosition[1];
			
			item.node.style.left = x + "px";
			item.node.style.top  = y + "px";
			
			if(ondrag){ondrag();}		} // if
	}; // mousemove
	item.node.onmouseup   = function(){
		item.dragging.active = false;
		if(onend){onend();}	}; // onmouseup
} // addDraggingToItem

function svg2element$1(svg){
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = svg.trim();
  return g.firstChild;
} // svg2element

// From regular helpers.
function arrayEqual(A, B){
	
	return arrayIncludesAll(A, B)
		&& arrayIncludesAll(B, A)
	
} // arrayEqual

function arrayIncludesAll(A,B){
	// 'arrayIncludesAll' checks if array A includes all elements of array B. The elements of the arrays are expected to be strings.
	
	// Return element of B if it is not contained in A. If the response array has length 0 then A includes all elements of B, and 'true' is returned.
	var f = B.filter(function(b){
		return !A.includes(b)
	});
	
	return f.length == 0? true : false
} // arrayIncludesAll





class scaleCategorical {
  domain = []
  range = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

  // Opposite function is not defined - two domain values can map to the same range value.
  dom2range(v){
	let obj = this;
	let i = (obj.domain.indexOf(v)+1) % obj.range.length - 1;
	if(i<0){
		obj.domain.push(v);
		return obj.range[obj.domain.length-1];
	} else {
		return obj.range[i];
	} // if
  } // dom2range
  
} // scaleCategorical

// Link has access to the nodes, but it will have it's own offsets. This allows the drawnode to change its values correctly.
class DrawLink{
	// Indices when exiting parent node, entering child node, and the index of position of the bend.
	pi = 0
	ci = 0
	bendi = 0
	
	// Actual dimensions. The label width is the minimum horizontal line length. Bundle width is the space reserved for the vertical line width. Line width is the actual width of the white outline. The default radius is the basis for the actual bend radii.
	node_label_width = 70
	bundle_width = 4
	line_width = 4
	r = 16
	
	constructor(parentnode, childnode, author){
		let obj = this;
		
		// So that hte locations can be changed on hte go.
		obj.parentnode = parentnode;
		obj.childnode = childnode;
		obj.author = author;
		
		// Exit radius is determined node level difference.
		obj.r1 = (childnode.level - parentnode.level)*obj.r;
		obj.r2 = obj.r;
	} // constructor
	
	get path(){
		// Doesn't take into account the offsets yet!!
		
		
		// Allow this to return a straight path, or a curved one. The straight path is exclusively for bundles that have only one parent. Furthermore, that one should only be allowed when connecting nodes on the same height. So maybe just base the decision off of that?
		
		// Straight path is just M0 0 L40 0 or so.
		
		let obj = this;
				
		
		let dyc = obj.ci*obj.line_width + obj.childnode.markerEmptyIn;
		let dyp = obj.pi*obj.line_width + obj.parentnode.markerEmptyOut;
		
		// The target x should be > `xHorizontal + r1 + r2'
		let xHorizontal = obj.parentnode.x + obj.node_label_width + obj.bendi*obj.bundle_width;
		
		
		// Origin and target MUST be at least `[node_label_width + 2*r, 2*r]' apart otherwise the graphic logic doesn't follow.
		let origin = {
			x: obj.parentnode.x,
			y: obj.parentnode.yMarkerStart + dyp
		};
		
		let target = {
			x: obj.childnode.x,
			y: obj.childnode.yMarkerStart + dyc
		};
		
		
		
		let arc1start = {
			x: xHorizontal - obj.r1,
			y: origin.y
		};
		
		let arc1end = {
			x: xHorizontal,
			y: origin.y + obj.r1
		};

		let arc2start = {
			x: xHorizontal,
			y: target.y - obj.r2
		};
		
		let arc2end = {
			x: xHorizontal + obj.r2,
			y: target.y
		};
		
		
		
		/*
		How the path is made up.
		start point                   : M0 0
		horizontal line               : L40 0
		first bend to vertical        : A16 16 90 0 1 46 16
		vertical line                 : L46 34
		second bend to horizontal     : A16 16 90 0 0 62 50
		horizontal connection to node : L62 50
		*/
		let p = `M${ origin.x } ${ origin.y } L${ arc1start.x } ${ arc1start.y } A${ obj.r1 } ${ obj.r1 } 90 0 1 ${ arc1end.x } ${ arc1end.y } L${ arc2start.x } ${ arc2start.y } A${ obj.r2 } ${ obj.r2 } 90 0 0 ${ arc2end.x } ${ arc2end.y } L${ target.x } ${ target.y }`; 
		return p
	} // path
	
} // DrawLink

// Lines are drawn in bundles. The links are drawn as two pats, one in color, and the other white. The white paths are in the background and help make the transitions over lines neater. If links were drawn individually then the bundle itself would have an overlap somewhere.	
let template$4 = `
<g class="bundle">
  <path stroke="white" stroke-width="5" fill="none"></path>
  <path stroke="black" stroke-width="2" fill="none"></path>
</g>
`; // tempalte


// These should just be exposed at the link level... The tree level also has them, and it's non hygienic.
let node_label_width$1 = 70;
let bundle_width$1 = 4;
let r$1 = 16;

// Bundles are the connections between two levels of nodes.
class treebundle{
	// Index is the ranked position of this bundle within hte level. It determines the position of hte vertical line segment, and the corner radius.
	links = []
	_bendi = 0;
	
	constructor(seednode, author){
		// A seed node is passed in to define the bundle parents and thus instantiate a bundle. After instantialisation only the children of the bundle can change.
		// NOTE: seednode is a `treenode' instance, but parents and children are `taskgroup' instances. The level is only defined for the node because it can change when the user interacts with the tree.
		let obj = this;
		obj.node = svg2element$1( template$4 );
		
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
		}); // forEach
		obj._bendi = i;
	} // bendi
	
	get bendi(){return this._bendi} // get bendi
	
	update(color){
		let obj = this;
		
		let paths = obj.node.querySelectorAll("path");
		for(let i=0; i<paths.length; i++){
			paths[i].setAttribute("d", obj.path);
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
		let links = [];
		
		obj.nodeParents.forEach(p=>{
			obj.nodeChildren.forEach(c=>{
				links.push( new DrawLink(p,c) );
			}); // forEach
		}); // forEach
		
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
		
		return node_label_width$1 + obj.bundles.length*bundle_width$1 + r$1;
	} // get width
	
	updateNodeMinPositions(){
		// This should just be run whenever teh parents or the children are changed.
		// Because the links make two 90 degree turns when connecting the parent to the child the radii of these turns constitute the minimum y offset of this bundle relative to the previous one. Furthermore, this is offset relative to the lowest parent! This is important when positioning the child nodes.
		let obj = this;
		
		let y_lowest_parent = obj.nodeParents.reduce((acc, p)=>{
			return acc > p.y ? acc : p.y
		}, 0);
		
		obj.nodeChildren.forEach(child=>{
			child.miny = y_lowest_parent + 2*r$1;
		}); // forEach
		
	} // y_min
	
} // treebundle

let node_label_width = 70; // length of text
let bundle_width = 4; // reserved space for the vertical bunlde line
let r = 16; // arc radius

// A level is an organisational group. All dimensioning is done through a treelevel. The primary elements that define the level are its bundles. The TreeLevel is necessary because the bundles need to be sequenced within a level, and the level width is required to position hte levels. Because the bundles are based on a set of parents, the level of the bundle is the level of the children.
class TreeLevel{
  constructor(nodes, bundles, nlevel){
		let obj = this;
		obj.n = nlevel;
		obj.bundles = bundles.filter(b=>b.level==nlevel);
		obj.nodes = nodes.filter(n=>n.level==nlevel);
	} // constructor
	
	get width(){
		// The width of the entire level. It's the width of the label plus the width of all the vertical line segments (including padding), plus the length of the finishing horizontal segment (this is zero for the right-most bundle).
		let obj = this;
		
		// The width of the level is determined by the bundles that end in it. If there aren't any bundles, there is no width. Maybe do a reduce and move the width calculation to the bundle? That would eliminate the dimensions here.
		if(obj.bundles.length > 0){
			return node_label_width + obj.bundles.length*bundle_width + r;
		} else {
			return 0
		} // if
	} // width
} // TreeLevel

/* 
A defined group hierarchy (groups, group members, and group parents have been established) is passed in. The input data is an array of groups to be drawn.

This is the background data based on which a tree chart can be established. Interactions with the tree don't change the underlying group hierarchy, only the drawn representation.
*/

/*
Node height -> number of bundles connecting to it
Node x -> depends on the levels and their widths
Node y -> position of parent nodes
Level width -> number of bundles
Bundle links -> parent/child nodes
*/

function getBundleLinesGoingThroughNode(bundle, node){
	// Given some bundles find which of its lines go through a specific node. Whether the lines are incoming or outgoing is not needed, because it's determined by the relationship between the bundles and the node. Instead the node must just be referenced by the line.
	return bundle.links.filter(link=>{
		return link.childnode == node || link.parentnode == node;
	}) // filter
} // getBundleLines
	
function arrangeIncomingOutgoingTracks(node, bundles){
	// To draw the node I need to know where to start, how big it should be, and I should also know what the label is, and what the corresponding tags are.
	
	// Each bundle should be staggered when entering a particular node. But bundles can also hold lines of several authors. These should be staggered as well.
		
	let outgoingbundles = bundles.filter(b=>{
		return b.parents.includes( node.connections.group );
	}); // filter
	
	let incomingbundles = bundles.filter(b=>{
		return b.children.includes( node.connections.group );
	}); // filter
	
	
	// Bundles spanning multiple levels should be all the way at the top. Then they should be ordered by bundle ind. Larger bendi means bend happens more to the right.
	incomingbundles.sort((a,b)=>{
		return b.level - a.level || b.bendi - a.bendi;
	}); // sort
	
	outgoingbundles.sort((a,b)=>{
		return b.level - a.level || b.bendi - a.bendi;
	}); // sort
	
	// This should be improved. First of all, the track indices and the bundle indices should be coordinated by sorting the lines by bundle ind before assigning the track ind. Secondly, it would be good if bundles of the same color could maintain same track positions...
	
	
	// Assign the index of track to enter the node by.
	incomingbundles.forEach((bundle,i)=>{
		let lines = getBundleLinesGoingThroughNode(bundle, node);
		lines.forEach(line=>{
			line.ci = i;
		});
	}); // forEach
	
	outgoingbundles.forEach((bundle,i)=>{
		let lines = getBundleLinesGoingThroughNode(bundle, node);
		lines.forEach(line=>{
			line.pi = i;
		});
	}); // forEach
	
	
	// Set number of incoming bundles.
	node.nbundlesin  = incomingbundles.length;
	node.nbundlesout = outgoingbundles.length;
	
		
} // arrangeIncomingOutgoingTracks

function arrangeBundlesOfLevel(bundles){
	
	bundles.sort((a,b)=>{
		// How to sort by similarity? Similarity is based on a pairs, not on individual. Maybe order by size, and then progressively do smaller sorts? Or just sort the nodes, and adjust the bundles to that?
		
		// Sort by size.
		return b.children.length - a.children.length;
	}); // sort
	
	
	
	// But it also depends on hte nodes in hte previous level? So just arrange them sensibly? Go through them and assign minimum y positions based on the parents. This can later be used to create further bundles?
	
	
	// Maybe the nodes should just track the indices of the paths that lead to them? Sort of a history? That would also allow the longest chain to be identified. And then the level indices of the paths/bundles can be used to determine the order.
	
	
	// Maybe if the up-path is also allowed it can be used to reclaim some space after a particular branch ends?
	
	// The bundle needs an ind for within the level. This can be used to sort the bundle links horizontally. The location of the vertical line segment is determined based on this index.
	let maxBundleInd = bundles.length - 1;
	bundles.forEach((b,i)=>{
		b.bendi = maxBundleInd - i;
	}); // forEach
	
	
} // arrangeBundlesOfLevel






function getbundles(nodes){
		
	// The bundles should be differentiated based on tag authors.
	let bundleseeds = nodes.filter(node=>{
		return node.connections.parents.length > 0;
	}); // filter
	
	
	// The `taskgroup' objects have several tags connected to them. Each tag represents a group that was created by some user. For every author of a group there should be a different bundle connecting to it. Even if the tag has only been created for that specific group.
	
	
	// Two bundles are not necessarily the same if htey have the same parents. They should be differentiated by the user tag also.
	
	let bundles = bundleseeds.reduce(function(bundles, node){
		
		// This node may belong to several bundles made by different authors. Find thos bundles, and if they can't be found create them.
		node.connections.group.tags.forEach(tag=>{
			let existing = bundles
			  .filter(b=>b.author==tag.author)
			  .filter(b=>arrayEqual(b.parents, node.connections.parents));
			  
			if(existing.length>0){
				existing.forEach(b=>{
					b.addchild(node);
				}); // forEach
			} else {
				bundles.push( new treebundle(node, tag.author) );
			} // if
		});
		
		return bundles
	}, []); // map
	
	
	
	// Go through hte nodes one more time to assign the parent nodes also. Originally only the groups are assigned as parents as the incoming nodes don't reference other nodes, but the groups do reference each other.
	// `treebundle' instances will check whether parents are valid.
	nodes.forEach(node=>{
		bundles.forEach(bundle=>{
			bundle.addparent(node);
		});
	}); // forEach
	
	
	// Make sure the bundles create all the required links.
	bundles.forEach(bundle=>{
		bundle.makelinks();
	});
	
		
	return bundles;
} // get bundles

function getlevels(nodes, bundles){
		
	// Always create all new levels!!
	let levels = [];
	
	// Find all the levels from the bundles.
	let maxlevel = Math.max( ...nodes.map(n=>n.level) );
	for(let level=0; level<maxlevel+1; level++){
		levels.push( new TreeLevel(nodes, bundles, level) );
	} // for
  
	return levels
} // get levels



// Maybe devolve this one into TreeRender and hierarchy?

// The user can only click on the nodes to directly interact with the tree. Currently the 'collapsenode' is used for that.
function dimensioning(nodes){
	// `dimension' calculates the positions of the nodes on the screen, and dimensions the connecting links.
	nodes.forEach(node=>node.clear());
  
	// Need to get teh levels so that I have a constant copy... mobx would probably improve this, but it'll do for now. Maybe it'd just be better to collect this with some sort of functions? And not getters?
	let bundles = getbundles(nodes);
	let levels = getlevels(nodes, bundles);
	
	
	// First order the bundles within hte levels.
	levels.forEach(level=>arrangeBundlesOfLevel(level.bundles)); // forEach
	
	
	// ASSIGN INCOMING/OUTGOING INDICES TO LINES.
	nodes.forEach(node=>arrangeIncomingOutgoingTracks(node, bundles)); // forEach
  
	
	// Last thing is to position the nodes.
	let x_offset = 0;
	levels.forEach(level=>{
								
		// Recalculate the minimum node positions.
		level.bundles.forEach(b=>b.updateNodeMinPositions());
		
		// Now sort the nodes by their miny to conserve as much space as possible.
		level.nodes.sort((a,b)=>{
			return a.miny - b.miny
		}); // sort
		
		// With the sizes of the nodes defined, the x and y locations can be assigned. The x location depends on the level, and the y location on the order within hte level.
		x_offset += level.width;
		let y_offset = 0;
		level.nodes.forEach(n=>{

			n.x = x_offset;
			n.y = y_offset;
		
			// Compute offset for next node. This is just offset within the level!
			y_offset = n.y + n.markersize + n.pitch;
		}); // forEach
	}); // forEach

	return {
		nodes: nodes,
		bundles: bundles
	}
} // dimensioning

// d, node=>node.path
// text -> 	"x", node => node.labelx, "y", node => node.labely, label node=>node.label
let template$3 = `
<g class="node" cursor="pointer">
  <g class="marker">
    <path class="outline" stroke="black" stroke-width="8" stroke-linecap="round"></path>
    <path class="fill" stroke="white" stroke-width="4" stroke-linecap="round"></path>
  </g>
  <g class="label">
    <text class="unselectable" stroke="white" stroke-width="2" font-size="10px"></text>
    <text class="unselectable" stroke="black" stroke-width="0.5" font-size="10px"></text>
  </g>
</g>
`; // template

// A treenode object is a higher level wrapper that contains all the dimensioning information. The `connections' attribute is supposed to hold the `treegroup' object, which contains a reference the an individual group, all it's ancestors, it's direct parents, and all its descendants.
class TreeNode{
	x = undefined
	_y = 0
	miny = 0
	
	// Line width is the width of the incoming line. The pitch is the vertical spacing to the next node.
	line_width = 4
	pitch = 32
	
	nbundlesin = 0
	nbundlesout = 0
	
	hidden = false;
	
	constructor(treegroup){
		let obj = this;
		obj.node = svg2element$1( template$3 );
		// The treegroup holds all the connections of a particular group.
		obj.connections = treegroup;
		
		
		
		let label = obj.node.querySelector("g.label");
		label.onmouseenter = function(){ obj.highlighttext(true); };
		label.onmouseleave = function(){ obj.highlighttext(false); };
		
		let marker = obj.node.querySelector("g.marker");
		marker.onmouseenter = function(){ obj.highlightmarker(true); };
		marker.onmouseleave = function(){ obj.highlightmarker(false); };
	} // constructor	
	
	
	update(){
	    let obj = this;
		
		let marker = obj.node.querySelector("g.marker");
		let paths = marker.querySelectorAll("path");
		
		let label = obj.node.querySelector("g.label");
		let texts = label.querySelectorAll("text");
		
		
		for(let i=0; i<paths.length; i++){
			paths[i].setAttribute("d", `M${ obj.x } ${ obj.yMarkerStart } L${ obj.x } ${ obj.yMarkerStart + obj.markersize }`);
		} // for
		
		label.setAttribute("transform", `translate(${obj.labelx}, ${obj.labely})`);
		for(let i=0; i<texts.length; i++){
			texts[i].innerHTML = obj.label;
		} // for
	} // update
	
	
	highlighttext(v){
		let obj = this;
		let size = v ? "12px" : "10px";
		let texts = obj.node.querySelector("g.label").querySelectorAll("text");
		for(let i=0; i<texts.length; i++){
			texts[i].setAttribute("font-size", size);
		} // for
	} // highlighttext
	
	highlightmarker(v){
		let obj = this;
		let size = v ? 10 : 8;
		let outline = obj.node.querySelector("g.marker").querySelector("path.outline");
		outline.setAttribute("stroke-width", size);
		
	} // highlighttext
	
	clear(){
		let obj = this;
		obj.x = undefined;
		obj._y = 0;
		obj.miny = 0;
		obj.nbundlesin = 0;
		obj.nbundlesout = 0;
	} // clear
	
	

	set y(val){
		let obj = this;
		obj._y = val;
	} // set y
	
	get y(){
		let obj = this;
		return Math.max(obj._y, obj.miny)
	} // get y
	
	
	
	
	get yMarkerStart(){
		let obj = this;
		let yoffset = obj.markersize > 0 ? obj.line_width/2 : 0;
		return obj.y - obj.markersize/2 + yoffset;
	} // markery
	
	get markersize(){
		return Math.max(this.nbundlesin-1, this.nbundlesout-1, 0)*this.line_width;
	} // markersize
	
	get markerEmptyIn(){
		// If the marker is larger than the width of the lines coming in, then the lines should be centered in hte middle of the marker. Calculate the empty space from hte marker start to where the lines should begin.
		let obj = this;
		return (obj.markersize - (obj.nbundlesin-1)*obj.line_width) / 2;
	} // markerEmptyIn
	
	get markerEmptyOut(){
		let obj = this;
		return (obj.markersize - (obj.nbundlesout-1)*obj.line_width) / 2;
	} // markerEmptyIn
	
	
	
	// Label to be displayed next to it. Shouldn't be larger than the node_label_width.
	get label(){
		let obj = this;
		let name = obj.connections.group.tags.length > 0 ? obj.connections.group.tags[0].label : "Root";
		
		// Temporarily changed to show n tasks for troubleshooting.
		// let n = obj.connections.descendants.length;
		let n = obj.connections.group.members.length;
		return `${name} ${n > 0 ? `(${ n })`: ""}`
	} // label
	
	get labelx(){
		return this.x + 4;
	} // labelx
	
	get labely(){
		return this.yMarkerStart - 4;
	} // labely
	
	
	
} // TreeNode

/*
If all the tasks are in the same array, and the author information is on the tags, then the partial trees won;t be a problem.

Every tag represents a group possibility essentially. But the same tag can relate to different groups. The group members differentiate the groups. The different tag descriptions of the groups should all be presented on mouseover, maybe along with the author data.

Won't be able to remove the initial dialogue in the small multiples visualisation, but I will be able to get rid of the expand button on the small multiples.
*/





// FROM AN ARRAY OF TASKS WITH TAGS TO A TREE


function array2tree(array){
	/*
	1.) Find groups.
	2.) Merge them.
	3.) Create parent-child relationships
	*/
	
	// Find all created groups, and merge the ones with identical members.
	let groups = findAllTagBasedGroups(array);
	let mergedgroups = mergeIdenticalGroups(groups);
	
	// Convert the groups into a higher level object to avoid circular references when figuring out ancestry.
	let hierarchicalnodes = findParentalRelationships(mergedgroups);
	
	return hierarchicalnodes
	
} // array2tree


// The tree node represents a single group, but also holds references to the parent and child nodes. The treenode is a higher level object to avoid circular referencing of objects.
class treegroup{
	constructor(taskgroup){
		let obj = this;
		
		obj.group = taskgroup;
		
		// Groups CAN have more than 1 parent. While it's true that during a single dive through the tasks each group can only have one parent, it's possible that additional dives (by the same, or other users) will produce the same groups, but tracing different steps. The merging already combines all identical groups, so the merged groups can have multiple parents.
		// Select the parents as all those candidate  groups that have not been referenced by other candidate groups already.
		obj.ancestors = []; // All upstream groups
		obj.parents = []; // Only groups directly above this one.
		
		obj.descendants = []; // All downstream groups
		obj.children = undefined; // Only groups directly below. Is this needed??
	} // constructor
} // treegroup

class taskgroup{
	constructor(){
		this.tags = [];
		this.members = [];
	} // constructor
	
	addtask(task){
		let obj = this;
		if(!obj.members.includes(task)){
			obj.members.push(task);
		} // if
	} // addtask
	
	addtag(tag){
		let obj = this;
		if( !obj.tags.some(existing=>existing.id == tag.id) ){
			obj.tags.push(tag);
		} // if
	} // addtags
} // group



// Making groups.
function findAllTagBasedGroups(array){
	
	// Create a group for each tag present in the array. We also need to differentiate teh groups by the author at this point. Otherwise parallel trees won't be possible.
	let dict = {};
	let groups = [];
	
	array.forEach(tag=>{
		// If you tag something in the session, then that tag is reserved for a particular group. If you tag other elements with it, it'll become a part of that group. Actual tags need to be retained in order to be able to edit them, and therefore edit the groups.
		let groupid = [tag.label, tag.author].join("-");
		if(!dict[groupid]){
			// Here just pass the tag in. The group will need to hold on to it.
			dict[groupid] = new taskgroup();
			groups.push(dict[groupid]);
		} // if
		
		// Add teh task to the specific group, but also to the root group.
		dict[groupid].addtask(tag.taskId);
		dict[groupid].addtag(tag);
	}); // forEach
	
	
	
	// A root group should be present. It will be merged with other existing groups if possible in hte next tep.
	let root = makeRootGroup(array);
	

	return groups.concat(root);
	
} // findAllTagBasedGroups



function makeRootGroup(array){
	
	// The root MUST always contain all of the data!! It will also allow navigation all the way to the start.
	let root = new taskgroup([{id: "Root", label: "Root", author: "session", timestamp: new Date()}]);
	
	// Root should contain all tasks.
	array.forEach(tag=>{
		root.addtask(tag.taskId);
	}); // forEach
	
	return root
	
} // makeRootGroup

function mergeIdenticalGroups(groups){
	
	let mergedgroups = groups.reduce((acc,g)=>{
		// Find group with identical members.
		let identicalg = acc.filter(g_=>{
			return arrayEqual(g_.members, g.members)
		}); // filter
		
		if(identicalg.length > 0){
			// Add another author to existing group.
			g.tags.forEach(tag=>{
				identicalg[0].addtag(tag);
			});
		} else {
			// Add this group to the unique ones.
			acc = acc.concat(g);
		} // if
		
		return acc
	},[]); // reduce
	
	return mergedgroups
	
} // mergeIdenticalGroups

function isSubset(a,b){
	// Check whether array a is a subset of array b.
	
	// A must be strictly smaller than b.
	if(a.length < b.length){
		// Check if b contains all of a.
		return arrayIncludesAll(b, a);
	} else {
		return false;
	} // if
	
} // isSubset

function findParentalRelationships(groups){
	
	
	// First create an object one level above to avoid cross referenceing of objects.
	let nodes = groups.map(g=>{return new treegroup(g)});
	
	// maybe calculate all ancestors, all descendants, and then parents and children? Could be useful to have all hte information available.
	
	
	// FIND PARENT CANDIDATES FOR ALL GROUPS.
	nodes.forEach(node=>{
		// Ancestor groups are all groups that include all of the members of the node group, but are larger than it.
		node.ancestors = groups.filter(g=>{
			return isSubset(node.group.members, g.members)
		}); // filter
		
		
		// Descendant groups are all groups that contain a subset of the members of this group.
		node.descendants = groups.filter(g=>{
			return isSubset(g.members, node.group.members)
		});
	}); // forEach
	
	
	
	
	// Groups CAN have more than 1 parent. While it's true that during a single dive through the tasks each group can only have one parent, it's possible that additional dives (by the same, or other users) will produce the same groups, but tracing different steps. The merging already combines all identical groups, so the merged groups can have multiple parents.
	// Select the parents as all those candidate  groups that have not been referenced by other candidate groups already.
	
	
	
	// Loop over all the candidates of a particular group, and remove all candidates that appear in that.
	nodes.forEach(node=>{
		node.parents = node.ancestors;
		// All parents of a candidate parent are considered `grandparents'. All grandparents cannot be the parent. Loop over the candidates and remove all grandparents. Candidates also include teh candidates parents, so the whole lineage is checked.
		node.parents.forEach(candidate=>{
			
			// The candidate now no longer has parents. Just check directly? If another group contains all the members of a group then it is its parent.
			node.parents = node.parents.filter(parent=>{
				if(candidate == parent){
					// A candidate can't eliminate himself.
					return true
				} else {
					return !isSubset(candidate.members, parent.members);
				} // if
			}); // filter
		}); // forEach
			
		
	}); // forEach
	
	return nodes
	
	
} // findParentalRelationships




function calculateLevelNumbers(nodes){
	
	// First clear all the levels and set any root ones.
	nodes.forEach(node=>{
		node.level = undefined;
		if(node.connections.parents.length == 0){
			node.level = 0;
		} // if
	});
	
	// Now move through the nodes and check if all parents already had a level assigned. If so the level of the node is max(parents.level) + 1. This must be done until all the nodes have an assigned level.
	
	
	for(let i=0; i<nodes.length; i++){
		
		let unassignednodes = nodes.filter(node=>node.level==undefined);
		
		unassignednodes.forEach(node=>{
			// All parents must have an assigned level, otherwise skip. Check if any don't have level.
			let parents = node.connections.parents.reduce((acc,parent)=>{
				return acc.concat(nodes.filter(node=>node.connections.group == parent))
			}, []); // reduce
			
			
			if( parents.some(parent=>parent.level==undefined) ); else {
				node.level = Math.max(...parents.map(parent=>parent.level)) + 1;
			} // if
		}); // forEach
		
		
		if(unassignednodes.length == 0){ break; } // if
	} // for
	
} // calculateLevelNumbers

class TreeHierarchy{
  constructor(){
	  let obj = this;
	  
	  obj.data = [];
	  obj.collapsednodes = [];
	  
	  obj.update();
  } // constructor
  
  update(){
	// Recalculate makes new treenodes. Maybe instead of having hidden nodes just have hidden tasks? And any group that consists only of the hidden tasks is hidden also? That's how the hierarchy creation works anyway.
	// Nah, just push the togglig to the node itself! However, anytime that the data will be recalculated the hidden aspect will disappear....
	let obj = this;
	obj.nodes = array2tree(obj.data).map(group=>{
		return new TreeNode(group);
	}); // map
  } // update
  
  get visiblenodes(){
	let obj = this;
	
	let collapsednodes = obj.nodes.filter(node=>node.hidden);
	
	// Based on the collapsed nodes determine which ones are still visible. I can ignore any incorrect nodes here. But I would rather just get rid of them.
	let hiddennodes = obj.nodes.filter(node=>{
		return collapsednodes.some(collapsed=>{
			return collapsed.connections.descendants.includes(node.connections.group)
		}) // some
	}); // filter
		
	// Filter out any disabled nodes. Maybe this can be made more sophisticated so that the folds further down the line are preserved?
	let nodes = obj.nodes.filter(node=>{
		return !hiddennodes.includes(node)
	});
		

	// The level numbers should be assigned to all active nodes.
	calculateLevelNumbers(nodes);
		
		
	return nodes
  } // get nodes
} // TreeHierarchy



// HELPERS

// Move the hierarchy to CORE!!



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




let template$2 = `
<g transform="translate(20, 20)">
  <g class="bundles"></g>
  <g class="nodes"></g>
  <g class="nodetooltip"></g>
  <g class="linktooltip"></g>
</g>
`;



class TreeRender {
	constructor(){
		let obj = this;
		
		// Hierarchy
		obj.hierarchy = new TreeHierarchy();
		
		
		// Drawing
		obj.node = svg2element$1( template$2 );
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
		let obj = this;
		
		obj.map.nodes.forEach(nodeobj=>{
			
			obj.gnodes.appendChild( nodeobj.node );
			nodeobj.update();
			
			
			// Add teh styling changes on mouseover. Clicking the label moves view to the group.
			nodeobj.node.querySelector("g.label").onclick = function(){ 
				obj.moveto(nodeobj); 
			}; // onclick
			
			
			// Clicking on hte node just collapses branches.
			nodeobj.node.querySelector("g.marker").onclick = function(){
				nodeobj.hidden = !nodeobj.hidden;
				obj.interact();
			}; // onclick

		}); // forEach
		
	} // updatenodes
	
	
	updatelines(){
		let obj = this;
		
		// The renderer controls the color of the lines!!
		obj.map.bundles.forEach(bundleobj=>{
			obj.gbundles.appendChild( bundleobj.node );
			bundleobj.update( obj.color.dom2range(bundleobj.author) );
		}); // forEach
	} // updatelines
	
	moveto(nodeobj){
		// I want to move to the group which contains only tasks given by "nodeobj.connections.group.members", but I also want to show all the groups within that grop.
		console.log("Move to", nodeobj.connections.group.members);
	} // moveto
	
} // TreeRender

function html2element(html){
  let template = document.createElement('template'); 
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template.content.firstChild;
} // html2element

function svg2element(svg){
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = svg.trim();
  return g.firstChild;
} // svg2element


class scaleLinear {
  
  _domain = [0, 1]
  _range = [0, 1]

  set domain(d){ this._domain = d; } // domain
  get domain(){ return this._domain } // domain

  set range(r){ this._range = r; } // range
  get range(){ return this._range } // range

  dom2range(v){
	return mapSpaceAValueToSpaceB(v, this.domain, this.range)
  } // dom2range
  
  range2dom(v){
	return mapSpaceAValueToSpaceB(v, this.range, this.domain)  
  } // range2dom
} // scaleLinear

function mapSpaceAValueToSpaceB(v, A, B){
	return (v-A[0])/(A[1]-A[0]) * (B[1]-B[0]) + B[0]
} // mapSpaceAValueToSpaceB

// This class should just act as an UI and it should use the constituent items for the actual drawing.
// The main difficulty with this is drawing the standard deviation plot. How would that look like in 3D anyway?


let css = {
  view: `
	width: 300px;
	height: 200px;
  `,
  
  groupbutton: `
	border: none;
	background-color: transparent;
	color: gainsboro; 
	cursor: pointer;
	padding: 2.3px;
	margin-bottom: 10px;
  `,
  
  bookmark: `
    height: 20px; 
	width: 20px; 
	background-color: gainsboro;
  `
}; // css


// The div.item is the top element when the user clicks to drag. The dragging checks whether drag is the appropriate action (as opposed to view interactions) by checking if the event target equals the item node. For the group that is not so because it has an additional wrapper.
let template$1 = `
<div class="item-group" style="position: absolute;">
  <table style="border-collapse: collapse;">
    <tbody>
	<tr>
	  <td>
		<div class="item-proxy" style="box-shadow: 1px 2px 4px 0px rgba(0,0,0,0.25);">
		  <div class="label">Group</div>
		  <div class="view-proxy"></div>
		  <div class="playcontrols-proxy"></div>
		  <div class="chapterform-proxy"></div>
		  <div class="commenting"></div>
		</div>
	  </td>
	  <td style="vertical-align: top;">
	    <button class="ungroup" style="${ css.groupbutton }">
		  <i class="fa fa-times" style="font-size: 20px;"></i>
		</button>
		<button class="dissolve" style="${ css.groupbutton } display:none;">
		  <i class="fa fa-trash-o" style="font-size: 20px;"></i>
		</button>
		<div class="bookmarks">
		</div>
	  </td>
	</tr>
	</tbody>
  </table>
</div>
`; // template


// Maybe this should be just an empty div over the item, and then that item should be shown? And other ones can just be hidden?? Maybe that is simplst - no moving of the controls needed at all. But commenting? How should that work? Just change the commenting?

let bookmarktemplate = `<div class="mark" style="${ css.bookmark }"></div>`;

/*
BUTTON NEEDS TO BE REINTRODUCED!!

If the group were to be a separate ViewFrame subclass, then the grouping cannot just be tagged on.
If the group is just an empty div that covers the currently shown item, then the interactions are blockd. 
*/


// When made it should have a series of squares, which when moused over will move between the individual items. Where should these controls be placed though? How should the title be made visible?
// Maybe controls should be above, and the name should change? Then the comments can always be below. Should there be a comment section for all of them at once? I guess so, so that they can all be characterised together.
// Ok, comment sections can be turned off - only the playbar is needed! It also needs a way to remove the group alltogether. A cross in the right top.

// This needs to reorder the items in the rendering.items so that te moused over one is the one drawn on top. Fo that it needs access to that array.
class Group{
  members = []
  
  constructor(drawingorder, members, tags){
	let obj = this;
	obj.node = html2element(template$1);
	obj.wrappednode = obj.node.querySelector("div.item-proxy");
    obj.wrappedview = obj.node.querySelector("div.view-proxy");	
	obj.bookmarks = obj.node.querySelector("div.bookmarks");
	obj.node.querySelector("div.label").innerText = tags[0].label;
	obj.tags = tags;
	
	// Drawing order allows the group to changethe order in which the GPU renders the items.
	obj.drawingorder = drawingorder;
	
	
	
	// Calculate where the node should be added. Store the original positions on the items, as long as they are in the group.
	let n = members.length;
	let pos = members.reduce((acc, item)=>{
		acc[0] += parseInt( item.node.style.left )/n;
		acc[1] += parseInt( item.node.style.top )/n;
		return acc
	}, [0,0]);
	obj.node.style.left = pos[0] + "px";
	obj.node.style.top = pos[1] + "px";
	
	
	// All the members should also be moved to this position. Turn off their uis, wih the exception of the playbar. Also remember their relative positions?
	members.forEach(item=>{
		obj.add(item);
	}); // foEach
	obj.current = obj.members[0];
	
	
	
	
	
	// pos needs to be made before calling .add, but .add creates initialposition which is needed for calculating pos.
	
	
	
	// Removal of the group.
	obj.node.querySelector("button.ungroup").onclick = function(){
	  obj.remove();
	}; // onclick
	
	
	// Dissolving the annotations.
	obj.node.querySelector("button.dissolve").onclick = function(){
		obj.dissolve();
	}; // onclick
	
	
	// The view events should be passed down to the current item.
	obj.wrappedview.onmousedown  = function(e){ obj.current.cameraMoveStart(e); };
	obj.wrappedview.onmousemove  = function(e){ obj.current.cameraMove(e); };
	obj.wrappedview.onmouseup    = function(e){ obj.current.cameraMoveEnd(); };
	obj.wrappedview.onmouseleave = function(e){ obj.current.cameraMoveEnd(); };
	obj.wrappedview.addEventListener("wheel", (e)=>{
	  e.preventDefault();
	  obj.current.cameraZoom(e);
	}, {passive: false});
	
	
	
	
	// Add ina commenting module. Which id should it use? Maybe the one of the current object?
	obj.commenting = new CommentingManager( obj.current.ui.commenting.viewid );
	obj.node.querySelector("div.commenting").appendChild( obj.commenting.node );
	
	obj.updateWrapperSize();
	obj.update();
	
	
	// A flag that allows checking whether the group has been edited by the user.
	obj.edited = false;
  } // constructor
  
  
  // Setting hte user is important to for interactions with the annotations.
  set user(name){
	  let obj = this;
	  
	  // The commenting needs to know who is looking at it.
	  obj.commenting.user = name;
	  
	  // Store the name
	  obj._user = name;
	  
	  // Toggle the dissolve button if the user has any annotations.
	  let currentUserAnnotations = obj.tags.filter(tag=>tag.author==name);
	  if(currentUserAnnotations.length > 0){
		  obj.node.querySelector("button.dissolve").style.display = "";
	  } // if
  } // set user
  
  get user(){
	  return this._user;
  } // get user
  
  // set and get current node ui?? This also ensures that the group div fully covers the actual item, and therefore the group gets dragged as opposed to the individual item.
  set current(item){
	let obj = this;
	
	// First return the ui controls if needed.
	obj.returnUiElements();
	
	// Now append the new current ui controls.
	obj.borrowUiElements(item);
	
	// If the commenting has already been established, update the user.
	if( obj.commenting ){ obj.commenting.user = item.ui.commenting.user; } // if
	
	
	if(obj._current){ obj._current.node.style.display = "none"; } // if
	item.node.style.display = "inline-block";
	
	obj._current = item;  
  } // set current
  
  get current(){
	return this._current;
  } // get current
  
  
  updateWrapperSize(){
	let obj = this;
	
	// Interactions with the commening are not possible if the item is covered by an empty div.
	obj.wrappedview.style.width = obj.current.node.querySelector("div.view").style.width;
	obj.wrappedview.style.height = obj.current.node.querySelector("div.view").style.height;
	
  } // updateWrapperSize
  
  borrowUiElements(item){
	let obj = this;
	obj.wrappednode.querySelector("div.playcontrols-proxy").appendChild( item.ui.playcontrols.node );
	obj.wrappednode.querySelector("div.chapterform-proxy").appendChild( item.ui.chapterform.node );
  } // borrowUiElements
  
  returnUiElements(){
	let obj = this;
	let pc = obj.wrappednode.querySelector("div.playcontrols-proxy").children[0];
	if(pc){ obj.current.ui.playControlsWrapperNode.appendChild( pc ); } // if
	
	let cf = obj.wrappednode.querySelector("div.chapterform-proxy").children[0];
	if(pc){ obj.current.ui.chapterFormWrapperNode.appendChild( cf ); } // if
  } // returnUiElements
  
  update(){
	let obj = this;
	// Make a bookmark tab for each of the members. When the tab is moused over, the view should change. First remove allthe bookmarks before updating.
	let bookmarksToRemove = obj.bookmarks.querySelectorAll("div.mark");
	for(let i=0; i<bookmarksToRemove.length; i++){
		bookmarksToRemove[i].remove();
	} // for
	
	// Items should also be moved in order to update the view. And they should be triggered to draw.
	obj.members.forEach((item, i)=>{
		let bookmark = html2element( bookmarktemplate );
		obj.bookmarks.appendChild(bookmark);
		bookmark.onmouseenter = function(){
			obj.highlightBookmark(bookmark);
			
			// Place the item at the end of the draing line.
			obj.drawingorder.splice(obj.drawingorder.indexOf(item), 1);
			obj.drawingorder.push(item);
			
			obj.current = item;
			obj.updateWrapperSize();
		}; // onmouseover
		
		var pressTimer;
		bookmark.onmouseup = function(){
		  clearTimeout(pressTimer);
		  return false;
		}; // onmouseup
		bookmark.onmousedown = function(){
		  pressTimer = window.setTimeout(function(){
			obj.release(item, obj.getReleaseScales());
			obj.members.splice(obj.members.indexOf(item), 1);
			obj.current = obj.members[0];
			obj.update();
		  },2000);
		  return false; 
		}; // onmousedown
		
		if(obj.current == item){ obj.highlightBookmark(bookmark); } // if
	}); // forEach
	  
	// Collect all hte member comments, and put them into a combined commenting item.
	obj.commenting.clear();
	
	let allComments = obj.members.reduce((acc, member)=>{
		return acc.concat(member.ui.commenting.comments);
	}, []).map(commentobj=>commentobj.config).sort(function(a,b){
		return Date.parse(a.time)-Date.parse(b.time);
	}); // reduce().sort()
	
	
	allComments.forEach(comment=>{
		obj.commenting.add(comment);
	}); // forEach
	
  } // update
  
  highlightBookmark(b){
	let obj = this;
	let allBookmarks = obj.bookmarks.querySelectorAll("div.mark");
	for(let i=0; i<allBookmarks.length; i++){
		allBookmarks[i].style.backgroundColor = b == allBookmarks[i] ? "gray" : "gainsboro";
	} // for
  } // highlightBookmarks
  
  
  
  remove(){
	// All the members should be made visible again, and their comment sections should be turned back on, and they should be staggered to their relative psitions.
	let obj = this;
	
	// First return the ui elements so that the items are again complete.
	obj.returnUiElements();
	
	
	// When ungrouping the items should be positioned close to where the group used to be (within 1 width of the item). Position the exiting items within 1 width of the top left corner.
	
	// What I really want is to get the maximum relative distances, scale them down, and then calculate where to position hte items.
	let scales = obj.getReleaseScales();
	
		
	// Redistribute the items according to their original positions.`		
	obj.members.forEach((item, i)=>{
		obj.release(item, scales);
	}); // forEach
	obj.members = [];
	
	// Remove the actual DOM.
	obj.node.remove();
  } // remove
  
  release(item, scales){
	let obj = this;
	// Need to calculate the position to release to...
		
	
	item.node.querySelector("div.label").style.color = "#888";
	item.node.style.display = "inline-block";
	item.ui.node.style.display = "";
	item.node.style.boxShadow = "1px 2px 4px 0px rgba(0,0,0,0.25)";
	
	
	let x = parseInt(item.node.style.left) + scales.x.dom2range(item.initialposition[0]);
	let y = parseInt(item.node.style.top) + scales.y.dom2range(item.initialposition[1]);
	
	item.node.style.left = x + "px";
	item.node.style.top = y + "px";
	
	delete item.initialposition;
	
	obj.edited = true;
  } // release
  
  add(item){
	// Add an item to the group by dragging it over the group.
	let obj = this;
	obj.members.push(item);
	
	// Make a temporary attribute to store the position at which the noe was collected.
	item.initialposition = [parseInt( item.node.style.left ), parseInt( item.node.style.top )];
	
	item.node.style.left = obj.node.style.left;
	item.node.style.top = obj.node.style.top;
	item.node.querySelector("div.label").style.color = "transparent";
	item.node.style.boxShadow = "none";
	item.node.style.display = obj.current == item ? "inline-block" : "none";
	item.ui.node.style.display = "none";
	
	// A flag highlighting that the group has changed.
	obj.edited = true;
  } // add

  dissolve(){
	let obj = this;
	
	// Soo, find all hte annotations that can be dissolved, and then dissolve them. This will require a call to the knowledge manager. How should this be messaged upstream?
	let currentUserAnnotations = obj.tags.filter(tag=>tag.author==obj.user);
	obj.dissolveexternal( currentUserAnnotations );
	obj.remove();
  } // dissolve
  
  actualise(){
	let obj = this;
	
	// Similarto before, first dissolve all the annotations by this user, and then add new annotations for all members.
	let currentUserAnnotations = obj.tags.filter(tag=>tag.author==obj.user);
	obj.dissolveexternal( currentUserAnnotations );
	
	let t = Date();
	let newAnnotations = obj.members.map((item,i)=>{
	  return {
		id: `${obj.user} ${t} ${i}`, 
		taskId: item.ui.metadata.taskId, 
		label: obj.node.querySelector("div.label").innerText, 
		author: obj.user
	  }
	});
	obj.createexternal(newAnnotations);
  } // actualise
  
  
  dissolveexternal(a){ 
	console.log("Remove annotations: ", a); 
  } // dissolveexternal
  
  createexternal(a){
	console.log("Make annotations: ", a);
  }
  
  getReleaseScales(){
	let obj = this;
	let domain = obj.members.reduce((acc,member)=>{
		acc.x[0] = acc.x[0] > member.initialposition[0] ? member.initialposition[0] : acc.x[0];
		acc.x[1] = acc.x[1] < member.initialposition[0] ? member.initialposition[0] : acc.x[1];
		
		acc.y[0] = acc.y[0] > member.initialposition[0] ? member.initialposition[0] : acc.y[0];
		acc.y[1] = acc.y[1] < member.initialposition[0] ? member.initialposition[0] : acc.y[1];
		 
		return acc
	}, {x: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY], y: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]});
	
	let xscale = new scaleLinear();
	xscale.domain = domain.x;
	xscale.range = [-150, 150];
	
	let yscale = new scaleLinear();
	yscale.domain = domain.y;
	yscale.range = [-150, 150];  
	
	return {x: xscale, y: yscale}
  } // releaseScales

} // Group

let template = `
<polygon class="lasso" points="" style="fill: cornflowerblue; stroke: dodgerblue; stroke-width: 2; opacity: 0.4;"></polygon>
`; // template


class lasso{
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
			obj.clearBoundary();
			obj.active = true;
		}); // mousedown

		obj.svg.addEventListener("mousemove", function(event){
			if(obj.active){
				obj.addBoundaryPoint(event);
				obj.draw();
			} // if
		}); // mousedown
		
		obj.svg.addEventListener("mouseup", function(event){
			obj.hide();
			
			// The bounadry.replace was mobx functionality.
			obj.boundary = obj._boundary;
			obj.active = false;
		}); // mousedown
	
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
		});
		
	} // addBoundaryPoint
	
	
	
	  
	isPointInside(point){
		// Check wheteher the 'point' [pixel coordinates] is within the polygon defined by the points array 'boundary'.
		let obj = this;
		
		// Default answer is no.
		let isInside = false;
		
		let n = obj.boundary.length;
		if(n>2){
			for(let i=1; i<n; i++){
				// Check whether this edge is being passed when moving from the point to the right. If it passes an even number of edges it's outside, otherwise it's inside.
				let p = passesEdge(obj.boundary[i-1], obj.boundary[i], point);
				isInside = p ? !isInside : isInside;
			} // for
			
			// Need to check the same number of edge segments as vertex points. The last edge should be the last and the first point.
			let p = passesEdge(obj.boundary[n-1], obj.boundary[0], point);
			isInside = p ? !isInside : isInside;
		} // if
		
		return isInside
	} // isPointInside
		
	draw(){
		let obj = this;
		obj.polygon.setAttribute("points", obj._boundary.map(p=>`${p.x},${p.y}`).join(" "));
	} // draw
	
	hide(){
		// Remove the selection drawing.
		let obj = this;
		obj.polygon.setAttribute("points", "");
	} // remove
	
} // lasso



// A ray casting method to check whether a point is within a polygon or not.
function passesEdge(p0, p1, point){
	// One point needs to be above, while the other needs to be below -> the above conditions must be different.
	
	if( (p0.y > point.y) !== (p1.y > point.y) ){
		// One is above, and the other below. Now find if the x are positioned so that the ray passes through. Essentially interpolate the x at the y of the point, and see if it is larger.
		let x = (p1.x - p0.x)/(p1.y - p0.y)*(point.y - p0.y) + p0.x;
		return x > point.x
		
	} else {
		return false
	} // if
} // checkIntersect

/* 
Make a class that will be able to perform most coordination tasks required for the spatial harnessing. This involves getting and setting the coordinates of the small multiples.


Should groups allow the user to enter them? Maybe its simpler to restrict the navigation solely to the navigation tree. Otherwise when clicking on a group node it has to communicate to the GroupingCoordinator to initiate the change, and also keep track of the descendant groups.

If navigation is constrained to the navigation tree, then groups can just be an array of arrays of tasks. Maybe the navigation trre should be controlled from within here? And then the hierarchy can be used to create the groups on the go?
	

*/

class GroupingCoordinator {
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
	}; // moveto


	// Add the treenavigation graphic.
	svg.querySelector("g.tree")
	   .appendChild(obj.navigation.node);
	obj.navigation.update();
	
	// On lasso mouseup the GroupingCoordinator should create an additional group based on the lasso selection. So maybe this should all be moved into the knowledge manager?
	new lasso(svg);
  } // constructor
  
  
  clear(){
	let obj = this;
	obj.groups.forEach(group=>{
		group.remove();
	});
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
		}); // forEach
	} // if
  } // showCurrentTasks
  
  
  makeDirectDescendantGroups(nodeobj){
	let obj = this;
	
	// First remove all existing groups.
	obj.groups.forEach(group=>{
		group.remove();
	}); // forEach
	
	
	// Find all groups that should appear.
	let descendants = nodeobj.connections.descendants;
	let directDescendants = descendants.filter(group=>{
		return !descendants.some(d=>{
			if(d != group){
				return arrayIncludesAll(d.members, group.members)
			} // if
			return false
		}) // some
	}); // filter
	
	
	// Make all groups that should appear.
	directDescendants.forEach(d=>{
		// Pass the actual item objects to the group.
		let members = obj.items.filter(item=>{
			return d.members.includes(item.ui.metadata.taskId);
		}); // filter
		
		// 'obj.items' needs to always be passed in so that when the bookmarks are moused over the drawing order can change. Tags are passed in to allow changes to be made.
		let groupitem = new Group(obj.items, members, d.tags);
		obj.groups.push( groupitem );
		obj.container.appendChild( groupitem.node );
		
		let ondrag = function(){
			groupitem.members.forEach(item=>{
				item.node.style.left = groupitem.node.style.left;
				item.node.style.top = groupitem.node.style.top;
			});
		};
		addDraggingToItem( groupitem, undefined, ondrag );
		
		groupitem.dissolveexternal = function(a){
			obj.dissolveexternal(a);
		}; // function
		
		groupitem.createexternal = function(a){
			obj.createexternal(a);
		}; // function
	}); // forEach
	
	
  } // makeDirectDescendantGroups
  
  // Proxies.
  dissolveexternal(a){ console.log("Remove annotations", a); } // dissolveexternal
  createexternal(a){ console.log("Make annotations", a); } // createexternal
  
  
  getCurrentPositions(items, variable){
    // Current positions are needed for calculating correlations, or for adding additional metadata variables based on the users actions. How should the positions and the metadata be combined actually? Should there be a specific method for it? If a variable is specified, then return it with the positions.
	return items.map(item=>{
	  let pos = [
		ParseInt(item.node.style.left), 
		ParseInt(item.node.style.top)
      ];

	  if(variables != undefined){
		pos.push(item.metadata[variable]);
	  } // if
	  
	  return pos 
	}) // map
  } // getCurrentPositions
  
  addDraggingToSiblingItems(headeroffset){
	// To add the dragging an additional "dragging" attribute is introduced to the items. The items are ViewFrame objects that all have their nodes inside the same parent node. The parent node must be the same as the initial positions of the frames are calculated based on their current positions within hte parent div.
	let obj = this;

	let positions = obj.items.reduce((acc,item)=>{
		acc.push([item.node.offsetLeft, item.node.offsetTop + headeroffset]);
		return acc
	},[]);

	obj.items.forEach((item,i)=>{
			
		item.node.style.position = "absolute";
		item.node.style.left = positions[i][0] + "px";
		item.node.style.top = positions[i][1] + "px";
		
		
		let onstart = function(){
			// Move this item to the end of the drawing queue to ensure it's drawn on top.
			obj.items.splice(obj.items.indexOf(item), 1);
			obj.items.push(item);
		}; // function
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
			}); // every
		};// function
		addDraggingToItem(item, onstart, undefined, onend);
		
	}); // forEach
	
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

// Some comments came back from the server side, add them to the views.
function sortCommentsBeforePushing(a,b){
	// The primary comments must be added first so that the replies can be added to them. The comments can just be sorted by time of creation. Replies can only be created after the primary comment.
	return Date.parse(a.time)-Date.parse(b.time)
} // sortCommentsBeforePushing

class KnowledgeManager{
  constructor(items, container, svg){
	// All knowedge must be pushed to individual IPUI (Interactive Player User Interfaces) when received.
	let obj = this;
	obj.items = items;
	
	// Tags and chapters should be available for correlations. Tags and chapters are time invariant, but the metadata IS time variant. So even the metadata needs to be queried!
	
	
	// Add the dragging externally. The tabletop was positioned absolutely, with top: 0px. If this is not so the dragging will move the items on the initial drag start by the offset amount.
	// The grouping coordinator does: adds dragging, positioning of the items by metadata values, retrieveng position and metadata pairs, grouping, and grouping navigation.
	// Groups need to be added to the same container as the actual items, otherwise either the items cant be dragged over the groups, or vice versa.
	obj.grouping = new GroupingCoordinator(items, container, svg);
	
	
	
	
	/*
	New comments must be passed to the stores. Also, when up/downvotes change it should be sent to the server. The local version should also be updated straight away.
	
	upvote/downvote are in 'Comment.js';
	reply button onclick is in 'addGeneralComment' of 'CommentingManager.js';
	submit button onclick is in 'constructor' of 'CommentingManager.js';
	
	How to post the comments to the server? Should each individual be able to post itself to the server? Because it will have to post changes on itself, for example up/downvotes. Anyway, can be left for later for now.
	*/
	
	
	
	
	// Make some proxy stores that simulate the communication with the server. Connect them to the points where the annotations are submitted, so that they circulate through the stores.
	obj.comments = new ProxyServerStore('./data/annotations/testcomments.json');
	obj.comments.update = function(){
		obj.updateAllComments();
	}; // update
	
	obj.chapters = new ProxyServerStore('./data/annotations/testchapters.json');
	obj.chapters.update = function(){
		obj.updatePlaybarChapters();
	}; // update
	
	obj.tags = new ProxyServerStore('./data/annotations/testtags.json');
	obj.tags.update = function(){
		obj.updateTagAnnotations();
	}; // update
	
	
	// REMOVING TAGS NEEDS TO BE DONE BY ACTUAL ANNOTATION ID!!!
	// What should the grouping do when the annotations are made/dissolved through it?
	obj.grouping.dissolveexternal = function(a){
		// Only the tags get dissolved:
		a.forEach(a_=>{
			obj.tags.remove(a_);
		}); // forEach
	}; // dissolveexternal
	
	obj.grouping.createexternal = function(a){
		a.forEach(a_=>{
			obj.tags.add(a_);
		}); // forEach
	}; // createexternal
	
	
	// Make the forms submit the annotations to the appropriate stores, which will then in turn update the display modules.
	obj.items.forEach(item=>{
		
	  // Chapter annotations should update the playbar, the discussion tags, and the navigation tree.
	  item.ui.chapterform.submit = function(chapter){
		obj.chapters.add(chapter);
	  }; // submit
		
	}); // forEach
	
  } // constructor
  
  updateAllComments(){
	// Now add in some test comments
    let obj = this;
	
	obj.comments.data.sort(sortCommentsBeforePushing).forEach(comment=>{
	  obj.items.forEach(item=>{
	    if(item.ui.viewid == comment.viewid){
	      item.ui.commenting.add(comment);
	    } // if  
	  }); // forEach
	}); // forEach
  } // updateAllComments
  
  updatePlaybarChapters(){
	let obj = this;
	
	obj.chapters.data.forEach(ch=>{
	  obj.items.forEach(item=>{
		if(item.ui.metadata.taskId == ch.taskId){
		  item.ui.playcontrols.bar.addchapter(ch);
		  
		  let discussiontags = item.ui.playcontrols.bar.annotations.map(a=>a.label);
		  item.ui.commenting.discussion.update(discussiontags);
		} // if  
	  }); // forEach
	}); // forEach
	
	obj.updateNavigationTree();
	
  } // updatePlaybarChapters
  
  updateTagAnnotations(){
	let obj = this;
	// Just the navigation tree needs to be updated. However, the chapters are treated as tags also - if the group is dissolved, does it mean the chapters will get dissolved also? Orshould chapters be exempt from dissolving? Where should that be handled? Just not calling the chapter database for removal, and banking that no tag has the same id?
	obj.updateNavigationTree();  
  } // updateTagAnnotations
  
  updateNavigationTree(){
	let obj = this;
	// Previously the tasks were pushed to the hierarchy, with the tags attached. Now the tags are standalone, and the task ids should be given to the hierarchy separately. Maybe just make them as new tags and merge them together here?
	let tasktags = obj.items.map(item=>{return {
		taskId: item.ui.metadata.taskId, 
		label: "Root", 
		author: "session"
	}});
	
	obj.grouping.navigation.hierarchy.data = tasktags.concat(obj.tags.data).concat(obj.chapters.data);
	obj.grouping.navigation.update();
	
  } // updateNavigationTree
  
  
} // KnowledgeManager




// Should know whether to use taskId/id? What should use taskId to find the relevant
class ProxyServerStore{
	constructor(filename){
		let obj = this;
		obj.data = [];
		
		fetch(filename)
		  .then(response => response.json())
		  .then(data=>{
			obj.data=data;
			obj.update();
			return data;
		  });
	} // constructor
	
	add(item){
		// Check if the item is already present. Replace it, or just update the delta? Bank on the idea that no two queries will be simultaneous?
		let obj = this;
		let i = obj.data.findIndex(d=>d.id==item.id);
		obj.data.splice(i>-1 ? i : 0, i>-1, item);
		obj.update();
	} // add
	
	
	remove(item){
		let obj = this;
		let i = obj.data.findIndex(d=>d.id==item.id);
		obj.data.splice(i, i>-1);
		obj.update();
	} // remove
	
	update(){
		// Implement the push of all the comments etc to the actual modules for display.
		console.log("server pushes changes");
	} // update
	
	// Maybe no query is required anyway? Each project would have its own annotations, which are always loaded anyway? Unless you go into a list of users and remove them?
} // ProxyServerStore

/* To do: 
  DONE: - allow scrolling
  DONE: - add style to frames.
  DONE: - make divs appear side by side also
  DONE: - don't update invisible divs
  DONE: - zooming, panning
  
  DONE: - use the actual data
  DONE: - value based color shader calculation
  DONE: - (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  DONE: - auto set the original domain (DONE (width, height), near/far plane)

  DONE: - dragging frames around
  - auto selecting the height of the viewport in pixels
  - pinch gestures
  - play multiple views at once.
  - loading buffering && data limitation, and subsequent viewframe number limitation.
  
  DONE: - expandable description and tools section?
  DONE: - adding chapter annotations
      The annotations are not really chapters. They can be, but they should also support having a start AND end points, and be allowed to overlap. The playbar san still show them in order of appearance, but a more general view of the tag annotations should be available.
  DONE comments, reintroduce tags as threads
  - spatial arranging and metadata connection
  DONE: - tree hierarchy
	  Need to still connect the tag adding to update the navigation tree. Maybe in this smaller example it's better to have the tree just under the title?
  DONE grouping (hierarchy operates on tags, and is thus independent of grouping)
  - lasso
	  How do I want the lasso to work? Do I want the toolbar? Or is it better to just make the group straightaway? In that case where should the option to make ordinal tags be?
	  Because it' grouping, categorical tags (can use the chapter form), and ordinal tags.
  
  - put it all on a github webpage??
  
*/

/*

Arranging by metadata: some metadata will change with respect to time. But those will have to be collected on the go - because the players can be navigated to different times. It's easiest to have this metadata attached to the timesteps. This is ok for now.

Unsteady dbslice: How should the unsteady dbslice handle this data? Should every timestep be a different row in the metadata? Or should unsteady metadata be structured differently, with each attribute being an array of time-value pairs?

*/



// Hierarchy expects each task object to have some tags. Maybe the metadata should be loaded in from some database, and then converted to an object which includes the tags?
var metadata = [
{taskId: "0", label: "Maybe we", slice: "./data/testmetadata.json"},
{taskId: "1", label: "should add", slice: "./data/testmetadata_copy0.json"},
{taskId: "2", label: "some more", slice: "./data/testmetadata_copy1.json"},
{taskId: "3", label: "tasks.", slice: "./data/testmetadata_copy2.json"},
]; // metadata



let canvas = document.getElementById("canvas");
let container = document.getElementById("table-top");
let svg = document.querySelector("svg.hud");
let renderer = new MeshRenderer2D(canvas, container);

// Add the players in. The HTML will position hte frames.
for(let i=0; i<4; i++){
	let m = metadata[i];
	// Player is added within the MeshRenderer because it needs the 'gl'.
	let p = renderer.add(m.slice);
	p.title(m.label);
	p.ui.metadata = m;
} // for

// The renderer starts updating straight away. It's the responsibility of the geometries to provide something to draw. In the end some initial geometry is provided as default, as the buffers are initialised straight away.
renderer.draw();
console.log(renderer);
let km = new KnowledgeManager( renderer.items, container, svg );
console.log(km);








// COMMENTING: Add the login info.
let login = document.querySelector("div.login").querySelector("input");
login.oninput = function(){
  renderer.items.forEach(item=>{
	item.ui.user = login.value;
  }); // forEach
  
  // Groups also need the author to be updated.
  km.grouping.groups.forEach(group=>{
	group.user = login.value;
  }); // forEach
}; // oninput











/*
Adding/removing items to/from groups changes the groups. The changes should only be saved on demand. There should be a button that allows appears when changes were made. 

The changes should allow only a new group to be made, or the old one dissolved. To dissolve a group it's annotations need to be removed. For this the annotations will require to have annotation ids.

Only allow the author of hte group to dissolve it. Also means the groups need to follow the current author.


Dissolving deletes the annotations by the current user.
Saving the edited changes just makes new annotations? Or first deletes all theold ones, and then saves the new ones?


Change the chapterform also! It should allow submitting annotations without a starttime, but only those with a starttime can be added as chapters.
*/
