Package.describe({
  name: 'barbatus:angular2',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'ng-templates',
  sources: [
    'plugin/handler.js'
  ]
});

Npm.depends({
  'babel-core': '5.8.22',
  'babel-plugin-angular2-at-annotation': '0.1.0',
  'reflect-metadata': '0.1.0',
  'zone.js': '0.5.0',
  'es6-shim': '0.33.0',
  'angular2': '2.0.0-alpha.35',
  'exposify': '0.4.3',
  'externalify': '0.1.0',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'cosmos:browserify'
  ], 'client');

  api.use([
    'universe:modules@0.4.1',
  ]);

  api.addFiles([
    'client.browserify.js',
  ], 'client');

  api.addFiles([
    'main.import.jsx',
    'angular2.import.jsx',
    'router.import.jsx',
    'change_detection.import.jsx',
    'system-config.js'
  ]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
