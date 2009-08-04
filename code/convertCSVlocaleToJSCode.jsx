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
// ---------------------------------------------------------------------------------------------------------

localizator.loadCVSsaveAsJSCodeFile();
'\n------------------ ' + new Date();