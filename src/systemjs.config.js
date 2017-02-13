/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'angular2-cookie': 'node_modules/angular2-cookie',
      'angular2-cool-storage': 'npm:angular2-cool-storage',
      'ng2-slimscroll': 'npm:ng2-slimscroll',
      'dropzone': 'node_modules/dropzone',
      'jquery': 'node_modules/jquery',

      'moment': 'npm:moment',
      'ng2-datetime-picker': 'https://npmcdn.com/ng2-datetime-picker',
      'angular2-google-maps/core': 'npm:angular2-google-maps/core/core.umd.js',

      'ng2-bootstrap': 'npm:ng2-bootstrap',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },

    packages: {
      app: {
        "main": './main.js',
        "defaultExtension": 'js'
      },
      rxjs: {
        "defaultExtension": 'js'
      },
      "angular2-cool-storage": { 
        "main": "./src/cool-local-storage", 
        "defaultExtension": "js" 
      },
      'ng2-datetime-picker': {
        "main": "dist/index.js", 
        "defaultExtension": "js" 
      },
      'ng2-slimscroll': {
        "main": "index.js", 
        "defaultExtension": "js" 
      },
      'moment': {
        "main": "moment.js", 
        "defaultExtension": "js" 
      },
      "dropzone": {
        "main": "dist/dropzone.js", 
        "defaultExtension": "js" 
      },
      "jquery": {
        "main": "dist/jquery.js", 
        "defaultExtension": "js" 
      },
      'angular2-in-memory-web-api': {
        "main": './index.js',
        "defaultExtension": 'js'
      },
      'ng2-bootstrap': {
        "main": 'index.js',
        "defaultExtension": 'js'
      }
      
    }

  });
})(this);


