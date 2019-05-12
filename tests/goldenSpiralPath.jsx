#include 'z:/queue/xtools/xlib/stdlib.js'
//
// Remove the mask from the layer. Apply the mask if 'apply' is true
//
cTID_global_array = new Array();
cTID = function(s) { return cTID_global_array[s] || cTID_global_array[s]=app.charIDToTypeID(s); };
sTID_global_array = new Array();
sTID = function(s) { return sTID_global_array[s] || sTID_global_array[s]=app.stringIDToTypeID(s); };

Stdlib.createSolidFillLayer = function(doc, color, name, opacity, layerColor, blendMode, clipToPrevious) {
  if(doc instanceof SolidColor) { 
      color=doc; doc=app.activeDocument};
  if(!doc)doc=activeDocument;
  if (!color) {
    color = Stdlib.createRGBColor(0, 0, 0);
  }
  function _ftn() {
    var desc = new ActionDescriptor();
    var clref = new ActionReference();
    clref.putClass(sTID('contentLayer'));
    desc.putReference(cTID('null'), clref);
    var tdesc = new ActionDescriptor();
    if (name) {
        tdesc.putString( cTID( "Nm  " ), name );
    }
    if (opacity) {
        tdesc.putUnitDouble( cTID( "Opct" ), cTID( "#Prc" ), opacity );
    }
    if (layerColor) {
        tdesc.putEnumerated( cTID( "Clr " ), cTID( "Clr " ), cTID( layerColor ) );
    }
    if (blendMode) {
        tdesc.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( "Nrml" ) );
    }
    if (clipToPrevious) {
        tdesc.putBoolean( cTID( "Grup" ), !!clipToPrevious );
    }

    var scldesc = new ActionDescriptor();
    var rgbdesc = new ActionDescriptor();
    rgbdesc.putDouble(cTID('Rd  '), color.rgb.red);
    rgbdesc.putDouble(cTID('Grn '), color.rgb.green);
    rgbdesc.putDouble(cTID('Bl  '), color.rgb.blue);
    scldesc.putObject(cTID('Clr '), cTID('RGBC'), rgbdesc);
    tdesc.putObject(cTID('Type'), sTID('solidColorLayer'), scldesc);
    desc.putObject(cTID('Usng'), sTID('contentLayer'), tdesc);
    executeAction(cTID('Mk  '), desc, DialogModes.NO);
  }
  Stdlib.wrapLC(doc, _ftn);
  return doc.activeLayer;
};
Stdlib.createPathPoint = function(point, lHandle, rHandle) {
	var kind = (lHandle || rHandle)?PointKind.SMOOTHPOINT:PointKind.CORNERPOINT;
	if (!lHandle) lHandle = point;
	if (!rHandle) rHandle = point;
	
	var o = new PathPointInfo();
	/*o.anchor = [new UnitValue(point[0],'px'),new UnitValue(point[1],'px')];
	o.leftDirection = [new UnitValue(lHandle[0],'px'),new UnitValue(lHandle[1],'px')];
	o.rightDirection = [new UnitValue(rHandle[0],'px'),new UnitValue(rHandle[1],'px')];*/
	o.anchor = point;
	o.leftDirection = lHandle;
	o.rightDirection = rHandle;
	o.kind = kind;
	return o;
}
Stdlib.removeLayerMask = function(apply) {
    if ( Stdlib.hasLayerMask() ) {
        var desc = new ActionDescriptor();     // Delete
        var ref = new ActionReference();       // Mask Channel
        ref.putEnumerated(cTID("Chnl"), cTID("Chnl"), cTID("Msk "));
        desc.putReference(cTID("null"), ref);
        desc.putBoolean(cTID("Aply"), (apply == true));  // Apply Mask
        executeAction(cTID("Dlt "), desc, DialogModes.NO);
        return true;
    } else {
        return false;
    }
};
Stdlib.decodePathMode = function( mode ) {
    var pathMode = null;
    switch ( mode ) {
        case ShapeOperation.SHAPEADD:
            pathMode = cTID("AddT");
            break;
        case ShapeOperation.SHAPEINTERSECT:
            pathMode = cTID();
            break;
        case ShapeOperation.SHAPESUBTRACT:
            pathMode = cTID("SbtF");
            break;
        case ShapeOperation.SHAPEXOR:
            pathMode = cTID();
            break;
        default:
            Error.runtimeError(1, "Shape mode not supported");
    }
    return pathMode;
}

