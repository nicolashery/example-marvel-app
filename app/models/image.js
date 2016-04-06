var t = require('tcomb');

var Image = t.struct({
  path: t.String,
  extension: t.String
}, 'Image');

Image.getPortraitXLarge = function(image) {
  return image.path + '/portrait_xlarge.' + image.extension;
};

Image.getStandardXLarge = function(image) {
  return image.path + '/standard_xlarge.' + image.extension;
};

module.exports = Image;
