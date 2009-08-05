/*
// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>Configurator</name>
<about>Configurator about.</about>
<menu>automate</menu>
<enableinfo>true</enableinfo>
<eventid>3caa3434-cb67-11d1-bc43-0060b0a13dc3</eventid>
<terminology><![CDATA[<< /Version 1 
                         /Events << 
                          /3caa3434-cb67-11d1-bc43-0060b0a13dc3 [(configurator_test) /imageReference <<
							/golden [(Golden Rule) /boolean]
							/roth [(Rule of Thirds) /boolean]
							/gdiagup [(gdiagup) /boolean]
							/gdiagdown [(a) /boolean]
                          >>] 
					    /3caa3434-cb67-11d1-bc43-0060b0a13dca [(configurator_test2) /imageReferenc2 <<
							/gspiralBL [(b) /boolean]
							/gspiralTL [(c) /boolean]
							/gspiralTR [(d) /boolean]
							/gspiralBR [(e) /boolean]
                          >>] 

                         >> 
                      >> ]]></terminology>
</javascriptresource>
// END__HARVEST_EXCEPTION_ZSTRING
	                       /width [(widthYY) /pixelsUnit]
	                       /height [(heightZZ) /pixelsUnit]

*/

#target photoshop
cTID_global_array = new Array();
cTID = function(s) { return cTID_global_array[s] || cTID_global_array[s]=app.charIDToTypeID(s); };
sTID_global_array = new Array();
sTID = function(s) { return sTID_global_array[s] || sTID_global_array[s]=app.stringIDToTypeID(s); };


function SimpleADUnserializer( ad )
{
	var obj = new Object();
	
	for ( var i=0; i<ad.count; ++i)
	{
		var key = ad.getKey(i);
 		var fieldName = app.typeIDToStringID(key);
		switch ( ad.getType(key) )
		{
			case DescValueType.BOOLEANTYPE:
				obj[ fieldName ] = ad.getBoolean( key );
				break;
			case DescValueType.STRINGTYPE:
				obj[ fieldName ] = ad.getString( key );
				break;
			case DescValueType.DOUBLETYPE:
				obj[ fieldName ] = ad.getString( key );
				break;
			case DescValueType.RAWTYPE: // array
				obj[ fieldName ] = eval(ad.getData( key ));
				break;
			case DescValueType.OBJECTTYPE:
				obj[ fieldName ] = SimpleADUnserializer(ad.getObject( key ));
				break;
			case DescValueType.UNITDOUBLE:
			case DescValueType.INTEGERTYPE: // supported via double
			case DescValueType.ALIASTYPE:
			case DescValueType.CLASSTYPE:
			case DescValueType.ENUMERATEDTYPE:
			case DescValueType.LISTTYPE:
			case DescValueType.REFERENCETYPE:
				// unsupported types
				break;
		}
	}

	return obj;
}


function SimpleADSerializer( obj )
{
	debugger;
	isArray = function ( obj )
	{
		return obj.constructor.toString().indexOf('Array') != -1;
	}
	var STTID = app.stringIDToTypeID;

	var ad = new ActionDescriptor();
	ad.putString( app.charIDToTypeID( 'Msge' ), 'alamakota' );
	for ( var field in obj )
	{
		var ID = app.stringIDToTypeID(field);
		var val = obj[field];
		//var typeID = STTID(field.toString()); // represents field name
		switch (typeof val)
		{
			case "function":
				// we store only data
				break;
			case "undefined":
				ad.putData( ID, 'undefined');
				break;
			case "boolean":
				ad.putBoolean( ID,  val);
				break;
			case "number":
				ad.putDouble( ID,  val);
				break;
			case "string":
				ad.putString( ID,  val);
				break;
			case "object":
				if ( val == null )
				{
					ad.putData( ID, 'null');
				}
				else if ( isArray( val ) )
				{
					ad.putData( ID, SimpleJSONSerializer(val));
				}
				else
				{
					ad.putObject( ID,  SimpleADSerializer(val));
				}
				break;
		}
	}
	return ad;
}

