cTID_global_array = new Array();
cTID = function(s) { return cTID_global_array[s] || cTID_global_array[s]=app.charIDToTypeID(s); };
sTID_global_array = new Array();
sTID = function(s) { return sTID_global_array[s] || sTID_global_array[s]=app.stringIDToTypeID(s); };
linked = false;
//     var desc74 = new ActionDescriptor();
//     desc74.putEnumerated( cTID('FTcs'), cTID('QCSt'), cTID('Qcsa') );
//     executeAction( cTID('Trnf'), desc74, DialogModes.NO );
function foo() {
	var desc = new ActionDescriptor();
    var lref = new ActionReference();
    lref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
    desc.putReference(cTID("null"), lref);
    desc.putEnumerated(cTID("FTcs"), cTID("QCSt"), cTID("Qcsa"));
    desc.putUnitDouble( cTID('Wdth'), cTID('#Prc'), 99.9999999999999 );
    desc.putUnitDouble( cTID('Hght'), cTID('#Prc'), 99.9999999999999 );

    if (linked == true) {
      desc.putBoolean(cTID("Lnkd"), true );
    }

    var lvl = $.level;
    $.level = 0;
    try {
      executeAction(cTID("Trnf"), desc, DialogModes.ALL);///ALL
    } catch (e) {
      $.level = lvl;
	  $.writeln('' + new Date() + '-------> ' + $.level);
      if (e.number != 8007) { // if not "User cancelled"
        throw e;
      }
    }
    $.level = lvl;
}

//for ( var i=0; i<10000; ++i )
 foo();