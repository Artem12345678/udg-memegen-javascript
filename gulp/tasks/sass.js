module.exports = () => {

  const onError = function(err) {                                      // Can't use 'this' keyword with arrow function here
                                                                       // https://stackoverflow.com/questions/31095710/methods-in-es6-objects-using-arrow-functions
    $.lp.notify.onError({
      title: "Error in " + err.plugin,
      message: err.message
    })(err);
    this.emit('end');
  };


  $.gulp.task('sass:dev', () => {
    return $.gulp.src(`${paths.source}/sass/*.scss`)                   // When we use {} in arrow function we need to use RETURN word
      .pipe($.lp.plumber({
        errorHandler: onError
      }))
      .pipe($.lp.sourcemaps.init())
      .pipe($.lp.sass())
      .pipe($.lp.postcss(settings.plugins))
      .pipe($.lp.rename({
        suffix: '.min'
      }))
      .pipe($.lp.sourcemaps.write('/maps'))                            // To write external source map files, pass a path relative to the DESTINATION to sourcemaps.write().
      .pipe($.gulp.dest(`${paths.build}/css`))
      .pipe($.bs.stream());                                            // $.bs.stream() = injection without reload, $.bs.reload() = browser reload
  });

  
  $.gulp.task('sass:prod', () => {
    return $.gulp.src(`${paths.source}/sass/*.scss`)
    .pipe($.lp.plumber({
      errorHandler: onError
    }))
    .pipe($.lp.sass())
    .pipe($.lp.postcss(settings.plugins))
    .pipe($.lp.rename({
      suffix: '.min'
    }))
    .pipe($.gulp.dest(`${paths.build}/css`))
    .pipe($.bs.stream());
  })
}