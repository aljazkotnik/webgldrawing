/*
PLAYBAR only controls the appearance of the playbar, but does not control the playing. It just allows the user interaction with the playbar.
*/



// Helepr to make an html element.
import {html2element, svg2element, scaleLinear, joinDataToElements} from "./helpers.js";


import PlayButton from "./PlayButton.js";
import PlayBar from "./PlayBar.js";

// The canvas will be positioned, and this should be relative to that positioning. Maybe there should be an overall div that contains the canvas and a sibling div that contains all the markup.
let template = `
<div class="player-controls">
  <svg id="playbar" width="100%" height="32px">
    <g class="playbutton"></g>
    <g class="playbar"></g>
  </svg>
</div>
`; // template





export default class PlayControls{
	
  textHeight = 12 
  textBottomMargin = 2 
  highlightHeightDelta = 3
	
  constructor(){
	let obj = this;
	
	obj.node = html2element(template);
	
	let y = obj.textHeight + obj.textBottomMargin + obj.highlightHeightDelta;
	
	// Make a play button.
	obj.button = new PlayButton();
	obj.button.y = y;
	obj.node.querySelector("g.playbutton").appendChild(obj.button.node);
	
	obj.button.node.addEventListener("click",event=>{
		// Get the action required based on the button icon.
		if( obj.t_play == obj.t_max ){
			obj.t_play = obj.t_min;
		} // if
		
		obj.playing = !obj.playing;
	}) // addEventListener
	
	
	
	
	
	
	
	// The bar is just a node at this point
	obj.bar = new PlayBar();
	obj.bar.y = y;
	obj.node.querySelector("g.playbar").appendChild( obj.bar.node );
	
	obj.bar.node.addEventListener("click", event=>{
		// On click the playbar should register the correct time.
		
		// The tscale takes inputs in the svg coordinates, and the event returns them in the client coordinates. Therefore the client coordinates must be adjusted for the position of the SVG.
		let x1 = event.clientX;
		let x0 = obj.node.getBoundingClientRect().x
		let t = obj.bar.tscale.range2dom(x1-x0)
		
		// Now just set the t to the right value, and update the view.
		obj.bar.t_play = t;
		obj.bar.update();
		
		// The playtime changed, therefore pause the video.
		obj.playing = false;
		obj.skipped = true;
	}) // addEventListener
	
	
	obj.bar.rebuild();
	obj.bar.update();
	
	
	
	obj.playing = false;
	obj.skipped = false;
	
	// Annotations. Comments should be based on the chapter tags I think. The discussion is intended to be based on observed events. The logical progress is that events need to first be identified, and then discussed in a separate step. There should be a single dialogue box, and in that one tags can be added. This allows a single comment to be seen in multiple threads. Replies will have to be handled separately. Eventually the user should also be able to pin comments.
	
  } // constructor
  
  
  set t_domain(t){
	// Since t is coming from a specific location, it should be the same reference always. Therefore == comparison is valid.
	let obj = this;
	if((t[0] != obj.bar.t_min) || (t[1] != obj.bar.t_max)){
	  obj.bar.t_min = t[0];
	  obj.bar.t_max = t[1];
	  obj.bar.rebuild();
	  obj.bar.update();
	} // if
  } // set t_domain
  
  get t_domain(){
	return [this.bar.t_min, this.bar.t_max]
  } // get t_domain
  
  
  set playing(v){
	let obj = this;
	obj._playing = v;
	obj.update(v);
  } // set playing
  
  get playing(){
	return this._playing;
  } // get playing
  
  
  // FUNCTIONALITY
  update(){
	let obj = this;
	obj.button.update( obj.playing );
	obj.bar.update();
  } // update
  
} // PlayControls