Stdlib.decodeUnit = function( unit ) {
    var pathUnit = null;
    switch ( unit ) {
        case Units.PERCENT:
            pathUnit = cTID("#Prc");
            break;
        case Units.PIXELS:
            pathUnit = cTID("#Pxl");
            break;
        case Units.CM:
        case Units.INCHES:
        case Units.MM:
        case Units.PICAS:
        case Units.POINTS:
        default:
            Error.runtimeError(1, "Unit not supported");
    }
    return pathUnit;
}

Stdlib.addVectorMask = function( hide ) {
    var desc = new ActionDescriptor();

    var arMode = new ActionReference();
    arMode.putClass( cTID( "Path" ) );
    
    var arKind = new ActionReference();
    arKind.putEnumerated( cTID( "Path" ), cTID( "Path" ), sTID( "vectorMask" ) );
    
    var mode = cTID(hide?"HdAl":"RvlA");
    desc.putReference( cTID( "null" ), arMode );    
    desc.putReference( cTID( "At  " ), arKind );    
    desc.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), mode);

    executeAction( cTID( "Mk  " ), desc, DialogModes.NO );
}

Stdlib.customPath = function( mode, unit, top, left, bottom, right )
{
    var pathMode = Stdlib.decodePathMode(mode);
    var pathUnit = Stdlib.decodeUnit(unit);

    var desc = new ActionDescriptor();
    
    var arStyle = new ActionReference();
        arStyle.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ) );

	
	var pc = new ActionDescriptor(); // KEY: 'pathContents' ID: 'pathClass'
		var pcomp = new ActionList();
		    // każdy element listy pathComponents jest obiektem ActinDescriptor
			var pc_elem = new ActionDescriptor();
				var pc_elem_lst = new ActionList();
				// każdym elementem tej listy jest obiekt
					var lst2_obj = new ActionDescriptor();
						var lst2_obj_lst = new ActionList(); // lista punktów
							var lst2_obj_lst_pt = new ActionDescriptor();
								var pt = new ActionDescriptor();
								pt.putDouble(sTID('horizontal'), 100);
								pt.putDouble(sTID('vertical'), 100);
							lst2_obj_lst_pt.putObject(sTID("anchor"), sTID('Point'), pt);
						lst2_obj_lst.putObject(sTID('PathPoint'),lst2_obj_lst_pt);
					lst2_obj.putList(sTID('points'), lst2_obj_lst);
				pc_elem_lst.putObject(sTID('SubPath'),lst2_obj);
			pc_elem.putList(sTID("subpathListKey"), pc_elem_lst);
		pcomp.putObject(sTID('PathComponent'),pc_elem);
	pc.putList( sTID('pathComponents'), pcomp );
	
    
    desc.putReference( cTID( "null" ), arStyle );
    desc.putObject( sTID('pathContents'), sTID('pathClass'), pc );

    executeAction( pathMode, desc, DialogModes.NO );
}

Stdlib.rectPath = function( mode, unit, top, left, bottom, right )
{
    var pathMode = Stdlib.decodePathMode(mode);
    var pathUnit = Stdlib.decodeUnit(unit);

    var desc = new ActionDescriptor();
    
    var arStyle = new ActionReference();
        arStyle.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ) );

    var adBounds = new ActionDescriptor();
        adBounds.putUnitDouble( cTID( "Top " ), pathUnit, top );
        adBounds.putUnitDouble( cTID( "Left" ), pathUnit, left );
        adBounds.putUnitDouble( cTID( "Btom" ), pathUnit, bottom );
        adBounds.putUnitDouble( cTID( "Rght" ), pathUnit, right );
    
    desc.putReference( cTID( "null" ), arStyle );
    desc.putObject( cTID( "T   " ), cTID( "Rctn" ), adBounds );

    executeAction( pathMode, desc, DialogModes.NO );
}


var doc = app.activeDocument;

