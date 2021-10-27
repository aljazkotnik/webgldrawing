// Some comments came back from the server side, add them to the views.
function sortCommentsBeforePushing(a,b){
	// The primary comments must be added first so that the replies can be added to them. The comments can just be sorted by time of creation. Replies can only be created after the primary comment.
	return Date.parse(a.time)-Date.parse(b.time)
} // sortCommentsBeforePushing






/* 
The knowledge manager handles the loading and uploading of tags (categorical and ordinal), comments, and playbar chapters.

Knowledge is used for:
  Categorical: navigation tree, correlations
  Ordinal    : correlations
  Comments   : commenting
  Chapters   : navigation tree, playbar, correlation, commenting

CHAPTERS:
Should chapters persist if the slice is changed? Essentially, are the chapters for the time domain, or time-slice domain? I would argue that several events together explain the underlying mechanisms, and therefore it's useful to see them all at once. Therefore they should persist, and are thus bound by 'taskId'. Each task is only supposed to be one gemoetry at one operational point anyway.

COMMENTS:
Comments are really supposed to support discussing whatever is currently drawn. Therefore they should be bound to the 'viewId'. This means that comments of one slice will not appear in comments of another. Should it be like this, or should it just appear everywhere? If it appears everywhere for a slice, then it suggests everything has been looked at already. Alternately, it would sometimes be useful to have the comments there.

CATEGORICAL:
Broad characterisation of the data. 'taskId' based.

ORDINAL:
Broad characterisation of the data. 'taskId' based.
*/

import GroupingCoordinator from "./arrangement/GroupingCoordinator.js";

export default class KnowledgeManager{
  constructor(items, container, svg){
	// All knowedge must be pushed to individual IPUI (Interactive Player User Interfaces) when received.
	let obj = this;
	obj.items = items;
	
	// Tags and chapters should be available for correlations. Tags and chapters are time invariant, but the metadata IS time variant. So even the metadata needs to be queried!
	
	
	// Add the dragging externally. The tabletop was positioned absolutely, with top: 0px. If this is not so the dragging will move the items on the initial drag start by the offset amount.
	// The grouping coordinator does: adds dragging, positioning of the items by metadata values, retrieveng position and metadata pairs, grouping, and grouping navigation.
	// Groups need to be added to the same container as the actual items, otherwise either the items cant be dragged over the groups, or vice versa.
	obj.grouping = new GroupingCoordinator(items, container, svg);
	
	
	
	
	/*
	New comments must be passed to the stores. Also, when up/downvotes change it should be sent to the server. The local version should also be updated straight away.
	
	upvote/downvote are in 'Comment.js';
	reply button onclick is in 'addGeneralComment' of 'CommentingManager.js';
	submit button onclick is in 'constructor' of 'CommentingManager.js';
	
	How to post the comments to the server? Should each individual be able to post itself to the server? Because it will have to post changes on itself, for example up/downvotes. Anyway, can be left for later for now.
	*/
	
	
	
	
	// Make some proxy stores that simulate the communication with the server. Connect them to the points where the annotations are submitted, so that they circulate through the stores.
	obj.comments = new ProxyServerStore('./data/annotations/testcomments.json');
	obj.comments.update = function(){
		obj.updateAllComments();
	}; // update
	
	obj.chapters = new ProxyServerStore('./data/annotations/testchapters.json');
	obj.chapters.update = function(){
		obj.updatePlaybarChapters();
	}; // update
	
	obj.tags = new ProxyServerStore('./data/annotations/testtags.json');
	obj.tags.update = function(){
		obj.updateTagAnnotations();
	}; // update
	
	
	// REMOVING TAGS NEEDS TO BE DONE BY ACTUAL ANNOTATION ID!!!
	// What should the grouping do when the annotations are made/dissolved through it?
	obj.grouping.dissolveexternal = function(a){
		// Only the tags get dissolved:
		a.forEach(a_=>{
			obj.tags.remove(a_);
		}) // forEach
	} // dissolveexternal
	
	obj.grouping.createexternal = function(a){
		a.forEach(a_=>{
			obj.tags.add(a_);
		}) // forEach
	} // createexternal
	
	
	// Make the forms submit the annotations to the appropriate stores, which will then in turn update the display modules.
	obj.items.forEach(item=>{
		
	  // Chapter annotations should update the playbar, the discussion tags, and the navigation tree.
	  item.ui.chapterform.submit = function(chapter){
		obj.chapters.add(chapter);
	  } // submit
		
	}) // forEach
	
  } // constructor
  
  updateAllComments(){
	// Now add in some test comments
    let obj = this;
	
	obj.comments.data.sort(sortCommentsBeforePushing).forEach(comment=>{
	  obj.items.forEach(item=>{
	    if(item.ui.viewid == comment.viewid){
	      item.ui.commenting.add(comment);
	    } // if  
	  }) // forEach
	}) // forEach
  } // updateAllComments
  
  updatePlaybarChapters(){
	let obj = this;
	
	obj.chapters.data.forEach(ch=>{
	  obj.items.forEach(item=>{
		if(item.ui.metadata.taskId == ch.taskId){
		  item.ui.playcontrols.bar.addchapter(ch);
		  
		  let discussiontags = item.ui.playcontrols.bar.annotations.map(a=>a.label);
		  item.ui.commenting.discussion.update(discussiontags);
		} // if  
	  }) // forEach
	}) // forEach
	
	obj.updateNavigationTree();
	
  } // updatePlaybarChapters
  
  updateTagAnnotations(){
	let obj = this;
	// Just the navigation tree needs to be updated. However, the chapters are treated as tags also - if the group is dissolved, does it mean the chapters will get dissolved also? Orshould chapters be exempt from dissolving? Where should that be handled? Just not calling the chapter database for removal, and banking that no tag has the same id?
	obj.updateNavigationTree();  
  } // updateTagAnnotations
  
  updateNavigationTree(){
	let obj = this;
	// Previously the tasks were pushed to the hierarchy, with the tags attached. Now the tags are standalone, and the task ids should be given to the hierarchy separately. Maybe just make them as new tags and merge them together here?
	let tasktags = obj.items.map(item=>{return {
		taskId: item.ui.metadata.taskId, 
		label: "Root", 
		author: "session"
	}});
	
	obj.grouping.navigation.hierarchy.data = tasktags.concat(obj.tags.data).concat(obj.chapters.data);
	obj.grouping.navigation.update();
	
  } // updateNavigationTree
  
  
} // KnowledgeManager




// Should know whether to use taskId/id? What should use taskId to find the relevant
class ProxyServerStore{
	constructor(filename){
		let obj = this;
		obj.data = [];
		
		fetch(filename)
		  .then(response => response.json())
		  .then(data=>{
			obj.data=data;
			obj.update();
			return data;
		  });
	} // constructor
	
	add(item){
		// Check if the item is already present. Replace it, or just update the delta? Bank on the idea that no two queries will be simultaneous?
		let obj = this;
		let i = obj.data.findIndex(d=>d.id==item.id);
		obj.data.splice(i>-1 ? i : 0, i>-1, item);
		obj.update();
	} // add
	
	
	remove(item){
		let obj = this;
		let i = obj.data.findIndex(d=>d.id==item.id);
		obj.data.splice(i, i>-1)
		obj.update();
	} // remove
	
	update(){
		// Implement the push of all the comments etc to the actual modules for display.
		console.log("server pushes changes");
	} // update
	
	// Maybe no query is required anyway? Each project would have its own annotations, which are always loaded anyway? Unless you go into a list of users and remove them?
} // ProxyServerStore