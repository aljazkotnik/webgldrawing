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
}


export default class Mesh2D{
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
	obj._currentFrameInd = 0;
	
	
	
	// Imagine that some metadata was loaded in.
    fetch("./data/testmetadata.json")
	  .then(res=>res.json())
	  .then(content=>{
		
		// But all three need to be available at the same time before rendering.
		let indicesPromise = loadBinData(content.indices)
		  .then(ab=>{ return new Uint32Array(ab) })
		let verticesPromise = loadBinData(content.vertices)
		  .then(ab=>{ return new Float32Array(ab) })
		  
		  
		/* The values should be loaded in separately from the vertices and indices.
		
		Do we just loop through some timesteps and make the promises. However, the data size restrictions should be maintained at all times! The data loading function should keep that in mind.
		*/
		let valuesPromise = loadBinData(content.timesteps[obj.currentFrameInd].filename)
		  .then(ab=>{ return new Uint8Array(ab) })
		  .then(ui8=>{ return Float32Array.from(ui8) })
		
		
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
		
		  
		  
		  
		
		}) // then
		
		
	}) // fetch
	
	
	
	
	
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
		memory += t.byteLength
	  } // if
	})
	
	return memory
  } // memoryUsed
  
  // There should be two separate methods to pick the current frame. One is by incrementing, and the other is by setting the appropriate time.
  incrementCurrentFrame(){
	// When incrementing past the end of the available time range we loop to the start.
	let obj = this;
	obj.currentFrameInd = (obj.currentFrameInd + 1) % obj.timesteps.length
  } // incrementCurrentFrame
  
  timestepCurrentFrame(t){
	// Different players can start at different times. However, if a dt is passed in to increment the current frame the incrementing can truncate a part of the dt, leading to different players to be at different times. Therefore the actual time is expected. If t is outside of the time range available, the min or max frame indices are returned as appropriate.
	let obj = this;
	
	
	let i = 0;
	let dist = Number.POSITIVE_INFINITY;
	obj.timesteps.forEach((timestep,j)=>{
		let d = Math.abs( timestep.t-t )
		if(d < dist){
			dist = d;
			i = j;
		} // if
	}) // forEach
	
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
		  .then(ab=>{ return new Uint8Array(ab) })
		timestep.valuesPromise.then(ui8=>{
			timestep.byteLength = ui8.byteLength
		})
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
	
	  })
	
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