goldenSpiral = function(numOfTurns, offset, w, h, startX, startY) {
	// Default values
	if (!w) w = app.activeDocument.width.as('px');
	if (!h) h = app.activeDocument.height.as('px');
	if (!startX) startX = 0;
	if (!startY) startY = h;
	if (!offset) offset = 0;
	if (!numOfTurns) numOfTurns = (offset>0)?Infinity:5;
	
	// Frequently used constants
	const           k = (4*(Math.sqrt(2)-1))/3; // kappa, used to draw bezier ellipse section
	const         phi = 2/(1+Math.sqrt(5));     // phi, inverse of golden ratio
	const        phi2 = phi*phi;                // phi square
	const oneMinusPhi = 1-phi;                  // 1-phi
	
	// <=CS4; patth points coordinates must be given in current DIP (!), for example
	//        72dpi: 1 path 'pixel' => 1 image pixel
	//       300pdi: 1 path 'pixel' => 300/72 image pixels
	var DPIFix = 72/doc.resolution; 
	offset *= DPIFix; w *= DPIFix; h *= DPIFix; startX *= DPIFix; startY *= DPIFix;
	
	// Create initial point
	var points = [Stdlib.createPathPoint([startX+offset,startY])];
	var i=0;
	for (; i<numOfTurns; ++i)
	{
		var startPoint = points[points.length-1];
		// coordinates of starting point w/o offset
		var x = startPoint.anchor[0]-offset,
		    y = startPoint.anchor[1];
		// coordinates of current segment points
		var pA = [x+offset,y];
		var pB = [x+phi*w, y-h+offset];
		var pC = [x+w-offset, y-oneMinusPhi*h];
		var pD = [x+(oneMinusPhi+phi2)*w, y-offset];
		var pE = [x+phi*w+offset, y-oneMinusPhi*phi*h];
		// compute distances
		var dAB = [pB[0]-pA[0],pA[1]-pB[1]];
		var dBC = [pC[0]-pB[0],pC[1]-pB[1]];
		var dCD = [pC[0]-pD[0],pD[1]-pC[1]];
		var dDE = [pD[0]-pE[0],pD[1]-pE[1]];
		
		// minimal offsets in both directions whith which the curve could be drawn
		if ( Math.min(dDE[0], dDE[1]) < 0 ) {
			
			if ( dAB[0] < 0 ) pA[0] = startPoint.anchor[0] -= offset - (offset+dAB[0])*0.7;
			if ( dBC[1] < 0 ) pB[1] -=offset - (offset+dBC[1])*0.7;
			if ( dCD[0] < 0 ) pC[0] +=offset - (offset+dCD[0])*0.7;
			if ( dDE[1] < 0 ) pD[1] +=offset - (offset+dDE[1])*0.7;
			if ( dDE[0] < 0 ) pE[0] -=offset - (offset+dDE[0])*0.7;

			// recompute distances
			dAB = [pB[0]-pA[0],pA[1]-pB[1]];
			dBC = [pC[0]-pB[0],pC[1]-pB[1]];
			dCD = [pC[0]-pD[0],pD[1]-pC[1]];
			dDE = [pD[0]-pE[0],pD[1]-pE[1]];
			numOfTurns=0;
		}
	
		// correct first point's handle
		startPoint.leftDirection = [pA[0], y-k*dAB[1]];
		startPoint.rightDirection[0] = pA[0];
		
		// add points with handles
		points.push(Stdlib.createPathPoint(pB,[pB[0]+k*dBC[0],pB[1]],[pB[0]-k*dAB[0],pB[1]]));
		points.push(Stdlib.createPathPoint(pC,[pC[0],pC[1]+k*dCD[1]],[pC[0],pC[1]-k*dBC[1]]));
		points.push(Stdlib.createPathPoint(pD,[pD[0]-k*dDE[0],pD[1]],[pD[0]+k*dCD[0],pD[1]]));
		points.push(Stdlib.createPathPoint(pE,undefined,[pE[0],pE[1]+k*dDE[1]]));
		
		w = dDE[0]+offset;   // width of NEXT segment
		h = pE[1]-pC[1];  // height of NEXT segment
	}
	return {points:points, cTurns:i};
}