function SimpleJSONSerializer( obj )
{
	isArray = function ( obj )
	{
		return obj.constructor.toString().indexOf('Array') != -1;
	}

	var ret="";
	switch (typeof obj)
	{
		case "function":
			break;
		case "boolean":
		case "number":
			ret += obj;
			break;
		case "string":
			ret += '"'+obj.replace ('"', '\\"')+'"';
			break;
		case "undefined":
			ret += 'undefined'
			break;
		case "object":
			if ( obj == null )
			{
				ret += 'null'
			}
			else if (isArray(obj))
			{
				ret += '[';
				ret += SimpleJSONSerializer(obj[0]);
				for ( var i=1; i<obj.length; ++i )
				{
					ret += ', ' + SimpleJSONSerializer(obj[i]);
				}
				ret += ']';
			}
			else
			{
				ret += '{';
				var isFirst = true;
				for ( var b in obj )
				{
					if ( isFirst == true ) isFirst = false else ret += ', ';
					ret += '"'+b+'": ' + SimpleJSONSerializer(obj[b]);
				}
				ret += '}';
			}
			break;
		default:
			break;
	}
	return ret;
}

// Configurator
configurator = function(paramsDesc, uuid) {
	this._init(paramsDesc);
	this.uuid = uuid;
	this.readFromPlayback = false;
	this.defaultsUsed     = true;
	this.isDisplayDialog  = DialogModes.ALL;
}

configurator.prototype.get = function(id) {
	if (typeof this.params[id] == 'undefined') throw new Error('No such property: ' + id);
	return this.params[id].value;
}

configurator.prototype.set = function(id, val) {
	if (typeof this.params[id] == 'undefined') throw new Error('No such property: ' + id);
	var tmp = this.params[id].value;
	this.params[id].value = val;
	return tmp;
}

configurator.prototype.isDisplayNormalDialog() {
	return this.isDisplayDialog===DialogModes.ALL;
}

configurator.prototype.isDisplayErrorDialog() {
	return this.isDisplayDialog!==DialogModes.NO;
}

configurator.prototype.loadSettings = function() {
	try {
		// try to get global options
		var ad = app.getCustomOptions(this.uuid);		
		this._fromActionDescriptor(ad);
		this.defaultsUsed = false;
	}
	catch(e) {
		// no config, display dialog to get some
		this.defaultsUsed    = true;
	}

	// try to get options from action state
	if ( app.playbackParameters.count > 0 ){
		var localConf = SimpleADUnserializer( app.playbackParameters );
		this._fromActionDescriptor(localConf);
		this.readFromPlayback = true;
		this.defaultsUsed     = false;
		this.isDisplayDialog  = app.playbackDisplayDialogs;
	}

}

configurator.prototype.saveSettings = function() {
	 
	var ad = this._toActionDescriptor();
	app.playbackParameters = ad;
	if ( !this.readFromPlayback ) {
		app.putCustomOptions (this.uuid, ad, true);
	}
}

configurator.prototype._init = function(paramsDesc) {
	this.params = paramsDesc;
}

configurator.prototype._toActionDescriptor = function() {
	var nv = {};
	for ( var o in this.params) {
		nv[o]=this.get(o);
	}
	return SimpleADSerializer(nv);
}

configurator.prototype._fromActionDescriptor = function( ad ) {
	var nv = SimpleADUnserializer(ad);
	for ( var o in nv) {
		this.set(o, nv[o]);
	}
}

configurator.prototype._debug_undefine_all_values = function() {
	for ( var o in this.params) {
		this.set(o, undefined);
	}
}

configurator.prototype.purgeSavedGlobals = function() {
	app.eraseCustomOptions(this.uuid);
}

configurator.prototype.debugPrint = function() {
	for ( var o in this.params) {
		$.writeln( o +' = "' + this.params[o].value + '" (' + typeof this.params[o].value + ')');
	}

	$.writeln('readFromPlayback: ' + this.readFromPlayback);
	$.writeln('defaultsUsed: ' + this.defaultsUsed);
}
/*
configurator.prototype. = function() {
}
*/

var paramsID = {golden:{value:true, desc:''},
			    roth:{value:true, desc:''},
			    gdiagup:{value:true, desc:''},
			    gdiagdown:{value:true, desc:''},
			    gspiralBL:{value:false, desc:''},
			    gspiralTL:{value:false, desc:''},
			    gspiralTR:{value:false, desc:''},
			    gspiralBR:{value:false, desc:''}
			    /*{name:'', value:'', desc:''},*/
                };

var uuid='2c910bcd-8e34-4779-a885-bb214df640a3';
var c = new configurator(paramsID, uuid);

//c.purgeSavedGlobals();
//c.debugPrint();
//c._debug_undefine_all_values();
//c.debugPrint();
$.writeln('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
c.loadSettings();
c.set('golden',true);
c.saveSettings();
c.debugPrint();
$.writeln('----------------------------'+new Date());
''
//c.purgeSavedGlobals();