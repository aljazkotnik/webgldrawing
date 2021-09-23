import * as twgl from 'twgl.js';

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
let template$1 = `
<div class="item">
  <div class="label">Label</div>
  <div class="view" style="width:300px; height:300px; opacity:0.001;">
  </div>
</div>
`;



class ViewFrame2D{
  constructor(gl){
	let obj = this;
	
	obj.gl = gl;
	obj.node = html2element(template$1);
	
	// obj.view is a convenience reference that points to the node. Transforms.view is the view transformation matrix.
	obj.view = obj.node.querySelector("div.view");
	
	// Some initial dummy geometry to allow initialisation.
	obj.geometry = {
		x: [0, 1],
		y: [0, 1]
	}; // initial dummy geometry
	
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
	
	let translateToOrigin = translateMatrix(-dom.x[0], -dom.y[0], 0);
	let scaleToClipSpace = scaleMatrix(k,k,1);
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
	// Pixel values can be obtained from the event.
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
  constructor(gl){
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
	obj.currentFrameInd = 0;
	
	
	
	// Imagine that some metadata was loaded in.
    fetch("./data/testmetadata.json")
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
  
  
  // There should be two separate methods to pick the current frame. One is by incrementing, and the other is by setting the appropriate time.
  incrementCurrentFrame(){
	// When incrementing past the end of the available time range we loop to the start.
	let obj = this;		
	obj.currentFrameInd += 1;
	obj.currentFrameInd = obj.currentFrameInd % obj.timesteps.length;
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
  
  
  updateCurrentFrame(){
	// The UnsteadyPlayer will input an actual timestep, as opposed to just increment the frame. This allows simulations with different temporal resolutions to be compared directly. Comparable time frames are selected based on available data.
	
	// What will be passed in? Just an icrement I guess, and it's up to the user to provide time variables with the same dt and in the same domain.
	let obj = this;
	let gl = obj.gl;
	
	// The index is used to find and load teh appropriate file.
	
	
	loadBinData(obj.timesteps[obj.currentFrameInd].filename)
		  .then(ab=>{ return new Uint8Array(ab) })
		  .then(ui8=>{ return Float32Array.from(ui8) })
		  .then(f32=>{
			  gl.bindBuffer(gl.ARRAY_BUFFER, obj.valuesBuffer);
		      gl.bufferData(gl.ARRAY_BUFFER, f32, gl.STATIC_DRAW);
		
		  });
	
  } // updateCurrentFrame
  
  
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

/*
PLAYBAR only controls the appearance of the playbar, but does not control the playing. It just allows the user interaction with the playbar.

Try to eliminate d3 from this to keep the size down.
*/



// The canvas will be positioned, and this should be relative to that positioning. Maybe there should be an overall div that contains the canvas and a sibling div that contains all the markup.
let template = `
<div class="player-controls">
  <svg id="playbar" width="100%" height="32px">
    <g class="playbutton" style="cursor: pointer;">
	  <path fill="tomato" d=""></path>
    </g>
    <g class="playbar" style="cursor: pointer;"></g>
  </svg>
</div>
`; // template



// Some dimensions.
let playButtonWidth = 20;
let playButtonMargin = 6;


let textHeight = 12;
let textBottomMargin = 2;
let textSpace = textHeight + textBottomMargin;
let rectHighlightHeightDelta = 3;



// use getAttribute/setAttribute
function playPath(){
	// 'width' and 'height' prescribe the size allocated for the play button. The button should take up 80% of the space available.
	
	// Calculate the size of the triangle, and where the drawing should begin.
	// let L = 0.9 * Math.min( height / 1, width / (Math.sqrt(3)/2) )
	
	let r_max = L*Math.sqrt(3)/6;
    let r = 3 > r_max ? r_max : 3;
    let dL = r*Math.sqrt(3); // Length of side cut by 1 rounding.
	
	let L = playButtonWidth*2*Math.sqrt(3)/3;
	
	// let Mx = (width - L)/2;
    // let My = (height - L)/2;
    let Mx = 0;
	let My = textSpace + rectHighlightHeightDelta + 5 - L/2;
    
    let p0 = [Mx, My];
    let p1 = [Mx + L*Math.sqrt(3)/2, My + L/2];
    let p2 = [Mx, My + L];
    
	
    
    return `M${p0[0]} ${p0[1]+dL}
      a ${r},${r}, 0,0,1  ${r*3/2}, ${-dL/2}
      L ${p1[0]-r*3/2} ${p1[1]-dL/2}
      a ${r},${r}, 0,0,1  0, ${dL}
      L ${p2[0]+r*3/2} ${p2[1]-dL/2}
      a ${r},${r}, 0,0,1  ${-r*3/2}, ${-dL/2}
      Z
      `
	
} // playPath

function pausePath(){
	let width = playButtonWidth;
    let height = playButtonWidth*2*Math.sqrt(3)/3 - 2*(3*Math.sqrt(3)-3);
    let dx = width/5;
    let r = 3;
    
	let Mx = 0;
	let My = textSpace + rectHighlightHeightDelta + 5 - height/2;
	
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

function chapterRect(className, color){
	let y = textSpace + rectHighlightHeightDelta;
	return `<rect class="${ className }" x="0" y="${y}" width="0" height="10" fill="${ color }" stroke="white" stroke-width="2px"></rect>`
  } // chapterRectTemplate


class PlayBar{
	
  constructor(){
	let obj = this;
	
	obj.node = html2element(template);
	
	obj.button = obj.node.querySelector("g.playbutton");
	obj.bar = obj.node.querySelector("g.playbar");
	
	
	obj._tscale = new scaleLinear();
	
	
	obj.button.addEventListener("click",event=>{
		// Get the action required based on the button icon.
		if( obj.t_play == obj.t_max ){
			obj.t_play = obj.t_min;
		} // if
		
		obj.playStatus = !obj.playStatus;
	}); // addEventListener
	
	obj.bar.addEventListener("click", event=>{
		// On click the playbar should register the correct time.
		
		// The tscale takes inputs in the svg coordinates, and the event returns them in the client coordinates. Therefore the client coordinates must be adjusted for the position of the SVG.
		let x1 = event.clientX;
		let x0 = obj.node.getBoundingClientRect().x;
		let t = obj.tscale.range2dom(x1-x0);
		
		// Now just set the t to the right value, and update the view.
		obj.t_play = t;
		
		// The playtime changed, therefore pause the video.
		obj.playStatus = false;
		obj.userNavigated = true;
	}); // addEventListener
	
	
	
	obj.t_min = 0;
	obj.t_max = 1;
	
	obj.t_buffer = 0;
	obj.t_play = 0;
	
	obj.playStatus = false;
	obj.userNavigated = false;
	
	// Annotations. Comments should be based on the chapter tags I think. The discussion is intended to be based on observed events. The logical progress is that events need to first be identified, and then discussed in a separate step. There should be a single dialogue box, and in that one tags can be added. This allows a single comment to be seen in multiple threads. Replies will have to be handled separately. Eventually the user should also be able to pin comments.
	obj.chapters = [];
	
	
  } // constructor
  
  
  
  get tscale(){
	// The tscale is relative to the whole svg element, and takes in whole svg coordinates.
	let obj = this;
	
	let playBarStart =  playButtonWidth + playButtonMargin;
	let playBarEnd = obj.node.getBoundingClientRect().width;
	
	obj._tscale.domain = [obj.t_min, obj.t_max];
	obj._tscale.range = [playBarStart,playBarEnd];
	
	return obj._tscale;
	  
  } // get tscale
  
  
  
  
  // How should the chapter getting be done? Annotations can be pushed to individual small multiples, but also to many at the same time.
  set chapters(annotations){
	let obj = this;
	
	// Sort them in peparation for chapter creation.
	annotations.sort((a,b)=>{return a.time - b.time});
	
	// The start and end values should be remaped or? The scale takes into account the different start and end points.
	let chapters = annotations.reduce((acc,current)=>{
		let previous = acc[acc.length-1];
		
		previous.endtime = previous.endtime > current.starttime ? current.starttime : previous.endtime;
		
		// The first one needs to start at zero, and the last one needs to stop at the end.
		acc.push({
			label: current.label,
			starttime: current.starttime,
			endtime: current.endtime > obj.t_max ? obj.t_max : current.endtime
		});
		
	return acc
	},[{label: "", starttime: obj.t_min, endtime: obj.t_max}]);
	  
	obj._chapters = chapters;
  } // set chapters
  
  get chapters(){
	  let obj = this;
	return [{label: "", starttime: obj.t_min, endtime: obj.t_max}]
	//  return this._chapters
  } // get chapters
	


  // CONSTRUCTION	 
  
	
  
  chapterRectangleWidth(chapter){
	let x0 = this.tscale.dom2range(chapter.starttime);
	let x1 = this.tscale.dom2range(chapter.endtime);
	return x1 - x0
  } // chapterRectangleWidth
  
  chapterTimeFraction(ch, t){
	let tf = ( t - ch.starttime ) / (ch.endtime - ch.starttime);
	return Math.abs(tf - 0.5) <= 0.5 ? tf : tf>0
	 
  } // chapterTimeFraction
  
  
  // FUNCTIONALITY
  update(){
	let obj = this;
	
	obj.updateChapterGroups();
	obj.updatePlayPauseButton();
	obj.updatePlayBar();
  } // update
  
  updateChapterGroups(){
    let obj = this;
	
	let parent = obj.bar;
	let groups = joinDataToElements(obj.chapters, parent.querySelectorAll("g.chapter"), d=>d.label);
	
	
	
	groups.enter.forEach(d=>{
		
		let chapternode = svg2element( `<g class="chapter">
		${ chapterRect("chapter-background", "gainsboro") }
		${ chapterRect("chapter-buffering", "gray") }
		${ chapterRect("chapter-foreground", "tomato") }
		<text y="${textHeight}" style="display: none;">${ d.label }</text>
        </g>` );
		
		chapternode.__data__ = d;
		
		parent.appendChild(chapternode);
		
		// Add all the highlighting
		addChapterHighlighting(chapternode);
	}); // forEach enter
	
	// The updating is not required, because annotations cannot change their name on the go. The positions of rectangles are all updated later on anyway.
	
	groups.exit.forEach(el=>{
		el.remove();
	}); // forEach exit
		
		

    // Chapter highlighting.
	// iterateOverHtmlList(newChapters.nodes(), addChapterHighlighting);
	
	
  } // updateChapterGroups
  
  updatePlayBar(){
	let obj = this;
	
	obj.bar.querySelectorAll("g.chapter").forEach(el=>{
	  let x = obj.tscale.dom2range(el.__data__.starttime);
	  let width = obj.chapterRectangleWidth( el.__data__ );
	  let frac_buffer = obj.chapterTimeFraction( el.__data__, obj.t_buffer);
	  let frac_played = obj.chapterTimeFraction( el.__data__, obj.t_play);

	  el.querySelector("rect.chapter-background").setAttribute("x", x);
	  el.querySelector("rect.chapter-buffering").setAttribute("x", x);
	  el.querySelector("rect.chapter-foreground").setAttribute("x", x);
	  el.querySelector("text").setAttribute("x", x);

	  el.querySelector("rect.chapter-background").setAttribute("width", width);
	  el.querySelector("rect.chapter-buffering").setAttribute("width", width*frac_buffer);
	  el.querySelector("rect.chapter-foreground").setAttribute("width", width*frac_played);
	  
	  
	}); // forEach chapter
	
  } // updatePlayBar
  
  updatePlayPauseButton(){
	let obj = this;
	
	// Get teh dimensions available
	let d = obj.playStatus ? pausePath() : playPath();
	obj.button.querySelector("path").setAttribute("d", d);	
  } // updatePlayPauseButton

  

} // player




function iterateOverHtmlList(htmlList, callback){
	for(let j=0; j<htmlList.length; j++){
		let tg = htmlList[j];
		callback(tg);
	} // for
} // iterateOverHtmlList

function highlightRectangle(r){
	r.height.baseVal.value = 10 + 2*rectHighlightHeightDelta; 
	r.y.baseVal.value = textSpace;
} // highlightRectangle

function unhighlightRectangle(r){
	r.height.baseVal.value = 10;
	r.y.baseVal.value = textSpace + rectHighlightHeightDelta;
} // unhighlightRectangle	


function highlightChapter(chapter){
	let rectangles = chapter.getElementsByTagName("rect");
	iterateOverHtmlList(rectangles, highlightRectangle);
					
	let chapterNames = chapter.getElementsByTagName("text");
	iterateOverHtmlList(chapterNames, t=>t.style.display="");
} // highlightChapter

function unhighlightChapter(chapter){
	let rectangles = chapter.getElementsByTagName("rect");
	iterateOverHtmlList(rectangles, unhighlightRectangle);
					
	let chapterNames = chapter.getElementsByTagName("text");
	iterateOverHtmlList(chapterNames, t=>t.style.display="none");
} // unhighlightChapter

function addChapterHighlighting(chapter){
	chapter.addEventListener("mouseenter", ()=>{
		highlightChapter(chapter);
	}); // addEventListener
	
	chapter.addEventListener("mouseover", ()=>{
		highlightChapter(chapter);
	}); // addEventListener
	
	chapter.addEventListener("mouseout", ()=>{
		unhighlightChapter(chapter);			
	}); // addEventListener
} // addChapterHighlighting

// How to actually perform the playing? First, just allow a small multiple to play itself. When the button is pressed the player becomes 'active'. The UnsteadyPlayer must be given the fps at which the data should change. Then when the internal document timestamp passes another full timestep from the beginning of the document it changes the data. The data must be ready beforehand though.


// It's advantageous to inherit from ViewFrame2D because the geometry changes on the go - first some dummy geometry is specified, and after the actual geometry is loaded in that just gets automatically used on next FrameAnimationRate step. If the ViewFrame is a module then the UnsteadyPlayer has to monitor when the geometry changes, and update the ViewFrame accordingly.
// Because it's advantageous to inherit from ViewFrame2D it is also advantageous to create the outside html player wrapper in it. Then the unsteady player only needs to add other modules into it.
class UnsteadyPlayer2D extends ViewFrame2D {
  constructor(gl){
    super(gl);
	let obj = this;
	
	
	// Actual geometry to be drawn.
	obj.geometry = new Mesh2D(gl);
	
	
	// Add in a playbar
	obj.playbar = new PlayBar();
	obj.node.appendChild( obj.playbar.node );
	
	// The FPS at which to swap out data.
	obj.fps = 24;
	obj.dt = 1000 / obj.fps;
	obj.timelastdraw = 0;
	
  } // constructor
  
  update(now){
	let obj = this;
	
	// Compute the view matrices
    obj.computeModelMatrix();
    obj.computeViewMatrix();
    obj.computeOrthographicMatrix();
	
	
	if(now > obj.timelastdraw + obj.dt){
	  if( obj.playbar.playStatus ){
		obj.timelastdraw = now;
		obj.incrementTimeStep();
	  } else if ( obj.playbar.userNavigated ){
		obj.timelastdraw = now;
		obj.incrementTimeStep(0);
		obj.playbar.userNavigated = false;
	  } // if
	} // if
    
    
	// Update the playbar
	obj.playbar.t_min = obj.geometry.domain.t[0];
	obj.playbar.t_max = obj.geometry.domain.t[1];
	obj.playbar.update();
  } // update
  
  
  incrementTimeStep(dt){
	/*
	The small multiple should be able to play on its own. In that case it should just update the data 24 times per second.
	
	It should of course support playing several small multiples at once. If the 'dt' for all the simulations are the same then playing several at once just requires an input that will toggle several small multiples on at the same time. If the 'dt' are not the same, then it becomes more difficult because the data can't be loaded by incrementing, and instead a desired time must be passed to the player. Furthermore, the player should support several small multiples to be played at once, but starting from different times. In those cases the player must keep track of the time increment total to ensure all small multiples move by the same amount.
	
	For now the playbar can just play forward correctly, and the t_play can be used to keep track of the actual playing time. The dt is just added on to that time them.
	*/
	let obj = this;
	
	
	if(dt >= 0){
	  let t_new = obj.playbar.t_play + dt;
	  obj.geometry.timestepCurrentFrame(t_new);
	  obj.playbar.t_play = t_new;
	} else {
	  obj.geometry.incrementCurrentFrame();
	  obj.playbar.t_play = obj.geometry.currentTime;
	} // if
	
	obj.geometry.updateCurrentFrame();
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
  constructor(){
	let obj = this;  
	
	let domcontainer = document.getElementById("table-top");
	obj.domcontainer = domcontainer;
	
	let canvas = document.getElementById("canvas");	
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
  
  add(id){
	let obj = this;
	
	// let newplayer = new ViewFrame2D(obj.gl);
	let newplayer = new UnsteadyPlayer2D(obj.gl);
	obj.domcontainer.appendChild(newplayer.node);
	obj.items.push(newplayer);
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
  
 
  isItemVisible(item){
	// Check whether the current item is visible. (!!!!) Extend later to check whether other items obscure the current item.
	let obj = this;
	
	let gl = obj.gl;
	let rect = item.node.getBoundingClientRect();
    
	let isOffScreen = 
	  (rect.bottom < 0 || rect.top > gl.canvas.clientHeight) || 
	  (rect.right < 0 || rect.left > gl.canvas.clientWidth);
	
	return !isOffScreen
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

// The MeshRenderer is the engine that draws the scene.
let renderer = new MeshRenderer2D();

// Add the players in. The HTML will position hte frames.
for(let i=0; i<4; i++){
	renderer.add(i);
} // for


// In the end the renderer will have to wait for the data to be loaded. Therefore the update loop should be outside.
renderer.draw();

console.log(renderer);


/* To do: 
  DONE: - allow scrolling
  DONE: - add style to frames.
  DONE: - make divs appear side by side also
  DONE: - don't update invisible divs
  DONE: - zooming, panning
  
  DONE: use the actual data
  DONE: value based color shader calculation
  DONE: (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  - dragging frames around
  - pinch gestures
  DONE: auto set the original domain (DONE (width, height), near/far plane)
*/

// For 2D drawing the transformation matrices have to be different. That means that the ViewFrame needs to be changed, as that implements the matrices.
