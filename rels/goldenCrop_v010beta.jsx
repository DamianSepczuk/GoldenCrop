/*****************************************
 * Golden crop tool, v0.1 beta
 *
 * Copyright 2009, Damian Sepczuk aka SzopeN <damian.sepczuk@o2.pl>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/************************
 *     USER CONFIG      *
 ************************/
var debug = false;
var lang = "pl"; // or set to 'en' for English, 
                   //           'pl' for Polish
// ---------------------------------------------------------------------
// Some global configuration
#strict on
#target photoshop

$.localize = true;
if ( lang != "auto" )
	$.locale = lang;
$.level = debug?1:0;

const szAppName = "Golden Crop",
	  szVersion = "0.01 beta";
// ---------------------------------------------------------------------
function GoldenCrop( _doc ) {
	this.doc = _doc;
	this.doCrop = false;
};

GoldenCrop.prototype.makeStrips = function( proportion, stripSize ) {

	Stdlib.createSolidFillLayer(Stdlib.createRGBColor(0,0,0));
	Stdlib.removeLayerMask();
	var layer = this.doc.activeLayer;
	
	Stdlib.addVectorMask(true);
	const oneMinusProportion = 1 - proportion;
	const docWidth  = this.doc.width.as("px"),
		  docHeight = this.doc.height.as("px");
	const halfStripSize = Math.min(docWidth, docHeight) * stripSize / 200;
	
	// add horizontal strips
	var tmp = docHeight*proportion;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, tmp-halfStripSize, 0, tmp+halfStripSize, docWidth);
	var tmp = docHeight*oneMinusProportion;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, tmp-halfStripSize, 0, tmp+halfStripSize, docWidth);

	// add vertical strips
	var tmp = docWidth*proportion;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, 0, tmp-halfStripSize, docHeight, tmp+halfStripSize);
	var tmp = docWidth*oneMinusProportion;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, 0, tmp-halfStripSize, docHeight, tmp+halfStripSize);
	
	return layer;
}

