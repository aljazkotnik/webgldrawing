import { html2element } from "./helpers.js";

/* 
UnsteadyPlayer2D is the actual small multiple
ViewFrame2D controls the viewport and user interactions
Camera2D keeps track of the user itneractions
PlayBar handles the playbar interactivity
MeshRenderer2D actually does the GPU drawing
*/


import ViewFrame2D from "./ViewFrame2D.js";
import Mesh2D from "../components/Mesh2D.js";

import PlayBar from "./PlayBar.js";


// How to actually perform the playing? First, just allow a small multiple to play itself. When the button is pressed the player becomes 'active'. The UnsteadyPlayer must be given the fps at which the data should change. Then when the internal document timestamp passes another full timestep from the beginning of the document it changes the data. The data must be ready beforehand though.


// It's advantageous to inherit from ViewFrame2D because the geometry changes on the go - first some dummy geometry is specified, and after the actual geometry is loaded in that just gets automatically used on next FrameAnimationRate step. If the ViewFrame is a module then the UnsteadyPlayer has to monitor when the geometry changes, and update the ViewFrame accordingly.
// Because it's advantageous to inherit from ViewFrame2D it is also advantageous to create the outside html player wrapper in it. Then the unsteady player only needs to add other modules into it.
export default class UnsteadyPlayer2D extends ViewFrame2D {
  constructor(gl){
    super(gl)
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
	
	// Will the rendering loop have to be redone in order to allow promises to be returned to ensure that the player is ready for the next step?
	if(now > obj.timelastdraw + obj.dt){
	  if( obj.playbar.playStatus ){
		obj.timelastdraw = now;
		obj.incrementTimeStep();
	  } else if ( obj.playbar.userNavigated ){
		obj.timelastdraw = now;
		obj.incrementTimeStep(0)
		obj.playbar.userNavigated = false;
	  } // if
	} // if
    
    
	// Update the playbar
	obj.playbar.t_min = obj.geometry.domain.t[0];
	obj.playbar.t_max = obj.geometry.domain.t[1];
	obj.playbar.update()
  } // update
  
  
  incrementTimeStep(dt){
	/*
	The small multiple should be able to play on its own. In that case it should just update the data 24 times per second.
	
	It should of course support playing several small multiples at once. If the 'dt' for all the simulations are the same then playing several at once just requires an input that will toggle several small multiples on at the same time. If the 'dt' are not the same, then it becomes more difficult because the data can't be loaded by incrementing, and instead a desired time must be passed to the player. Furthermore, the player should support several small multiples to be played at once, but starting from different times. In those cases the player must keep track of the time increment total to ensure all small multiples move by the same amount.
	
	For now the playbar can just play forward correctly, and the t_play can be used to keep track of the actual playing time. The dt is just added on to that time them.
	*/
	let obj = this;
	
	
	if(dt >= 0){
	  let t_new = obj.playbar.t_play + dt
	  obj.geometry.timestepCurrentFrame(t_new);
	  obj.playbar.t_play = t_new;
	} else {
	  obj.geometry.incrementCurrentFrame();
	  obj.playbar.t_play = obj.geometry.currentTime;
	} // if
	
	obj.geometry.updateCurrentFrameBuffer();
  } // incrementTimeStep
  
} // UnsteadyPlayer2D