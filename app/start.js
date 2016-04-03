require('../config/init/browser-refresh');

var config = require('../config/app');
var app = require('./app');

app.listen(config.PORT, function () {
  console.log('App listening on port ' + config.PORT);

  // Tell browser-refresh that server is ready to receive requests
  if (process.send) {
    process.send('online');
  }
});