GoldenCrop.prototype.applyFX = function() {
	var idsetd = charIDToTypeID( "setd" );
		var desc484 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref440 = new ActionReference();
			var idPrpr = charIDToTypeID( "Prpr" );
			var idLefx = charIDToTypeID( "Lefx" );
			ref440.putProperty( idPrpr, idLefx );
			var idLyr = charIDToTypeID( "Lyr " );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref440.putEnumerated( idLyr, idOrdn, idTrgt );
		desc484.putReference( idnull, ref440 );
		var idT = charIDToTypeID( "T   " );
			var desc485 = new ActionDescriptor();
			var idScl = charIDToTypeID( "Scl " );
			var idPrc = charIDToTypeID( "#Prc" );
			desc485.putUnitDouble( idScl, idPrc, 333.333333 );
			var idDrSh = charIDToTypeID( "DrSh" );
				var desc486 = new ActionDescriptor();
				var idenab = charIDToTypeID( "enab" );
				desc486.putBoolean( idenab, true );
				var idMd = charIDToTypeID( "Md  " );
				var idBlnM = charIDToTypeID( "BlnM" );
				var idScrn = charIDToTypeID( "Scrn" );
				desc486.putEnumerated( idMd, idBlnM, idScrn );
				var idClr = charIDToTypeID( "Clr " );
					var desc487 = new ActionDescriptor();
					var idRd = charIDToTypeID( "Rd  " );
					desc487.putDouble( idRd, 255.000000 );
					var idGrn = charIDToTypeID( "Grn " );
					desc487.putDouble( idGrn, 255.000000 );
					var idBl = charIDToTypeID( "Bl  " );
					desc487.putDouble( idBl, 255.000000 );
				var idRGBC = charIDToTypeID( "RGBC" );
				desc486.putObject( idClr, idRGBC, desc487 );
				var idOpct = charIDToTypeID( "Opct" );
				var idPrc = charIDToTypeID( "#Prc" );
				desc486.putUnitDouble( idOpct, idPrc, 75.000000 );
				var iduglg = charIDToTypeID( "uglg" );
				desc486.putBoolean( iduglg, false );
				var idlagl = charIDToTypeID( "lagl" );
				var idAng = charIDToTypeID( "#Ang" );
				desc486.putUnitDouble( idlagl, idAng, 120.000000 );
				var idDstn = charIDToTypeID( "Dstn" );
				var idPxl = charIDToTypeID( "#Pxl" );
				desc486.putUnitDouble( idDstn, idPxl, 0.000000 );
				var idCkmt = charIDToTypeID( "Ckmt" );
				var idPxl = charIDToTypeID( "#Pxl" );
				desc486.putUnitDouble( idCkmt, idPxl, 0.000000 );
				var idblur = charIDToTypeID( "blur" );
				var idPxl = charIDToTypeID( "#Pxl" );
				desc486.putUnitDouble( idblur, idPxl, 3.000000 );
				var idNose = charIDToTypeID( "Nose" );
				var idPrc = charIDToTypeID( "#Prc" );
				desc486.putUnitDouble( idNose, idPrc, 0.000000 );
				var idAntA = charIDToTypeID( "AntA" );
				desc486.putBoolean( idAntA, false );
				var idTrnS = charIDToTypeID( "TrnS" );
					var desc488 = new ActionDescriptor();
					var idNm = charIDToTypeID( "Nm  " );
					desc488.putString( idNm, "Linear" );
				var idShpC = charIDToTypeID( "ShpC" );
				desc486.putObject( idTrnS, idShpC, desc488 );
				var idlayerConceals = stringIDToTypeID( "layerConceals" );
				desc486.putBoolean( idlayerConceals, true );
			var idDrSh = charIDToTypeID( "DrSh" );
			desc485.putObject( idDrSh, idDrSh, desc486 );
		var idLefx = charIDToTypeID( "Lefx" );
		desc484.putObject( idT, idLefx, desc485 );
	executeAction( idsetd, desc484, DialogModes.NO );
}




GoldenCrop.prototype.fillFullCanvas = function() {
	const docWidth  = this.doc.width.as("px"),
		  docHeight = this.doc.height.as("px");
	var idTrnf = charIDToTypeID( "Trnf" );
		var desc120 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref73 = new ActionReference();
			var idLyr = charIDToTypeID( "Lyr " );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref73.putEnumerated( idLyr, idOrdn, idTrgt );
		desc120.putReference( idnull, ref73 );
		var idFTcs = charIDToTypeID( "FTcs" );
		var idQCSt = charIDToTypeID( "QCSt" );
		var idQcsa = charIDToTypeID( "Qcsa" );
		desc120.putEnumerated( idFTcs, idQCSt, idQcsa );
		var idOfst = charIDToTypeID( "Ofst" );
			var desc121 = new ActionDescriptor();
			var idHrzn = charIDToTypeID( "Hrzn" );
			var idPxl = charIDToTypeID( "#Pxl" );
			desc121.putUnitDouble( idHrzn, idPxl, 0.000000 );
			var idVrtc = charIDToTypeID( "Vrtc" );
			var idPxl = charIDToTypeID( "#Pxl" );
			desc121.putUnitDouble( idVrtc, idPxl, 0.000000 );
		var idOfst = charIDToTypeID( "Ofst" );
		desc120.putObject( idOfst, idOfst, desc121 );
		var idWdth = charIDToTypeID( "Wdth" );
		var idPrc = charIDToTypeID( "#Prc" );
		desc120.putUnitDouble( idWdth, idPrc, docWidth );
		var idHght = charIDToTypeID( "Hght" );
		var idPrc = charIDToTypeID( "#Prc" );
		desc120.putUnitDouble( idHght, idPrc, docHeight );
	executeAction( idTrnf, desc120, DialogModes.NO );	
}

