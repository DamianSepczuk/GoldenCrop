#strict on
function localizator(secretNumber) {
    if ( secretNumber != 314159 ) {
        throw new Error('Do not construct localizator using new keyword. To get localizator objcet use localizator.getInstance() instead.');
    }
    this.use_locale = 'auto';
    $.localize = true;
    $.localization = true; // ?
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
    str['chCropMethod'] = {en:'Choose crop style', pl:'Wybierz styl przycinania', de:'Wähle Schnittstil'};
    str['chCropMethodQ'] = {en:'Choose crop style', pl:'Wybierz styl przycinania', de:'Wähle Schnittstil'};
    str['cropCanvas'] = {en:'Crop canvas (simple crop)', pl:'Przytnij płótno', de:'Arbeitsfläche aufteilen'};
    str['mkCropMask'] = {en:'Make crop mask', pl:'Stwórz maskę kadrującą', de:'Erstelle Schnittmaske'};
    str['cancel'] = {en:'Cancel', pl:'Anuluj', de:'Abbrechen'};
    str['bgOnLayer'] = {en:'Background on layer', pl:'Tło na warstwie', de:'Hintergrund auf Ebene'};
    str['bgFill'] = {en:'Background fill', pl:'Wypełnienie tła', de:'Hintergrund füllen'};
    str['-grid'] = {en:' - grid', pl:' - siatka', de:' - Rastern'};
    str['-resize'] = {en:' - resize', pl:' - przeskalowanie', de:' - Skalieren'};
    str['-reveal'] = {en:' - reveal', pl:' - rozszerzanie', de:' - Einblenden'};
    str['-crop'] = {en:' - crop', pl:' - przycinanie', de:' - Beschneiden'};
    str['GCbySzN'] = {en:'Golden Crop by SzopeN', pl:'Golden Crop by SzopeN', de:'Golden Crop by SzopeN'};
    str['cropMask'] = {en:'Crop mask', pl:'Maska kadrująca', de:'Schnittmaske'};
    str['divRules'] = {en:'Dividing rules', pl:'Reguły podziału', de:'Trennungsregeln'};
    str['stripAtPrc'] = {en:'Strip at %1%%', pl:'Paski na %1%%', de:'Linien auf %1%%'};
    str['goldenTriangleUp'] = {en:'Golden triangle upwards', pl:'Złoty trójkąt w górę', de:'Goldene Dreieck aufwärts'};
    str['goldenTriangleDown'] = {en:'Golden triangle downwards', pl:'Złoty trójkąt w dół', de:'Goldene Dreieck abwärts'};
    str['diagonalMethod'] = {en:'Diagonal method', pl:'Metoda przekątnych', de:'Diagonal-Methode'};
    str['openB4Run'] = {en:'Open the document in which you want the script to run.', pl:'Otwórz dokument, w którym chcesz uruchomić ten skrypt.', de:'Öffne das Dokument, in dem das Script ablaufen soll.'};
    str['canvExtDet'] = {en:'Canvas extension detected.', pl:'Wykryto rozszerzenie płótna.', de:'Erweiterung der Arbeitsfläche zeigen'};
    str['canvExtDetQ'] = {en:'What to do with canvas?', pl:'Co mam zrobić z płótnem?', de:'Was mache ich mit der Arbeitsfläche?'};
    str['extendCanvas'] = {en:'Extend canvas', pl:'Rozszerz płótno', de:'Erweiterte Arbeitsfläche'};
    str['dontExtCanv'] = {en:'Crop without extension', pl:'Przytnij bez rozszerzania', de:'Schnitt ohne Erweiterung'};
    str['retToCropping'] = {en:'Return to cropping', pl:'Wróć do kadrowania', de:'Zurück zum Schneiden'};
    str['chCompMethod'] = {en:'Composition method', pl:'Metoda kompozycji', de:'Kompositionsmethode'};
    str['chCompMethodQ'] = {en:'Choose composition guidelines', pl:'Wybierz metodę kompozycji', de:'Auswahl der Kompositionslinien'};
    str['goldenRule'] = {en:'Golden Rule', pl:'Złoty podział', de:'Goldene Regel'};
    str['ruleOfThirds'] = {en:'Rule of Thirds', pl:'Reguła trzech', de:'Drittel-Regel'};
    str['goldenSpiralBL'] = {en:'Golden Spiral bottom-left', pl:'Złota spirala lewo-dół', de:'Goldene Spirale unten links'};
    str['goldenSpiralTL'] = {en:'Golden Spiral top-left', pl:'Złota spirala lewo-góra', de:'Goldene Spirale oben links'};
    str['goldenSpiralTR'] = {en:'Golden Spiral top-right', pl:'Złota spirala prawo-góra', de:'Goldene Spirale oben rechts'};
    str['goldenSpiralBR'] = {en:'Golden Spiral bottom-right', pl:'Złota spirala prawo-dół', de:'Goldene Spirale unten rechts'};
    str['selectAll'] = {en:'Select All', pl:'Zaznacz wszystkie', de:'Alles Auswählen'};
    str['deselectAll'] = {en:'Deselect All', pl:'Odznacz wszystkie', de:'Nichts Auswählen'};
    str['ok'] = {en:'OK', pl:'OK', de:'OK'};
    str['allGoldenSpirals'] = {en:'All Golden Spirals', pl:'Wszystkie Złote Spirale', de:'Alle Goldenen Spiralen'};
    str['basicRules'] = {en:'Basic rules', pl:'Podstawowe podziały', de:'Grundregeln'};
    str['lineThickness'] = {en:'Line thickness', pl:'Grubość linii', de:'Linienstärke'};
    str['lineThicknessProm'] = {en:'Line thickness (‰ of shorter edge): ', pl:'Grubość linii (‰ krótszego boku)', de:'Linienstärke (‰ der kürzeren Kante)'};
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
// ------- test code
//var loc = localizator.getInstance();
var s = localizator.getInstance();
s.initStrings();
s.setLocale('en');
$.writeln(s.saveAsCSVFile());
//localizator.loadCVSsaveAsJSCodeFile();
'\n------------------ ' + new Date();

