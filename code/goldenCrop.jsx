/*****************************************
 * Golden crop tool, v0.77 beta
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


var debug = true;

// set to "en"   for English, 
//        "pl"   for Polish
//        "auto" to use Photoshop language
var lang = "auto";
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
      szVersion = "0.77 beta";
// ---------------------------------------------------------------------
function localizator(secretNumber) {
    if ( secretNumber != 314159 ) {
        throw new Error('Do not construct localizator using new keyword. To get localizator objcet use localizator.getInstance() instead.');
    }
    this.use_locale = 'auto';
    $.localize = true;
    $.localization = true; // ?
    this.initStrings();
};

localizator.instance = null;

localizator.getInstance = function() {
    return localizator.instance || localizator.instance = new localizator(314159);
}

localizator.prototype.setLocale = function( locale ) {
    $.locale = locale;
}

localizator.prototype.initStrings = function() {
    var str = this.str = new Array();

    // Entries below were generated using localizator.loadCVSsaveAsJSCodeFile function
    str['chCropMethod'] = {en:'Choose crop style', pl:'Wybierz styl przycinania'};
    str['chCropMethodQ'] = {en:'Choose crop style', pl:'Wybierz styl przycinania'};
    str['cropCanvas'] = {en:'Crop canvas (simple crop)', pl:'Przytnij p³ótno'};
    str['mkCropMask'] = {en:'Make crop mask', pl:'Stwórz maskê kadruj¹c¹'};
    str['cancel'] = {en:'Cancel', pl:'Anuluj'};
    str['bgOnLayer'] = {en:'Background on layer', pl:'T³o na warstwie'};
    str['bgFill'] = {en:'Background fill', pl:'Wype³nienie t³a'};
    str['doOutsCrop'] = {en:'Do outside cropping (YES) or crop without extending canvas (NO)?', pl:'Rozszerzyæ pó³tno (TAK) czy przyci¹æ bez rozszerzania (NIE)?'};
    str['-grid'] = {en:' - grid', pl:' - siatka'};
    str['-resize'] = {en:' - resize', pl:' - przeskalowanie'};
    str['-reveal'] = {en:' - reveal', pl:' - rozszerzanie'};
    str['-crop'] = {en:' - crop', pl:' - przycinanie'};
    str['GCbySzN'] = {en:'Golden Crop by SzopeN', pl:'Golden Crop by SzopeN'};
    str['cropMask'] = {en:'Crop mask', pl:'Maska kadruj¹ca'};
    str['divRules'] = {en:'Dividing rules', pl:'Regu³y podzia³u'};
    str['stripAtPrc'] = {en:'Strip at %1%%', pl:'Paski na %1%%'};
    str['goldenDiagUp'] = {en:'Golden diagonal upwards', pl:'Z³ota przek¹tna w górê'};
    str['goldenDiagDown'] = {en:'Golden diagonal downwards', pl:'Z³ota przek¹tna w dó³'};
    str['openB4Run'] = {en:'Open the document in which you want the script to run.', pl:'Otwórz dokument, w którym chcesz uruchomiæ ten skrypt.'};
    str['canvExtDet'] = {en:'Canvas extension detected.', pl:'Wykryto rozszerzenie p³ótna.'};
    str['canvExtDetQ'] = {en:'What to do with canvas?', pl:'Co mam zrobiæ z p³ótnem?'};
    str['extendCanvas'] = {en:'Extend canvas', pl:'Rozszerz p³ótno'};
    str['dontExtCanv'] = {en:'Crop without extension', pl:'Przytnij bez rozszerzania'};
    str['retToCropping'] = {en:'Return to cropping', pl:'Wróæ do kadrowania'};
    str['chCompMethod'] = {en:'Composition method', pl:'Metoda kompozycji'};
    str['chCompMethodQ'] = {en:'Choose composition guidelines', pl:'Wybierz metodê kompozycji'};
    str['goldenRule'] = {en:'Golden Rule', pl:'Z³oty podzia³'};
    str['ruleOfThirds'] = {en:'Rule of Thirds', pl:'Regu³a trzech'};
    str['goldenSpiralBL'] = {en:'Golden Spiral bottom-left', pl:'Z³ota spirala lewo-dó³'};
    str['goldenSpiralTL'] = {en:'Golden Spiral top-left', pl:'Z³ota spirala lewo-góra'};
    str['goldenSpiralTR'] = {en:'Golden Spiral top-right', pl:'Z³ota spirala prawo-góra'};
    str['goldenSpiralBR'] = {en:'Golden Spiral bottom-right', pl:'Z³ota spirala prawo-dó³'};
    str['selectAll'] = {en:'Select All', pl:'Zaznacz wszystkie'};
    str['deselectAll'] = {en:'Deselect All', pl:'Odznacz wszystkie'};
    str['ok'] = {en:'OK', pl:'OK'};
    str['allGoldenSpirals'] = {en:'All Golden Spirals', pl:'Wszystkie Z³ote Spirale'};
    str['basicRules'] = {en:'Basic rules', pl:'Podstawowe podzia³y'};

}

// Returns translations in CVS format
localizator.prototype.getCSVStrings = function() {
    var out = '';
    var availLangs = new Array();

    // get available languages
    out += 'AvailLangs'
    for ( var i in this.str ) {
        for ( var j in this.str[i] ) {
            if ( this.str[i][j] != '' && !availLangs[j] ) {
                availLangs[j] = j;
                out+=';'+j
            }
        }
    }
    out += "\n";
    
    // get all translations in the same order
    for ( var i in this.str ) {
        out += '"'+i+'"';
        for ( var j in availLangs ) {
            out += ';"'+(this.str[i][j]||'')+'"';
        }
        out += "\n"
    }
    
    return out;
}

localizator.prototype.saveAsCSVFile = function() {
    var of = File.saveDialog('Save as CSV file','CSV:*.csv');
    if (!of) return;
    try {
        of.open("w");
        if (!of) throw new Error("Can't open file for writing: " + of );
        of.write(this.getCSVStrings());
    } finally {
        of.close();
    }
}

localizator.getInitSequenceFromCSVSFile = function () {
    var input = File.openDialog("Select CSV file with translations", "CSV Comma Separated Values:*.csv,All files:*.*", false);
    if ( !input ) {
        return false;
    }
    if ( !input.open('r') ) {
        throw new Error("Can't open file for reading!");
    }

    var availLangs = input.readln().replace(/"/g,'').split(';');
    availLangs.shift();
    var out = "\n    // Entries below were generated using localizator.loadCVSsaveAsJSCodeFile function\n";
    var line = null;
    while ( line = input.readln() ) {
        var translations = new Array();
        var inText = false;
        var prevEndIdx = 0;
        var currentLangIndex = 0;
        for ( var i = 0; i<line.length; ++i )
        {
            var actChr = line[i];
            if ( inText ) {
                if ( actChr == '"' ) {
                    var nextChr = line[i+1];
                    if ( nextChr != '"' ) {
                        if ( nextChr != ';' && nextChr ) {
                            throw new Error("Malformed data!, line: " + line + " position: " + i);
                        } else {
                            // end of cell detected
                            translations.push(line.substring(prevEndIdx, i).replace(/""/g,'"'));
                            ++i; // skip ';' char
                            prevEndIdx = i+1;
                            inText = false;
                        }
                    } else {
                        // " char in quoted string
                        ++i;
                    }
                }
            } else {
                if ( actChr == '"' ) {
                    if ( i == prevEndIdx ) {
                        // start of quoted string
                        prevEndIdx = i+1;
                        inText = true;
                    } else {
                        // '"' char in the middle of non quoted text. It is an error, but do not throw
                    }
                } else  if ( actChr == ';' ) {
                    translations.push(line.substring(prevEndIdx, Math.max(i-1,prevEndIdx)));
                    // end of cell detected
                    prevEndIdx = i+1;
                }
            }
        }
        var engTranslFound = false;
        var trId = translations.shift();
        var numOfLangWritten = 0;
        out += "    str['" + trId + "'] = {";
        for ( var i = 0; i < availLangs.length && translations.length; ++i )
        {
            var t = translations.shift();
            if ( t.length != 0 ) {
                if (availLangs[i].search(/^en/) == 0 ) engTranslFound = true;
                out += (numOfLangWritten++?', ':'') + availLangs[i] + ":'" + t.replace(/\\/g,'\\\\').replace(/'/g,'\\\'') + "'";
            }
        }
        if (!engTranslFound) {
            throw new Error("No english translation found for: " + trId + ".\nEach string MUST have an english translation");
        }
        out += "};\n";
    }

    return out;
}

localizator.loadCVSsaveAsJSCodeFile = function() {
    var tmp = localizator.getInitSequenceFromCSVSFile();
    if ( tmp ) {
        var of = File.saveDialog('Save as JSX file','JSX:*.jsx');
        if (!of) return false;
        try {
            of.open("w");
            if (!of) throw new Error("Can't open file for writing: " + of );
            of.write(tmp);
        } finally {
            of.close();
        }
    }
}


localizator.prototype.get = function( id, otherParameters ) {
    arguments[0]=this.str[ id ];
    return localize.apply({},arguments);
}
// ---------------------------------------------------------------------
function dialogMenu( menuDesc ) {
    this.desc = menuDesc;
}

dialogMenu.prototype.show = function () {
    // helper function
    function _repeatString( str, n ) {
        var out = '';
        while ( n-- > 0) {
            out += str;
        }
        return out;
    }

    var menuDesc = this.desc;
    var elements = menuDesc.elements;
    var dlg = new Window('dialog', menuDesc.caption);
    dlg.preferredSize.width = 155;
    
    with (dlg)
    {
       orientation = 'column';
       alignChildren = 'fill';
       
       add('statictext', undefined, menuDesc.question);
       var maxCaptionLen = -Infinity;
       for ( var i = 0; i<elements.length; ++i ) {
           var capLen = elements[i].text.length + elements[i].key.length + 3;
           if ( capLen > maxCaptionLen ) maxCaptionLen = capLen;
        }

       for ( var i = 0; i<elements.length; ++i ) {
            var key = elements[i].key.toLowerCase();
            var btnName = (key == 'esc')?'cancel':((!!elements[i].def)?'ok':('op'+i));
            var caption = '['+(key=='esc'?'':'&')+elements[i].key+'] ' + elements[i].text;
            var capLen = caption.length + (key=='esc'?-1:0);
            var e = add('button', undefined, caption + _repeatString(' ', (maxCaptionLen-capLen)*1.4), {name: btnName, justify: 'left'});
            if ( btnName=='ok' || !!elements[i].def ) {
                defaultElement = e;
            }
            if (btnName=='cancel') {
                cancelElement = e;
            } else {
               e.onClick = new Function('this.parent.close('+(10+i+1)+')');
            }
            elements[i].obj = e;
       }
       if( isCS4() ){
           addEventListener('keydown', function (e) {
               for ( var i = 0; i<elements.length; ++i )
               {
                   if ( e.keyName == elements[i].key.toUpperCase() ) {
                       elements[i].obj.notify();
                       break;
                   }
               }
           }, false);
        } else {
           var edShcut = add('edittext', undefined, '...', {name: 'edShcut'});
           edShcut.active = true;
           edShcut.onChanging = function ()  {
               if ( edShcut.text == ' ' ) {
                   defaultElement.notify();
                   return;
               }
               var found = false;
                for ( var i = 0; i<elements.length; ++i )
                {
                    // $.writeln(edShcut.text.toUpperCase() + ' = ' + elements[i].key.toUpperCase());
                    if ( edShcut.text.toUpperCase() == elements[i].key.toUpperCase() ) {
                        elements[i].obj.notify();
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    edShcut.text = 'Stroke a key';
                    edShcut.active = false; // on CS3 makes the event to occur one again, with
                    edShcut.active = true;  // edShcut.text == the single char last enetered (!)
                }
           }
        }
    }
    dlg.center();
    var result = dlg.show();
    if ( result < 10 ) {
        return false;
    } else {
        return result-11;
    }
}
// ---------------------------------------------------------------------

function dialogMenuMChoice( menuDesc ) {
    this.desc = menuDesc;
}

dialogMenuMChoice.prototype.show = function () {
    // helper function
    function _repeatString( str, n ) {
        var out = '';
        while ( n-- > 0) {
            out += str;
        }
        return out;
    }

    var menuDesc = this.desc;
    
    var cbElements = menuDesc.cbElements;
    var msElements = menuDesc.msElements;
    
    var dlg = new Window('dialog', menuDesc.caption);
    dlg.preferredSize.width = 155;
    
    with (dlg)
    {
       orientation = 'column';
       alignChildren = 'fill';
       add('statictext', undefined, menuDesc.question);
       var g1 = add('group', undefined, undefined);

       with (g1) {
           var g1_cb = add('group', undefined, undefined);
           with (g1_cb) {
               orientation = 'column';
               alignChildren = 'fill';

               for ( var i = 0; i<cbElements.length; ++i ) {
                    var key = cbElements[i].key.toLowerCase();
                    var cbName = 'op'+i;
                    var caption = '[&'+cbElements[i].key+'] ' + cbElements[i].text;
                    var capLen = caption.length;
                    var e = add('checkbox', undefined, caption, {name: cbName});
                    e.value = !!cbElements[i].sel;
                    cbElements[i].obj = e;
               }
           }
          var g1_ms = add('group', undefined, undefined);
          with (g1_ms) {
               orientation = 'column';
               alignChildren = 'fill';

               var maxCaptionLen = -Infinity;
               msElements.push
               for ( var i = 0; i<msElements.length; ++i ) {
                   var capLen = msElements[i].text.length + msElements[i].key.length + 3;
                   if ( capLen > maxCaptionLen ) maxCaptionLen = capLen;
                }

               for ( var i = 0; i<msElements.length; ++i ) {
                    var key = msElements[i].key.toLowerCase();
                    var btnName = 'op'+i;
                    var caption = '[&'+msElements[i].key+'] ' + msElements[i].text;
                    var capLen = caption.length;
                    var e = add('button', undefined, caption + _repeatString(' ', (maxCaptionLen-capLen)*1.4), {name: btnName});
                    e.elements = msElements[i].elements;
                   e.action = msElements[i].action;
                    e.onClick = function() {
                        switch ( this.action ) {
                            case 'slctAll':
                               for ( var i = 0; i<cbElements.length; ++i ) {
                                  if(!cbElements[i].obj.value) cbElements[i].obj.notify();
                               }
                               break;
                            case 'dslctAll':
                               for ( var i = 0; i<cbElements.length; ++i ) {
                                  if(cbElements[i].obj.value) cbElements[i].obj.notify();
                               }
                               break;
                            default:
                               if (this.elements) {
                                   for ( var i = 0; i<this.elements.length; ++i ) {
                                      cbElements[this.elements[i]].obj.notify();
                                   }
                               }
                               break;
                        }
                    }
                    msElements[i].obj = e;
               }
          }
       }
   
   
       var okBtn = add('button', undefined, this.desc.okTxt, {name: 'ok'});
       var cancelBtn = add('button', undefined, this.desc.cancelTxt, {name: 'cancel'});
       defaultElement = okBtn;
       cancelElement = cancelBtn;
       var allElements = cbElements.concat(msElements);
       
       if( isCS4() ){
           addEventListener('keydown', function (e) {
               for ( var i = 0; i<allElements.length; ++i )
               {
                   if ( e.keyName == allElements[i].key.toUpperCase() ) {
                       allElements[i].obj.notify();
                       break;
                   }
               }
           }, false);
        } else {
           var edShcut = add('edittext', undefined, '...', {name: 'edShcut'});
           edShcut.active = true;
           edShcut.onChanging = function ()  {
               if ( edShcut.text == ' ' ) {
                   defaultElement.notify();
                   return;
               }
               var found = false;
                for ( var i = 0; i<allElements.length; ++i )
                {
                    $.writeln(edShcut.text.toUpperCase() + ' = ' + allElements[i].key.toUpperCase());
                    if ( edShcut.text.toUpperCase() == allElements[i].key.toUpperCase() ) {
                        allElements[i].obj.notify();
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    edShcut.text = 'Stroke a key';
                    edShcut.active = false; // on CS3 makes the event to occur one again, with
                    edShcut.active = true;  // edShcut.text == the single char last enetered (!)
                }
           }
        }
    }
    dlg.center();
    var result = dlg.show();
    if ( result != 1 ) {
        return false;
    } else {
        result = [];
        for ( var i = 0; i<cbElements.length; ++i ) {
            result[i] = cbElements[i].obj.value;
        }
        return result;
    }
}


// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

function GoldenCrop( _doc ) {
    this.doc = _doc;
    Stdlib.saveLayer = false;
    Stdlib.saveDoc = false;
};

/*
 * Basic configuration. In further versions it ill be user-interactive and action-recordable.
 */
