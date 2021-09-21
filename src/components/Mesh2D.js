/*
A test mesh for use during transitioning.
*/
  

let vertices = [
  0, 0,
  1, 0,
  2, 0,
  0, 1,
  1, 1,
  2, 1,
  3, 1,
  1, 2,
  2, 2,
  3, 2,
  1, 3,
  2, 3
]; // vertices

// clockwise triangles. 
let indices = [
  0, 3, 4,
  0, 4, 1,
  1, 4, 5,
  1, 5, 2,
  4, 7, 8,
  4, 8, 5,
  5, 8, 9,
  5, 9, 6,
  7, 10, 11,
  7, 11, 8
]; // indices



let values = [
  0,
  0,
  0,
  0,
  1,
  2,
  3,
  2,
  4,
  6,
  3,
  6
]; // values
 


export default class Mesh2D{
  constructor(gl){
	let obj = this;

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
	
	
	
	
	// Imagine that some metadata was loaded in.
// fetch("./data/coarsemetadata.json").then(res=>res.json());
	
	// First start by drawing a static representation of actual data. Wait to load, and then update the buffer.
	let content = {
	  indices: "./data/indices.bin",
	  vertices: "./data/vertices.bin",
	  values: "./data/coarse_entropy_t_0.bin"
	} // content
	
	
	// But all three need to be available at the same time before rendering.
	let verticesPromise = loadBinData(content.vertices)
	  .then(ab=>{ return new Float32Array(ab) })
	let valuesPromise = loadBinData(content.values)
	  .then(ab=>{ return new Uint8Array(ab) })
	  .then(ui8=>{ return Float32Array.from(ui8) })
	let indicesPromise = loadBinData(content.indices)
	  .then(ab=>{ return new Uint32Array(ab) })
	
	Promise.all([verticesPromise, valuesPromise, indicesPromise]).then(d=>{
	  
	  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, d[0], gl.STATIC_DRAW);
	  
	  gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, d[1], gl.STATIC_DRAW);
	
	  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, d[2], gl.STATIC_DRAW);
	  obj.indicesLength = d[2].length;
	
    }) // then
	
  } // constructor
  

 
  // The 'values' are stored as a 'scaled uint8 array' to save memory. The values are retransformed back into the original domain on the GPU by mapping them from [0,255] to 'currentUintRange', which is obtained from the metadata file of this unsteady simulation.
  
  // The MeshRenderer2D looks at the domain to determine what the full value domain of this small multiple will be. It looks at the c to determine the uint compression domain.
  domain = {
	x: [-0.76, 1.01],
	y: [-0.1, 1],
	v: [870.4389253677576, 977.0020293037556]
  }
  
  get currentUintRange(){
	// This used to be in domain under 'c', but was moved here as it will change as the frames change.
	return [871, 977]
  } // currentUintRange
  
  
} // Mesh2D


function loadBinData(filename){
  return fetch(filename).then(res=>res.arrayBuffer());
} // getBinData