GoldenCrop.prototype.makeDiagStrip = function( stripSizePrc ) {
	Stdlib.createSolidFillLayer(Stdlib.createRGBColor(255,0,0));
	Stdlib.removeLayerMask();
	var layer = this.doc.activeLayer;
	Stdlib.addVectorMask(true);	
	
	const docWidth  = this.doc.width.as("px"),
		  docHeight = this.doc.height.as("px");
	const stripSize = Math.min(docWidth, docHeight) * stripSizePrc / 100;
	
	Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSize, 0, docHeight, docWidth, 0);
	var w = docWidth,
	    h = docHeight;
	{
	var x = h/((w/h)+(h/w)),
	    y = (w/h)*x;
	Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSize, 0, 0, x, y);
	}	

	{
	var x = (w*(w/h))/((w/h)+(h/w)),
	    y = (-h/w)*x + h;
	Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSize, x, y, docWidth, docHeight);
	}	

	// Normalize
	/*
	Stdlib.loadVectorMaskSelection();
	var layerW = (this.doc.selection.bounds[2]-this.doc.selection.bounds[0]).as("px"),
	    layerH = (this.doc.selection.bounds[3]-this.doc.selection.bounds[1]).as("px");
	doc.selection.deselect();
	layer.resize(docWidth/layerW*100, docHeight/layerH*100, AnchorPosition.MIDDLECENTER);
	//*/
	//*
	var layerW = (layer.bounds[2]-layer.bounds[0]).as("px"),
	    layerH = (layer.bounds[3]-layer.bounds[1]).as("px");
	layer.resize(docWidth/layerW*100, docHeight/layerH*100, AnchorPosition.MIDDLECENTER);
	//*/
	return layer;
}

GoldenCrop.prototype.makeGrid = function() {
	this.gCrop = this.doc.layerSets.add();
	this.gCrop.name = "Golden Crop by SzopeN";
	
	Stdlib.createSolidFillLayer(Stdlib.createRGBColor(0,0,0));
	Stdlib.removeLayerMask();
	this.outerFrame = this.doc.activeLayer;
	Stdlib.addVectorMask(true);
	Stdlib.rectPath( ShapeOperation.SHAPESUBTRACT, Units.PERCENT, 0,0,100,100);
	this.doc.activeLayer.opacity = 70;
	
	const phi = 0.6180339887498948482045868343656;
	const third = 1.0/3;
	const stripSize = 1.0; // % of shorter edge
	
	this.phiStrips = this.makeStrips(phi, stripSize);
	this.applyFX();
	this.doc.activeLayer.opacity = 90;
	this.thirdStrips = this.makeStrips(third, stripSize/2);
	this.applyFX();
	this.diagGold = this.makeDiagStrip(stripSize/3);
	this.applyFX();
	
	this.doc.activeLayer = this.gCrop;
}

GoldenCrop.prototype.freeTransform = function() {
	this.doc.activeLayer = this.gCrop;
	var dialogMode = app.displayDialogs;
	app.displayDialogs = DialogModes.ALL;
	try {
		Stdlib.userGoToFreeTransform();
	} catch (e) {
		this.doCrop = false;
		return;
	} finally {
		app.displayDialogs = dialogMode;
	}
	this.doCrop = true;
}

GoldenCrop.prototype.simpleCrop = function() {
	this.doc.activeLayer = this.phiStrips || this.thirdStrips;
	Stdlib.loadVectorMaskSelection();
	// crop to selection
	executeAction( charIDToTypeID( "Crop" ), new ActionDescriptor(), DialogModes.NO );
	this.doc.selection.deselect();
	this.gCrop.remove();
	//this.doc.activeLayer = this.gCrop;
}

GoldenCrop.prototype.maskOutCrop = function() {
	this.outerFrame.opacity = 100;
	this.phiStrips.remove();
	this.thirdStrips.remove();
	this.diagGold.remove();
}

