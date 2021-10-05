let node_label_width = 70; // length of text
let bundle_width = 4; // reserved space for the vertical bunlde line
let r = 16; // arc radius

// A level is an organisational group. All dimensioning is done through a treelevel. The primary elements that define the level are its bundles. The TreeLevel is necessary because the bundles need to be sequenced within a level, and the level width is required to position hte levels. Because the bundles are based on a set of parents, the level of the bundle is the level of the children.
export default class TreeLevel{
  constructor(nodes, bundles, nlevel){
		let obj = this;
		obj.n = nlevel;
		obj.bundles = bundles.filter(b=>b.level==nlevel);
		obj.nodes = nodes.filter(n=>n.level==nlevel);
	} // constructor
	
	get width(){
		// The width of the entire level. It's the width of the label plus the width of all the vertical line segments (including padding), plus the length of the finishing horizontal segment (this is zero for the right-most bundle).
		let obj = this;
		
		// The width of the level is determined by the bundles that end in it. If there aren't any bundles, there is no width. Maybe do a reduce and move the width calculation to the bundle? That would eliminate the dimensions here.
		if(obj.bundles.length > 0){
			return node_label_width + obj.bundles.length*bundle_width + r;
		} else {
			return 0
		} // if
	} // width
} // TreeLevel