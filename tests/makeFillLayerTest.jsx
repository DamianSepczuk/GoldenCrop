#include 'z:/queue/xtools/xlib/PSConstants.js'
#include 'z:/queue/xtools/xlib/stdlib.js'
$.level = 1;
Stdlib.restrictChannelsEnum = { none:0, red:1, green:2, blue:4, cyan:8, magenta:16, yellow:32, black:64, L:128, A:256, B:512 };
Stdlib.colorsEnum = {none: 'None', red: 'Rd  ', orange: 'Orng', yellow: 'Ylw ', green: 'Grn ', blue: 'Bl  ', violet: 'Vlt ', gray: 'Gry '};
Stdlib.blendModesEnum = {passThrough: 'passThrough', normal: 'normal', dissolve: 'dissolve', darken: 'darken', multipl: 'multipl', colorBurn: 'colorBurn', linearBurn: 'linearBurn', darkerColor: 'darkerColor', lighten: 'lighten', screen: 'screen', colorDodge: 'colorDodge', linearDodge: 'linearDodge', lighterColor: 'lighterColor', overlay: 'overlay', softLight: 'softLight', hardLight: 'hardLight', vividLight: 'vividLight', linearLight: 'linearLight', pinLight: 'pinLight', hardMix: 'hardMix', difference: 'difference', exclusion: 'exclusion', hue: 'hue', saturation: 'saturation', color: 'color', luminosity: 'luminosity'};
Stdlib.maskModesEnum = {noMask:false, revealAll:1, hideAll:2, revealSelection:3, hideSelection:4, revealPath:5, hidePath:6}

// ============================== Function redefinitions
Stdlib.layerColorsEnum = {none: 'None', red: 'Rd  ', orange: 'Orng', yellow: 'Ylw ', green: 'Grn ', blue: 'Bl  ', violet: 'Vlt ', gray: 'Gry '}; 
Stdlib.blendModesEnum = {passThrough: 'passThrough', normal: 'normal', dissolve: 'dissolve', darken: 'darken', multipl: 'multipl', colorBurn: 'colorBurn', linearBurn: 'linearBurn', darkerColor: 'darkerColor', lighten: 'lighten', screen: 'screen', colorDodge: 'colorDodge', linearDodge: 'linearDodge', lighterColor: 'lighterColor', overlay: 'overlay', softLight: 'softLight', hardLight: 'hardLight', vividLight: 'vividLight', linearLight: 'linearLight', pinLight: 'pinLight', hardMix: 'hardMix', difference: 'difference', exclusion: 'exclusion', hue: 'hue', saturation: 'saturation', color: 'color', luminosity: 'luminosity'}; 

/* 
 * Creates a solid fill layer using low-level functions 
 * [in*] name: String -- layer name, def: auto PS name 
 * [in*] opacity: Integer from range [0,100] -- layer opacity, def: 100 
 * [in*] color: enum Stdlib.layerColorsEnum -- color of layer (on layers panel), def: Stdlib.layerColorsEnum.none 
 * [in*] blandMode: enum Stdlib.blendModesEnum -- blending mode of the layer, def: Stdlib.blendModesEnum.normal 
 * Returns void 
 * Remark: It is faster than standard API at least in CS4. 
 * Remark: Do not pass an argument or pass undefined to get default value 
 * Example: Stdlib.createLayerGroup('my group', 50, Stdlib.layerColorsEnum.red, Stdlib.blendModesEnum.passThrough); 
 */ 
Stdlib.createSolidFillLayer = function(doc, color, name, opacity, layerColor, blendMode, clipToPrevious) { 
  // in original createSolidFillLayer author forgot to add 'doc' argument ;) 
  // add it w/o braking compatibility 
  if(doc instanceof SolidColor) { 
     color=doc; doc=app.activeDocument}; 
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
      tdesc.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( blendMode ) ); 
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
// ============================== Function redefinitions END

// (7258418+7289173+7138296+10416049+10483223+10368110)/6=8825545
// Remark: number of layers DO affect efficiency
doc = activeDocument;
function testCaseAPI() {
	for (var i=1; i<=10; ++i) {
		Stdlib.createSolidFillLayer(doc, Stdlib.createRGBColor(0,255,0));
		var g = doc.activeLayer;
		g.name = "Fill " + i;
		g.opacity = 10*i;
	}
}

// (5114606+4017009+4198933+3083992+3119524+2943980)/6=3746340
// Remark: number of layers do NOT affect efficiency
// Conclusion: 57,55% faster than AIP version
function testCaseStdlib() {
	for (var i=1; i<=10; ++i) {
		Stdlib.createSolidFillLayer_new(doc, Stdlib.createRGBColor(255,0,0), "Fill " + i,10*i);
		var g = doc.activeLayer;
	}
}

// first 3 tests
/*
testCaseAPI();
testCaseAPI();
testCaseAPI();
testCaseStdlib();
testCaseStdlib();
testCaseStdlib(); //*/

// next 3 tests
//*
testCaseStdlib();
testCaseStdlib();
testCaseStdlib();
testCaseAPI();
testCaseAPI();
testCaseAPI(); //*/
