import * as twgl from 'twgl.js';
import 'gl-matrix';

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





function rotateXMatrix(a){
  
  var cos = Math.cos;
  var sin = Math.sin;
  
  return [
       1,       0,        0,     0,
       0,  cos(a),  -sin(a),     0,
       0,  sin(a),   cos(a),     0,
       0,       0,        0,     1
  ];
}

function rotateYMatrix(a) {

  var cos = Math.cos;
  var sin = Math.sin;
  
  return [
     cos(a),   0, sin(a),   0,
          0,   1,      0,   0,
    -sin(a),   0, cos(a),   0,
          0,   0,      0,   1
  ];
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






function perspectiveMatrix(fieldOfViewInRadians, aspectRatio, near, far) {
  
  // Construct a perspective matrix
  
  /*
     Field of view - the angle in radians of what's in view along the Y axis
     Aspect Ratio - the ratio of the canvas, typically canvas.width / canvas.height
     Near - Anything before this point in the Z direction gets clipped (resultside of the clip space)
     Far - Anything after this point in the Z direction gets clipped (outside of the clip space)
  */
  
  var f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
  var rangeInv = 1 / (near - far);
 
  return [
    f / aspectRatio, 0,                          0,   0,
    0,               f,                          0,   0,
    0,               0,    (near + far) * rangeInv,  -1,
    0,               0,  near * far * rangeInv * 2,   0
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

let vertices = [
// Front face
-1.0, -1.0,  1.0,
 1.0, -1.0,  1.0,
 1.0,  1.0,  1.0,
-1.0,  1.0,  1.0,

// Back face
-1.0, -1.0, -1.0,
-1.0,  1.0, -1.0,
 1.0,  1.0, -1.0,
 1.0, -1.0, -1.0,

// Top face
-1.0,  1.0, -1.0,
-1.0,  1.0,  1.0,
 1.0,  1.0,  1.0,
 1.0,  1.0, -1.0,

// Bottom face
-1.0, -1.0, -1.0,
 1.0, -1.0, -1.0,
 1.0, -1.0,  1.0,
-1.0, -1.0,  1.0,

// Right face
 1.0, -1.0, -1.0,
 1.0,  1.0, -1.0,
 1.0,  1.0,  1.0,
 1.0, -1.0,  1.0,

// Left face
-1.0, -1.0, -1.0,
-1.0, -1.0,  1.0,
-1.0,  1.0,  1.0,
-1.0,  1.0, -1.0
];

var colorsOfFaces = [
[0.3,  1.0,  1.0,  1.0],    // Front face: cyan
[1.0,  0.3,  0.3,  1.0],    // Back face: red
[0.3,  1.0,  0.3,  1.0],    // Top face: green
[0.3,  0.3,  1.0,  1.0],    // Bottom face: blue
[1.0,  1.0,  0.3,  1.0],    // Right face: yellow
[1.0,  0.3,  1.0,  1.0]     // Left face: purple
];
  
  
var colors = [];
for (var j=0; j<6; j++) {
  var polygonColor = colorsOfFaces[j];
    
  for (var i=0; i<4; i++) {
    colors = colors.concat( polygonColor );
  } // for
} // for
  
var indices = [
0,  1,  2,      0,  2,  3,    // front
4,  5,  6,      4,  6,  7,    // back
8,  9,  10,     8,  10, 11,   // top
12, 13, 14,     12, 14, 15,   // bottom
16, 17, 18,     16, 18, 19,   // right
20, 21, 22,     20, 22, 23    // left
];
  



class Cube{
  constructor(gl){
	let obj = this;

    obj.vertices = vertices;
    obj.indices = indices;
    obj.colors = colors;

	// "In case of glBufferData, the buffer object currently bound to target is used." (https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBufferData.xhtml)
    let verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	obj.verticesBuffer = verticesBuffer;
  
    let colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    obj.colorsBuffer = colorsBuffer;
  
    let indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	obj.indicesBuffer = indicesBuffer;
  } // constructor
  
  
} // Cube

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

	
 
// Method to calculate the starting position for the camera? Based on the default field of view in radians the offset can be calculated.
class Camera2D extends Camera{
  // The 2D camera has panning instead of changing the camera angle.
  
  constructor(){
	super();
  } // constructor
  
  
  move(x,y){
	// Instead of changing the camera pitch/yaw/roll pan the view.
	let obj = this;
	
	if(obj.mouseDown){
		// Angles have to be in radians!! Division by 4 is just a relaxation parameter.
		let diffX = (x - obj.mouseStart[0])/4;
		let diffY = (y - obj.mouseStart[1])/4;
		
		// Limit the panning?
		obj.x = obj.xStart + diffX;
		obj.y = obj.yStart + diffY;
	} // if  
  } // move
} // Camera2D



function constrainValue(v,a,b){
  // Constrain value 'v' to a <= v <= b.
  return Math.max(Math.min(v, b), a);
} // constrainValue

function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element

// div must have opacity to register the mouse events!!
let template = `
<div class="item">
  <div class="view" style="width:300px; height:300px; opacity:0;">
  </div>
  
  <div class="label">
  </div>
</div>
`;



class ViewFrame{
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
	view.onmousedown  = function(e){ obj.cameraMoveStart(e); };
	view.onmousemove  = function(e){ obj.cameraMove(e); };
	view.onmouseup    = function(e){ obj.cameraMoveEnd(); };
	view.onmouseleave = function(e){ obj.cameraMoveEnd(); };
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
    obj.computePerspectiveMatrix( 0.5 );
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
	camera.move(e.clientX, e.clientY); 
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

let vertshader = `
//Each point has a position and color
attribute vec3 position;
attribute vec4 color;

// The transformation matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// Pass the color attribute down to the fragment shader
varying vec4 vColor;

void main() {
  
  // Pass the color down to the fragment shader
  vColor = color;
  
  // Read the multiplication in reverse order, the point is taken from the original model space and moved into world space. It is then projected into clip space as a homogeneous point. Generally the W value will be something other than 1 at the end of it.
  gl_Position = projection * view * model * vec4( position, 1.0 );
}`;


let fragshader = `
precision mediump float;
varying vec4 vColor;

void main() {
  gl_FragColor = vColor;
}`;



class MeshRenderer{
  constructor(){
	let obj = this;  
	
	let domcontainer = document.getElementById("table-top");
	obj.domcontainer = domcontainer;
	
	let canvas = document.getElementById("canvas");	
	obj.canvas = canvas;
	obj.canvas.width = window.innerWidth;
	obj.canvas.height = window.innerHeight;

	// Grab a context
	obj.gl = canvas.value = canvas.getContext("webgl", {antialias: true, depth: false});

	

	obj.webglProgram = setupProgram(obj.gl);
	
	
	obj.items = [];
	
  } // constructor
  
  
  draw(){
	let obj = this;
	let gl = obj.gl;
	
	// Common current time. This should be changed so that it starts from when the user presses a play. Furthermore the views should be either linked or individual
	let now = Date.now();
	
	// Move the canvas to the right position for scrolling.
	gl.canvas.style.transform = `translateY(${window.scrollY}px)`;
	
	
	// The actual drawing loop.
	obj.items.forEach(item=>{
		// Check whether the item is visible or not.
		if( obj.isItemVisible(item) ){
		  // Update the ViewFrame to calculate new transform matrices.
		  item.update(now);
		
		  // Update the data going to the GPU
		  obj.updateAttributesAndUniforms(item);
		
		  // Set the rectangle to draw to. Scissor clips, viewport transforms the space. The viewport seems to be doing the scissoring also...
		  obj.updateViewport(item);
		
		  // Perform the actual draw
		  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
		
		} // if
	}); // forEach
	
	requestAnimationFrame( obj.draw.bind(obj) );
  } // draw
  
  add(id){
	let obj = this;
	
	let newplayer = new ViewFrame(obj.gl);
	obj.domcontainer.appendChild(newplayer.node);
	obj.items.push(newplayer);
  } // add
  
  updateViewport(item){
	let gl = this.gl;
	 
	gl.viewport(...item.viewport);
	gl.scissor(...item.viewport);
	gl.clearColor(...[0,0,0,0]);  
  } // updateViewport
  
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
	gl.vertexAttribPointer( locations.position, 3, gl.FLOAT, false, 0, 0 );

	// Update the colors attribute
	gl.enableVertexAttribArray( locations.color );
	gl.bindBuffer(gl.ARRAY_BUFFER, item.geometry.colorsBuffer);
	gl.vertexAttribPointer( locations.color, 4, gl.FLOAT, false, 0, 0);

	// Update the indices attribute.
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.geometry.indicesBuffer );

  } // updateAttributesAndUniforms
  
 
  isItemVisible(item){
	// Check whether the current item is visible. Extend later to check whether other items obscure the current item.
	let obj = this;
	
	let gl = obj.gl;
	let rect = item.node.getBoundingClientRect();
    
	let isOffScreen = 
	  (rect.bottom < 0 || rect.top > gl.canvas.clientHeight) || 
	  (rect.right < 0 || rect.left > gl.canvas.clientWidth);
	
	return !isOffScreen
  } // isItemVisible

} // MeshRenderer

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
	
	
    let loc_position = gl.getAttribLocation(program, "position");
    let loc_color = gl.getAttribLocation(program, "color");


	// Don't draw faces with the 'wrong triangle facing' orientation. This essentially ensures that depth is respected.
	gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
	
	// Scissor defines the part of canvas to draw to.
	gl.enable(gl.SCISSOR_TEST);


	return {
		locations: {
			model: loc_model,
			view: loc_view,
			projection: loc_projection,
			position: loc_position,
			color: loc_color
		},
		program: program
	};
} // setupProgram

// The MeshRenderer is the engine that draws the scene.
let renderer = new MeshRenderer();

// Add the players in. The HTML will position hte frames.
for(let i=0; i<100; i++){
	renderer.add(i);
} // for


// In the end the renderer will have to wait for the data to be loaded. Therefore the update loop should be outside.
renderer.draw();

console.log(renderer);

// It works!!! 

/* To do: 
  DONE: - allow scrolling
  DONE: - add style to frames.
  DONE: - make divs appear side by side also
  DONE: - don't update invisible divs
  DONE: - zooming, panning
  
  - use the actual data
  - value based color shader calculation
  DONE: (panning relaxation must be manually adjusted) - 2D and 3D cameras.
  - dragging frames around
  - pinch gestures
*/
