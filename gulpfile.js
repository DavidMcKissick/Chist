/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
// var jasmine = require('gulp-jasmine-phantom');
// var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');

// gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint', 'optomize'], function () {
// 	gulp.watch('sass/*.scss', ['styles']);
// 	gulp.watch('js/**/*.js', ['lint']);
// 	gulp.watch('*.html', ['copy-html']);
// 	gulp.watch('./dist/index.html').on('change', browserSync.reload);
// 	browserSync.init({
// 		server: './dist'
// 	});
// });

gulp.task('devOp', ['copy-html-dev', 'copy-images-dev', 'styles-dev', 'lint-dev', 'optomize-dev', 'copy-js-dev'], function(){
	gulp.watch('sass/*.scss', ['styles-dev']);
	gulp.watch('app/**/*.js', ['lint-dev']);
	gulp.watch('js/**.js', ['lint-dev']);
	gulp.watch('app/*.js', ['copy-js-dev-re']);
	gulp.watch('*.html', ['copy-html-dev']);
	gulp.watch('./dev/index.html').on('change', browserSync.reload);
	gulp.watch('./dev/app/*.js').on('change', browserSync.reload);
	gulp.watch('./dev/styles/styles.css', browserSync.reload);
	browserSync.init({
		server: './dev',
	});
});

/*Frankly this task wouldn't be even slightly needed if it weren't for the fact browser
sync is broken as all hell.*/
gulp.task('dop', [
	'copy-html-dev', 
	'copy-images-dev', 
	'styles-dev', 
	'lint-dev', 
	'optomize-dev', 
	'copy-js-dev'
]);

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'optomize-dist',
	'copy-js'
]);


gulp.task('optomize', function () {
	gulp.src('js/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// gulp.task('optomize-new', function(){
// 	gulp.src('js/*')
// 		.pipe()
// 		.pipe(sourcemaps.init())
// 		.pipe(babel())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('dist/js'));
// 	gulp.src('img/*')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/img'));
// });

gulp.task('optomize-dev', function () {
	// gulp.src('js/*.js')
	// 	.pipe(sourcemaps.init())
	// 	.pipe(babel())
	// 	.pipe(sourcemaps.write())
	// 	.pipe(gulp.dest('dev/js'));  //No longer needed on any semi-modern browser
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dev/img'))
});


gulp.task('optomize-dist', function () {
	gulp.src('js/*.js')
		.pipe(sourcemaps.init())
		// .pipe(babel())
		// .pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
	gulp.src('img/*')
		.pipe(imagemin())
});

gulp.task('copy-js', function(){
	gulp.src('js/*')
		.pipe(gulp.dest('./dist/js'));
});
gulp.task('copy-js-dev', function () {
	gulp.src('app/*')
		.pipe(gulp.dest('./dev/app'));
});
gulp.task('copy-js-dev-re', function(){
	gulp.src('app/*')
		.pipe(gulp.dest('./dev/app'));
});

gulp.task('copy-html', function () {
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));

	gulp.src('articles/*')
		.pipe(gulp.dest('./dist/articles'));
});
gulp.task('copy-html-dev', function () {
	gulp.src('./*.html')
		.pipe(gulp.dest('./dev'));
	gulp.src('articles/*')
		.pipe(gulp.dest('./dev/articles'));
});

gulp.task('copy-images', function () {
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});
gulp.task('copy-images-dev', function () {
	gulp.src('img/*')
		.pipe(gulp.dest('dev/img'));
});

gulp.task('styles', function () {
	gulp.src('sass/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});
gulp.task('styles-dev', function () {
	gulp.src('sass/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dev/styles'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});
gulp.task('lint-dev', function () {
	return gulp.src(['app/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

// gulp.task('tests', function () {
// 	gulp.src('tests/spec/extraSpec.js')
// 		.pipe(jasmine({
// 			integration: true,
// 			vendor: 'js/**/*.js'
// 		}));
// });