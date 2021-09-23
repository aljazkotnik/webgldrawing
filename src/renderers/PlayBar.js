/*
PLAYBAR only controls the appearance of the playbar, but does not control the playing. It just allows the user interaction with the playbar.

Try to eliminate d3 from this to keep the size down.
*/



// d3 is required for drawing.
// import * as d3 from "d3";

// Helepr to make an html element.
import {html2element, svg2element, scaleLinear, joinDataToElements} from "./helpers.js";



// The canvas will be positioned, and this should be relative to that positioning. Maybe there should be an overall div that contains the canvas and a sibling div that contains all the markup.
let template = `
<div class="player-controls">
  <svg id="playbar" width="100%" height="32px">
    <g class="playbutton" style="cursor: pointer;">
	  <path fill="tomato" d=""></path>
    </g>
    <g class="playbar" style="cursor: pointer;"></g>
  </svg>
</div>
`; // template



// Some dimensions.
let playButtonWidth = 20;
let playButtonMargin = 6;
let leftRightMargin = 10;


let textHeight = 12;
let textBottomMargin = 2;
let textSpace = textHeight + textBottomMargin;
let rectHighlightHeightDelta = 3;



// use getAttribute/setAttribute
function playPath(){
	// 'width' and 'height' prescribe the size allocated for the play button. The button should take up 80% of the space available.
	
	// Calculate the size of the triangle, and where the drawing should begin.
	// let L = 0.9 * Math.min( height / 1, width / (Math.sqrt(3)/2) )
	
	let r_max = L*Math.sqrt(3)/6;
    let r = 3 > r_max ? r_max : 3;
    let dL = r*Math.sqrt(3); // Length of side cut by 1 rounding.
	
	let L = playButtonWidth*2*Math.sqrt(3)/3;
	
	// let Mx = (width - L)/2;
    // let My = (height - L)/2;
    let Mx = 0
	let My = textSpace + rectHighlightHeightDelta + 5 - L/2
    
    let p0 = [Mx, My]
    let p1 = [Mx + L*Math.sqrt(3)/2, My + L/2]
    let p2 = [Mx, My + L]
    
	
    
    return `M${p0[0]} ${p0[1]+dL}
      a ${r},${r}, 0,0,1  ${r*3/2}, ${-dL/2}
      L ${p1[0]-r*3/2} ${p1[1]-dL/2}
      a ${r},${r}, 0,0,1  0, ${dL}
      L ${p2[0]+r*3/2} ${p2[1]-dL/2}
      a ${r},${r}, 0,0,1  ${-r*3/2}, ${-dL/2}
      Z
      `
	
} // playPath

function pausePath(){
	let width = playButtonWidth;
    let height = playButtonWidth*2*Math.sqrt(3)/3 - 2*(3*Math.sqrt(3)-3);
    let dx = width/5;
    let r = 3;
    
	let Mx = 0
	let My = textSpace + rectHighlightHeightDelta + 5 - height/2
	
    return `
      M ${Mx+r} ${My} 
      L ${Mx+2*dx-r} ${My}
      a ${r},${r} 0,0,1 ${r},${r}
      L ${Mx+2*dx} ${My+height-r}
      a ${r},${r} 0,0,1 ${-r},${r}
      L ${Mx+r} ${My+height}
      a ${r},${r} 0,0,1 ${-r},${-r}
      L ${Mx} ${My+r}
      a ${r},${r} 0,0,1 ${r},${-r}
	  M ${Mx+3*dx + r} ${My}
      L ${Mx+5*dx-r} ${My}
      a ${r},${r} 0,0,1 ${r},${r}
      L ${Mx+5*dx} ${My+height-r}
      a ${r},${r} 0,0,1 ${-r},${r}
      L ${Mx+3*dx+r} ${My+height}
      a ${r},${r} 0,0,1 ${-r},${-r}
      L ${Mx+3*dx} ${My+r}
      a ${r},${r} 0,0,1 ${r},${-r}
    `
} // pausePath

function chapterRect(className, color){
	let y = textSpace + rectHighlightHeightDelta;
	return `<rect class="${ className }" x="0" y="${y}" width="0" height="10" fill="${ color }" stroke="white" stroke-width="2px"></rect>`
  } // chapterRectTemplate


