cTID_global_array = new Array();
function cTID(s) { return cTID_global_array[s] || cTID_global_array[s]=app.charIDToTypeID(s); };
sTID_global_array = new Array();
function sTID(s) { return sTID_global_array[s] || sTID_global_array[s]=app.stringIDToTypeID(s); };

function Stdlib() {};

// by Damian SzopeN Sepczuk <damian[d0t]sepczuk[a7]o2{do7}pl> 
// [in] round (bool) -- whether returned values should be rounded to the nearest pixel, def: false 
// [in] doc -- document containing layer with vector mask 
// [in] layer -- layer with vector mask 
// returns array [left, top, right, bottom, width, height] 
Stdlib.getVectorMaskBounds_cornerPointsOnly = function(round, doc, layer) { 
    var ref = new ActionReference();
    ref.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') );
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
	var vMaskDescr = executeActionGet(ref);
	var pathContents = vMaskDescr.getObjectValue(sTID('pathContents'));
	var pathList = pathContents.getList(sTID('pathComponents'));

	// for each path in current layer
	var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
	for ( cPath=0; cPath<pathList.count; ++cPath )
	{
		var curPath = pathList.getObjectValue(cPath).getList(sTID("subpathListKey"));
		var points = curPath.getObjectValue(0).getList(sTID("points"));
		// for each point
		for (cPoint=0; cPoint < points.count; ++cPoint ) 
		{	
			var point = points.getObjectValue(cPoint).getObjectValue(sTID("anchor"));
			var x = point.getUnitDoubleValue(sTID('horizontal'));
			var y = point.getUnitDoubleValue(sTID('vertical'));
			if ( x < minX ) minX = x;
			if ( x > maxX ) maxX = x;
			if ( y < minY ) minY = y;
			if ( y > maxY ) maxY = y;
		}
	}
	res = [minX, minY, maxX, maxY, maxX-minX, maxY-minY];
	if (round)
	{
		for ( i=0; i<res.length; ++i )
		{
			res[i] = Math.round(res[i]);
		}
	}
	return res;
}

for (i=0; i<10000; ++i)
   Stdlib.getVectorMaskBounds_cornerPointsOnly();
 