makeGoldenSpiral = function( orientation, stripSizePrc, color ) {
    const docWidth  = doc.width.as("px"),
          docHeight = doc.height.as("px");
    const stripSize = Math.max(1,Math.min(docWidth, docHeight) * stripSizePrc)/3;
	
	var offsetPath = goldenSpiral(false, stripSize);
	var normalPath = goldenSpiral(offsetPath.cTurns);
	
	var fillPath = offsetPath.points;
	for (var i=0; i<normalPath.points.length; ++i) {
		var tmp = normalPath.points[i].leftDirection
		normalPath.points[i].leftDirection = normalPath.points[i].rightDirection;
		normalPath.points[i].rightDirection = tmp;
	}
	fillPath = fillPath.concat(normalPath.points.reverse());
	var spi = new SubPathInfo();
	spi.closed = true;
	spi.operation = ShapeOperation.SHAPEADD;
	spi.entireSubPath = fillPath;

	var GSPath = doc.pathItems.add('', [spi]);
	switch (orientation) {
		case 1:
			Stdlib.flipPath(0,1);
			break;
		case 2:
			Stdlib.flipPath(1,1);
			break;
		case 3:
			Stdlib.flipPath(1,0);
			break;
	}
	var SpiralLayer = Stdlib.createSolidFillLayer(undefined, color, 'Golden spiral' );
	GSPath.remove();
}
// Obracanie ścieżki przed: (3673333+3710431)/2=3691882
//  +xTID buff (3572403+3654321)/2=3613362
// Obracanie ścieżki po: (3786098+3774271)/2   =3780184.5
// Obracanie warstwy (exectueAction): (3914524+3966396)/2 = 3940460
// Obracanie warstwy (API): (4221158+4139974)/2 = 4180566
function xxx() {
	for (var i=0; i<5; ++i ) {
		makeGoldenSpiral(0, .01, Stdlib.createRGBColor(0,255,255));
		makeGoldenSpiral(1, .01, Stdlib.createRGBColor(255,0,255));
		makeGoldenSpiral(2, .01, Stdlib.createRGBColor(255,255,0));
		makeGoldenSpiral(3, .01, Stdlib.createRGBColor(128,128,255));
	}
}
if (!doc.activeLayer.isBackgroundLayer)
 	doc.activeLayer.remove();
makeGoldenSpiral(0, .01, Stdlib.createRGBColor(0,255,255));
// ----------------------------------------------------------------------------------------------------------------
// some testing code
function (){
//doc.pathItems.removeAll();
var offsetPath = goldenSpiral(false,5);
var normalPath = goldenSpiral(offsetPath.cTurns+1);

var spi = new SubPathInfo();
spi.closed = false;
spi.operation = ShapeOperation.SHAPEADD;
spi.entireSubPath = offsetPath.points;

var spi2 = new SubPathInfo();
spi2.closed = false;
spi2.operation = ShapeOperation.SHAPEADD;
spi2.entireSubPath = normalPath.points;

var fillPath = offsetPath.points;
for (var i=0; i<normalPath.points.length; ++i) {
	var tmp = normalPath.points[i].leftDirection
	normalPath.points[i].leftDirection = normalPath.points[i].rightDirection;
	normalPath.points[i].rightDirection = tmp;
}
fillPath = fillPath.concat(normalPath.points.reverse());
var spi3 = new SubPathInfo();
spi3.closed = true;
spi3.operation = ShapeOperation.SHAPEADD;
spi3.entireSubPath = fillPath;


var spi4 = new SubPathInfo();
spi4.closed = true;
spi4.operation = ShapeOperation.SHAPEADD;
spi4.entireSubPath = [Stdlib.createPathPoint([0,600]), Stdlib.createPathPoint([0,0]), Stdlib.createPathPoint([1000,0]), Stdlib.createPathPoint([1000,600])];

// New way
// 3814873+3730110
function a() {
	for (var i=0; i<20; ++i ) {
		var GSPath = doc.pathItems.add('', [spi4]);
		Stdlib.createSolidFillLayer(doc);
		GSPath.remove();
	}
}

// Old way
// 3789154+3778739
function b() {
	for (var i=0; i<20; ++i ) {
		var StripLayer = Stdlib.createSolidFillLayer(doc);
		Stdlib.removeLayerMask(); // no error if there is no (raster) mask
		Stdlib.addVectorMask(true); // true => 'hide all' mode
		Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, 0, 0, 600, 1000);
	}
}
b();

/*
var StripLayer = Stdlib.createSolidFillLayer(doc);
Stdlib.removeLayerMask(); // no error if there is no (raster) mask
Stdlib.addVectorMask(true); // true => 'hide all' mode
var GSPath = doc.pathItems.add('', [spi3]);
//doc.pathItems[doc.pathItems.length-1] = GSPath;
*/
}