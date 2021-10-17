// Link has access to the nodes, but it will have it's own offsets. This allows the drawnode to change its values correctly.
export default class DrawLink{
	// Indices when exiting parent node, entering child node, and the index of position of the bend.
	pi = 0
	ci = 0
	bendi = 0
	
	// Actual dimensions. The label width is the minimum horizontal line length. Bundle width is the space reserved for the vertical line width. Line width is the actual width of the white outline. The default radius is the basis for the actual bend radii.
	node_label_width = 70
	bundle_width = 4
	line_width = 4
	r = 16
	
	constructor(parentnode, childnode, author){
		let obj = this;
		
		// So that hte locations can be changed on hte go.
		obj.parentnode = parentnode;
		obj.childnode = childnode;
		obj.author = author;
		
		// Exit radius is determined node level difference.
		obj.r1 = (childnode.level - parentnode.level)*obj.r;
		obj.r2 = obj.r;
	} // constructor
	
	get path(){
		// Doesn't take into account the offsets yet!!
		
		
		// Allow this to return a straight path, or a curved one. The straight path is exclusively for bundles that have only one parent. Furthermore, that one should only be allowed when connecting nodes on the same height. So maybe just base the decision off of that?
		
		// Straight path is just M0 0 L40 0 or so.
		
		let obj = this;
				
		
		let dyc = obj.ci*obj.line_width + obj.childnode.markerEmptyIn;
		let dyp = obj.pi*obj.line_width + obj.parentnode.markerEmptyOut;
		
		// The target x should be > `xHorizontal + r1 + r2'
		let xHorizontal = obj.parentnode.x + obj.node_label_width + obj.bendi*obj.bundle_width;
		
		
		// Origin and target MUST be at least `[node_label_width + 2*r, 2*r]' apart otherwise the graphic logic doesn't follow.
		let origin = {
			x: obj.parentnode.x,
			y: obj.parentnode.yMarkerStart + dyp
		}
		
		let target = {
			x: obj.childnode.x,
			y: obj.childnode.yMarkerStart + dyc
		}
		
		
		
		let arc1start = {
			x: xHorizontal - obj.r1,
			y: origin.y
		}
		
		let arc1end = {
			x: xHorizontal,
			y: origin.y + obj.r1
		}

		let arc2start = {
			x: xHorizontal,
			y: target.y - obj.r2
		}
		
		let arc2end = {
			x: xHorizontal + obj.r2,
			y: target.y
		}
		
		
		
		/*
		How the path is made up.
		start point                   : M0 0
		horizontal line               : L40 0
		first bend to vertical        : A16 16 90 0 1 46 16
		vertical line                 : L46 34
		second bend to horizontal     : A16 16 90 0 0 62 50
		horizontal connection to node : L62 50
		*/
		let p = `M${ origin.x } ${ origin.y } L${ arc1start.x } ${ arc1start.y } A${ obj.r1 } ${ obj.r1 } 90 0 1 ${ arc1end.x } ${ arc1end.y } L${ arc2start.x } ${ arc2start.y } A${ obj.r2 } ${ obj.r2 } 90 0 0 ${ arc2end.x } ${ arc2end.y } L${ target.x } ${ target.y }`; 
		return p
	} // path
	
} // DrawLink