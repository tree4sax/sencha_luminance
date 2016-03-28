var renderForm = function(req, res){
  res.render('ccalc-form', { title: 'Color Calculator' });
}

module.exports.ccalcForm = function(req, res){
  renderForm(req, res);
}

var renderResults = function(req, res, results){
  res.render('ccalc-form', {
    title: 'Color Results',
    header: 'Results in JSON array',
    results: JSON.stringify(results)
  });
}

var ColorLuminance = function(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }
  return rgb;
}

module.exports.ccalcResults = function(req, res){
  var hexArray = [];
  hexArray.push(ColorLuminance(req.body.color, 0.2));
  hexArray.push(ColorLuminance(req.body.color, 0.1));
  hexArray.push(ColorLuminance(req.body.color, -0.1));
  hexArray.push(ColorLuminance(req.body.color, -0.2));

  renderResults(req, res, hexArray);
}
