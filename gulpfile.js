var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');

var jsFiles = ['www/app/app.js',
			   'www/js/index.js',
			   'www/js/session.js',
			   'www/app/routes.js',
			   'www/app/controllers/*.js', 
			   'www/app/directives/*.js', 
			   'www/app/services/*.js'],
	jsDest = 'www/js/dist/scripts';

var vendorJsFiles = ['www/bower_components/angular/angular.min.js',
					 'www/bower_components/angular-route/angular-route.js', 
					 'www/bower_components/jquery/dist/jquery.min.js', 
					 'www/bower_components/Materialize/bin/materialize.js'],
	vendorJsDest = 'www/js/dist/scripts';

// Concatenate & Minify
gulp.task('bundle-vendor', function(){
	gulp.src(vendorJsFiles)
		.pipe(concat('vendor.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(vendorJsDest));	
});

gulp.task('bundle', ['bundle-vendor'],function(){
	gulp.src(jsFiles)
		.pipe(concat('bundle.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest));
});

// Serve Files
gulp.task('serve', ['bundle'], shell.task(
  ['phonegap serve']
));

// Default Task
gulp.task('build', ['serve']);