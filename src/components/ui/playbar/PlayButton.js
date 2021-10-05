import { svg2element } from "./helpers.js";





function play(width, y){
	
	
	// Calculate the size of the triangle, and where the drawing should begin.
	let height = width*2*Math.sqrt(3)/3;
	
	
	let r_max = height*Math.sqrt(3)/6;
    let r = 3 > r_max ? r_max : 3;
    let dH = r*Math.sqrt(3); // Length of side cut by 1 rounding.
	

    let Mx = 0;
	let My = y + 5 - height/2;
    
    let p0 = [Mx, My]
    let p1 = [Mx + height*Math.sqrt(3)/2, My + height/2]
    let p2 = [Mx, My + height]
    
	
    
    return `M${p0[0]} ${p0[1]+dH}
      a ${r},${r}, 0,0,1  ${r*3/2}, ${-dH/2}
      L ${p1[0]-r*3/2} ${p1[1]-dH/2}
      a ${r},${r}, 0,0,1  0, ${dH}
      L ${p2[0]+r*3/2} ${p2[1]-dH/2}
      a ${r},${r}, 0,0,1  ${-r*3/2}, ${-dH/2}
      Z
      `
	
} // playPath

function pause(width, y){
	
    let height = width*2*Math.sqrt(3)/3 - 2*(3*Math.sqrt(3)-3);
    let dx = width/5;
    let r = 3;
    
	let Mx = 0;
	let My = y + 5 - height/2;
	
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


let template = `
<g style="cursor: pointer;">
  <path fill="tomato" d=""></path>
</g>
`





// Maybe the y should just be set outside? And the same for the chapter?? Maybe give it the y it should center itself about?

// textHeight + textBottomMargin + rectHighlightHeightDelta + rectHeight/2 - H/2
export default class PlayButton{
	
  // The y is given as the centerline about which to position the button. Half above, and half below. The initial y is therefore half the height, and should draw the button completely on hte svg.
  y = 20*2*Math.sqrt(3)/3 / 2;
  width = 20;
	
  constructor(){
    let obj = this;
	obj.node = svg2element( template );
  } // constructor
  
  update(playing){
	let obj = this;
	let d = playing ? pause(obj.width, obj.y) : play(obj.width, obj.y);
	obj.node.querySelector("path").setAttribute("d", d)	
  } // update
} // PlayButton