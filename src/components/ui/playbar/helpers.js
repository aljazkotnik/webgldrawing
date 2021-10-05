export function html2element(html){
  let template = document.createElement('template'); 
  template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
  return template.content.firstChild;
} // html2element


export function svg2element(svg){
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = svg.trim();
  return g.firstChild;
} // svg2element


export class scaleLinear {
  
  _domain = [0, 1]
  _range = [0, 1]

  set domain(d){ this._domain = d } // domain
  get domain(){ return this._domain } // domain

  set range(r){ this._range = r } // range
  get range(){ return this._range } // range

  dom2range(v){
	return mapSpaceAValueToSpaceB(v, this.domain, this.range)
  } // dom2range
  
  range2dom(v){
	return mapSpaceAValueToSpaceB(v, this.range, this.domain)  
  } // range2dom
} // scaleLinear

function mapSpaceAValueToSpaceB(v, A, B){
	return (v-A[0])/(A[1]-A[0]) * (B[1]-B[0]) + B[0]
} // mapSpaceAValueToSpaceB


export function joinDataToElements(data, elements, idAccessor){
  
  // Find data that has no elements, find the elements that have data, and the leftover.
  let elementsArray = [...elements];
  let elementsDataIds = elementsArray.map(el=>idAccessor(el.__data__));
  
  
  let g = elementsArray.reduce((acc,el)=>{
	let d = data.filter(d_=>{
		return idAccessor(el.__data__) == idAccessor(d_)
	}) // filter
	if( d.length > 0 ){
	  el.__data__ = d[0]
	  acc.update.push(el)
	} else {
	  acc.exit.push(el)
	} // if
	return acc
  }, {update: [], exit: []}) // filter
  
  g.enter = data.filter(d=>{
	return !elementsDataIds.includes(idAccessor(d))
  }) // filter
  
  return g
} // joinDataToElements