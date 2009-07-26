// ---------------------------------------------------------------------
// Between ===START: stdlib.js=== and ===END: stdlib.js===, there is my
// modified (stripped and extended) version o xbytor's stdlib from xtools.
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
        var idnull = cTID( "null" );
            var ref47 = new ActionReference();
            var idPath = cTID( "Path" );
            var idOrdn = cTID( "Ordn" );
            var idTrgt = cTID( "Trgt" );
            ref47.putEnumerated( idPath, idOrdn, idTrgt );
        desc90.putReference( idnull, ref47 );
        var idT = cTID( "T   " );
            var desc91 = new ActionDescriptor();
            var idStrt = cTID( "Strt" );
                var desc92 = new ActionDescriptor();
                var idHrzn = cTID( "Hrzn" );
                var idPxl = pathUnit;
                desc92.putUnitDouble( idHrzn, idPxl, x1 );
                var idVrtc = cTID( "Vrtc" );
                var idPxl = pathUnit;
                desc92.putUnitDouble( idVrtc, idPxl, y1 );
            var idPnt = cTID( "Pnt " );
            desc91.putObject( idStrt, idPnt, desc92 );
            var idEnd = cTID( "End " );
                var desc93 = new ActionDescriptor();
                var idHrzn = cTID( "Hrzn" );
                var idPxl = pathUnit;
                desc93.putUnitDouble( idHrzn, idPxl, x2 );
                var idVrtc = cTID( "Vrtc" );
                var idPxl = pathUnit;
                desc93.putUnitDouble( idVrtc, idPxl, y2 );
            var idPnt = cTID( "Pnt " );
            desc91.putObject( idEnd, idPnt, desc93 );
            var idWdth = cTID( "Wdth" );
            var idPxl = pathUnit;
            desc91.putUnitDouble( idWdth, idPxl, width );
        var idLn = cTID( "Ln  " );
        desc90.putObject( idT, idLn, desc91 );
    executeAction( idAddT, desc90, DialogModes.NO );
}
// by SzopeN
Stdlib.userGoToFreeTransform = function() {
        function preMove() {
            var desc = new ActionDescriptor();
            var lref = new ActionReference();
            lref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
            desc.putReference(cTID("null"), lref);
            desc.putEnumerated(cTID("FTcs"), cTID("QCSt"), cTID("Qcsa"));
                 var desc75 = new ActionDescriptor();
                 desc75.putUnitDouble( cTID('Hrzn'), cTID('#Pxl'), 1.000000 );
                 desc75.putUnitDouble( cTID('Vrtc'), cTID('#Pxl'), 1.000000 );
            desc.putObject( cTID('Ofst'), cTID('Ofst'), desc75 );
            executeAction(cTID("Trnf"), desc, DialogModes.NO);
        }
        function retPostMoveDesc() {
            var desc = new ActionDescriptor();
            var lref = new ActionReference();
            lref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
            desc.putReference(cTID("null"), lref);
            desc.putEnumerated(cTID("FTcs"), cTID("QCSt"), cTID("Qcsa"));
                 var desc75 = new ActionDescriptor();
                 desc75.putUnitDouble( cTID('Hrzn'), cTID('#Pxl'), -1.000000 );
                 desc75.putUnitDouble( cTID('Vrtc'), cTID('#Pxl'), -1.000000 );
            desc.putObject( cTID('Ofst'), cTID('Ofst'), desc75 );
            return desc;
        }
        var state = true;
        preMove();

        var lvl = $.level;
        $.level = 0;
        try {
          executeAction(cTID("Trnf"), retPostMoveDesc(), DialogModes.ALL);///ALL
        } catch (e) {
          state = false;
          // $.writeln('' + new Date() + '-------> ' + $.level);
          if (e.number != 8007) { // if not "User cancelled"
            throw e;
          }
          executeAction(cTID("Trnf"), retPostMoveDesc(), DialogModes.NO);
        } finally {
          $.level = lvl;
        }
    
    return state;
}