GoldenCrop.prototype.loadConfig = function() {
    this.ifApplyFX = true;
    this.ifSuspendHistory = isSC3Plus();
    this.loc = localizator.getInstance();
}

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

    var StripLayer = Stdlib.createSolidFillLayer(undefined, color, this.loc.get('stripAtPrc', Math.round(position*100)) );
    Stdlib.removeLayerMask(); // no error if there is no (raster) mask
    
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
    var layer = Stdlib.createSolidFillLayer(undefined, color, this.loc.get( direction?'goldenDiagUp':'goldenDiagDown') );
    Stdlib.removeLayerMask();
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

GoldenCrop.prototype.createGoldenSpiralPath = function(numOfTurns, offset, w, h, startX, startY) {
    // Default values
    if (!w) w = this.docW;
    if (!h) h = this.docH;
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
    var DPIFix = 72/this.doc.resolution; 
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

GoldenCrop.prototype.makeGoldenSpiral = function( orientation, stripSizePrc, color ) {
    const docWidth  = this.docW,
          docHeight = this.docH;
    const stripSize = Math.max(1,Math.min(docWidth, docHeight) * stripSizePrc);
    
    var offsetPath = this.createGoldenSpiralPath(false, stripSize);
    var normalPath = this.createGoldenSpiralPath(offsetPath.cTurns);
    
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

    var GSPath = this.doc.pathItems.add('', [spi]);
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

/*
 * Applies "strip" layer styles (drop shadow) on active layer
 * Returns: void
 * Spetialized function for srtip effect.. Stripped out default values.
 */
GoldenCrop.prototype.applyStripFX = function() {
var id11 = cTID( "setd" );
    var desc5 = new ActionDescriptor();
    var id12 = cTID( "null" );
        var ref3 = new ActionReference();
        ref3.putProperty( cTID( "Prpr" ),  cTID( "Lefx" ));
        ref3.putEnumerated( cTID( "Lyr " ), cTID( "Ordn" ), cTID( "Trgt" ) );
    desc5.putReference( id12, ref3 );
    var id18 = cTID( "T   " );
        var desc6 = new ActionDescriptor();
    var id21 = cTID( "DrSh" );
            var desc7 = new ActionDescriptor();
            desc7.putBoolean( cTID( "enab" ), true );
            desc7.putEnumerated( cTID( "Md  " ), cTID( "BlnM" ), cTID( "Scrn" ) );
            var id26 = cTID( "Clr " );
                var desc8 = new ActionDescriptor();
                desc8.putDouble( cTID( "Rd  " ), 255 );
                desc8.putDouble( cTID( "Grn " ), 255 );
                desc8.putDouble( cTID( "Bl  " ), 255 );
            desc7.putObject( id26, cTID( "RGBC" ), desc8 );
            desc7.putBoolean( cTID( "uglg" ), false );
            desc7.putUnitDouble( cTID( "Dstn" ), cTID( "#Pxl" ), 0 );
            desc7.putUnitDouble( cTID( "Ckmt" ), cTID( "#Pxl" ), 0 );
            desc7.putUnitDouble( cTID( "blur" ), cTID( "#Pxl" ), 3 );
        desc6.putObject( id21, cTID( "DrSh" ), desc7 );
    desc5.putObject( id18, cTID( "Lefx" ), desc6 );
executeAction( id11, desc5, DialogModes.NO );
}


/*
 * Creates grid of dividing lines: one-third rule, golden rule, golden diagonal rule (both diagonals)
 * [*] denotes optional parameter
 *   [in][*] basicStripSize | from range (0.0, 1.0) -- basic thickness of a strip (as part of shorter edge)
 *   [in][*] maskOpacity    | integer from range [0,100] -- opacity of mask (hiding outside of selected display frame)
 *   [in][*] colors         | Array of instances of SolidColor -- colors of mask and strips (for each dividing rule)
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
 *                          golden diagonal rule (all): 1/3
 *                          golden spiral (all): 1/3
 * Returns: void
 * TODO: move parameters to user config
 */
GoldenCrop.prototype.makeGrid = function(basicStripSize, maskOpacity, colors, stripsThickScale) {
    if (!basicStripSize) {
        basicStripSize = .01; // 1%
    }
    if (!maskOpacity) {
        maskOpacity = 70;
    }
    if (!colors) {
        colors = [Stdlib.createRGBColor(0,0,0), Stdlib.createRGBColor(0,0,0), Stdlib.createRGBColor(0x33,0x33,0x33), Stdlib.createRGBColor(255,0,0), Stdlib.createRGBColor(0,0,255),
                  Stdlib.createRGBColor(0,255,255), Stdlib.createRGBColor(255,0,255), Stdlib.createRGBColor(255,255,0), Stdlib.createRGBColor(128,128,255)];
    }
    if (!stripsThickScale) {
        stripsThickScale = [1, 1/2, 1/3, 1/3];
    }
    
    this.gCrop = Stdlib.createLayerGroup(this.loc.get('GCbySzN'));

    
    // Add crop-mask
    this.outerFrame = Stdlib.createSolidFillLayer(undefined, colors[0], this.loc.get('cropMask'), maskOpacity);
    Stdlib.removeLayerMask();
    Stdlib.addVectorMask(true);
    Stdlib.rectPath( ShapeOperation.SHAPESUBTRACT, Units.PERCENT, 0,0,100,100);
    
    // Add dividing rules
	var anyGuidelines = false;
	for ( gline in this.guidelines ) {
		anyGuidelines |= this.guidelines[gline].create;
	}
    if (anyGuidelines) {
		this.gCropDivRules = Stdlib.createLayerGroup(this.loc.get('divRules'), 50);
		
		// ----- Golden rule
		if (this.guidelines.golden.create) {
			const phi = (Math.sqrt(5)-1)/2; // Inv Golden number, ca. 0.6180339887498948482045868343656
			this.guidelines.golden.layer = this.makeStrips(phi, basicStripSize*stripsThickScale[0], colors[1]);
			if (this.ifApplyFX) this.applyStripFX();
		}
		
		// ----- One-third rule
		if (this.guidelines.roth.create) {
			const third = 1.0/3;
			this.guidelines.roth.layer = this.makeStrips(third, basicStripSize*stripsThickScale[1], colors[2]);
			if (this.ifApplyFX) this.applyStripFX();
		}

		// ----- Golden diagonal rule (up)
		if (this.guidelines.gdiagup.create) {
			this.guidelines.gdiagup.layer = this.makeDiagStrip(true, basicStripSize*stripsThickScale[2], colors[3]);
			if (this.ifApplyFX) this.applyStripFX();
		}
	
		// ----- Golden diagonal rule (down)
		if (this.guidelines.gdiagdown.create) {
			this.guidelines.gdiagdown.layer = this.makeDiagStrip(false, basicStripSize*stripsThickScale[2], colors[4]);
			if (this.ifApplyFX) this.applyStripFX();
		}
	
		// ----- Golden spiral (starts at bottom-left)
		if (this.guidelines.gspiralBL.create) {
			this.guidelines.gspiralBL.layer = this.makeGoldenSpiral(0, basicStripSize*stripsThickScale[3], colors[5]);
			if (this.ifApplyFX) this.applyStripFX();
		}
	
		// ----- Golden spiral (starts at bottom-left)
		if (this.guidelines.gspiralTL.create) {
			this.guidelines.gspiralTL.layer = this.makeGoldenSpiral(1, basicStripSize*stripsThickScale[3], colors[6]);
			if (this.ifApplyFX) this.applyStripFX();
		}
			
		// ----- Golden spiral (starts at bottom-left)
		if (this.guidelines.gspiralTR.create) {
			this.guidelines.gspiralTR.layer = this.makeGoldenSpiral(2, basicStripSize*stripsThickScale[3], colors[7]);
			if (this.ifApplyFX) this.applyStripFX();
		}
			
		// ----- Golden spiral (starts at bottom-left)
		if (this.guidelines.gspiralBR.create) {
			this.guidelines.gspiralBR.layer = this.makeGoldenSpiral(3, basicStripSize*stripsThickScale[3], colors[8]);
			if (this.ifApplyFX) this.applyStripFX();
		}
	} else {
		this.bogusLayer = this.makeStrips(.5, 0.0001, colors[0]);
		this.doc.activeLayer.opacity=0;
	}
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
    throw new Error('deprecated');
}

/*
 * Crops canvas and deletes all Golden Crop layers
 */
GoldenCrop.prototype.simpleCrop = function() {
    // TODO get selection bounds from this.croppingBounds
    this.doc.activeLayer = this.outerFrame;
    Stdlib.loadVectorMaskSelection(); // could be empty but it is no problem
    if ( Stdlib.hasSelection() ) {
        this.doc.selection.invert();
        // crop to selection
        executeAction( cTID( "Crop" ), new ActionDescriptor(), DialogModes.NO );
        this.doc.selection.deselect();
    }
    this.gCrop.remove();
}

/*
 * Make cropping mask non-transparent and make active and hide Dividing Rules group
 */
GoldenCrop.prototype.maskOutCrop = function() {
	this.outerFrame.opacity = 100;
	if (this.gCropDivRules) {
		this.doc.activeLayer = this.gCropDivRules;
		this.doc.activeLayer.visible = false
	}
}

/*
 * Display user-interactive menu allowing to choose cropping method.
 * Cropping methods are member functions of GoldenCrop object instance
 */
GoldenCrop.prototype.chooseCropMethod = function() {
    var menuDesc = {caption:this.loc.get('chCropMethod'),
                question:this.loc.get('chCropMethodQ'),
                elements:[{key:'1', text:this.loc.get('cropCanvas'), def:true},
                          {key:'2', text:this.loc.get('mkCropMask')},
                          {key:'Esc', text:this.loc.get('cancelCrop')}
                         ]
               };
    
    var dlg = new dialogMenu(menuDesc);
    var result = dlg.show();
    switch ( result ) {
        case 0:
            return 'SIMPLE';
        case 1:
            return 'MASK';
        case false:
        default:
            return 0;
    }
}

/*
 * Convert background to normal layer and place solid fill layer below it.
 * Color of the solid fill layer is determined by current foreground color
 */
GoldenCrop.prototype.doPopBackground = function() {
    if (this.backgroundPopped) return;
    this.backgroundPopped = true;
     
    if ( Stdlib.hasBackground(this.doc) ) {
        this.bgLayer = this.doc.backgroundLayer;
        this.bgLayer.isBackgroundLayer = false;
        this.bgLayer.name = this.loc.get('bgOnLayer');
    }
    this.backgroundFill = Stdlib.createSolidFillLayer(undefined, app.foregroundColor, this.loc.get('bgFill'));
    Stdlib.removeLayerMask();
    this.backgroundFill.move(this.bgLayer||this.doc.layers[this.doc.layers.length-1], ElementPlacement.PLACEAFTER);
}

/*
 * Change canvas size to match crop mask boundaries
 * Convert background to normal layer and place solid fill layer below it.
 * Color of the solid fill layer is determined by current foreground color
 */
GoldenCrop.prototype.doRevealPopBackround = function() {
    var docW = this.docW,
        docH = this.docH;
    var cb = this.cropBounds;
    
    var addTop    = Math.max(-cb[1],0),
        addLeft   = Math.max(-cb[0],0),
        addBottom = Math.max(cb[3]-docH,0),
        addRight  = Math.max(cb[2]-docW,0);
        
    if (this.popBackground) {
        this.doPopBackground();
    }
    
    this.doc.resizeCanvas(new UnitValue(docW+addLeft,"px"),new UnitValue(docH+addTop,"px"),AnchorPosition.BOTTOMRIGHT);
    this.doc.resizeCanvas(new UnitValue(docW+addLeft+addRight,"px"),new UnitValue(docH+addTop+addBottom,"px"),AnchorPosition.TOPLEFT);

    // if there is no cropping hide whole Golden Crop group
    if ( !this.cropMethod ) {
        this.doc.activeLayer = this.gCrop;
        this.doc.activeLayer.visible = false;
        // this.outerFrame.remove();
    }
}

GoldenCrop.prototype.doRotateCanvas = function() {
    if ( this.popBackground ) {
        this.doPopBackground();
    }
    var angle = this.rotateCanvasA;
    if ( angle > 45 ) {
        angle-=90;
    } else if (angle < -45 ) {
        angle+=90;
    }
    Stdlib.rotateCannvas(angle);
    // update cropping bounds and document dimentions
    this.cropBounds = Stdlib.getVectorMaskBounds_cornerPointsOnly(true, this.doc, this.outerFrame);         
    this.docW = parseInt(this.doc.width.as("px")),
    this.docH = parseInt(this.doc.height.as("px"));
    // $.writeln('################# after rotate');
    // $.writeln('docW:' +this.docW);
    // $.writeln('docH:' +this.docH);

}



/*
 * Determine if revealing occures and display user-interactive menu allowing to choose whether to extend canvas.
 * Check if there is also cropping and set this.onlyReveal accordingly.
 * Revealing methods are member functions of GoldenCrop object instance.
 */
GoldenCrop.prototype.chooseRevealAction = function() {
    var cb = this.cropBounds;
    var docW = this.docW,
        docH = this.docW;
          

        // choose whether extend canvas before cropping
        var menuDesc = {caption:this.loc.get('canvExtDet'), //Canvas extension detected.
            question:this.loc.get('canvExtDetQ'), //What to do with canvas?
            elements:[{key:'A', text:this.loc.get('extendCanvas'), def:true}, // Extend canvas
                      {key:'Z', text:this.loc.get('dontExtCanv')}, // Crop without extension
                      {key:'Esc', text:this.loc.get('retToCropping')} // Return to cropping
                     ]
           };

        var dlg = new dialogMenu(menuDesc);
        var result = dlg.show();
        switch ( result ) {
            case 0:
                return('EXTCANVAS')
                break;
            case 1:
                return false; // Don't ctop
                break;
            case false:
            default:
                return 0; // Return to cropping
                break;
        }
}
    
 * Logical heart of the script. Invoke each phase of script w/ or w/o suspending history.
 */
GoldenCrop.prototype.go = function() {
   var docW = this.docW = parseInt(this.doc.width.as("px"));
   var docH = this.docH = parseInt(this.doc.height.as("px"));
    var menuDesc = {caption:this.loc.get('chCompMethod'),
                    question:this.loc.get('chCompMethodQ'),
                    okTxt:this.loc.get('ok'),
                    cancelTxt:this.loc.get('cancel'),
                    cbElements:[{key:'1', text:this.loc.get('goldenRule'), sel: true},
                              {key:'2', text:this.loc.get('ruleOfThirds'), sel: true},
                              {key:'3', text:this.loc.get('goldenDiagUp'), sel: true},
                              {key:'4', text:this.loc.get('goldenDiagDown'), sel: true},
                              {key:'5', text:this.loc.get('goldenSpiralBL')},
                              {key:'6', text:this.loc.get('goldenSpiralTL')},
                              {key:'7', text:this.loc.get('goldenSpiralTR')},
					         {key:'8', text:this.loc.get('goldenSpiralBR')}
                             ],
                    msElements:[{key:'q', text:this.loc.get('basicRules'), elements:[0,1,2,3]},
                                {key:'w', text:this.loc.get('allGoldenSpirals'), elements:[4,5,6,7]},
                              {key:'a', text:this.loc.get('selectAll'), action: 'slctAll'},
                               {key:'d', text:this.loc.get('deselectAll'), action: 'dslctAll'}
    ]
                   };
    var dlg = new dialogMenuMChoice(menuDesc);
    var res = dlg.show();
	if (!res) return;
	this.guidelines = {golden: {create: res[0]},
		                 roth: {create: res[1]},
		              gdiagup: {create: res[2]},
		            gdiagdown: {create: res[3]},
		            gspiralBL: {create: res[4]},
		            gspiralTL: {create: res[5]},
		            gspiralTR: {create: res[6]},
		            gspiralBR: {create: res[7]}};

    if ( this.ifSuspendHistory ) {
        this.doc.suspendHistory(szAppName + this.loc.get('-grid'), 'this.makeGrid()');
        Stdlib.NOP();
    } else {
        this.makeGrid();
    }

    // New action mechanizm
    // !== false   - indicates some method
    // x !== y <=> !(x === y) -- only the second form gives right value in CS2 and (CS3, CS4)
    // false       - indicates no action
    this.cropAccepted  = false;
    this.cropMethod    = false;
    this.revealMethod  = false;
    this.popBackground = false;
    this.rotateCanvasA = false;
    // ---!!!
    var cropFunctions  = {SIMPLE:'simpleCrop()', MASK:'maskOutCrop()'};
    var revealVuncions = {EXTCANVAS:'doRevealPopBackround()'};

    this.tmpFctn = function () {
        do {
            this.cropAccepted = Stdlib.userGoToFreeTransform(this.doc, this.gCrop);
            if ( !this.cropAccepted ) break;
            
            this.cropBounds = Stdlib.getVectorMaskBounds_cornerPointsOnly(true, this.doc, this.outerFrame);
            var cb = this.cropBounds;

            // Detect angle
            var threshold = 0.0001;
            var angle = Stdlib.getVectorMaskAngle_cornerPointsOnly(false, this.doc, this.outerFrame);
            this.rotateCanvasA = ( Math.abs(angle)%90 > threshold )?-angle:false;
            if ( this.rotateCanvasA ) {
                this.popBackground = true; // default, could be changed in the following code
                var anRad = ((this.rotateCanvasA)*Math.PI)/180;
                var sinAb = Math.sin(Math.abs(anRad)), cosAb = Math.cos(Math.abs(anRad)),
                    sinAn =Math.sin(anRad), cosAn = Math.cos(anRad);
                var mid = {x:(cb[0]+cb[2])/2,y:(cb[1]+cb[3])/2};
                //var dist = Math.sqrt(mid.x*mid.x+mid.y*mid.y);
                var cbRot = cb.clone();
                var newDocW = Math.ceil(docW * cosAb + docH * sinAb),
                    newDocH = Math.ceil(docW * sinAb + docH * cosAb);
                var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity; 
                var minXp, maxXp, minYp, maxYp; 
                // translate to 0,0, rotate, and translate back
                for (var i=6; i<10; ++i) {
                    var x = cbRot[i].x - mid.x,
                        y = cbRot[i].y - mid.y;
                    var xrot = x * cosAn - y * sinAn,
                        yrot = x * sinAn + y * cosAn;
                    x = cbRot[i].x = xrot+mid.x+(newDocW-docW)/2;
                    y = cbRot[i].y = yrot+mid.y+(newDocH-docH)/2;
                    if ( x < minX ) { minX = x; minXp = {x:x,y:y} }
                    if ( x > maxX ) { maxX = x; maxXp = {x:x,y:y} }
                    if ( y < minY ) { minY = y; minYp = {x:x,y:y} }
                    if ( y > maxY ) { maxY = y; maxYp = {x:x,y:y} }
                }
                this.afterRotate = {cb: [minX, minY, maxX, maxY, maxX-minX, maxY-minY, minXp, maxXp, minYp, maxYp, cbRot],
                                   docW: newDocW,
                                   docH: newDocH};
                // $.writeln('~~~~~~~~~~~~~');
                // $.writeln('afterRotate:' +this.afterRotate);
                //debugger;
            }
            
            // Detect cropping mode
            if ( cb[0] >= 0 && cb[1] >= 0 && cb[2] <= docW && cb[3] <= docH ) {
                // cropping only inside picture frame
                this.cropMethod = this.chooseCropMethod();
                if ( this.rotateCanvasA && this.cropMethod == 'SIMPLE' ) {
                    // cancel background pop even when there is a rotation
                    this.popBackground = false;
                }
            } else {
                if ( this.rotateCanvasA ) {
                    cb = this.afterRotate.cb; // simulate rotation for further computing
                    docW = this.afterRotate.docW; docH = this.afterRotate.docH;
                }
                if ( cb[0] < 0 && cb[1] < 0 && cb[2] > docW && cb[3] > docH ) { // no image crop
                    this.cropMethod = false;
                    this.revealMethod = 'EXTCANVAS';
                    this.popBackground = true;
                } else {
                   if ( this.rotateCanvasA && cb[0] >= 0 && cb[1] >= 0 && cb[2] <= docW && cb[3] <= docH ) {
                       // rotation uncovers needed canvas, i.e. no further extension after roattion is needed
                       this.revealMethod = 'false';
                   } else {
                       this.revealMethod = this.chooseRevealAction();
                   }
                    if ( !(this.revealMethod === 0) ) {
                        if ( this.revealMethod == 'EXTCANVAS' ) {
                            this.popBackground = true;
                        }
                        this.cropMethod = this.chooseCropMethod();
                    }
                }

            }
        } while ( this.revealMethod === 0 || this.cropMethod === 0)
    };

    if ( this.ifSuspendHistory ) {
        this.doc.suspendHistory(szAppName + this.loc.get('-resize'), 'this.tmpFctn()');
        Stdlib.NOP();
    } else {
        this.tmpFctn();
    }
	if (this.bogusLayer) this.bogusLayer.remove();
    // $.writeln( '==========' );
    // $.writeln( 'cropAccepted: ' + this.cropAccepted );
    // $.writeln( 'cropMethod: ' + this.cropMethod );
    // $.writeln( 'revealMethod: ' + this.revealMethod );
    // $.writeln( 'popBackground: ' + this.popBackground );
    // $.writeln( 'rotateCanvasA: ' + this.rotateCanvasA );
    
    if ( this.cropAccepted ) {
        
        if ( !(this.rotateCanvasA === false) ) {
            if ( this.ifSuspendHistory ) {
                this.doc.suspendHistory(szAppName + this.loc.get('-rotate'), 'this.doRotateCanvas()');
                Stdlib.NOP();
            } else {
                this.doRotateCanvas();
            }
        }

        if ( this.revealMethod ) {
            var revealingFunction = revealVuncions[this.revealMethod];
            if ( this.ifSuspendHistory ) {
                this.doc.suspendHistory(szAppName + this.loc.get('-reveal'), 'this.'+revealingFunction);
                Stdlib.NOP();
            } else {
                eval('this.'+revealingFunction);
            }
        }

        if ( this.cropMethod ) {
            var cropFunction = cropFunctions[this.cropMethod];
            if ( this.ifSuspendHistory ) {
                this.doc.suspendHistory(szAppName + this.loc.get('-crop'), 'this.'+cropFunction);
                Stdlib.NOP();
            } else {
                eval('this.'+cropFunction);
            }
        }
    } else {
        // remove resize entry from history -- it does nothing
        executeAction( cTID( "undo" ), undefined, DialogModes.NO );
        this.doc.activeLayer = this.gCrop;
    }
}

function main() {
    var gc = new GoldenCrop( app.activeDocument );
    // TODO: below
    gc.loadConfig('here comes some fancy config');
    gc.go();
}

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
isSC3Plus = function()  { return isCS3() || isCS4() }; 
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

Stdlib.saveLayer = true;
Stdlib.saveDoc = true;

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
Stdlib.userGoToFreeTransform = function(doc, layer) {
    function _ftn() {
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
          // // $.writeln('' + new Date() + '-------> ' + $.level);
          if (e.number != 8007) { // if not "User cancelled"
            throw e;
          }
          executeAction(cTID("Trnf"), retPostMoveDesc(), DialogModes.NO);
        } finally {
          $.level = lvl;
        }
    
    return state;
    }
    return Stdlib.wrapLCLayer(doc, layer, _ftn)
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
    if (  Stdlib.saveDoc && ad && app.activeDocument != ad) {
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
    if ( Stdlib.saveLayer )  {
        if (doc.activeLayer != al) {
          doc.activeLayer = al;
        }
        if (!doc.activeLayer.isBackgroundLayer) {
          doc.activeLayer.visible = alvis;
        }
    }
    if (Stdlib.saveDoc && app.activeDocument != ad) {
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
Stdlib.getVectorMaskBounds_cornerPointsOnly = function(round, doc, layer, pointList) { 
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
    var minXp, maxXp, minYp, maxYp; 
    // using separate variables gives speed gain 
    var _id1 = sTID("subpathListKey"), 
        _id2 = sTID("points"), 
        _id3 = sTID("anchor"), 
        _id4 = sTID('horizontal'), 
        _id5 = sTID('vertical');
     var pList = new Array();
    if (pointList) {
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
              pList.push({x:x,y:y});
              // it is faster than if/else block (benchmarked on PSCS4) 
              if ( x < minX ) { minX = x; minXp = {x:x,y:y} }
              if ( x > maxX ) { maxX = x; maxXp = {x:x,y:y} }
              if ( y < minY ) { minY = y; minYp = {x:x,y:y} }
              if ( y > maxY ) { maxY = y; maxYp = {x:x,y:y} }
            } 
         }
     } else {
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
              // it is faster than if/else block (benchmarked on PSCS4) 
              if ( x < minX ) { minX = x; minXp = {x:x,y:y} }
              if ( x > maxX ) { maxX = x; maxXp = {x:x,y:y} }
              if ( y < minY ) { minY = y; minYp = {x:x,y:y} }
              if ( y > maxY ) { maxY = y; maxYp = {x:x,y:y} }
            } 
         }
    }
 
    //          0      1     2      3     4            5           6      7       8       9       10
    var res = [minX, minY, maxX, maxY, maxX-minX, maxY-minY, minXp, maxXp, minYp, maxYp, pList]; 
    if (round) 
    { 
      for ( i=0; i<6; ++i ) 
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
    if ( !doc ) doc = app.activeDocument;
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

Stdlib.rotateCannvas = function( angle, doc ) {
  function _ftn() {
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "Dcmn" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Frst" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    desc.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), angle );
    executeAction( charIDToTypeID( "Rtte" ), desc, DialogModes.NO );
  }
  Stdlib.wrapLC(doc, _ftn);
}

Stdlib.flipPath = function(h, v) {
    var idTrnf = cTID( "Trnf" );
        var desc108 = new ActionDescriptor();
            var ref101 = new ActionReference();
            ref101.putEnumerated( cTID( "Path" ), cTID( "Ordn" ), cTID( "Trgt" ));
        desc108.putReference(  cTID( "null" ), ref101 );
        desc108.putEnumerated( cTID( "FTcs" ), cTID( "QCSt" ), cTID( "Qcsa" ) );
        if (h) desc108.putUnitDouble( cTID( "Wdth" ), cTID( "#Prc" ), -100.000000 );
        if (v) desc108.putUnitDouble( cTID( "Hght" ), cTID( "#Prc" ), -100.000000 );
    executeAction( idTrnf, desc108, DialogModes.NO );
}

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
// ===END: stdlib.js====================================================================================================================

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (var i in this) {
    //if(!this.hasOwnProperty(i)) continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
// ====================================================================================================================================

app.bringToFront();
if ( app.documents.length == 0 )
{
    var loc = localizator.getInstance();
    throw new Error( loc.get('openB4Run') );
}

try {
   var oldRulerUnit = app.preferences.rulerUnits; // Save ruler unit
   app.preferences.rulerUnits = Units.PIXELS;     // Set it to PIXEL
   main();
} catch ( e ) {
   alert( e.message );
} finally {
   app.preferences.rulerUnits = oldRulerUnit; // Restore ruler unit
}
// ---------------------------------------------------------------------