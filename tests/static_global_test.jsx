function sTID(s) { return app.stringIDToTypeID(s); };
// Whole file
function sta(param) {
	sta.a = sta.a || new Array();
	sta.a[param]=param;
}

sta2_global_array = new Array()
function sta2(param) {
	return sta2_global_array[param] || sta2_global_array[param]=app.stringIDToTypeID(param);
}
// Buf:    435026
// NoBuf: 1574689
function f() {
var iter=1000000;
for ( var i=0; i<iter; ++i ) {
	sta2('vectorMask');
	sta2('pathContents');
	sta2('subpathListKey');
	sta2('anchor');
}

//Math.exp((Math.sqrt(i)*0.9432567))
//$.writeln("Len: " + sta2_global_array.length + " arr: " + sta2_global_array[0] + " | " + sta2_global_array[iter-1]);
$.writeln("Len: " + sta2_global_array.length + " arr: " + sta2_global_array['anchor']);
}
f();
//$.writeln("Len: " + sta.a.length + " arr: " /*+ sta.a*/);	