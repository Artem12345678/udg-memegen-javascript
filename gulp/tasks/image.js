module.exports = () => {
  
  $.gulp.task('image:dev', () => {
    return  $.gulp.src(`${paths.source}/img/*.*`)                      // When we use {} in arrow function we need to use RETURN word
            .pipe($.gulp.dest(`${paths.build}/img`));
  });

  // $.gulp.task('tinypng', () => {
  //   return  $.gulp.src(`${paths.source}/img/*.{jpg,jpeg,png}`)            
  //           .pipe($.lp.tinypng('GPZr56LeL9CN4kD0MVXs4JTCufXRJUzp'))
  //           .pipe($.gulp.dest(`${paths.build}/img`));
  // })

  // $.gulp.task('svg', () => {
  //   return $.gulp.src(`${paths.source}/img/*.svg`)
  //          .pipe($.gulp.dest(`${paths.build}/img`));
  // })

  // $.gulp.task('gif', () => {
  //   return $.gulp.src(`${paths.source}/img/*.gif`)
  //          .pipe($.gulp.dest(`${paths.build}/img`));
  // })

  $.gulp.task('image:prod', () => {                                // When we use {} in arrow function we need to use RETURN word
    return $.gulp.src(`${paths.source}/img/*.*`)                   // imagemin supports jpg/jpeg, png, gif and svg
           .pipe($.lp.imagemin([
            $.lp.imagemin.gifsicle(),                             // When using verbose: true (settings object), we should explicitly call all plugins
            $.lp.imagemin.jpegtran(),
            $.lp.imagemin.optipng(),
            $.lp.imagemin.svgo({
              plugins: [{
                removeViewBox: true,
              }]
            })
           ],{
             verbose:true
           }))
           .pipe($.gulp.dest(`${paths.build}/img`))
  });

}

