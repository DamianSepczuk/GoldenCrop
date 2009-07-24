function createRGBColor(r, g, b) {
  var c = new RGBColor();
  if (r instanceof Array) {
    b = r[2]; g = r[1]; r = r[0];
  }
  c.red = parseInt(r); c.green = parseInt(g); c.blue = parseInt(b);
  var sc = new SolidColor();
  sc.rgb = c;
  return sc;
};

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };
Stdlib = function Stdlib() {};
// from discussions with Mike Hale
Stdlib.hasLayerMask = function() {
	var ref = new ActionReference();
	ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
	var desc = executeActionGet(ref);
	return desc.hasKey(cTID("UsrM"));
};
function createSolidFillLayer(color) {
  if (!color) {
    color = Stdlib.createRGBColor(0, 0, 0);
  }
  var desc = new ActionDescriptor();
  var clref = new ActionReference();
  clref.putClass(sTID('contentLayer'));
  desc.putReference(cTID('null'), clref);
  var tdesc = new ActionDescriptor();
  var scldesc = new ActionDescriptor();
  var rgbdesc = new ActionDescriptor();
  rgbdesc.putDouble(cTID('Rd  '), color.rgb.red);
  rgbdesc.putDouble(cTID('Grn '), color.rgb.green);
  rgbdesc.putDouble(cTID('Bl  '), color.rgb.blue);
  scldesc.putObject(cTID('Clr '), cTID('RGBC'), rgbdesc);
  tdesc.putObject(cTID('Type'), sTID('solidColorLayer'), scldesc);
  desc.putObject(cTID('Usng'), sTID('contentLayer'), tdesc);
  executeAction(cTID('Mk  '), desc, DialogModes.NO);
  return activeDocument.activeLayer;
};
function removeLayerMask(apply) {
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
function sposob1() {
	var a = createSolidFillLayer(createRGBColor(0,0,0));
	a.name = "Bogus";
	removeLayerMask(false);
	a.rasterize(RasterizeType.ENTIRELAYER);
	a.opacity = 0;
}

function sposob2() {
	doc = app.activeDocument;
	bogusLayer = doc.artLayers.add();
	bogusLayer.name = "Bogus";
	doc.selection.selectAll();
	doc.selection.fill(createRGBColor(0,0,0));
	doc.selection.deselect();
	bogusLayer.opacity = 0;
}

function sposob3() {
	var MakeWhat = new ActionDescriptor();
		var ref120 = new ActionReference();
		ref120.putClass( charIDToTypeID( "Lyr " ) );
	MakeWhat.putReference( charIDToTypeID( "null" ), ref120 );
	
	var layerDesc = new ActionDescriptor();
	layerDesc.putString( charIDToTypeID( "Nm  " ), "Bogus" );
	layerDesc.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), 0 );
	layerDesc.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Lghn" ) );
	layerDesc.putBoolean( charIDToTypeID( "FlNt" ), true );
	MakeWhat.putObject( charIDToTypeID( "Usng" ), charIDToTypeID( "Lyr " ), layerDesc );
	executeAction( charIDToTypeID( "Mk  " ), MakeWhat, DialogModes.NO );
	return app.activeDocument.activeLayer;
}
sposob1();
sposob1();
sposob1();
sposob1();
sposob2();
sposob2();
sposob2();
sposob2();
sposob3();
sposob3();
sposob3();
sposob3();
sposob1();
sposob2();
sposob3();
sposob1();
sposob2();
sposob3();
sposob1();
sposob2();
sposob3();
sposob1();
sposob2();
sposob3();