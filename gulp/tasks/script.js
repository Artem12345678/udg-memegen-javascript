module.exports = () => {

  const onError = function(err) {                                       // Can't use 'this' keyword with arrow function here
                                                                        // https://stackoverflow.com/questions/31095710/methods-in-es6-objects-using-arrow-functions
    $.lp.notify.onError({
      title: "Error in " + err.plugin,
      message: err.message
    })(err);
    this.emit('end');
  };


  $.gulp.task('script:dev', () => {
    return  $.gulp.src(`${paths.source}/js/script.js`, { allowEmpty: true })         // In Gulp 4 if we give src a direct way to a file and 
                                                                                     // that file doesn't exist - it throws an error. 
                                                                                     // Solution - use allowEmpty option.
            .pipe($.lp.plumber({
              errorHandler: onError
            }))
            .pipe($.lp.sourcemaps.init())
            .pipe($.lp.betterRollup({
              plugins: [$.rpb({ runtimeHelpers: true }), $.rpnr(), $.rpcjs()]        // 'runtimeHelpers' is necessary! gulp-babel doesn't have
            }, {                                                                     // this option and leads to errors
              format: 'iife'
            }))
            .pipe($.lp.uglify())
            .pipe($.lp.rename({
              suffix: '.min'
            }))
            .pipe($.lp.sourcemaps.write('/maps'))                            // To write external source map files, pass a path relative to the DESTINATION to sourcemaps.write().
            .pipe($.gulp.dest(`${paths.build}/js`));
  });


  $.gulp.task('script:prod', () => {
    return  $.gulp.src(`${paths.source}/js/script.js`, { allowEmpty: true })         // In Gulp 4 if we give src a direct way to a file and 
                                                                                     // that file doesn't exist - it throws an error. 
                                                                                     // Solution - use allowEmpty option.
            .pipe($.lp.plumber({
              errorHandler: onError
            }))
            .pipe($.lp.betterRollup({
              plugins: [$.rpb({ runtimeHelpers: true }), $.rpnr(), $.rpcjs()]        // 'runtimeHelpers' is necessary! gulp-babel doesn't have
            }, {                                                                     // this option and leads to errors
              format: 'iife'
            }))
            .pipe($.lp.uglify())
            .pipe($.lp.rename({
              suffix: '.min'
            }))
            .pipe($.gulp.dest(`${paths.build}/js`));
  });

}