// by SzopeN
// heplful with multiple suspendHistory
// is there a better candidate?
Stdlib.NOP = function() {
    activeDocument = activeDocument;
    /*
    executeAction( cTID( "undo" ), undefined, DialogModes.NO );
    executeAction( cTID( "undo" ), undefined, DialogModes.NO );
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

Stdlib.wrapLC = function(doc, ftn) {
  var ad = app.activeDocument;
  if (doc) {
    if (ad != doc) {
      app.activeDocument = doc;
    }
  } else {
    doc = ad;
  }

  var res = undefined;
  try {
    res = ftn(doc);
  } finally {
    if (ad && app.activeDocument != ad) {
      app.activeDocument = ad;
    }
  }

  return res;
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

if ( isCS4() || isCS3() ) { 
    // SzopeN's version -- do NOT make use of history (because it can be suspended!)
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

Stdlib.restrictChannelsEnum = { none:0, red:1, green:2, blue:4, cyan:8, magenta:16, yellow:32, black:64, L:128, A:256, B:512 };
Stdlib.colorsEnum = {none: 'None', red: 'Rd  ', orange: 'Orng', yellow: 'Ylw ', green: 'Grn ', blue: 'Bl  ', violet: 'Vlt ', gray: 'Gry '};
Stdlib.blendModesEnum = {passThrough: 'passThrough', normal: 'normal', dissolve: 'dissolve', darken: 'darken', multipl: 'multipl', colorBurn: 'colorBurn', linearBurn: 'linearBurn', darkerColor: 'darkerColor', lighten: 'lighten', screen: 'screen', colorDodge: 'colorDodge', linearDodge: 'linearDodge', lighterColor: 'lighterColor', overlay: 'overlay', softLight: 'softLight', hardLight: 'hardLight', vividLight: 'vividLight', linearLight: 'linearLight', pinLight: 'pinLight', hardMix: 'hardMix', difference: 'difference', exclusion: 'exclusion', hue: 'hue', saturation: 'saturation', color: 'color', luminosity: 'luminosity'};
Stdlib.maskModesEnum = {noMask:false, revealAll:1, hideAll:2, revealSelection:3, hideSelection:4, revealPath:5, hidePath:6}

/*
 * Creates a group using low-lwvel functions
 * [in*] name: String -- group name, def: auto PS name
 * [in*] opacity: Integer from range [0,100] -- group opacity, def: 100
 * [in*] color: enum Stdlib.colorsEnum -- color of group (on layers panel), def: Stdlib.colorsEnum.none
 * [in*] blandMode: enum Stdlib.blendModesEnum -- bledning mode of the group, def: Stdlib.blendModesEnum.passThrough
 * Returns void 
 * Remark: It is faster than standard API at least in CS4.
 * Remark: Do not pass an argument or pass undefined to get default value
 * Example: Stdlib.createLayerGroup('my group', 50, Stdlib.colorsEnum.red, Stdlib.blendModesEnum.passThrough);
 */
Stdlib.createLayerGroup = function(name, opacity, color, blendMode, userMask, vectorMask, restrictChannels) {
    var doc = app.activeDocument;
    // Make layer
    var idMk = cTID( "Mk  " );
        var desc54 = new ActionDescriptor();
        
        var idnull = cTID( "null" );
            var ref49 = new ActionReference();
            var idlayerSection = sTID( "layerSection" );
            ref49.putClass( idlayerSection );
        desc54.putReference( idnull, ref49 );
        
        var idUsng = cTID( "Usng" );
            var desc55 = new ActionDescriptor();
            if (name) {
                desc55.putString( cTID( "Nm  " ), name );
            }
            if (opacity) {
                desc55.putUnitDouble( cTID( "Opct" ), cTID( "#Prc" ), opacity );
            }
            if (color) {
                desc55.putEnumerated( cTID( "Clr " ), cTID( "Clr " ), cTID( color ) );
            }
            if (blendMode) {
                desc55.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( "Nrml" ) );
            }
        desc54.putObject( idUsng, sTID( "layerSection" ), desc55 );
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

    // Add masks...
    if ( vectorMask ) {
        var idMk = cTID( "Mk  " );
            var desc287 = new ActionDescriptor();
            var idnull = cTID( "null" );
                var ref145 = new ActionReference();
                ref145.putClass( cTID( "Path" ) );
            desc287.putReference( idnull, ref145 );
            var idAt = cTID( "At  " );
                var ref146 = new ActionReference();
                var idPath = cTID( "Path" );
                ref146.putEnumerated( idPath, idPath, sTID( "vectorMask" ) );
            desc287.putReference( idAt, ref146 );
            
        switch ( vectorMask ) {
            case Stdlib.maskModesEnum.revealAll:
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "RvlA" ) );
                break;
            case Stdlib.maskModesEnum.hideAll:
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "HdAl" ) );
                break;
            case Stdlib.maskModesEnum.revealSelection:
                Stdlib.makeWorkPath();
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "RvlA" ) );
                break;
            case Stdlib.maskModesEnum.hideSelection:
                Stdlib.makeWorkPath();
                desc287.putEnumerated( cTID( "Usng" ), sTID( "vectorMaskEnabled" ), cTID( "HdAl" ) );
                break;
            case Stdlib.maskModesEnum.revealPath:
                    var ref171 = new ActionReference();
                    ref171.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ) );
                desc591.putReference( cTID( "Usng" ), ref171 );
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
        var idsetd = cTID( "setd" );
            var desc162 = new ActionDescriptor();
            var idnull = cTID( "null" );
                var ref126 = new ActionReference();
                ref126.putEnumerated( cTID( "Lyr " ), cTID( "Ordn" ), cTID( "Trgt" ) );
            desc162.putReference( idnull, ref126 );
            var idT = cTID( "T   " );
                var desc163 = new ActionDescriptor();
                var idchannelRestrictions = sTID( "channelRestrictions" );
                    var idChnl = cTID( "Chnl" );
                    var list3 = new ActionList();

                    if ( restrictChannels & Stdlib.restrictChannelsEnum.red ) {
                        list3.putEnumerated( idChnl, cTID( 'Rd  ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.green ) {
                        list3.putEnumerated( idChnl, cTID( 'Grn ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.blue ) {
                        list3.putEnumerated( idChnl, cTID( 'Bl  ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.cyan ) {
                        list3.putEnumerated( idChnl, cTID( 'Cyn ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.magenta ) {
                        list3.putEnumerated( idChnl, cTID( 'Mgnt' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.yellow ) {
                        list3.putEnumerated( idChnl, cTID( 'Yllw' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.black ) {
                        list3.putEnumerated( idChnl, cTID( 'Blck' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.L ) {
                        list3.putEnumerated( idChnl, cTID( 'Lght' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.A ) {
                        list3.putEnumerated( idChnl, cTID( 'A   ' ) );
                    }
                    if ( restrictChannels & Stdlib.restrictChannelsEnum.B ) {
                        list3.putEnumerated( idChnl, cTID( 'B   ' ) );
                    }
                desc163.putList( idchannelRestrictions, list3 );
            var idLyr = cTID( "Lyr " );
            desc162.putObject( idT, idLyr, desc163 );
        executeAction( idsetd, desc162, DialogModes.NO );
    }
    return doc.activeLayer;
}

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
       
    for ( var cPath=0; cPath<pathList.count; ++cPath ) 
    { 
      var curPath = pathList.getObjectValue(cPath).getList(_id1); 
      var points = curPath.getObjectValue(0).getList(_id2); 
      // for each point 
      for ( var cPoint=0; cPoint < points.count; ++cPoint ) 
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
    var res = [minX, minY, maxX, maxY, maxX-minX, maxY-minY]; 
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

// by Damian SzopeN Sepczuk <damian[d0t]sepczuk[a7]o2{do7}pl> 
// [in] round (bool) -- whether returned values should be rounded to the nearest pixel, def: false 
// [in] doc -- document containing layer with vector mask 
// [in] layer -- layer with vector mask 
// returns array [left, top, right, bottom, width, height] 
Stdlib.getVectorMaskAngle_cornerPointsOnly_full = function(round, doc, layer) { 
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
       
    var cPath=0;
	var curPath = pathList.getObjectValue(cPath).getList(_id1); 
	var points = curPath.getObjectValue(0).getList(_id2); 

	var p1  = points.getObjectValue(0).getObjectValue(_id3),
		 p1x = p1.getUnitDoubleValue(_id4),
		 p1y = p1.getUnitDoubleValue(_id5),
		 p2  = points.getObjectValue(1).getObjectValue(_id3),
		 p2x = p2.getUnitDoubleValue(_id4),
		 p2y = p2.getUnitDoubleValue(_id5),
		 p0x = p1x,
		 p0y = p1y+1;
	 var v1 = [0,1],
	     v2 = [p2x-p1x, p2y-p1y];
	 var v1_len = 1,
		  v2_len = Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1]);
		  v2[0]/=v2_len;v2[1]/=v2_len;
		  v2_len = 1;
	 var v1DOTv2 = v1[0]*v2[0] + v1[1]*v2[1];
	 var an = Math.acos(v1DOTv2/v2_len);
    var res = [90-an*180/Math.PI];
    if (!round) 
    { 
      for ( i=0; i<res.length; ++i ) 
      { 
        res[i] = Math.round(res[i]*1000)/1000; 
      } 
    } 
    return res; 
  } 
  var bnds = Stdlib.wrapLCLayer(doc, layer, _ftn); 
  return bnds; 
}

Stdlib.getVectorMaskAngle_cornerPointsOnly = function(round, doc, layer) { 
  round = !!round; 
  function _ftn() { 
    var ref = new ActionReference(); 
    ref.putEnumerated( cTID('Path'), cTID('Path'), sTID('vectorMask') ); 
    ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt")); 
    var vMaskDescr = executeActionGet(ref); 
    var pathContents = vMaskDescr.getObjectValue(sTID('pathContents')); 
    var pathList = pathContents.getList(sTID('pathComponents')); 

    // using separate variables gives speed gain 
    var _id3 = sTID("anchor"), 
        _id4 = sTID('horizontal'), 
        _id5 = sTID('vertical'); 
       
    var cPath=0;
	var curPath = pathList.getObjectValue(cPath).getList(sTID("subpathListKey")); 
	var points = curPath.getObjectValue(0).getList(sTID("points")); 

	var p1  = points.getObjectValue(0).getObjectValue(_id3),
		 p1x = p1.getUnitDoubleValue(_id4),
		 p1y = p1.getUnitDoubleValue(_id5),
		 p2  = points.getObjectValue(1).getObjectValue(_id3),
		 p2x = p2.getUnitDoubleValue(_id4),
		 p2y = p2.getUnitDoubleValue(_id5);
     $.writeln(p1x + " x " + p1y);
	 $.writeln(p2x + " x " + p2y);
	 var v = [p2x-p1x, p2y-p1y];
	 var v_len = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
	 var an = Math.acos(v[1]/v_len);
    var res = 90.0-an*180.0/Math.PI;
	if (p1x>p2x) res=-res;
    if (!round) 
    { 
        res = Math.round(res*100)/100; 
    } 
    return res; 
  } 
  return Stdlib.wrapLCLayer(doc, layer, _ftn); 
}
// ===END: stdlib.js===

Stdlib.getVectorMaskAngle_cornerPointsOnly(true);
