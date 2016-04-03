var browserRefreshClient = require('browser-refresh-client');
var path = require('path');

require('marko/browser-refresh').enable();

var patterns = '*.css *.png *.jpg';

var styleExtensions = {
  css: true
};

var imageExtensions = {
  png: true,
  jpg: true
};

browserRefreshClient
  .enableSpecialReload(patterns, {autoRefresh: false})
  .onFileModified(function(filePath) {
    var extname = path.extname(filePath);
    if (extname) {
      extname = extname.substring(1);
    }

    if (imageExtensions[extname]) {
      browserRefreshClient.refreshImages();
    } else if (styleExtensions[extname]) {
      browserRefreshClient.refreshStyles();
    } else {
      browserRefreshClient.refreshPage();
    }
  });
