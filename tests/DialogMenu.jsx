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
                    $.writeln(edShcut.text.toUpperCase() + ' = ' + elements[i].key.toUpperCase());
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

// ------------------------------------------------------------------------
app.bringToFront();
var menuDesc = {caption:"CAPTION",
                question:"QUESTION",
                elements:[{key:'1', text:'TXT 1 ala ma kota długiego bardzo'},
                          {key:'2', text:'TXT 2 에 걸쳐 중유럽의'},
                          {key:'3', text:'TXT 2'},
                          {key:'4', text:'TXT 2'},
                          {key:'5', text:'TXT 2', def:true},
                          {key:'6', text:'TXT 2'},
                          {key:'7', text:'TXT 2'},
                          {key:'Esc', text:'EXIT'}
                         ]
               };
var dlg = new dialogMenu(menuDesc);
dlg.show();
