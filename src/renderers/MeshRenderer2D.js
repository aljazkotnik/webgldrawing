/* No need to implement anything else than panning and zooming for the 2D example. The model matrix and the rojection matrix are not needed. The view is needed to allow for zooming.

updateAttributesAndUniforms needs to be changed to accomodate different size elements.

Actually, Graham's own rendering was effectively using 3D coordinates. The 2D position 'a_position' was expanded with z=0 and w=1 before multiplying with matrices.

Still, hte program needs to be assembled in a different way.

projection: orthographic - no distortion
view: camera movement.
model: unit matrix, model not moving.
*/

import * as twgl from "twgl.js";
import ViewFrame2D from "./ViewFrame2D.js";

let vertshader = `
//Each point has a position and color
attribute vec2 position;
attribute float value;

// The transformation matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// Pass the color attribute down to the fragment shader
varying float v_colorval;

void main() {
  
  // Pass the color down to the fragment shader
  v_colorval = value;
  
  // Read the multiplication in reverse order, the point is taken from the original model space and moved into world space. It is then projected into clip space as a homogeneous point. Generally the W value will be something other than 1 at the end of it.
  gl_Position = projection * view * model * vec4( position, 0.0, 1.0 );
}`;


let fragshader = `
precision mediump float;
varying float v_colorval;

uniform sampler2D colormap;
uniform float u_cmin, u_cmax;

void main() {
  gl_FragColor = texture2D(colormap, vec2( (v_colorval-u_cmin)/(u_cmax-u_cmin), 0.5));;
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



export default class MeshRenderer2D{
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
	obj.webglProgram = setupProgram(gl);
	obj.gl = gl;
	
	
	
	// Make a colorbar texture.
	obj.colormapTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
	gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 21, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, cmap);
	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	
	// Collection of plots to draw.
	obj.items = []
	
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
		  item.update(now)
		
		  // Update the data going to the GPU
		  obj.updateAttributesAndUniforms(item);
		
		  // Set the rectangle to draw to. Scissor clips, viewport transforms the space. The viewport seems to be doing the scissoring also...
		  obj.updateViewport(item)
		
		  // Perform the actual draw
		  gl.drawElements(gl.TRIANGLES, item.geometry.indicesLength, gl.UNSIGNED_SHORT, 0);
		
		} // if
	}) // forEach
	
	requestAnimationFrame( obj.draw.bind(obj) );
  } // draw
  
  add(id){
	let obj = this;
	
	let newplayer = new ViewFrame2D(obj.gl);
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



// The 'u_cmin' and 'u_cmax' are calculated so that they map from the course [0,255] uint8 values to the data values, and from the data values to the desired colormap range. The colormap range is defined by domain.c, and the data range is defined by domain.v.
// 255*(domain.c[0]-domain.v[0])/(domain.v[1]-domain.v[0]
// 255*(domain.c[1]-domain.v[0])/(domain.v[1]-domain.v[0]
	gl.uniform1f(locations.cmin, 0)
	gl.uniform1f(locations.cmax, 6)
	
	gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
    gl.uniform1i(locations.colormap, 0);


  } // updateAttributesAndUniforms
  
 
  isItemVisible(item){
	// Check whether the current item is visible. Extend later to check whether other items obscure the current item.
	let obj = this;
	
	let gl = obj.gl;
	let rect = item.node.getBoundingClientRect();
    
	let isOffScreen = 
	  (rect.bottom < 0 || rect.top > gl.canvas.clientHeight) || 
	  (rect.right < 0 || rect.left > gl.canvas.clientWidth)
	
	return !isOffScreen
  } // isItemVisible

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
	
    let loc_position = gl.getAttribLocation(program, "position");
	let loc_value = gl.getAttribLocation(program, "value");
    // let loc_color = gl.getAttribLocation(program, "color");


	// For 2D triangl culling and depth testing is not needed.
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
			position: loc_position,
			value: loc_value
		},
		program: program
	};
} // setupProgram

