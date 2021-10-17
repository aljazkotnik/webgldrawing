import {arrayEqual, arrayIncludesAll} from "./helpers.js";
/*
If all the tasks are in the same array, and the author information is on the tags, then the partial trees won;t be a problem.

Every tag represents a group possibility essentially. But the same tag can relate to different groups. The group members differentiate the groups. The different tag descriptions of the groups should all be presented on mouseover, maybe along with the author data.

Won't be able to remove the initial dialogue in the small multiples visualisation, but I will be able to get rid of the expand button on the small multiples.
*/


// THIS ONE SHOULD CREATE THE NODES, LEVELS, and BUNDLES.

// FROM A DEFINED TREE TO AN ARRAY. TAG AND TASK ONLY USED BY TREE2ARRAY!
class tag{
	constructor(id, author, timestamp){
		let obj = this;
		obj.id = id;
		obj.author = author;
		obj.timestamp = timestamp;
	} // constructor
} // tag

class task{
	constructor(id){
		let obj = this;
		obj.id = id;
		obj.tags = []
	} // constructor
	
	addtag(id, author, timestamp){
		let obj = this;
		// Implement a check to see if this tag is already there.
		obj.tags.push( new tag(id,author,timestamp) )
	} // addtag
} // task

export function tree2array(trees){
	// Convert the tree data structure to an array of tasks in which the level nodes are expressed only as tags.
	
	// Create a dictionary that points from taskIds to the task objects.
	let dict = {};
	
	let A = [];
	
	trees.forEach(tree=>{
		tree.nodes.forEach(node=>{
			node.tasks.forEach(taskId=>{
				
				// Create a new object and add it to both teh dictionary and the array. The dictionary is just an internal utility, and the array is the output.
				if(!dict[taskId]){
					dict[taskId] = new task(taskId);
					A.push(dict[taskId])
				} // if
				let taskobj = dict[taskId];
				
				
				taskobj.addtag(node.id, tree.author, "")
				
			}) // forEach
		}) // forEach
	}) // forEach
	
	
	return A
	
} // tree2array

// DONT LOOK ABOVE!!






// FROM AN ARRAY OF TASKS WITH TAGS TO A TREE


export function array2tree(array){
	/*
	1.) Find groups.
	2.) Merge them.
	3.) Create parent-child relationships
	*/
	
	// Find all created groups, and merge the ones with identical members.
	let groups = findAllTagBasedGroups(array);
	let mergedgroups = mergeIdenticalGroups(groups);
	
	// Convert the groups into a higher level object to avoid circular references when figuring out ancestry.
	let hierarchicalnodes = findParentalRelationships(mergedgroups);
	
	return hierarchicalnodes
	
} // array2tree


// The tree node represents a single group, but also holds references to the parent and child nodes. The treenode is a higher level object to avoid circular referencing of objects.
class treegroup{
	constructor(taskgroup){
		let obj = this;
		
		obj.group = taskgroup;
		
		// Groups CAN have more than 1 parent. While it's true that during a single dive through the tasks each group can only have one parent, it's possible that additional dives (by the same, or other users) will produce the same groups, but tracing different steps. The merging already combines all identical groups, so the merged groups can have multiple parents.
		// Select the parents as all those candidate  groups that have not been referenced by other candidate groups already.
		obj.ancestors = []; // All upstream groups
		obj.parents = []; // Only groups directly above this one.
		
		obj.descendants = []; // All downstream groups
		obj.children = undefined; // Only groups directly below. Is this needed??
	} // constructor
} // treegroup

class taskgroup{
	constructor(tags){
		this.tags = tags;
		this.members = [];
	} // constructor
	
	addtask(task){
		let obj = this;
		if(!obj.members.includes(task)){
			obj.members.push(task);
		} // if
	} // addtask
	
	addtags(tags){
		let obj = this;
		tags.forEach(tag=>{
			if(!obj.tags.includes(tag)){
				obj.tags.push(tag);
			} // if
		}) // forEach
	} // addtags
} // group



// Making groups.
function findAllTagBasedGroups(array){
	
	// Create a group for each tag present in the array. We also need to differentiate teh groups by the author at this point. Otherwise parallel trees won't be possible.
	let dict = {};
	let groups = [];
	
	array.forEach(tag=>{
		// If you tag something in the session, then that tag is reserved for a particular group. If you tag other elements with it, it'll become a part of that group.
		let groupid = [tag.label, tag.author].join("-");
		if(!dict[groupid]){
			// Here just pass the tag in. The group will need to hold on to it.
			dict[groupid] = new taskgroup([tag]);
			groups.push(dict[groupid]);
		} // if
		
		// Add teh task to the specific group, but also to the root group.
		dict[groupid].addtask(tag.taskId)
	}) // forEach
	
	
	
	// A root group should be present. It will be merged with other existing groups if possible in hte next tep.
	let root = makeRootGroup(array);
	

	return groups.concat(root);
	
} // findAllTagBasedGroups



