var path = require('path');
var enforceNodePath = require('enforce-node-path');
// We make sure that `NODE_PATH=.` is set
// This allows us to use `require('app/models/character')` in any file,
// instead of things like `require('../../../models/character')`
enforceNodePath(path.join(__dirname, '..'));

require('config/init/browser-refresh');

var config = require('config/app');
var app = require('app/app');

app.listen(config.PORT, function () {
  console.log('App listening on port ' + config.PORT);

  // Tell browser-refresh that server is ready to receive requests
  if (process.send) {
    process.send('online');
  }
});