GoldenCrop.prototype.chooseCropMethod = function() {
	var cropFunctions = {SIMPLE:'simpleCrop()', MASK:'maskOutCrop()', NONE:''};

	var strings = new Array();
	strings[0] = {en:"Choose crop style", pl:"Wybierz styl przycinania"};
	strings[1] = strings[0];
	strings[2] = {en:"Crop canvas", pl:"Przytnij płótno"};
	strings[3] = {en:"Make crop mask", pl:"Stwórz maskę kadrującą"};
	strings[4] = {en:"Cancel", pl:"Anuluj"};
	// Localization doesn't work in dialogs?!
	// BEGIN: localize fix
	for ( var i = 0; i < strings.length; ++i ) {
		strings[i] = localize( strings[i] );
	}
	// END: localize fix

	var dlg = new Window('dialog', strings[0]);
	dlg.preferredSize[0] = 155;

	with (dlg)
	{
	   orientation = 'column';
	   alignChildren = 'fill';
	   
	   add('statictext', undefined, strings[1]);
	   add('button', undefined, '[&1] ' + strings[2], {name: 'op1'});
	   op1.onClick = function() {this.parent.close(11)};
	   add('button', undefined, '[&2] ' + strings[3], {name: 'op2'});
	   op2.onClick = function() {this.parent.close(12)};
	   add('button', undefined, '[Esc] '+strings[4], {name: 'cancel'});
	   
	   defaultElement = op1;
	   addEventListener('keydown', function foo(e) {
			// w przyszłości przeszukiwać labele na &(.)
			switch ( e.keyName )
			{
				case '1':
					op1.notify();
					break;
				case '2':
					op2.notify();
					break;
			}
		}, false);   
	}
	dlg.center();
	var result = dlg.show();
	
	switch ( result ) {
		case 11:
			return cropFunctions.SIMPLE;
		case 12:
			return cropFunctions.MASK;
		case 2:
		default:
			this.doCrop = false;
			return cropFunctions.NONE;
	}
}

GoldenCrop.prototype.go = function() {
	with ( this ) {
		doc.suspendHistory(szAppName + " - grid", 'makeGrid()');
		Stdlib.NOP();
		doc.suspendHistory(szAppName + " - resize", 'freeTransform()');
		Stdlib.NOP();
		if (this.doCrop) {
			var cropFunction = this.chooseCropMethod();
			if (this.doCrop) {
				doc.suspendHistory(szAppName + " - crop", cropFunction);
			}
		} else {
			// remove resize entry from history -- it does nothing
			executeAction( charIDToTypeID( "undo" ), undefined, DialogModes.NO );
		}
	}
}

function main() {
	var gc = new GoldenCrop( app.activeDocument );
	gc.go();
}
// ---------------------------------------------------------------------
// Between ===START: stdlib.js=== and ===END: stdlib.js===, there is my
// modified (stripped) version o xbytor's stdlib from xtools.
// ===START: stdlib.js===
// 
// stdlib.js
//   This file contains a collection of utility routines that I've
//   written, borrowed, rewritten, and occasionally tested and
//   documented.
//
//   Most of this stuff is photoshop specific. I'll break out the parts
//   that aren't sometime in the future.
//
// $Id: stdlib.js,v 1.252 2008/11/14 17:08:00 anonymous Exp $
// Copyright: (c)2008, xbytor
// License: http://creativecommons.org/licenses/LGPL/2.1
// Contact: xbytor@gmail.com
// Mod: Damian Sepczuk <damian.sepczuk@o2.pl>
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };
Stdlib = function Stdlib() {};

Stdlib.createRGBColor = function(r, g, b) {
  var c = new RGBColor();
  if (r instanceof Array) {
    b = r[2]; g = r[1]; r = r[0];
  }
  c.red = parseInt(r); c.green = parseInt(g); c.blue = parseInt(b);
  var sc = new SolidColor();
  sc.rgb = c;
  return sc;
};

