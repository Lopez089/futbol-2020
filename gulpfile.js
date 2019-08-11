/*const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const pug = require('gulp-pug')
const browserify = require('browserify')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')

gulp.task('pug', () => {
    gulp.src('./dev/layaut/index.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./src/'))
   
    
  });

gulp.task('sass', () => {
    return gulp.src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'dev/scss/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
    
  });

gulp.task('js', () =>{
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
});

gulp.task('serve', ['sass', 'browserify'], () =>{
    browserSync.init({
        server: './src'
    });

    gulp.watch([
        'node_modules/bootstrap/scss/bootstrapmin.scss',
        './dev/scss/*.scss',
        './dev/layaut/*.pug'
    ], ['sass', 'pug']);


    gulp.watch(['src/*']).on('change', browserSync.reload);
    
});

gulp.task('font-awesome', () =>{
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
});

gulp.task('fonts', () =>{
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
});

gulp.task('browserify', function() {
    return browserify('src/js/main.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('src/js/'));
  });

gulp.task('default', ['js', 'sass', 'browserify', 'pug', 'serve', 'font-awesome', 'fonts']);*/