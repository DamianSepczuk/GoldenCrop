#include 'z:/queue/xtools/xlib/PSConstants.js'
#include 'z:/queue/xtools/xlib/stdlib.js'

// ============================== Function redefinitions
Stdlib.makeSelectionFromPath = function(doc, pathName) {
  function _ftn() {
    var desc89 = new ActionDescriptor();
    var ref79 = new ActionReference();
    ref79.putProperty( cTID('Chnl'), cTID('fsel') );
    desc89.putReference( cTID('null'), ref79 );
    var ref80 = new ActionReference();
    ref80.putEnumerated( cTID('Path'), cTID('Ordn'), cTID('Trgt') );
    desc89.putReference( cTID('T   '), ref80 );
    desc89.putBoolean( cTID('AntA'), true );
    desc89.putUnitDouble( cTID('Fthr'), cTID('#Pxl'), 0.000000 );
    executeAction( cTID('setd'), desc89, DialogModes.NO );
  };
  if (pathName) Stdlib.makePathActive(doc, pathName); // work on current path
  Stdlib.wrapLC(doc, _ftn);
};
// ============================== Function redefinitions END

Stdlib.restrictChannelsEnum = { none:0, red:1, green:2, blue:4, cyan:8, magenta:16, yellow:32, black:64, L:128, A:256, B:512 };
Stdlib.layerColorsEnum = {none: 'None', red: 'Rd  ', orange: 'Orng', yellow: 'Ylw ', green: 'Grn ', blue: 'Bl  ', violet: 'Vlt ', gray: 'Gry '};
Stdlib.blendModesEnum = {passThrough: 'passThrough', normal: 'normal', dissolve: 'dissolve', darken: 'darken', multipl: 'multipl', colorBurn: 'colorBurn', linearBurn: 'linearBurn', darkerColor: 'darkerColor', lighten: 'lighten', screen: 'screen', colorDodge: 'colorDodge', linearDodge: 'linearDodge', lighterColor: 'lighterColor', overlay: 'overlay', softLight: 'softLight', hardLight: 'hardLight', vividLight: 'vividLight', linearLight: 'linearLight', pinLight: 'pinLight', hardMix: 'hardMix', difference: 'difference', exclusion: 'exclusion', hue: 'hue', saturation: 'saturation', color: 'color', luminosity: 'luminosity'};
Stdlib.maskModesEnum = {noMask:false, revealAll:1, hideAll:2, revealSelection:3, hideSelection:4, revealPath:5, hidePath:6}
/*
 * Creates a group using low-lwvel functions
 * [in*] name: String -- group name, def: auto PS name
 * [in*] opacity: Integer from range [0,100] -- group opacity, def: 100
 * [in*] color: enum Stdlib.layerColorsEnum -- color of group (on layers panel), def: Stdlib.layerColorsEnum.none
 * [in*] blandMode: enum Stdlib.blendModesEnum -- bledning mode of the group, def: Stdlib.blendModesEnum.passThrough
 * Returns void 
 * Remark: It is faster than standard API at least in CS4.
 * Remark: Do not pass an argument or pass undefined to get default value
 * Example: Stdlib.createLayerGroup('my group', 50, Stdlib.layerColorsEnum.red, Stdlib.blendModesEnum.passThrough);
 */
