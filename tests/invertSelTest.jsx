var doc = activeDocument;

// doc.selection.invert: (1305733+1343437+1340065)/3=1329745
// action: (1335865+1329141+1354364)/3=1339790
function a() {
	for (var i=0; i<30; ++i) {
		executeAction( charIDToTypeID( "Invs" ), undefined, DialogModes.NO );
	}
}

a();