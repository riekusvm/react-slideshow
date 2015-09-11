import Gulp from 'gulp';
import webserver from 'gulp-webserver';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import assign from 'lodash.assign';
import gutil from 'gulp-util';
import del from 'del';
import sequence from 'gulp-sequence';

let config = {
  mainJsFile: 'index.js',
  mainHTMLFile: 'index.html',
  srcDir: './src',
  devDir: './dev',
  distDir: './build',
  distFile: 'app.min.js'
};

// add custom browserify options here
let customOpts = {
  entries: [config.srcDir + '/' + config.mainJsFile],
  debug: true
};

function browserifyIt(folder) {
  browserify(config.srcDir + '/' + config.mainJsFile)
    .transform(babelify)
    .bundle()
    .pipe(source(config.mainJsFile))
    .pipe(buffer())
    .pipe(rename(config.distFile))
    .pipe(uglify())
    .pipe(Gulp.dest(folder + '/scripts'));
}

Gulp.task('browserifyDev', () => {
  browserifyIt(config.devDir);
});

Gulp.task('browserify', () => {
  browserifyIt(config.distDir);
});

function clean(folder) {
  del(folder + '/*').then((paths) => {
    gutil.log('Deleted files/folders:\n', paths.join('\n'));
  });
}

Gulp.task('devclean', () => {
  clean(config.devDir);
});

Gulp.task('buildclean', () => {
  clean(config.distDir);
});

function html(htmlFile, dest) {
  return Gulp.src(htmlFile)
  .pipe(Gulp.dest(dest));
}

Gulp.task('buildhtml', () => {
  return html(config.mainHTMLFile, config.distDir);
});

Gulp.task('devhtml', () => {
  return html(config.mainHTMLFile, config.devDir);
});

function serve(dest) {
  Gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
}

Gulp.task('devserve', () => {
  serve(config.devDir);
});

Gulp.task('run', () => {
  serve(config.distDir);
});

let opts = assign({}, watchify.args, customOpts);
let b = watchify(browserify(opts))
.on('update', bundle)
.on('log', gutil.log);

// add transformations here
b.transform(babelify);

function bundle() {
  return b.bundle()
  .pipe(source(config.distFile))
  .pipe(buffer())
  .pipe(Gulp.dest(config.devDir + '/scripts'));
}

Gulp.task('build', sequence('buildclean', ['browserify', 'buildhtml']));
Gulp.task('js', bundle);
Gulp.task('dev', sequence('devclean', 'browserifyDev', ['js', 'devhtml'], 'devserve'));
