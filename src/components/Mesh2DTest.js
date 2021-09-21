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
 
/* 
// The colors should be a texture!! For now the colors can just be set based on the values here. Then it should all be moved to the shader.  
let cmap = [
  [68, 1, 84, 255],
  [71, 19, 101, 255],
  [72, 36, 117, 255],
  [70, 52, 128, 255],
  [65, 68, 135, 255],
  [59, 82, 139, 255],
  [53, 95, 141, 255],
  [47, 108, 142, 255],
  [42, 120, 142, 255],
  [37, 132, 142, 255],
  [33, 145, 140, 255],
  [30, 156, 137, 255],
  [34, 168, 132, 255],
  [47, 180, 124, 255],
  [68, 191, 112, 255],
  [94, 201, 98, 255],
  [122, 209, 81, 255],
  [155, 217, 60, 255],
  [189, 223, 38, 255],
  [223, 227, 24, 255],
  [253, 231, 37, 255]
]; // cmap
	
let colors = values.reduce((acc,v)=>{
  // Use the value to create an index into the cmap array. Minimum value is 0, maximum value is 6. Index has to be within [0, 21].
  let ind = Math.round( (v - 0)/(6-0)*(cmap.length-1) )
  return acc.concat(cmap[ind].map(v=>v/255))
},[])
*/


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
  
    /*
    let colorsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    obj.colorsBuffer = colorsBuffer;
    */
	
	let valuesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
    obj.valuesBuffer = valuesBuffer;
	
    let indicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
	obj.indicesBuffer = indicesBuffer;
	obj.indicesLength = indices.length;
  } // constructor
  
  
  domain = {
	x: [0, 3],
	y: [0, 3],
	v: [0, 6],
	c: [0.1, 5.4]
  } // domain
} // Mesh2D