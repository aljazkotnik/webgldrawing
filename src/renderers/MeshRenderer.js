import * as twgl from "twgl.js";
import ViewFrame from "./ViewFrame.js";

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



export default class MeshRenderer{
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
		  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
		
		} // if
	}) // forEach
	
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
	  (rect.right < 0 || rect.left > gl.canvas.clientWidth)
	
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