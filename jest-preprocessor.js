// based on:
// * babel-jest
// * https://github.com/kriasoft/react-starter-kit/blob/9204f2661ebee15dcb0b2feed4ae1d2137a8d213/preprocessor.js

var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    // return nothing when babel can't process file (e.g. css files)
    if (!babel.canCompile(filename)) {
      return '';
    }

    // Allow the stage to be configured by an environment
    // variable, but use Babel's default stage (2) if
    // no environment variable is specified.
    var stage = process.env.BABEL_JEST_STAGE || 2;

    // Ignore all files within node_modules
    // babel files can be .js, .es, .jsx or .es6
    if (filename.indexOf('node_modules') === -1 && babel.canCompile(filename)) {
      return babel.transform(src, {
        filename: filename,
        stage: stage,
        retainLines: true,
        auxiliaryCommentBefore: 'istanbul ignore next'
      }).code;
    }

    return src;
  }
};
