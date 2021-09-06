export default class Camera{
  
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
	let obj = this;
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
		obj.phi = constrainValue( obj.phiStart - diffY, -Math.PI/2, Math.PI/2)
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
export class Camera2D extends Camera{
  // The 2D camera has panning instead of changing the camera angle.
  
  // The z coordinate is not important here because it gets defined in the shaders as 0 in any case.
  
  constructor(){
	super()
	let obj = this;
	
	obj.zoomPointClip = [0,0]
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

