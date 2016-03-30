require('marko/browser-refresh').enable();

var app = require('./app');

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);

  // Tell browser-refresh that server is ready to receive requests
  if (process.send) {
    process.send('online');
  }
});
