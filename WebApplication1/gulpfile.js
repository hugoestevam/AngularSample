var gulp = require('gulp');
var notify = require('gulp-notify');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('inject', function () {
	var target = gulp.src('src/index.html');
	var bowerFiles = gulp.src(mainBowerFiles(), { read: false });
	var sources = gulp.src(['src/app/*module*.js', 'src/app/**/*module*.js', 'src/app/**/*.js', 'src/content/**/*.css'], { read: false });

	return target
		.pipe(inject(bowerFiles, { name: 'bower', ignorePath: 'src', addRootSlash: false }))
		.pipe(inject(sources, { ignorePath: 'src', addRootSlash: false }))
		.pipe(gulp.dest('src'));
});

gulp.task('connect', function () {
	connect.server({
		root: 'src',
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback() ];
		}
	});
});

gulp.task('html', ['inject'], function () {
	gulp.src('src/*.html')
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.*', ['html']);
});

gulp.task('default', ['connect', 'watch']);