Stdlib.createLayerGroup = function(name, opacity, color, blendMode, userMask, vectorMask, restrictChannels) {
	var doc = app.activeDocument;
	// Make layer
	var idMk = charIDToTypeID( "Mk  " );
		var desc54 = new ActionDescriptor();
		
		var idnull = charIDToTypeID( "null" );
			var ref49 = new ActionReference();
			var idlayerSection = stringIDToTypeID( "layerSection" );
			ref49.putClass( idlayerSection );
		desc54.putReference( idnull, ref49 );
		
		var idUsng = charIDToTypeID( "Usng" );
			var desc55 = new ActionDescriptor();
			if (name) {
				desc55.putString( charIDToTypeID( "Nm  " ), name );
			}
			if (opacity) {
				desc55.putUnitDouble( charIDToTypeID( "Opct" ), charIDToTypeID( "#Prc" ), opacity );
			}
			if (color) {
				desc55.putEnumerated( charIDToTypeID( "Clr " ), charIDToTypeID( "Clr " ), charIDToTypeID( color ) );
			}
			if (blendMode) {
				desc55.putEnumerated( charIDToTypeID( "Md  " ), charIDToTypeID( "BlnM" ), charIDToTypeID( "Nrml" ) );
			}
		desc54.putObject( idUsng, stringIDToTypeID( "layerSection" ), desc55 );
	executeAction( idMk, desc54, DialogModes.NO );
	if ( userMask ) {
		var desc = new ActionDescriptor();
		desc.putClass(cTID("Nw  "), cTID("Chnl"));
		var ref = new ActionReference();
		ref.putEnumerated(cTID("Chnl"), cTID("Chnl"), cTID("Msk "));
		desc.putReference(cTID("At  "), ref);
		switch ( userMask ) {
			case Stdlib.maskModesEnum.revealAll:
				desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("RvlA"));
				break;
			case Stdlib.maskModesEnum.hideAll:
				desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("HdAl"));
				break;
			case Stdlib.maskModesEnum.revealPath:
				Stdlib.makeSelectionFromPath();
				// NO BREAK
			case Stdlib.maskModesEnum.revealSelection:
				desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("RvlS"));
				break;
			case Stdlib.maskModesEnum.hidePath:
				Stdlib.makeSelectionFromPath();
				doc.selection.invert();
				// NO BREAK
			case Stdlib.maskModesEnum.hideSelection:
				desc.putEnumerated(cTID("Usng"), cTID("UsrM"), cTID("HdSl"));
				break;

		}
		executeAction(cTID("Mk  "), desc, DialogModes.NO);
	}
	if ( vectorMask ) {
		var idMk = charIDToTypeID( "Mk  " );
			var desc287 = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
				var ref145 = new ActionReference();
				ref145.putClass( charIDToTypeID( "Path" ) );
			desc287.putReference( idnull, ref145 );
			var idAt = charIDToTypeID( "At  " );
				var ref146 = new ActionReference();
				var idPath = charIDToTypeID( "Path" );
				ref146.putEnumerated( idPath, idPath, stringIDToTypeID( "vectorMask" ) );
			desc287.putReference( idAt, ref146 );
			
		switch ( vectorMask ) {
			case Stdlib.maskModesEnum.revealAll:
				desc287.putEnumerated( charIDToTypeID( "Usng" ), stringIDToTypeID( "vectorMaskEnabled" ), charIDToTypeID( "RvlA" ) );
				break;
			case Stdlib.maskModesEnum.hideAll:
				desc287.putEnumerated( charIDToTypeID( "Usng" ), stringIDToTypeID( "vectorMaskEnabled" ), charIDToTypeID( "HdAl" ) );
				break;
			case Stdlib.maskModesEnum.revealSelection:
				Stdlib.makeWorkPath();
				desc287.putEnumerated( charIDToTypeID( "Usng" ), stringIDToTypeID( "vectorMaskEnabled" ), charIDToTypeID( "RvlA" ) );
				break;
			case Stdlib.maskModesEnum.hideSelection:
				Stdlib.makeWorkPath();
				desc287.putEnumerated( charIDToTypeID( "Usng" ), stringIDToTypeID( "vectorMaskEnabled" ), charIDToTypeID( "HdAl" ) );
				break;
			case Stdlib.maskModesEnum.revealPath:
					var ref171 = new ActionReference();
					ref171.putEnumerated( charIDToTypeID( "Path" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
				desc591.putReference( charIDToTypeID( "Usng" ), ref171 );
				break;
			case Stdlib.maskModesEnum.hidePath:
				// TO DO
				throw new Error("Operation Stdlib.maskModesEnum.hidePath not implemented in vector mask yet!");
				break;
		}
		executeAction( idMk, desc287, DialogModes.NO );
	}

	// Restrict channels
	if ( restrictChannels ) {
		var idsetd = charIDToTypeID( "setd" );
			var desc162 = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
				var ref126 = new ActionReference();
				ref126.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
			desc162.putReference( idnull, ref126 );
			var idT = charIDToTypeID( "T   " );
				var desc163 = new ActionDescriptor();
				var idchannelRestrictions = stringIDToTypeID( "channelRestrictions" );
					var idChnl = charIDToTypeID( "Chnl" );
					var list3 = new ActionList();

					if ( restrictChannels & Stdlib.restrictChannelsEnum.red ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Rd  ' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.green ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Grn ' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.blue ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Bl  ' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.cyan ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Cyn ' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.magenta ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Mgnt' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.yellow ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Yllw' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.black ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Blck' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.L ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'Lght' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.A ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'A   ' ) );
					}
					if ( restrictChannels & Stdlib.restrictChannelsEnum.B ) {
						list3.putEnumerated( idChnl, charIDToTypeID( 'B   ' ) );
					}
				desc163.putList( idchannelRestrictions, list3 );
			var idLyr = charIDToTypeID( "Lyr " );
			desc162.putObject( idT, idLyr, desc163 );
		executeAction( idsetd, desc162, DialogModes.NO );
	}
}
// (5741253+5794024+5742754+6282598+6189338+6336999)/6=6014494
// Remark: number of layers DO affect efficiency
function testCaseAPI() {
	doc = activeDocument;
	for (var i=1; i<=10; ++i) {
		var g = doc.layerSets.add();
		g.name = "Group " + i;
		g.opacity = 10*i;
	}
}

// (2584210+2690405+2611021+2578396+2678819+2675477)/6=2636388
// Remark: number of layers do NOT affect efficiency
// Conclusion: 56,16% faster than AIP version
function testCaseStdlib() {
	for (var i=1; i<=10; ++i) {
		Stdlib.createLayerGroup("Group " + i,10*i);
	}
}

// first 3 tests
testCaseStdlib();
testCaseStdlib();
testCaseStdlib();
testCaseAPI();
testCaseAPI();
testCaseAPI(); //*/

// next 3 tests
/*testCaseStdlib();
testCaseStdlib();
testCaseStdlib();
testCaseAPI();
testCaseAPI();
testCaseAPI(); //*/
