#include 'z:/queue/xtools/xlib/PSConstants.js'
#include 'z:/queue/xtools/xlib/stdlib.js'

var ref = new ActionReference();
ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
var desc = executeActionGet(ref);
desc = desc.getObjectValue(sTID('bounds'));
/*
Fill layer:
Name ID: Nm   type STRINGTYPE
Color ID: Clr  type ENUMERATEDTYPE
Visible ID: Vsbl type BOOLEANTYPE
Mode ID: Md   type ENUMERATEDTYPE
Opacity ID: Opct type INTEGERTYPE
LayerID ID: LyrI type INTEGERTYPE
ItemIndex ID: ItmI type INTEGERTYPE
Count ID: Cnt  type INTEGERTYPE
PreserveTransparency ID: PrsT type BOOLEANTYPE
LayerFXVisible ID: lfxv type BOOLEANTYPE
GlobalAngle ID: gblA type INTEGERTYPE
Background ID: Bckg type BOOLEANTYPE
layerGroup ID: layerSection type ENUMERATEDTYPE
layerLocking ID: layerLocking type OBJECTTYPE
Group ID: Grup type BOOLEANTYPE
targetChannels ID: targetChannels type LISTTYPE
visibleChannels ID: visibleChannels type LISTTYPE
channelRestrictions ID: channelRestrictions type LISTTYPE
fillOpacity ID: fillOpacity type INTEGERTYPE
hasUserMask ID: hasUserMask type BOOLEANTYPE
hasVectorMask ID: hasVectorMask type BOOLEANTYPE
hasFilterMask ID: hasFilterMask type BOOLEANTYPE
userMaskDensity ID: userMaskDensity type INTEGERTYPE
userMaskFeather ID: userMaskFeather type DOUBLETYPE
vectorMaskDensity ID: vectorMaskDensity type INTEGERTYPE
vectorMaskFeather ID: vectorMaskFeather type DOUBLETYPE
Adjustment ID: Adjs type LISTTYPE
bounds ID: bounds type OBJECTTYPE
*/
/*
Group:
Name ID: Nm   type STRINGTYPE
Color ID: Clr  type ENUMERATEDTYPE
Mode ID: Md   type ENUMERATEDTYPE
Visible ID: Vsbl type BOOLEANTYPE
Opacity ID: Opct type INTEGERTYPE
LayerID ID: LyrI type INTEGERTYPE
ItemIndex ID: ItmI type INTEGERTYPE
Count ID: Cnt  type INTEGERTYPE
PreserveTransparency ID: PrsT type BOOLEANTYPE
LayerFXVisible ID: lfxv type BOOLEANTYPE
GlobalAngle ID: gblA type INTEGERTYPE
Background ID: Bckg type BOOLEANTYPE
layerGroup ID: layerSection type ENUMERATEDTYPE
layerLocking ID: layerLocking type OBJECTTYPE
Group ID: Grup type BOOLEANTYPE
targetChannels ID: targetChannels type LISTTYPE
visibleChannels ID: visibleChannels type LISTTYPE
channelRestrictions ID: channelRestrictions type LISTTYPE
fillOpacity ID: fillOpacity type INTEGERTYPE
hasUserMask ID: hasUserMask type BOOLEANTYPE
hasVectorMask ID: hasVectorMask type BOOLEANTYPE
hasFilterMask ID: hasFilterMask type BOOLEANTYPE
userMaskDensity ID: userMaskDensity type INTEGERTYPE
userMaskFeather ID: userMaskFeather type DOUBLETYPE
vectorMaskDensity ID: vectorMaskDensity type INTEGERTYPE
vectorMaskFeather ID: vectorMaskFeather type DOUBLETYPE
bounds ID: bounds type OBJECTTYPE

*/

for ( var i=0; i<desc.count; ++i ){
	var id = desc.getKey(i);
   $.writeln(id2char(id) + " ID: '" + id2charId(id) + "' type " + desc.getType(id) + " = " + desc.getDouble(id) );
}
