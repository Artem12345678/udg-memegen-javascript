global.$ = {
  gulp: require('gulp'),
  del: require('del'),
  pcp: require('postcss-preset-env'),
  mp: require('css-mqpacker'),
  cn: require('cssnano'),
  bs: require('browser-sync').create(),
  ms: require('merge-stream'),
  rpb: require('rollup-plugin-babel'),
  rpnr: require('rollup-plugin-node-resolve'),
  rpcjs: require('rollup-plugin-commonjs'),
  lp: require('gulp-load-plugins')()
}

global.paths = {
  tasks: require('./gulp/config/tasks.js'),                             // Array of paths, relative to gulpfile.js
  source: './src',
  build: './dist'
}

global.settings = {
  plugins: [                                                    
    $.pcp({
      browsers: ['last 3 versions'],                                  
      stage: 2,                                                       // Default one
      autoprefixer: {
        grid: true,
      },
      features: {
        'nesting-rules': true,
        'color-mod-function': true,
        'custom-media': true,
      },
    }),
    $.mp(),
    $.cn()                                                             
  ]                                                                    
}





paths.tasks.forEach((path) => require(path)());                        // Get all modules and call function

$.gulp.task('default', $.gulp.parallel('serve','watch'));