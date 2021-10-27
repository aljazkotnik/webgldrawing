import { svg2element, scaleLinear, joinDataToElements } from "./helpers.js";
import PlayBarAnnotation from "./PlayBarAnnotation.js";

// This class is in charge of drawing the play bar. It takes in user prescribed annotations and the min and maximum times. It fills the gaps between the user prescribed annotations and the min/max times with empty chapters. The process is repeated anytime a new annotation is added.

let template = `<g style="cursor: pointer;"></g>`; // template

export default class PlayBar{
	
  // Coordinates in whole svg frame.
  y = 12 + 2 + 3;
  x0 = 20 + 6;
  x1 = 300;
	
  annotations = []
	
  t_min = 0
  t_max = 1
	
  t_buffer = 0
  t_play = 0
	
  constructor(){
	let obj = this;
	obj.node = svg2element( template );
	
	obj._tscale = new scaleLinear();
  } // constructor
  
    
  get tscale(){
	// The tscale is relative to the whole svg element, and takes in whole svg coordinates.
	let obj = this;
		
	obj._tscale.domain = [obj.t_min, obj.t_max]
	obj._tscale.range = [obj.x0, obj.x1]
	
	return obj._tscale;
	  
  } // get tscale
  
  
  rebuild(){
	// I need to do the join, but on objects instead of elements... Or just throw them all out and create new ones? Simpler I guess
	let obj = this;
	
	let exiting = obj.node.querySelectorAll("g.chapter");
	for(let i=0; i<exiting.length; i++){
		exiting[i].remove()
	} // for
	
	// The creation of the chapters to show after somme annotations have been pushed still needs to be implemented.
	function makeChapterObj(label, starttime, endtime){
		return {label: label, starttime: starttime, endtime: endtime==undefined ? obj.t_max : endtime}
	} // makeChapterObj
	
	
	// The ultimate way of doing it would be for the annotations to persist below other smaller annotations.
	let chapters = obj.annotations.reduce((acc, a, i)=>{
		
		let previous = acc[acc.length - 1];
		let current = makeChapterObj( a.label, a.starttime, a.endtime );
		
		if(previous.endtime < current.starttime){
			// Don't curtail hte previous one but instead allow it to draw completely. This allows the chapters to be 'stacked'. Ordering them by start time ensures they all have a handle available.
			
			// Push in the needed padding, and then the annotation.
			acc.push( makeChapterObj( "", previous.endtime, current.starttime ) );
		} // if
		
		acc.push( current )
		
		if(i==(obj.annotations.length-1) && current.endtime < obj.t_max){
		    acc.push( makeChapterObj( "", current.endtime, obj.t_max ) )
		} // if
		
		return acc
	}, [ makeChapterObj("", obj.t_min, obj.t_max) ])
	
	// Cpters need to be sorted by starttime in order for all start points to be visible.
	obj.chapters = chapters.sort((a,b)=>a.starttime-b.starttime).map(c=>{
		let a = new PlayBarAnnotation(c, obj.tscale);
		a.y = obj.y;
		return a;
	}) // map
	
	obj.chapters.forEach(chapter=>{
		obj.node.appendChild(chapter.node)
	}) // forEach
	
  } // rebuild
  
  update(){
	let obj = this;
	obj.chapters.forEach(chapter=>{
		chapter.update( obj.t_play, obj.t_buffer );
	})
  } // update
  
  addchapter(tag){
	// The player may need to be updated when the serverr pushes updates. Also if other users update the annotations it should appear straightaway.
	let obj = this;
	
	// tags are required to have a 'starttime'.
	if(tag.starttime){
		let i = obj.annotations.findIndex(a=>a.id==tag.id);
		obj.annotations.splice(i>-1 ? i : 0, i>-1, tag);
	
		// Update the bar.
		obj.rebuild();
		obj.update();
	} // if
  } // addchapter
} // PlayBar