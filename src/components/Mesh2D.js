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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	obj.indicesBuffer = indicesBuffer;
	obj.indicesLength = indices.length;
  } // constructor
  
  
  domain = {
	x: [0, 3],
	y: [0, 3],
	v: [0, 6],		
	c: [0, 6]
 }
} // Mesh2D


function loadBinData(filename){
  return fetch(filename).then(res=>res.arrayBuffer());
} // getBinData