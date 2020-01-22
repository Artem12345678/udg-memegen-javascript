module.exports = () => {

  const plugins = [
    $.cn()                                                              
  ];                                                                    

  
  const onError = function(err) {                                       // Can't use 'this' keyword with arrow function here
                                                                        // https://stackoverflow.com/questions/31095710/methods-in-es6-objects-using-arrow-functions
    $.lp.notify.onError({
      title: "Error in " + err.plugin,
      message: err.message
    })(err);
    this.emit('end');
  };


  $.gulp.task('useref', () => {
    return $.gulp.src(`${paths.source}/*.html`)                         // When we use {} in arrow function we need to use RETURN word
        .pipe($.lp.plumber({
          errorHandler: onError
         }))
        .pipe($.lp.useref())
        .pipe($.lp.if('*.css', $.lp.postcss(plugins)))
        .pipe($.lp.if('*.js', $.lp.uglify()))
        .pipe($.gulp.dest(`${paths.build}`))
});

}