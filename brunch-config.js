exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: 'js/app.js'
    },

    stylesheets: {
      joinTo: 'css/app.css'
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
  plugins: {},

  modules: {
    // Require (run) modules at the end of a bundle
    autoRequire: {
      'js/app.js': ['static/js/main.js']
    }
  },

  npm: {
    enabled: true,
    // Whitelist the npm deps to be pulled in as front-end assets.
    // All other deps in package.json will be excluded from the bundle.
    whitelist: []
  }
};