export default class PlayBar{
	
  constructor(){
	let obj = this;
	
	obj.node = html2element(template);
	
	obj.button = obj.node.querySelector("g.playbutton")
	obj.bar = obj.node.querySelector("g.playbar")
	
	
	obj._tscale = new scaleLinear();
	
	
	obj.button.addEventListener("click",event=>{
		// Get the action required based on the button icon.
		if( obj.t_play == obj.t_max ){
			obj.t_play = obj.t_min;
		} // if
		
		obj.playStatus = !obj.playStatus;
	}) // addEventListener
	
	obj.bar.addEventListener("click", event=>{
		// On click the playbar should register the correct time.
		
		// The tscale takes inputs in the svg coordinates, and the event returns them in the client coordinates. Therefore the client coordinates must be adjusted for the position of the SVG.
		let x1 = event.clientX;
		let x0 = obj.node.getBoundingClientRect().x
		let t = obj.tscale.range2dom(x1-x0)
		
		// Now just set the t to the right value, and update the view.
		obj.t_play = t;
		
		// The playtime changed, therefore pause the video.
		obj.playStatus = false;
		obj.userNavigated = true;
	}) // addEventListener
	
	
	
	obj.t_min = 0;
	obj.t_max = 1;
	
	obj.t_buffer = 0;
	obj.t_play = 0;
	
	obj.playStatus = false;
	obj.userNavigated = false;
	
	// Annotations. Comments should be based on the chapter tags I think. The discussion is intended to be based on observed events. The logical progress is that events need to first be identified, and then discussed in a separate step. There should be a single dialogue box, and in that one tags can be added. This allows a single comment to be seen in multiple threads. Replies will have to be handled separately. Eventually the user should also be able to pin comments.
	obj.chapters = [];
	
	
  } // constructor
  
  
  
  get tscale(){
	// The tscale is relative to the whole svg element, and takes in whole svg coordinates.
	let obj = this;
	
	let playBarStart =  playButtonWidth + playButtonMargin
	let playBarEnd = obj.node.getBoundingClientRect().width
	
	obj._tscale.domain = [obj.t_min, obj.t_max]
	obj._tscale.range = [playBarStart,playBarEnd]
	
	return obj._tscale;
	  
  } // get tscale
  
  
  
  
  // How should the chapter getting be done? Annotations can be pushed to individual small multiples, but also to many at the same time.
  set chapters(annotations){
	let obj = this;
	
	// Sort them in peparation for chapter creation.
	annotations.sort((a,b)=>{return a.time - b.time});
	
	// The start and end values should be remaped or? The scale takes into account the different start and end points.
	let chapters = annotations.reduce((acc,current)=>{
		let previous = acc[acc.length-1]
		
		previous.endtime = previous.endtime > current.starttime ? current.starttime : previous.endtime
		
		// The first one needs to start at zero, and the last one needs to stop at the end.
		acc.push({
			label: current.label,
			starttime: current.starttime,
			endtime: current.endtime > obj.t_max ? obj.t_max : current.endtime
		})
		
	return acc
	},[{label: "", starttime: obj.t_min, endtime: obj.t_max}])
	  
	obj._chapters = chapters;
  } // set chapters
  
  get chapters(){
	  let obj = this;
	return [{label: "", starttime: obj.t_min, endtime: obj.t_max}]
	//  return this._chapters
  } // get chapters
	


  // CONSTRUCTION	 
  
	
  
  chapterRectangleWidth(chapter){
	let x0 = this.tscale.dom2range(chapter.starttime)
	let x1 = this.tscale.dom2range(chapter.endtime)
	return x1 - x0
  } // chapterRectangleWidth
  
  chapterTimeFraction(ch, t){
	let tf = ( t - ch.starttime ) / (ch.endtime - ch.starttime);
	return Math.abs(tf - 0.5) <= 0.5 ? tf : tf>0
	 
  } // chapterTimeFraction
  
  
  // FUNCTIONALITY
  update(){
	let obj = this;
	
	obj.updateChapterGroups();
	obj.updatePlayPauseButton();
	obj.updatePlayBar();
  } // update
  
