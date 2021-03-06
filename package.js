Package.describe({
  name: 'barbatus:angular2',
  version: '0.5.3_6',
  summary: 'Angular2 Npm package for Meteor',
  git: 'https://github.com/barbatus/angular2',
  documentation: null
});

Package.registerBuildPlugin({
  name: 'NgHtmlBuilder',
  sources: ['plugin/ng_html_handler.js'],
  use: ['html-tools@1.0.4'],
  npmDependencies : {
    'cheerio': '0.19.0',
    'uglify-js': '2.4.24'
  }
});

Package.registerBuildPlugin({
  name: 'ES6Builder',
  use: ['babel-compiler@5.8.3_1'],
  sources: ['plugin/jsx_handler.js']
});

Package.registerBuildPlugin({
  name: 'TSBuilder',
  sources: [
    'plugin/ts_handler.js'
  ],
  npmDependencies: {
    'typescript': '1.6.2'
  }
});

Npm.depends({
  'reflect-metadata': '0.1.0',
  'zone.js': '0.5.0',
  'es6-shim': '0.33.0',
  'angular2': '2.0.0-alpha.37',
  'exposify': '0.4.3',
  'externalify': '0.1.0'
});

var client = 'client';
var server = 'server';
var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');

  api.use([
    'isobuild:compiler-plugin@1.0.0',
    'promise@0.4.8'
  ], server);

  api.use([
    'cosmos:browserify@0.5.0',
    'underscore@1.0.4',   
    'systemjs:systemjs@0.18.4'
  ], both);

  api.imply([
    'babel-runtime@0.1.3',
    'cosmos:browserify@0.5.0',
    'systemjs:systemjs@0.18.4'
  ]);
  api.imply('promise@0.4.8', server);

  api.addFiles([
    'system_config.js'
  ], server);

  // Adds Angular2 and Meteor declaration files.
  api.addFiles([
    'typings/angular2/angular2.d.ts',
    'typings/angular2/router.d.ts',
    'typings/es6-promise/es6-promise.d.ts',
    'typings/rx/rx-lite.d.ts',
    'typings/rx/rx.d.ts',
    'typings/meteor/meteor.d.ts',
    'typings/all.d.ts'
  ], server);

  api.addFiles([
    'client.browserify.js',
    'main.jsx',
    'angular2.js'
  ], client);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('barbatus:angular2');
});
