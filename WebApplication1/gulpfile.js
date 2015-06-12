var del = require('del');
var gulp = require('gulp');
var notify = require('gulp-notify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-uglify');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');
var historyApiFallback = require('connect-history-api-fallback');
var runSequence = require('run-sequence');
var templateCache = require('gulp-angular-templatecache');
var streamSeries = require('stream-series');
var zip = require('gulp-zip');

var config = {
    distFolder: './dist/',
    artifactFolder: './dist/artifacts/'
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
		root: 'dist',
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


gulp.task('copyContent', function () {
    return gulp.src('src/content/**/*.*')
               .pipe(gulp.dest(config.distFolder));
});

gulp.task('scripts', function () {
    var templateCacheOptions = {
        module: 'app',
        root: 'app/'
    };

    var cachedTemplates = gulp.src('./src/app/**/*.html')
                              .pipe(templateCache(templateCacheOptions));

    return streamSeries(
        gulp.src('./src/app/**/*.module.js'),
        gulp.src(['./src/app/**/*.js', '!./src/app/**/*.module.js']),
        cachedTemplates
    )
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.distFolder));
});

gulp.task('copyIndex', function () {
    var injectOptions = {
        ignorePath: 'dist',
        addRootSlash: false
    };

    var toInject = [
        config.distFolder + '*.js',
        config.distFolder + '*.css'
    ];

    return gulp.src('./src/index.html')
               .pipe(inject(gulp.src(mainBowerFiles(), { read: false }), { name: 'bower', ignorePath: 'src', addRootSlash: false }))
               .pipe(inject(gulp.src(toInject), injectOptions))
               .pipe(gulp.dest(config.distFolder));
});

gulp.task('copyBower', function () {
    return gulp.src('src/bower_components/**/*.*')
               .pipe(gulp.dest(config.distFolder + 'bower_components/'));
});

/*
 * Compacta os arquivos e copia para a pasta de saida
 */
gulp.task('compactToArtifacts', function () {
    return gulp.src(config.distFolder + '**/*.*')
        .pipe(zip('artifacts.zip'))
        .pipe(gulp.dest(config.artifactFolder));
});

/*
 * Gera os arquivos de distribuição
 */
gulp.task('Dist', ['clean'], function() {
    runSequence('scripts', 'copyContent', 'copyBower', 'copyIndex', 'compactToArtifacts');
});