/*****************************************
 * Golden crop tool, v0.52 beta
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


var debug = true;//false;
var lang = "pl"; // set to "en"   for English, 
                 //        "pl"   for Polish
                 //        "auto" to use Photoshop language

/************************
 *  END OF USER CONFIG  *
 ************************/

















// ---------------------------------------------------------------------
// Some global configuration
#strict on
#target photoshop

$.localize = true;
if ( lang != "auto" )
	$.locale = lang;
$.level = debug?1:0;

const szAppName = "Golden Crop",
	  szVersion = "0.52 beta";
// ---------------------------------------------------------------------
function GoldenCrop( _doc ) {
	this.doc = _doc;
	this.doCrop = false;
};

/*
 * Create horizontal and vertical strips ("checkerboard" with 9 fields)
 *   [in] position  | from range (0.0, 1.0)  - how distanced strips from image edges shoud be
 *   [in] stripSize | from range (0.0, 1.0)  - how thick single strip should be
 *   [in] color     | instance of SolidColor - fill color of the strip
 *
 * Returns: instance of ArtLayer (color fill) -- object representing fill layer with vector mask
 *                                               with strips
 * 
 * Adds a pair of vertical and horizontal strips (lines) using Solid Color fill layer and vector mask.
 *
 * Each of four lines is situated at position*100% from image borders. For example, suppose that image
 * dimentions are (width, height)=(800,600) and position=1/3 (which is ca. 33.33%). Horizontal lines will
 * be added is such position that their center would be on 600*(1/3)=200 and 600*(1-(1/3))=600*(2/3)=400
 * pixel accordingly. Vertical lines: 800*1/3=266.66 and 800*2/3=533.33 pixel (fractial pixel value is 
 * possible when using vectors).
 *
 * Line thickness is calculated as stripSize*100% of shorter image edge. For example, suppose that image
 * dimentions are (width, height)=(800,600) and stripSize=0.012 (which is 1.2%) Then both horisontal
 * and vertical lines thickness is min(800,600)*0.012=600*0.012=7.2px. Nothe that strip WILL be at least 1px
 * thick, even if computed thickness is lower than 1px.
 */
GoldenCrop.prototype.makeStrips = function( position, stripSize, color ) {

	Stdlib.createSolidFillLayer(color);
	Stdlib.removeLayerMask(); // no error if there is no (raster) mask
	var StripLayer = this.doc.activeLayer;
	
	Stdlib.addVectorMask(true); // true => 'hide all' mode
	
	const oneMinusPosition = 1 - position;
	const docWidth  = this.doc.width.as("px"),
		  docHeight = this.doc.height.as("px");
	const halfStripSize = Math.max(1,Math.min(docWidth, docHeight) * stripSize) / 2;
	
	// add horizontal strips
	var tmp = docHeight*position;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, tmp-halfStripSize, 0, tmp+halfStripSize, docWidth);
	tmp = docHeight*oneMinusPosition;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, tmp-halfStripSize, 0, tmp+halfStripSize, docWidth);

	// add vertical strips
	tmp = docWidth*position;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, 0, tmp-halfStripSize, docHeight, tmp+halfStripSize);
	tmp = docWidth*oneMinusPosition;
	Stdlib.rectPath( ShapeOperation.SHAPEADD, Units.PIXELS, 0, tmp-halfStripSize, docHeight, tmp+halfStripSize);
	
	return StripLayer;
}



/*
 * Create diagonal strip with perpendicular strips connecting it to other two corners
 *   [in] direction | true  - line going form bottom left to top right (upwards)
 *                    false - line going form top left to bottom right (downwards)
 *   [in] stripSize | from range (0.0, 1.0)  - how thick single strip should be
 *   [in] color     | instance of SolidColor - fill color of the strip
 *
 * Returns: instance of ArtLayer (color fill) -- object representing fill layer with vector mask
 *                                               with diagonal strips
 * 
 * Adds three strips (lines) using Solid Color fill layer and vector mask. First one is connecting 
 * oposite corners. Other two are connecting first strip to the other two corners. Lines 1,2 and 1,3
 * are perpendicular.
 *
 * Line thickness is calculated as stripSize*100% of shorter image edge. For example, suppose that image
 * dimentions are (width, height)=(800,600) and stripSize=0.012 (which is 1.2%) Then both horisontal
 * and vertical lines thickness is min(800,600)*0.012=600*0.012=7.2px. Nothe that strip WILL be at least 1px
 * thick, even if computed thickness is lower than 1px.
 */
