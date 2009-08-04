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

isCS4 = function()  { return psVersion.match(/^11\./) != null; }; 
isCS3 = function()  { return psVersion.match(/^10\./) != null; }; 


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

// ------------------------------------------------------------------------
app.bringToFront();
var menuDesc = {caption:"CAPTION",
                question:"QUESTION",
				okTxt:"OK",
				cancelTxt:"Cancel",
                cbElements:[{key:'1', text:'TXT 1 ala ma kota długiego bardzo', sel: true},
                          {key:'2', text:'TXT 2 에 걸쳐 중유럽의'},
                          {key:'3', text:'TXT 2'},
                          {key:'4', text:'TXT 2', sel: true},
                          {key:'5', text:'TXT 2'},
                          {key:'6', text:'TXT 2'},
                          {key:'7', text:'TXT 2'},
                         ],
                msElements:[{key:'q', text:'Multi 1', elements:[0,1,2]},
                            {key:'w', text:'Multi 2', elements:[2,3,4,5]},
 					      {key:'a', text:'Select all', action: 'slctAll'},
						   {key:'d', text:'Deselect all', action: 'dslctAll'}
]
               };
var dlg = new dialogMenuMChoice(menuDesc);
dlg.show();