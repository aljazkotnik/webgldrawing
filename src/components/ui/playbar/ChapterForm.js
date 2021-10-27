import {html2element} from "./helpers.js";

let css = {
  button: `
    border: none;
	cursor: pointer;
	border-radius: 4px;
  `,
  
  timebutton: `
    background-color: gainsboro;
  `,
  
  submitbutton: `
    background-color: black;
	color: white;
  `
}; // css


let template = `
<div style="300px">
  <input type="text" placeholder="#tag-name" style="width: 100px;"></input>
  
  <div style="display: inline-block; float: right;">
  <button class="starttime" style="${ css.button } ${css.timebutton}">start</button>
  <i>-</i>
  <button class="endtime" style="${ css.button } ${css.timebutton}">end</button>
  <button class="submit" style="${ css.button } ${css.submitbutton}">
    Submit
  </button>
  </div>
  
  
</div>
`; // template

export default class ChapterForm{
  
  user = "Default user: Aljaz"
  
  constructor(){
    let obj = this;
	obj.node = html2element(template);
	
	obj.input = obj.node.querySelector("input");
	
	// This value will be overwritten during interactions, and is where the tag manager collects the time for the timestamps.
	obj.t = 0;
	obj.clear();
	// The button should cycle through black, green, and red. It will need some way of tracking its current state, and a way to load in existing tags! This will allow users to subsequently change the tag if needed? Maybe this is a bit much for now. It will need a submit button.
	// If the tag is loaded and the button switches to timestamping then any user can add the ned timesteps. Then the users name needs to be checked in addition. Maybe some way of filtering out the tags that are added? How would that work?
	// For now add 3 buttons. A starttime endtime and submit button. For the submit button only the start and name need to be filled in. The buttons must also show the selected times!
	
	// If one of the times is set, it should check with the other time to make sure it's set correctly.
	
	
	obj.node.querySelector("button.starttime").onclick = function(){
		obj.starttime = obj.t;
		obj.update();
	} // onclick
	
	obj.node.querySelector("button.endtime").onclick = function(){
		obj.endtime = obj.t;
		obj.update();
	} // onclick
	
	obj.node.querySelector("button.submit").onclick = function(){
		let tag = obj.tag;
		if(tag){
			obj.submit(tag);
			obj.clear()
		} // if
	} // onclick
	
	obj.input.oninput = function(){
		obj.update();
	} // oninput
	
  } // constructor
  
  update(){
	let obj = this;
	
	// Ensure that the times are always consistent (end > start);
	if(obj.endtime && obj.starttime){
		let t0 = Math.min(obj.starttime, obj.endtime);
		let t1 = Math.max(obj.starttime, obj.endtime);
		obj.starttime = t0;
		obj.endtime = t1;
	} // if
	
	// Update the time tags also.
	let it0 = obj.node.querySelector("button.starttime");
	let it1 = obj.node.querySelector("button.endtime");
	
	it0.innerText = (obj.starttime != undefined) ? obj.starttime.toFixed(3) : "start";
	it1.innerText = (obj.endtime != undefined) ? obj.endtime.toFixed(3) : "end";
	
	
	// The button is black by default, and making it look disabled is a bit more involved.
	let button = obj.node.querySelector("button.submit");
	if(obj.tag){
		// Enable.
		button.style.opacity = 1;
		button.style.backgroundColor = "black";
		button.style.color = "white";
	} else {
		button.style.opacity = 0.6;
		button.style.backgroundColor = "gainsboro";
		button.style.color = "black";
	} // if
  } // update
  
  clear(){
	let obj = this;
	obj.starttime = undefined;
	obj.endtime = undefined;
	obj.input.value = "";
	obj.update();
  } // clear
  
  get tag(){
	// Chapter tag should belong to the task id so that the observations across multiple slices are available together to the user.
	let obj = this;
	// The time should be defined, but it can also be 0, or less than 0!
	return obj.user && obj.input.value && ( obj.starttime != undefined ) ? { 
		taskId: obj.taskId,
		label: obj.input.value,	
		author: obj.user,  
		starttime: obj.starttime, 
		endtime: obj.endtime,
		id: `${obj.user} ${Date()}`
	} : false; 
  } // tag

  // Placeholder for communication between classes.
  submit(tag){} // submit
} // ChapterForm