  updateChapterGroups(){
    let obj = this;
	
	let parent = obj.bar;
	let groups = joinDataToElements(obj.chapters, parent.querySelectorAll("g.chapter"), d=>d.label)
	
	
	
	groups.enter.forEach(d=>{
		
		let chapternode = svg2element( `<g class="chapter">
		${ chapterRect("chapter-background", "gainsboro") }
		${ chapterRect("chapter-buffering", "gray") }
		${ chapterRect("chapter-foreground", "tomato") }
		<text y="${textHeight}" style="display: none;">${ d.label }</text>
        </g>` )
		
		chapternode.__data__ = d;
		
		parent.appendChild(chapternode)
		
		// Add all the highlighting
		addChapterHighlighting(chapternode)
	}) // forEach enter
	
	// The updating is not required, because annotations cannot change their name on the go. The positions of rectangles are all updated later on anyway.
	
	groups.exit.forEach(el=>{
		el.remove();
	}) // forEach exit
		
		

    // Chapter highlighting.
	// iterateOverHtmlList(newChapters.nodes(), addChapterHighlighting);
	
	
  } // updateChapterGroups
  
  updatePlayBar(){
	let obj = this;
	
	obj.bar.querySelectorAll("g.chapter").forEach(el=>{
	  let x = obj.tscale.dom2range(el.__data__.starttime)
	  let width = obj.chapterRectangleWidth( el.__data__ )
	  let frac_buffer = obj.chapterTimeFraction( el.__data__, obj.t_buffer)
	  let frac_played = obj.chapterTimeFraction( el.__data__, obj.t_play)

	  el.querySelector("rect.chapter-background").setAttribute("x", x)
	  el.querySelector("rect.chapter-buffering").setAttribute("x", x)
	  el.querySelector("rect.chapter-foreground").setAttribute("x", x)
	  el.querySelector("text").setAttribute("x", x)

	  el.querySelector("rect.chapter-background").setAttribute("width", width)
	  el.querySelector("rect.chapter-buffering").setAttribute("width", width*frac_buffer)
	  el.querySelector("rect.chapter-foreground").setAttribute("width", width*frac_played)
	  
	  
	}) // forEach chapter
	
  } // updatePlayBar
  
  updatePlayPauseButton(){
	let obj = this;
	
	// Get teh dimensions available
	let d = obj.playStatus ? pausePath() : playPath()
	obj.button.querySelector("path").setAttribute("d", d)	
  } // updatePlayPauseButton

  

} // player




function iterateOverHtmlList(htmlList, callback){
	for(let j=0; j<htmlList.length; j++){
		let tg = htmlList[j];
		callback(tg)
	} // for
} // iterateOverHtmlList

function highlightRectangle(r){
	r.height.baseVal.value = 10 + 2*rectHighlightHeightDelta 
	r.y.baseVal.value = textSpace
} // highlightRectangle

function unhighlightRectangle(r){
	r.height.baseVal.value = 10
	r.y.baseVal.value = textSpace + rectHighlightHeightDelta
} // unhighlightRectangle	


function highlightChapter(chapter){
	let rectangles = chapter.getElementsByTagName("rect");
	iterateOverHtmlList(rectangles, highlightRectangle);
					
	let chapterNames = chapter.getElementsByTagName("text");
	iterateOverHtmlList(chapterNames, t=>t.style.display="");
} // highlightChapter

function unhighlightChapter(chapter){
	let rectangles = chapter.getElementsByTagName("rect");
	iterateOverHtmlList(rectangles, unhighlightRectangle);
					
	let chapterNames = chapter.getElementsByTagName("text");
	iterateOverHtmlList(chapterNames, t=>t.style.display="none");
} // unhighlightChapter

function addChapterHighlighting(chapter){
	chapter.addEventListener("mouseenter", ()=>{
		highlightChapter(chapter)
	}) // addEventListener
	
	chapter.addEventListener("mouseover", ()=>{
		highlightChapter(chapter)
	}) // addEventListener
	
	chapter.addEventListener("mouseout", ()=>{
		unhighlightChapter(chapter)			
	}) // addEventListener
} // addChapterHighlighting