GoldenCrop.prototype.makeDiagStrip = function( direction, stripSize, color ) {
	Stdlib.createSolidFillLayer(color);
	Stdlib.removeLayerMask();
	var layer = this.doc.activeLayer;
	Stdlib.addVectorMask(true);	
	
	const docWidth  = this.doc.width.as("px"),
		  docHeight = this.doc.height.as("px");
	const stripSizePx = Math.min(docWidth, docHeight) * stripSize;

	var w = docWidth,
	    h = docHeight;
	
	if (direction) {
		// left-2-right
		Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSizePx, 0, h, w, 0);
		var x = h/((w/h)+(h/w)),
	        y = (w/h)*x;
	    Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSizePx, 0, 0, x, y);
		    x = (w*(w/h))/((w/h)+(h/w)),
	        y = (-h/w)*x + h;
	    Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSizePx, x, y, w, h);
	} else {
		// right-2-left
		Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSizePx, 0, 0, w, h);
		var x = (h/((w/h)+(h/w))),
	        y = (w/h)*x;
			x=w-x;
	    Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSizePx, w, 0, x, y);
		    x = (w*(w/h))/((w/h)+(h/w)),
	        y = (-h/w)*x + h;
			x=w-x;
	    Stdlib.linePath(ShapeOperation.SHAPEADD, Units.PIXELS, stripSizePx, x, y, 0, h);
	}
	
	/* 
		Normalize -- make sure that whole path is contained by image frame (esp. corner problem)	
		
		       / \
	          /---\---- - part of diagonal line is outside of image frame
			  \|   \
			   \    \
			   |\
	    make it to be inside
	           ---.----- - part of diagonal line is outside of image frame
			   | / \
			   |/   \
			   |\    \

    */
	/* // Get size from selection doesn't work (it's clipped to document boundaries)
	Stdlib.loadVectorMaskSelection();
	var layerW = (this.doc.selection.bounds[2]-this.doc.selection.bounds[0]).as("px"),
	    layerH = (this.doc.selection.bounds[3]-this.doc.selection.bounds[1]).as("px");
	doc.selection.deselect();
	layer.resize(docWidth/layerW*100, docHeight/layerH*100, AnchorPosition.MIDDLECENTER);
	//*/
	//* // Get size from layer bounds works fine
	var layerW = (layer.bounds[2]-layer.bounds[0]).as("px"),
	    layerH = (layer.bounds[3]-layer.bounds[1]).as("px");
	layer.resize(docWidth/layerW*100, docHeight/layerH*100, AnchorPosition.MIDDLECENTER);
	//*/
	return layer;
}

/*
 * Applies "strip" layer styles (drop shadow) on active layer
 * Returns: void
 * Spetialized function for srtip effect.
 */
