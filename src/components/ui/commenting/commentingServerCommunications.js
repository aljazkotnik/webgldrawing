// Some comments came back from the server side, add them to the views.
function sortCommentsBeforePushing(a,b){
	// The primary comments must be added first so that the replies can be added to them. The comments can just be sorted by time of creation. Replies can only be created after the primary comment.
	return Date.parse(a.time)-Date.parse(b.time)
} // sortCommentsBeforePushing

export function getRequiredComments(allCommentingManagers){
	// Return hte comments needed. Make a call in a promise, and after it's resolved push the comments to the right owner.
	
	// Now add in some test comments
    fetch('./data/annotations/test.json')
     .then(response => response.json())
     .then(data =>{
		data.sort(sortCommentsBeforePushing).forEach(comment=>{
			allCommentingManagers.forEach(m=>{
				if(m.viewid == comment.viewid){
					m.add(comment);
				} // if  
			}) // forEach
		}) // forEach
	 }); // then	
} // getRequiredComments


export function sendCommentChanges(){
	// At some point this will have to recognise the changes, and sent them to the server as updates.
} // sendCommentChanges