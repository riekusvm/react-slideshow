import Gulp from 'gulp';
import webserver from 'gulp-webserver';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import gutil from 'gulp-util';
import del from 'del';
import sequence from 'gulp-sequence';
import CSSModulesify from 'css-modulesify';
import minifyCss from 'gulp-minify-css';

const config = {
  mainJsFile: 'index.js',
  mainHTMLFile: 'index.html',
  srcDir: './src',
  devDir: './dev',
  distDir: './build',
  distFile: 'js/app.min.js'
};

// add custom browserify options here
const customOpts = {
  entries: [config.srcDir + '/' + config.mainJsFile],
  debug: true
};

const babelifyConfig = {
  optional: ['es7.classProperties']
};

function browserifyIt(folder) {
  const cssStyle = (folder === config.distDir) ? CSSModulesify.generateShortName : '';
  return browserify(config.srcDir + '/' + config.mainJsFile)
    .transform(babelify.configure(babelifyConfig))
    .plugin(CSSModulesify, {output: folder + '/app.css', generateScopedName: cssStyle})
    .bundle()
    .pipe(source(config.mainJsFile))
    .pipe(buffer())
    .pipe(rename(config.distFile))
    .pipe(uglify())
    .pipe(Gulp.dest(folder));
}

Gulp.task('minify-css', () => {
  return Gulp.src(config.distDir + '/*.css')
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(Gulp.dest(config.distDir));
});

Gulp.task('browserifyDev', () => {
  return browserifyIt(config.devDir);
});

Gulp.task('browserify', () => {
  return browserifyIt(config.distDir);
});

function clean(folder) {
  // delete synchronously, to assure all old files are gone before building
  let deleted = del.sync(folder + '/*');
  gutil.log('Deleted files/folders:\n', deleted.join('\n'));
}

Gulp.task('devclean', () => {
  return clean(config.devDir);
});

Gulp.task('buildclean', () => {
  return clean(config.distDir);
});

function html(htmlFile, dest) {
  return Gulp.src(config.srcDir + '/' + htmlFile)
  .pipe(Gulp.dest(dest));
}

Gulp.task('buildhtml', () => {
  return html(config.mainHTMLFile, config.distDir);
});

Gulp.task('devhtml', () => {
  return html(config.mainHTMLFile, config.devDir);
});

function fonts(dest) {
  Gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(Gulp.dest(dest + '/css/'));

  Gulp.src('./node_modules/font-awesome/fonts/*')
  .pipe(Gulp.dest(dest + '/fonts/'));
}

Gulp.task('devfonts', () => {
  return fonts(config.devDir);
});

Gulp.task('buildfonts', () => {
  return fonts(config.distDir);
});


function serve(dest) {
  Gulp.src(dest)
    .pipe(webserver({
      livereload: dest === config.devDir,
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

Gulp.task('run', () => {
  serve(config.distDir);
});

const opts = Object.assign({}, watchify.args, customOpts);
const b = watchify(browserify(opts))
.on('update', bundle)
.on('log', gutil.log);

// add transformations here
b.transform(babelify.configure(babelifyConfig));
b.plugin(CSSModulesify, {output: config.devDir + '/app.css'});

function bundle() {
  return b.bundle()
  .pipe(source(config.distFile))
  .pipe(buffer())
  .pipe(Gulp.dest(config.devDir));
}

Gulp.task('build', sequence('buildclean', ['buildfonts', 'browserify'],
                            ['minify-css', 'buildhtml']));
Gulp.task('js', bundle);
Gulp.task('dev', sequence(['devclean'], ['devfonts', 'browserifyDev'],
                          ['js', 'devhtml'], 'devserve'));