GoldenCrop.prototype.applyStripFX = function() {
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


/*
 * Creates grid of dividing lines: one-third rule, golden rule, golden diagonal rule (both diagonals)
 * [*] denotes optional parameter
 *   [in][*] basicStripSize | from range (0.0, 1.0) -- basic thickness of a strip (as part of shorter edge)
 *   [in][*] maskOpacity    | integer from range [0,100] -- opacity of mask (hiding outside of selected display frame)
 *   [in][*] colors	     | Array of instances of SolidColor -- colors of mask and strips (for each dividing rule)
 *   [in][*] stripsThickScale | Array of doubles -- the multiple of basic thickness (for each dividing rule)
 * 
 * basicStripSize -- default value: 0.01 (1%)
 * maskOpacity -- default value: 70
 * colors -- default value: mask color: #000
 *                          golden rule: #000
 *                          one-third rule: #333
 *                          golden diagonal rule (up): #F00
 *                          golden diagonal rule (down): #00F
 * stripsThickScale -- default value: 
 *                          golden rule: 1
 *                          one-third rule: 1/2
 *                          golden diagonal rule (up): 1/3
 *                          golden diagonal rule (down): 1/3
 * Returns: void
*/
GoldenCrop.prototype.makeGrid = function(basicStripSize, maskOpacity, colors, stripsThickScale) {
	if (!basicStripSize) {
		basicStripSize = .01; // 1%
	}
	if (!maskOpacity) {
		maskOpacity = 70;
	}
	if (!colors) {
		colors = [Stdlib.createRGBColor(0,0,0), Stdlib.createRGBColor(0,0,0), Stdlib.createRGBColor(0x33,0x33,0x33), Stdlib.createRGBColor(255,0,0), Stdlib.createRGBColor(0,0,255)];
	}
	if (!stripsThickScale) {
		stripsThickScale = [1, 1/2, 1/3, 1/3];
	}

	//this.gCrop = this.doc.layerSets.add();
	//this.gCrop.name = "Golden Crop by SzopeN";
	
	// Add crop-mask
	Stdlib.createSolidFillLayer(colors[0]);
	Stdlib.removeLayerMask();
	this.outerFrame = this.doc.activeLayer;
	Stdlib.addVectorMask(true);
	Stdlib.rectPath( ShapeOperation.SHAPESUBTRACT, Units.PERCENT, 0,0,100,100);
	//this.doc.activeLayer.opacity = maskOpacity;
	
	// Add dividing rules
	//this.gCropDivRules = this.gCrop.layerSets.add();
	//this.gCropDivRules.name = "Dividing rules";
	// ----- Golden rule
	const phi = (Math.sqrt(5)-1)/2; // Inv Golden number, ca. 0.6180339887498948482045868343656
	this.phiStrips = this.makeStrips(phi, basicStripSize*stripsThickScale[0], colors[1]);
	this.applyStripFX();
	this.doc.activeLayer.opacity = 90;
	// ----- One-third rule
	const third = 1.0/3;
	this.thirdStrips = this.makeStrips(third, basicStripSize*stripsThickScale[1], colors[2]);
	this.applyStripFX();
	this.doc.activeLayer.opacity = 90;
	// ----- Golden diagonal rule (up)
	this.diagGoldUp = this.makeDiagStrip(true, basicStripSize*stripsThickScale[2], colors[3]);
	this.applyStripFX();
	//this.doc.activeLayer.opacity = 90;
	// ----- Golden diagonal rule (down)
	this.diagGoldDown = this.makeDiagStrip(false, basicStripSize*stripsThickScale[3], colors[4]);
	this.applyStripFX();
	this.doc.activeLayer.opacity = 90;
}

/*
 * Activate user-interactive free transform mode and check results.
 * *** BLOCKING FUNCTION ***
 * Returns: void
 * If the user accepted the transformation -- ask user to choose crop method
 * If the user cancelled the transformation -- do not crop but keep all created layers
 */
GoldenCrop.prototype.freeTransform = function() {
	this.doc.activeLayer = this.gCrop;
	var dialogMode = app.displayDialogs;
	app.displayDialogs = DialogModes.ALL;
    var debugLevel = $.level; // save debug level
    $.level = 0;              // turn off debugging
	try {
		Stdlib.userGoToFreeTransform();
	} catch (e) {
		this.doCrop = false;
		return;
	} finally {
		app.displayDialogs = dialogMode;
	}
    $.level = debugLevel; // restore debug level
	this.doCrop = true;
}

/*
 * 
 */
GoldenCrop.prototype.simpleCrop = function() {
	this.doc.activeLayer = this.outerFrame;
	Stdlib.loadVectorMaskSelection(); // could be empty but it is no problem
	if ( Stdlib.hasSelection() ) {
		this.doc.selection.invert();
		// crop to selection
		executeAction( charIDToTypeID( "Crop" ), new ActionDescriptor(), DialogModes.NO );
		this.doc.selection.deselect();
	}
	this.gCrop.remove();
}

GoldenCrop.prototype.maskOutCrop = function() {
	this.outerFrame.opacity = 100;
	this.doc.activeLayer = this.gCropDivRules;
	this.doc.activeLayer.visible = false
	/*
	this.phiStrips.remove();
	this.thirdStrips.remove();
	this.diagGoldUp.remove();
	this.diagGoldDown.remove();
	*/
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

GoldenCrop.prototype.doRevealPopBackround = function() {
	var docW = this.doc.width.as("px"),
	    docH = this.doc.height.as("px");
	var cb = this.cropBounds;
	
	var addTop    = Math.max(-cb[1],0),
	    addLeft   = Math.max(-cb[0],0),
		addBottom = Math.max(cb[3]-docH,0),
		addRight  = Math.max(cb[2]-docW,0);

	if ( Stdlib.hasBackground(this.doc) ) {
		this.bgLayer = this.doc.backgroundLayer;
		this.bgLayer.isBackgroundLayer = false;
		this.bgLayer.name = "Background on layer";
		this.backgroundFill = Stdlib.createSolidFillLayer(app.foregroundColor);
		this.backgroundFill.name = "Background fill";
		Stdlib.removeLayerMask();
		this.backgroundFill.move(this.bgLayer, ElementPlacement.PLACEAFTER);
	}
	
	this.doc.resizeCanvas(new UnitValue(docW+addLeft,"px"),new UnitValue(docH+addTop,"px"),AnchorPosition.BOTTOMRIGHT);
	this.doc.resizeCanvas(new UnitValue(docW+addLeft+addRight,"px"),new UnitValue(docH+addTop+addBottom,"px"),AnchorPosition.TOPLEFT);
	this.doc.activeLayer = this.gCrop;
}

GoldenCrop.prototype.chooseOutsideCropAction = function() {
	var cb = this.cropBounds = Stdlib.getVectorMaskBounds_cornerPointsOnly(true, this.doc, this.outerFrame);
	var docW = this.doc.width.as("px"),
	    docH = this.doc.height.as("px");
	if ( ! (cb[0] < 0 || cb[1] < 0 || cb[2] > docW || cb[3] > docH )) {
		return 0; // no outside crop
	}

	if ( cb[0] <= 0 && cb[1] <= 0 && cb[2] >= docW && cb[3] >= docH ) {
		// if there's no cropping no confirmation is needed
		this.onlyReveal = true;
	} else {
		// choose whether extend canvas before cropping
		if ( !confirm("Do outside cropping (YSE), or crop without extending canvas (NO)") ) {
			return 0;
		}
	}

	return('doRevealPopBackround()');
}

GoldenCrop.prototype.go = function() {
	with ( this ) {
		doc.suspendHistory(szAppName + " - grid", 'makeGrid()');
		Stdlib.NOP();
		doc.suspendHistory(szAppName + " - resize", 'freeTransform()');
		Stdlib.NOP();
		if (this.doCrop) {
			var croppingOutsideFrameFunction = this.chooseOutsideCropAction();
			var cropFunction = null;
			if (!this.onlyReveal)
				var cropFunction = this.chooseCropMethod();
			if (this.doCrop) {
				if (croppingOutsideFrameFunction) {
					doc.suspendHistory(szAppName + " - reveal", croppingOutsideFrameFunction);
					Stdlib.NOP();
				}
				if (!this.onlyReveal) {
					doc.suspendHistory(szAppName + " - crop", cropFunction);
					Stdlib.NOP();
				}
			}
		} else {
			// remove resize entry from history -- it does nothing
			executeAction( charIDToTypeID( "undo" ), undefined, DialogModes.NO );
		}
	}
}

GoldenCrop.prototype._unused_function__MakeBogusLayer = function() {
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


GoldenCrop.prototype._unused_function__fillFullCanvas = function() {
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

function main() {
	var gc = new GoldenCrop( app.activeDocument );
	gc.makeGrid();
	//gc.go();
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
// 
// Simple checks for photoshop version 
// 
var psVersion; 
try { 
  var lvl = $.level; 
  $.level = 0; 
  psVersion = app.version; 

 } catch (e) { 
  psVersion = version; 

 } finally { 
   $.level = lvl; 
   delete lvl; 
} 

// see XBridgeTalk for more comprehensive isCSX handling 
// if (!global["isCS3"]) { 
//   isCS3 = function()  { return psVersion.match(/^10\./) != null; }; 
// } 
// if (!global["isCS2"]) { 
//   isCS2 = function()  { return psVersion.match(/^9\./) != null; }; 
// } 
isCS4 = function()  { return psVersion.match(/^11\./) != null; }; 
isCS3 = function()  { return psVersion.match(/^10\./) != null; }; 
isCS2 = function()  { return psVersion.match(/^9\./) != null; }; 
isCS  = function()  { return psVersion.match(/^8\./) != null; }; 
isPS7 = function()  { return psVersion.match(/^7\./) != null; }; 

if (isPS7()) {  // this does not work for eval-includes 
  app = this; 
}

cTID_global_array = new Array();
cTID = function(s) { return cTID_global_array[s] || cTID_global_array[s]=app.charIDToTypeID(s); };
sTID_global_array = new Array();
sTID = function(s) { return sTID_global_array[s] || sTID_global_array[s]=app.stringIDToTypeID(s); };

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

Stdlib.wrapLCLayer = function(doc, layer, ftn) {
  var ad = app.activeDocument;
  if (doc) {
    if (ad != doc) {
      app.activeDocument = doc;
    }
  } else {
    doc = ad;
  }
  
  var al = doc.activeLayer;
  var alvis = al.visible;

  if (layer && doc.activeLayer != layer) {
    doc.activeLayer = layer;
  } else {
    layer = doc.activeLayer;
  }

  var res = undefined;

  try {
    res = ftn(doc, layer);

  } finally {
    if (doc.activeLayer != al) {
      doc.activeLayer = al;
    }
    if (!doc.activeLayer.isBackgroundLayer) {
      doc.activeLayer.visible = alvis;
    }

    if (app.activeDocument != ad) {
      app.activeDocument = ad;
    }
  }

  return res;
};

// by Damian SzopeN Sepczuk <damian[d0t]sepczuk[a7]o2{do7}pl> 
// [in] round (bool) -- whether returned values should be rounded to the nearest pixel, def: false 
// [in] doc -- document containing layer with vector mask 
// [in] layer -- layer with vector mask 
// returns array [left, top, right, bottom, width, height] 
Stdlib.getVectorMaskBounds_cornerPointsOnly = function(round, doc, layer) { 
  round = !!round; 
  function _ftn() { 
    var ref = new ActionReference(); 
    ref.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') ); 
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt")); 
    var vMaskDescr = executeActionGet(ref); 
    var pathContents = vMaskDescr.getObjectValue(sTID('pathContents')); 
    var pathList = pathContents.getList(sTID('pathComponents')); 

    // for each path in current layer 
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity; 
    // using separate variables gives speed gain 
    var _id1 = sTID("subpathListKey"), 
        _id2 = sTID("points"), 
        _id3 = sTID("anchor"), 
        _id4 = sTID('horizontal'), 
        _id5 = sTID('vertical'); 
       
    for ( cPath=0; cPath<pathList.count; ++cPath ) 
    { 
      var curPath = pathList.getObjectValue(cPath).getList(_id1); 
      var points = curPath.getObjectValue(0).getList(_id2); 
      // for each point 
      for (cPoint=0; cPoint < points.count; ++cPoint ) 
      {    
        var point = points.getObjectValue(cPoint).getObjectValue(_id3); 
        var x = point.getUnitDoubleValue(_id4); 
        var y = point.getUnitDoubleValue(_id5); 
        if ( x < minX ) minX = x; // it is faster than if/else block (benchmarked on PSCS4) 
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
  var bnds = Stdlib.wrapLCLayer(doc, layer, _ftn); 
  return bnds; 
}

if ( isCS4() || isCS3() ) { 
	// SzopeN's version -- do NOT use history (becouse it can be suspended!)
	Stdlib.hasSelection = function(doc) {
	  var debugLevel = $.level; // save debug level
	  $.level = 0; // turn off debugging
	  var res = true;
	  try {
		  activeDocument.selection.bounds // throws if there's no selection
	  } catch(e) {
		  res = false; // error thrown => no selection
	  }
	  $.level = debugLevel; // restore debug level
	  return res;
	};
} else { 
  Stdlib.hasSelection = function(doc) { 
    var res = false; 
    var as = doc.activeHistoryState; 
    doc.selection.deselect(); 
    if (as != doc.activeHistoryState) { 
      res = true; 
      doc.activeHistoryState = as; 
    } 
    return res; 
  }; 
};

Stdlib.hasBackground = function(doc) {
   return doc.layers[doc.layers.length-1].isBackgroundLayer;
}
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
