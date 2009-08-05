$.level = 1;
Timer = function() {
  var self = this;
  self.startTime = 0;
  self.stopTime  = 0;
  self.elapsed = 0;
  self.cummulative = 0;
  self.count = 0;
};

Timer.prototype.start = function() {
  this.startTime = new Date().getTime();
};
Timer.prototype.stop = function() {
  var self = this;
  self.stopTime = new Date().getTime();
  self.elapsed = (self.stopTime - self.startTime)/1000.00;
  self.cummulative += self.elapsed;
  self.count++;
  self.per = self.cummulative/self.count;
};

// ** --#*include 'z:/queue/xtools/xlib/PSConstants.js'
// ** --#*include 'z:/queue/xtools/xlib/stdlib.js'
Stdlib = function(){};

//
// Traverse the all layers, including nested layers, executing
// the specified function. Traversal can happen in both directions.
//
Stdlib.traverseLayers = function(doc, ftn, reverse, layerSets) {

  function _traverse(doc, layers, ftn, reverse, layerSets) {
    var ok = true;
    for (var i = 1; i <= layers.length && ok != false; i++) {
      var index = (reverse == true) ? layers.length-i : i - 1;
      var layer = layers[index];

      if (layer.typename == "LayerSet") {
        if (layerSets) {
          ok = ftn(doc, layer);
        }
        if (ok) {
          ok = _traverse(doc, layer.layers, ftn, reverse, layerSets);
        }
      } else {
        ok = ftn(doc, layer);
        try {
          if (app.activeDocument != doc) {
            app.activeDocument = doc;
          }
        } catch (e) {
        }
      }
    }
    return ok;
  };

  return _traverse(doc, doc.layers, ftn, reverse, layerSets);
};

Stdlib.findLayer = function(doc, layerName) {
  function _findLayer(doc, layer) {
    if (_findLayer.matchFtn(layer.name, _findLayer.layerName)) {
      _findLayer.layer = layer;
      return false;
    }
    return true;
  }

  var matchFtn;

  if (layerName instanceof RegExp) {
    matchFtn = function(s1, re) { return s1.match(re) != null; }
  } else {
    matchFtn = function(s1, s2) { return s1 == s2;  }
  }

  _findLayer.matchFtn = matchFtn;
  _findLayer.layerName = layerName;
  Stdlib.traverseLayers(doc, _findLayer, false, true);
  return _findLayer.layer;
};

findMainGCGroup = function () {
	this.doc = doc; // DEBUG
	var mainGCGroupName = 'Golden Crop by SzopeN';
	var layer = this.doc.activeLayer

	var isGCMG = function( layer ) {
		    return layer.typename == 'LayerSet' && layer.name == mainGCGroupName;
		}
	// We have the layer active or we are somwhere inside the main group
	do {
		if ( isGCMG( layer ) )
			return layer;
		layer = layer.parent;
	} while ( layer.typename != 'Document' )
	
	// GC Main Group is at the top of the layer stack
	layer = doc.layers[0];
	if ( isGCMG(layer) ) {
		return layer;
	}
	
	// there's no Golden Crop
	return false;
}

var findCropMaskAndDivRules = function ( mainGCGroup ) {
	var toFind=2;
	var layers = {cropMask: undefined, divRules: undefined};

	for ( var i = mainGCGroup.layers.length-1; i>=0 && toFind; --i ) {
		var layer = mainGCGroup.layers[i];
		if ( layer.kind == LayerKind.SOLIDFILL && layer.name == 'Crop mask') {
			layers.cropMask = layer;
			--toFind;
		} else if ( layer.typename == 'LayerSet' && layer.name == 'Dividing rules') {
			layers.divRules = layer;
			--toFind;
		}
	}
	return layers.cropMask?layers:false;
}


// Find golden crop layers
var doc = app.activeDocument;
var t = new Timer();
t.start();
//Stdlib.findLayer(doc, mainGCGroupName);
//findCropMask()
var o = findCropMaskAndDivRules(findMainGCGroup());
$.writeln(o.cropMask);
$.writeln(o.divRules);
o.cropMask.visible = true;
o.divRules.visible = true;
t.stop();
$.writeln(t.elapsed)