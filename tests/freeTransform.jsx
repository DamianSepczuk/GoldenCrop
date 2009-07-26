cTID_global_array = new Array();
cTID = function(s) { return cTID_global_array[s] || cTID_global_array[s]=app.charIDToTypeID(s); };
sTID_global_array = new Array();
sTID = function(s) { return sTID_global_array[s] || sTID_global_array[s]=app.stringIDToTypeID(s); };
linked = false;
//     var desc74 = new ActionDescriptor();
//     desc74.putEnumerated( cTID('FTcs'), cTID('QCSt'), cTID('Qcsa') );
//     executeAction( cTID('Trnf'), desc74, DialogModes.NO );
function foo() {
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

//for ( var i=0; i<10000; ++i )
 foo();