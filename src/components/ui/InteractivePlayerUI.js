import {html2element} from "./playbar/helpers.js";
import PlayControls from "./playbar/PlayControls.js";
import CommentingManager from "./commenting/src/CommentingManager.js";
import ChapterForm from "./playbar/ChapterForm.js";


// DONE: Which annotations should be seen on the playbar? Just the current users, or those of otehr users as well? Capturing all annotations would allow feature tracking for example. But it may clutter the play bar. 
	
// On the other hand, when discussing the tags it's good to avoid misunderstaning.

// Furthermore, it would be good to just accept someone elses tags. What about clicking on the users name? Then select adopting their annotations? How do you revert back? A clear all button? Allow reloading of annotations for editing??
	
// Anyway, the commenting should show all possible annotations.
	
// What about showing the most popular annotations by default?? Ideally, the annotations would show up when the comment addressing them would be hovered over.

let template = `
<div>
  <div class="playcontrols-wrapper"></div>
  <div class="chapterform-wrapper"></div>
  <div class="commenting-wrapper"></div>
</div>
`; // template


export default class interactivePlayerUI{
  constructor(id){
	let obj = this;
	obj.viewid = id;
	obj.node = html2element(template);
	obj.playControlsWrapperNode = obj.node.querySelector("div.playcontrols-wrapper");
	obj.chapterFormWrapperNode  = obj.node.querySelector("div.chapterform-wrapper");
	obj.commentingWrapperNode   = obj.node.querySelector("div.commenting-wrapper");
	
	// Add in a playbar
	obj.playcontrols = new PlayControls();
	obj.playControlsWrapperNode.appendChild( obj.playcontrols.node );
	
	
	// The tag adding.
	obj.chapterform = new ChapterForm();
	obj.chapterFormWrapperNode.appendChild( obj.chapterform.node )
	
	// Add in the commenting system. The metadata filename is used as the id of this 'video', and thus this player. The node needs to be added also.
	obj.commenting = new CommentingManager( id );
	obj.commentingWrapperNode.appendChild( obj.commenting.node );
	
	
	//  Tags need to be pushed to the playbar, but also to the commenting! Should individual tags be allowed to influence the navigation? I guess so?
	obj.chapterform.submit = function(tag){
		obj.playcontrols.bar.addchapter(tag);
		
		let discussiontags = obj.playcontrols.bar.annotations.map(a=>a.label);
		obj.commenting.discussion.update(discussiontags);
	} // submit
	
	
	// Add onhover events to the tagged keywords in the text? That allows the user to show exactly which part of the data they meant, and also to compare it to others interpretations.
	
	// What happens when the user replies in a thread for which he does not have an annotation for? For replies, it's the parent annotations that get pasted in. But what if you're making a general comment without having the playbar annotations? Which one should get selected? Or should just the text tags be retained? But in that case I can't show the different versions. Maybe keep the tag names, but also keep the annotations separate - that way they can only be added for mouseover if they're in hte text? And in the text they need to be marked using a #? But then no disagreements with the thread parent comment are possible... How to deal with this? Only allow the user to use their own annotations?
	
	// Anyyyyyway, first include the tree navigation
	
	
	
  } // constructor
  
  

  
  
  
  /*
  Getters and setters to simplify the API:
	t_domain
	t
	playing
	skipped
	user
  */ 

  get playing(){
	return this.playcontrols.playing;
  } // get playing
  
  get skipped(){
	return this.playcontrols.skipped;
  } // get skipped
  
  set skipped(v){
	this.playcontrols.skipped = false;
  } // set skipped
  
  get t_play(){
	return this.playcontrols.bar.t_play;
  } // get t_play
  
  set t_play(t){
	this.chapterform.t = t;
	this.playcontrols.bar.t_play = t;
	this.playcontrols.bar.update();
  } // set t_play
  
  get t_domain(){
	return this.playcontrols.t_domain;
  } // get t_domain
  
  set t_domain(t){
	this.playcontrols.t_domain = t;
  } // set t_domain
  
  get user(){
	// The annotation form is the primary annotation.
	return this.chapterform.user
  } // get user
  
  set user(name){
	this.commenting.user = name;
	this.chapterform.user = name;
  } // set user
  
  set metadata(m){
	this._metadata = m;
	this.chapterform.taskId = m.taskId;
  } // set metadata
  
  get metadata(){
	return this._metadata;
  } // set metadata
  
} // interactivePlayerUI




















