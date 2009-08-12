#target photoshop
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

Stdlib.createSubPath = function( pointList, closed, mode ) {
	if (!closed) closed = true;
	if (!mode) mode = ShapeOperation.SHAPEADD;
	var spi = new SubPathInfo();
	spi.closed = closed;
	spi.operation = mode;
	spi.entireSubPath = pointList;
	return spi;
}

var doc = app.activeDocument;

linePath = function(x1, y1, x2, y2, thickness) {
	// <=CS4; patth points coordinates must be given in current DIP (!), for example
	//        72dpi: 1 path 'pixel' => 1 image pixel
	//       300pdi: 1 path 'pixel' => 300/72 image pixels
	var DPIFix = 72/doc.resolution; 
	x1 *= DPIFix; y1 *= DPIFix; x2 *= DPIFix; y2 *= DPIFix; thickness *= DPIFix;
	
	var halfSize = thickness/2;
	var v = [x2-x1, y2-y1];
	var v_len = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
	var an = Math.acos(v[1]/v_len);
	v=[halfSize*Math.cos(an),halfSize*Math.sin(an)];
	$.writeln(an*180.0/Math.PI);
	// Create initial point
	var points = [Stdlib.createPathPoint([x1+v[0],y1-v[1]]),
				  Stdlib.createPathPoint([x1-v[0],y1+v[1]]),
				  Stdlib.createPathPoint([x2-v[0],y2+v[1]]),
				  Stdlib.createPathPoint([x2+v[0],y2-v[1]])];
	return points;
}




makeGoldenSpiral = function( orientation, stripSizePrc, color ) {
	var paths = [];
    const docWidth  = doc.width.as("px"),
          docHeight = doc.height.as("px");
	var minWH = Math.min(docWidth,docHeight);
	paths.push(Stdlib.createSubPath(linePath(0,0,minWH,minWH,5)));
	paths.push(Stdlib.createSubPath(linePath(docWidth-minWH,docHeight-minWH,docWidth,docHeight,5)));
	paths.push(Stdlib.createSubPath(linePath(0,minWH,docWidth,0,5)));
	paths.push(Stdlib.createSubPath(linePath(0,docHeight,docWidth,ocHeight-minWH,5)));
	//docWidth-minWH,docHeight-minWH,docWidth,docHeight
	var GSPath = doc.pathItems.add('', paths);
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

if (!doc.activeLayer.isBackgroundLayer)
 	doc.activeLayer.remove();
makeGoldenSpiral(0, .01, Stdlib.createRGBColor(0,255,255));