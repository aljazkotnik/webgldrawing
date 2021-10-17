import { svg2element } from "./helpers.js";


let defaultRectAttributes = `stroke="white" stroke-width="2px"`;
let template = `<g class="chapter">
  <rect class="background" fill="gainsboro" ${ defaultRectAttributes }"></rect>
  <rect class="buffering" fill="gray" ${ defaultRectAttributes }"></rect>
  <rect class="foreground" fill="tomato" ${ defaultRectAttributes }"></rect>
  <text style="display: none;"></text>
</g>`


export default class PlayBarAnnotation{
	
  // y = textHeight + textBottomMargin + highlightHeightDelta
  y = 12 + 2 + 3;
  height = 10
  dh = 4
  
  constructor(config, tscale){
    let obj = this;
	obj.node = svg2element(template);
	
	obj.background = obj.node.querySelector("rect.background");
	obj.buffering = obj.node.querySelector("rect.buffering");
	obj.foreground = obj.node.querySelector("rect.foreground");
	obj.label = obj.node.querySelector("text");
	
	obj.config = config;
	obj.tscale = tscale;
	
	
	obj.node.addEventListener("mouseenter", ()=>{
		obj.highlight();
	}) // addEventListener
	
	obj.node.addEventListener("mouseover", ()=>{
		obj.highlight();
	}) // addEventListener
	
	obj.node.addEventListener("mouseout", ()=>{
		obj.unhighlight();			
	}) // addEventListener
  } // constructor
  
  update(t_play, t_buffer){
	let obj = this;
	
	let y = obj.y;
	let x = obj.tscale.dom2range(obj.config.starttime);

    obj.background.setAttribute("y", y)
	obj.background.setAttribute("x", x);
	obj.background.setAttribute("width", obj.width)
	obj.background.setAttribute("height", obj.height)
	 
	obj.buffering.setAttribute("y", y)
	obj.buffering.setAttribute("x", x);
	obj.buffering.setAttribute("width", obj.width*obj.timeFraction(t_buffer))
	obj.buffering.setAttribute("height", obj.height)
	  
	obj.foreground.setAttribute("y", y)
	obj.foreground.setAttribute("x", x);
	obj.foreground.setAttribute("width", obj.width*obj.timeFraction(t_play))
	obj.foreground.setAttribute("height", obj.height)
	  
	obj.label.setAttribute("y", 12)
	obj.label.setAttribute("x", x)
	obj.label.innerHTML = obj.config.label

  } // update
  
  
  get width(){
	let obj = this;
	let x0 = obj.tscale.dom2range(obj.config.starttime);
	let x1 = obj.tscale.dom2range(obj.config.endtime);
	// At the beginning hte widths may be negative because the starttime of the comment exceeds the time domain of the playbar that hasn't yet been updated to the right interval. Returen 0 while this is so.
	return x1 - x0 < 0 ? 0 : x1 - x0;
  } // width
  
  timeFraction(t){
	let obj = this;
	let tf = ( t - obj.config.starttime ) / (obj.config.endtime - obj.config.starttime);
	return Math.abs(tf - 0.5) <= 0.5 ? tf : tf>0;
  } // timeFraction
  
  highlight(){
	let obj = this;
	highlightRectangle( obj.background, obj.y, obj.height, obj.dh );
	highlightRectangle( obj.buffering, obj.y, obj.height, obj.dh );
	highlightRectangle( obj.foreground, obj.y, obj.height, obj.dh );
	obj.label.style.display = "";
  } // highlight
  
  unhighlight(){
	let obj = this;
	unhighlightRectangle( obj.background, obj.y, obj.height );
	unhighlightRectangle( obj.buffering, obj.y, obj.height );
	unhighlightRectangle( obj.foreground, obj.y, obj.height );
	obj.label.style.display = "none";
  } // highlight
} // PlayBarAnnotation


function highlightRectangle(r, y, h, dh){
	r.height.baseVal.value = h + 2*dh; 
	r.y.baseVal.value = y - dh;
} // highlightRectangle

function unhighlightRectangle(r, y, h){
	r.height.baseVal.value = h;
	r.y.baseVal.value = y;
} // unhighlightRectangle