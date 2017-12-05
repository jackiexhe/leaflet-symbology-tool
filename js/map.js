//====map
var lineStyleData = ['solid', 'dot', 'dash', 'dashdot', 'dashdotdot'];
var regionStyleData = [
  //   'transparent',
  'fill', 'horizontal', 'vertical', 'backwarddiagonal', 'forwarddiagonal',
  //   'largegrid',
  'diagonalcross',
  //   'percent10',
  //   'percent25',
  //   'percent40',
  //   'percent60',
  //   'percent75',
  //   'percent90',
  //   'lightupwarddiagonal',
  //   'lightvertical',
  //   'darkupwarddiagonal',
  //   '>narrowvertical',
  //   'narrowhorizontal',
  //   'darkhorizontal',
  //   'dasheddownwarddiagonal',
  //   'dashedvertical',
  //   'smallconfetti',
  //   'largeconfetti',
  //   'zigzag',
  //   'wave',
  //   'diagonalbrick',
  //   'horizontalbrick',
  //   'weave',
  //   'plaid',
  //   'divot',
  //   'dottedgrid',
  //   'dotteddiamond',
  //   'shingle',
  //   'trellis',
  //   'sphere',
  //   'smallgrid',
  //   'soliddiamond'
];
var widthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var svgPathBuilder = {
  fill: function(h) {
    return '';
  },
  horizontal: function(h) {
    return 'M 0 0 h ' + h;
  },
  vertical: function(h) {
    return 'M 0 0 v ' + h;
  },
  backwarddiagonal: function(h) {
    return 'M 0 ' + h + ' L ' + h + ' 0 M 0 0 L 0.2 0.2 ' +
        ' M ' + h + ' ' + h + ' L ' + (h - 0.18) + ' ' + (h - 0.18);
  },
  forwarddiagonal: function(h) {
    return 'M 0 0 L ' + h + ' ' + h + ' M 0 ' + h + ' L ' + 0.18 + ' ' +
        (h - 0.18) + ' M ' + h + ' 0 ' +
        ' L ' + (h - 0.18) + ' ' + 0.18;
  },
  diagonalcross: function(h) {
    return 'M 0 0 L ' + h + ' ' + h + ' M 0 ' + h + ' L ' + h + ' 0';
  },
};

var dashArray = {
  solid: function(w) {
    return '';
  },
  dot: function(w) {
    return '' + w;
  },
  dash: function(w) {
    return '' + 3 * w;
  },
  dashdot: function(w) {
    return 3 * w + ' ' + 2 * w + ' ' + w + ' ' + 2 * w;
  },
  dashdotdot: function(w) {
    return 3 * w + ' ' + 2 * w + ' ' + w + ' ' + 2 * w + ' ' + w + ' ' + 2 * w;
  },
}

//======================map===============
var mapCenter = new L.LatLng(0, 0);
var map = new L.Map('mapid', {
  center: mapCenter,
  zoomControl: false,
  attributionControl: false,
  zoom: 15,
  dragging: false,
  scrollWheelZoom: false,
});

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    maxZoom: 18,
//  }).addTo(map);

//=======================polygon pattern============================
var fillPatternPathOptions = function(foreColor, gridWidth, style) {
  return {
    d: svgPathBuilder[style](gridWidth),
    color: foreColor,
  };
};

var fillPatternPath;
var initPattern = function(backColor, foreColor, gridWidth, style) {
  var pattern = new L.Pattern({
    width: gridWidth,
    height: gridWidth,
  });

  pattern.addShape(new L.PatternRect({
    x: 0,
    y: 0,
    width: gridWidth,
    height: gridWidth,
    fill: true,
    color: backColor,
    fillOpacity: 0.6,
    stroke: false,
  }));

  fillPatternPath =
      new L.PatternPath(fillPatternPathOptions(foreColor, gridWidth, style));

  pattern.addShape(fillPatternPath);
  pattern.addTo(map);

  var circle = new L
                   .Circle(new L.LatLng(0, -0.004), 400.0, {
                     fill: true,
                     fillPattern: pattern,
                     fillOpacity: 0.6,
                     stroke: true,
                     weight: 1,
                     color: '#000000',
                   })
                   .addTo(map);


};
initPattern('#000000', '#ffffff', 15, 'fill');

var resetFillPatternPathStyle = function(foreColor, gridWidth, style) {
  fillPatternPath.setStyle(fillPatternPathOptions(foreColor, gridWidth, style));
  fillPatternPath.redraw();
};

// resetFillPatternPathStyle('#000000', 15, 'horizontal');


//=======================line pattern============================


var lineWeight = 10;
var line = new L
               .Polyline([[0, 0], [0, 0.008]], {
                 // fill: true,
                 // fillPattern: pattern,
                 fillOpacity: 1.0,
                 dashArray: dashArray.dashdotdot(lineWeight),
                 stroke: true,
                 weight: lineWeight,
                 lineCap: 'square',
                 lineJoin: 'square',
               })
               .addTo(map);


//=======================Symbol & Color=========================

var getRGBInteger = function(color) {
  var rgba = $.Color(color)
  return (rgba.blue() << 16) + (rgba.green() << 8) + rgba.red()
};

var getRGBfromInteger = function(RGBint) {
  red = RGBint & 255
  green = (RGBint >> 8) & 255
  blue = (RGBint >> 16) & 255
  var rgba = $.Color({red: red, green: green, blue: blue, alpha: 0});
  return rgba.toHexString();
};

var getRegionSymbolByString = function(str) {
  var symbolElements = str.split(',');
  return {}
};

// console.log(getRGBInteger('#E605FA'));
// console.log(getRGBfromInteger(16385510));