Stdlib.createSolidFillLayer = function(color) {
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

// from discussions with Mike Hale
Stdlib.hasLayerMask = function() {
	var ref = new ActionReference();
	ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
	var desc = executeActionGet(ref);
	return desc.hasKey(cTID("UsrM"));
};

//
// Remove the mask from the layer. Apply the mask if 'apply' is true
//
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

// by SzopeN
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

Stdlib.linePath = function( mode, unit, width, x1, y1, x2, y2 ) {
	var pathMode = Stdlib.decodePathMode(mode);
	var pathUnit = Stdlib.decodeUnit(unit);

	var idAddT = pathMode;
		var desc90 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref47 = new ActionReference();
			var idPath = charIDToTypeID( "Path" );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref47.putEnumerated( idPath, idOrdn, idTrgt );
		desc90.putReference( idnull, ref47 );
		var idT = charIDToTypeID( "T   " );
			var desc91 = new ActionDescriptor();
			var idStrt = charIDToTypeID( "Strt" );
				var desc92 = new ActionDescriptor();
				var idHrzn = charIDToTypeID( "Hrzn" );
				var idPxl = pathUnit;
				desc92.putUnitDouble( idHrzn, idPxl, x1 );
				var idVrtc = charIDToTypeID( "Vrtc" );
				var idPxl = pathUnit;
				desc92.putUnitDouble( idVrtc, idPxl, y1 );
			var idPnt = charIDToTypeID( "Pnt " );
			desc91.putObject( idStrt, idPnt, desc92 );
			var idEnd = charIDToTypeID( "End " );
				var desc93 = new ActionDescriptor();
				var idHrzn = charIDToTypeID( "Hrzn" );
				var idPxl = pathUnit;
				desc93.putUnitDouble( idHrzn, idPxl, x2 );
				var idVrtc = charIDToTypeID( "Vrtc" );
				var idPxl = pathUnit;
				desc93.putUnitDouble( idVrtc, idPxl, y2 );
			var idPnt = charIDToTypeID( "Pnt " );
			desc91.putObject( idEnd, idPnt, desc93 );
			var idWdth = charIDToTypeID( "Wdth" );
			var idPxl = pathUnit;
			desc91.putUnitDouble( idWdth, idPxl, width );
		var idLn = charIDToTypeID( "Ln  " );
		desc90.putObject( idT, idLn, desc91 );
	executeAction( idAddT, desc90, DialogModes.NO );
}
// by SzopeN
Stdlib.userGoToFreeTransform = function() {
	executeAction( charIDToTypeID( "Trnf" ), new ActionDescriptor(), DialogModes.ALL );
}

// by SzopeN
// heplful with multiple suspendHistory
// is there a better candidate?
Stdlib.NOP = function() {
	activeDocument = activeDocument;
	/*
	executeAction( charIDToTypeID( "undo" ), undefined, DialogModes.NO );
	executeAction( charIDToTypeID( "undo" ), undefined, DialogModes.NO );
	*/
}

Stdlib.loadVectorMaskSelection = function() {
    var desc8 = new ActionDescriptor();
    var ref4 = new ActionReference();
    ref4.putProperty( cTID('Chnl'), cTID('fsel') );
    desc8.putReference( cTID('null'), ref4 );
    var ref5 = new ActionReference();
    ref5.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') );
    ref5.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
    desc8.putReference( cTID('T   '), ref5 );
    desc8.putBoolean( cTID('AntA'), true );
    desc8.putUnitDouble( cTID('Fthr'), cTID('#Pxl'), 0.000000 );
    executeAction( cTID('setd'), desc8, DialogModes.NO );
};
// ===END: stdlib.js===

app.bringToFront();
try {
   if ( app.documents.length == 0 )
   {
      throw new Error( { en: "Open the document in which you want the script to run.",
                         pl: "Otwórz dokument, w którym chcesz uruchomić ten skrypt."
                       }
                     );
   }
   var oldRulerUnit = app.preferences.rulerUnits; // Save ruler unit
   app.preferences.rulerUnits = Units.PIXELS;     // Set it to PIXEL
   main();
} 
catch ( e )
{
   alert( e.message );
}
finally
{
   app.preferences.rulerUnits = oldRulerUnit; // Restore ruler unit
}
// ---------------------------------------------------------------------
