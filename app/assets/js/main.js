/* global spf, NProgress */

var app = app || {};

app.init = function() {
  if (window.addEventListener) {
    window.addEventListener('spfrequest', app.onSpfRequest);
    window.addEventListener('spfdone', app.onSpfDone);
  }
  app.enabled = spf.init();
};

app.dispose = function() {
  if (window.removeEventListener) {
    window.removeEventListener('spfrequest', app.onSpfRequest);
    window.removeEventListener('spfdone', app.onSpfDone);
  }
};

app.onSpfRequest = function() {
  NProgress.start();
};

app.onSpfDone = function() {
  NProgress.done();
};

app.back = function() {
  if (typeof window.history !== 'undefined') {
    window.history.back();
  }
};

app.init();
