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

// From regular helpers.
export function arrayEqual(A, B){
	
	return arrayIncludesAll(A, B)
		&& arrayIncludesAll(B, A)
	
} // arrayEqual

export function arrayIncludesAll(A,B){
	// 'arrayIncludesAll' checks if array A includes all elements of array B. The elements of the arrays are expected to be strings.
	
	// Return element of B if it is not contained in A. If the response array has length 0 then A includes all elements of B, and 'true' is returned.
	var f = B.filter(function(b){
		return !A.includes(b)
	})
	
	return f.length == 0? true : false
} // arrayIncludesAll







// d3 replacement.
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





export class scaleCategorical {
  domain = []
  range = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']

  // Opposite function is not defined - two domain values can map to the same range value.
  dom2range(v){
	let obj = this;
	let i = (obj.domain.indexOf(v)+1) % obj.range.length - 1;
	if(i<0){
		obj.domain.push(v);
		return obj.range[obj.domain.length-1];
	} else {
		return obj.range[i];
	} // if
  } // dom2range
  
} // scaleCategorical










