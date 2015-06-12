var del = require('del');
var gulp = require('gulp');
var notify = require('gulp-notify');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');
var historyApiFallback = require('connect-history-api-fallback');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');

var config = {
    distFolder: './dist/'
};

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

/*
 * Apaga todos os arquivos da pasta de distribuição.
 * 
 */
gulp.task('clean', function (cb) {
    return del([
        config.distFolder
    ], cb);
});

/*
 * Compacta os arquivos e copia para a pasta de saida
 */

gulp.task('compactToDist', function () {
    return gulp.src('src/**/*.*')
        .pipe(zip('artifacts.zip'))
        .pipe(gulp.dest(config.distFolder));
});


/*
 * Gera os arquivos de distribuição
 */

gulp.task('Dist', ['clean'], function() {
    runSequence('inject', 'compactToDist');
});