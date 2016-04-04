exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^(app\/static\/js)/,
        'js/vendor.js': /^(?!app\/static\/js)/
      }
    },

    stylesheets: {
      joinTo: {
        'css/app.css': /^(app\/static\/css)/,
        'css/vendor.css': /^(?!app\/static\/css)/
      }
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // Files in this directory will be copied to `paths.public`.
    assets: /^(app\/static\/assets)/
  },

  paths: {
    // Dependencies and current project directories to watch
    watched: [
      'app/static'
    ],

    // Where to compile files to
    public: 'static'
  },

  // Configure your plugins
  plugins: {
    fingerprint: {
      manifest: './assets.json',
      srcBasePath: 'static/',
      destBasePath: 'static/'
    }
  },

  modules: {
    // Require (run) modules at the end of a bundle
    autoRequire: {
      'js/app.js': ['static/js/main.js']
    }
  },

  npm: {
    styles: {
      bootstrap: ['dist/css/bootstrap.css'],
      nprogress: ['nprogress.css']
    },
    globals: {spf: 'spf/dist/spf.js'}
  }
};
