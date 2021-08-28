
  
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
]
  



export default class Cube{
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