function makeRootGroup(array){
	
	// The root MUST always contain all of the data!! It will also allow navigation all the way to the start.
	let root = new taskgroup([{id: "Root", label: "Root", author: "session", timestamp: new Date()}]);
	
	// Root should contain all tasks.
	array.forEach(tag=>{
		root.addtask(tag.taskId);
	}) // forEach
	
	return root
	
} // makeRootGroup

function mergeIdenticalGroups(groups){
	
	let mergedgroups = groups.reduce((acc,g)=>{
		// Find group with identical members.
		let identicalg = acc.filter(g_=>{
			return arrayEqual(g_.members, g.members)
		}) // filter
		
		if(identicalg.length > 0){
			// Add another author to existing group.
			identicalg[0].addtags(g.tags);
		} else {
			// Add this group to the unique ones.
			acc = acc.concat(g);
		} // if
		
		return acc
	},[]) // reduce
	
	return mergedgroups
	
} // mergeIdenticalGroups

function isSubset(a,b){
	// Check whether array a is a subset of array b.
	
	// A must be strictly smaller than b.
	if(a.length < b.length){
		// Check if b contains all of a.
		return arrayIncludesAll(b, a);
	} else {
		return false;
	} // if
	
} // isSubset

function findParentalRelationships(groups){
	
	
	// First create an object one level above to avoid cross referenceing of objects.
	let nodes = groups.map(g=>{return new treegroup(g)});
	
	// maybe calculate all ancestors, all descendants, and then parents and children? Could be useful to have all hte information available.
	
	
	// FIND PARENT CANDIDATES FOR ALL GROUPS.
	nodes.forEach(node=>{
		// Ancestor groups are all groups that include all of the members of the node group, but are larger than it.
		node.ancestors = groups.filter(g=>{
			return isSubset(node.group.members, g.members)
		}) // filter
		
		
		// Descendant groups are all groups that contain a subset of the members of this group.
		node.descendants = groups.filter(g=>{
			return isSubset(g.members, node.group.members)
		});
	}) // forEach
	
	
	
	
	// Groups CAN have more than 1 parent. While it's true that during a single dive through the tasks each group can only have one parent, it's possible that additional dives (by the same, or other users) will produce the same groups, but tracing different steps. The merging already combines all identical groups, so the merged groups can have multiple parents.
	// Select the parents as all those candidate  groups that have not been referenced by other candidate groups already.
	
	
	
	// Loop over all the candidates of a particular group, and remove all candidates that appear in that.
	nodes.forEach(node=>{
		node.parents = node.ancestors;
		// All parents of a candidate parent are considered `grandparents'. All grandparents cannot be the parent. Loop over the candidates and remove all grandparents. Candidates also include teh candidates parents, so the whole lineage is checked.
		node.parents.forEach(candidate=>{
			
			// The candidate now no longer has parents. Just check directly? If another group contains all the members of a group then it is its parent.
			node.parents = node.parents.filter(parent=>{
				if(candidate == parent){
					// A candidate can't eliminate himself.
					return true
				} else {
					return !isSubset(candidate.members, parent.members);
				} // if
			}) // filter
		}) // forEach
			
		
	}) // forEach
	
	return nodes
	
	
} // findParentalRelationships




export function calculateLevelNumbers(nodes){
	
	// First clear all the levels and set any root ones.
	nodes.forEach(node=>{
		node.level = undefined;
		if(node.connections.parents.length == 0){
			node.level = 0;
		} // if
	})
	
	// Now move through the nodes and check if all parents already had a level assigned. If so the level of the node is max(parents.level) + 1. This must be done until all the nodes have an assigned level.
	
	
	for(let i=0; i<nodes.length; i++){
		
		let unassignednodes = nodes.filter(node=>node.level==undefined);
		
		unassignednodes.forEach(node=>{
			// All parents must have an assigned level, otherwise skip. Check if any don't have level.
			let parents = node.connections.parents.reduce((acc,parent)=>{
				return acc.concat(nodes.filter(node=>node.connections.group == parent))
			}, []) // reduce
			
			
			if( parents.some(parent=>parent.level==undefined) ){
				// Some don't have level assigned. Skip.
			} else {
				node.level = Math.max(...parents.map(parent=>parent.level)) + 1;
			} // if
		}) // forEach
		
		
		if(unassignednodes.length == 0){ break; } // if
	} // for
	
} // calculateLevelNumbers













