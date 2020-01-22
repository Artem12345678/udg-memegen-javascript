module.exports = () => {

  const onError = function(err) {                                       // Can't use 'this' keyword with arrow function here
                                                                        // https://stackoverflow.com/questions/31095710/methods-in-es6-objects-using-arrow-functions
    $.lp.notify.onError({
      title: "Error in " + err.plugin,
      message: err.message
    })(err);
    this.emit('end');
  };

  
  $.gulp.task('pug:dev', () => {
    return $.gulp.src(`${paths.source}/pug/pages/*.pug`)                   // When we use {} in arrow function we need to use RETURN word
      .pipe($.lp.plumber({
        errorHandler: onError
      }))
      .pipe($.lp.pug({
        pretty: true
      }))
      .pipe($.gulp.dest(`${paths.source}/`))
      .pipe($.bs.stream());
  });


  $.gulp.task('pug:prod', () => {
    return $.gulp.src(`${paths.source}/pug/pages/*.pug`)                   // When we use {} in arrow function we need to use RETURN word
      .pipe($.lp.plumber({
        errorHandler: onError
      }))
      .pipe($.lp.pug({
        pretty: true                                                      // By default it's false, but page is blank after render. Don't know reason yet.
      }))
      .pipe($.gulp.dest(`${paths.source}/`))
      .pipe($.bs.stream());
  });

}